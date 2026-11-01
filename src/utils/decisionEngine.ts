import {
  PatientCriteria,
  HerniaCriteria,
  RecommendationResult,
  ProcedureDetail,
  AnesthesiaDetail,
  MeshRecommendation,
  FixationRecommendation,
  ClinicalAlert,
} from '../types/hernia';

export function calculateBMI(weightKg: number, heightCm: number): { bmi: number; category: PatientCriteria['bmiCategory'] } {
  if (heightCm <= 0 || weightKg <= 0) {
    return { bmi: 24, category: 'normal' };
  }
  const heightM = heightCm / 100;
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  let category: PatientCriteria['bmiCategory'] = 'normal';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'normal';
  else if (bmi < 30) category = 'overweight';
  else if (bmi < 35) category = 'obese';
  else category = 'severe_obese';

  return { bmi, category };
}

export function computeEHSClassification(criteria: HerniaCriteria): string {
  // EHS Classification: Primary (P) or Recurrent (R)
  // Type: L (Lateral/Indirect), M (Medial/Direct), F (Femoral)
  // Size: 1 (<1.5cm / 1 finger), 2 (1.5-3cm / 1-2 fingers), 3 (>3cm / >2 fingers)
  const pOrR = criteria.presentation === 'primary' ? 'P' : 'R';
  let typeCode = 'L';
  if (criteria.anatomy === 'direct') typeCode = 'M';
  else if (criteria.anatomy === 'femoral') typeCode = 'F';
  else if (criteria.anatomy === 'combined_pantaloon') typeCode = 'L+M';

  let sizeNum = '1';
  if (criteria.defectSize === 'medium') sizeNum = '2';
  else if (criteria.defectSize === 'large' || criteria.defectSize === 'scrotal') sizeNum = '3';

  return `EHS: ${pOrR} · ${typeCode}${sizeNum} (${criteria.side === 'bilateral' ? 'Bilateral' : criteria.side === 'unilateral_right' ? 'Right' : 'Left'})`;
}

export function evaluateHerniaSurgery(patient: PatientCriteria, hernia: HerniaCriteria): RecommendationResult {
  const alerts: ClinicalAlert[] = [];
  const stepByStepRationale: string[] = [];

  // Critical checks:
  const isChild = patient.ageGroup === 'child' || patient.exactAge < 18;
  const isStrangulated = hernia.status === 'strangulated';
  const isUnfitGA = patient.anesthesiaFitness === 'unfit_general';
  const isRefusingMesh = patient.meshPreference === 'refuses_mesh';
  const isFemale = patient.sex === 'female';
  const isBilateral = hernia.side === 'bilateral';
  const isRecurrentAfterOpen = hernia.presentation === 'recurrent_after_open';
  const isRecurrentAfterLap = hernia.presentation === 'recurrent_after_lap';
  const isScrotalOrLarge = hernia.defectSize === 'scrotal' || (hernia.defectSize === 'large' && hernia.anatomy === 'indirect');
  const isFemoral = hernia.anatomy === 'femoral';
  const isObese = patient.bmiCategory === 'obese' || patient.bmiCategory === 'severe_obese' || patient.bmi >= 30;
  const isSevereObese = patient.bmi >= 35;
  const isAthleticOrWorker = patient.activityLevel === 'heavy_worker_athlete';
  const hasPriorExtraperitoneal = patient.priorSurgery === 'extraperitoneal_prostatectomy';
  const hasPriorLowerMidline = patient.priorSurgery === 'lower_midline_open';
  const hasPeritonealDialysis = patient.priorSurgery === 'peritoneal_dialysis';

  // 1. Pediatric Evaluation
  if (isChild) {
    stepByStepRationale.push('Child (<18 yr): Congenital etiology (patent processus vaginalis). Permanent prosthetic mesh is contraindicated due to pelvic growth and tissue migration.');
    stepByStepRationale.push('Recommended: Open Herniotomy (high sac ligation) without mesh implantation.');
    alerts.push({
      level: 'info',
      title: 'Pediatric Patient Guideline',
      message: 'Children must receive Open Herniotomy without mesh. Mesh is unnecessary and contraindicated in pediatric inguinal hernias.',
      source: 'Table 1/2/3',
    });

    const procedure: ProcedureDetail = {
      code: 'HERNIOTOMY',
      name: 'Open Pediatric Herniotomy',
      category: 'Pediatric Herniotomy',
      summary: 'High ligation and division of the patent vaginal process at the internal inguinal ring without posterior wall disruption or mesh.',
      keyBenefits: ['Preserves normal pelvic/inguinal growth', 'Zero foreign body risk', 'Minimal tissue trauma', 'Rapid outpatient recovery'],
      keyRisks: ['Injury to vas deferens / testicular vessels (rare in expert hands)', 'Recurrence if ligation is not high enough'],
      evidenceLevel: 'Strong Recommendation (GRADE Level 1)',
      techniqueHighlights: [
        'Transverse skin crease incision in lower abdominal skin fold',
        'Identification and preservation of spermatic cord structures',
        'Isolation and high dissection of the sac to the extraperitoneal fat level',
        'Transfixion and division of the peritoneal sac',
      ],
    };

    const anesthesia: AnesthesiaDetail = {
      preferred: 'General Anesthesia',
      alternative: 'Caudal block or local infiltration supplement',
      rationale: 'Pediatric airway safety, immobility, and patient comfort require general anesthesia supplemented by regional field block for postoperative analgesia.',
    };

    const mesh: MeshRecommendation = {
      type: 'No Mesh (Contraindicated)',
      specifications: 'Pure tissue herniotomy - mesh is contraindicated in children.',
      warnings: ['Never implant prosthetic mesh in growing pediatric anatomy.'],
    };

    const fixation: FixationRecommendation = {
      needed: false,
      type: 'None',
      rationale: 'Absorbable suture transfixion of sac only.',
    };

    return {
      primaryProcedure: procedure,
      anesthesia,
      mesh,
      fixation,
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Very Low (<1%)',
        cpipExplanation: 'Minimal nerve disruption and no prosthetic implant.',
        recurrenceRateEstimate: '<1% in primary uncomplicated cases',
        convalescenceDays: '1-3 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 2. Emergency Strangulation Check
  if (isStrangulated) {
    stepByStepRationale.push('EMERGENCY ALERT: Strangulated / compromised hernia detected with suspected bowel ischemia.');
    stepByStepRationale.push('Immediate emergency open exploration is required to inspect bowel viability. Standard elective laparoscopy is contraindicated in unstable strangulation.');
    stepByStepRationale.push('If bowel resection is required or contamination exists, avoid prosthetic mesh or use Shouldice pure tissue repair.');
    alerts.push({
      level: 'critical',
      title: 'Emergency: Strangulated Groin Hernia',
      message: 'Urgent open surgical intervention required. Laparoscopy is not recommended in toxic or compromised bowel scenarios. Assess field contamination prior to considering mesh.',
      source: 'Table 1/2/3',
    });

    const primaryEmergency: ProcedureDetail = {
      code: 'EMERGENCY_OPEN_RESECTION',
      name: 'Emergency Open Groin Exploration & Repair',
      category: 'Emergency Exploration',
      summary: 'Urgent open groin exploration, release of constricting ring, assessment of organ viability, bowel resection if necrotic, and tailored repair.',
      keyBenefits: ['Immediate decompression of ischemia', 'Direct inspection and exteriorization of non-viable bowel', 'Sepsis control'],
      keyRisks: ['Wound infection', 'Enterocutaneous fistula if mesh in contaminated field', 'Systemic sepsis'],
      evidenceLevel: 'Strong Recommendation (GRADE Level 1)',
      techniqueHighlights: [
        'Anterior inguinal approach with midline laparotomy standby if extensive bowel resection required',
        'Careful opening of the sac with fluid culture / aspiration prior to release',
        'Assessment of peristalsis and mucosal color after warm saline pack for 10-15 min',
        'Shouldice tissue repair if bowel opened/contaminated; Lichtenstein mesh ONLY if clean viable bowel without enterectomy',
      ],
    };

    const anesthesia: AnesthesiaDetail = {
      preferred: isUnfitGA ? 'Local Infiltration Anesthesia' : 'General Anesthesia',
      alternative: 'Local anesthesia with monitored anesthesia care (MAC) if septic/shock state precludes GA',
      rationale: 'General anesthesia enables airway control during bowel manipulation; however, severe systemic compromise in frail patients may require open release under local anesthesia.',
    };

    const mesh: MeshRecommendation = {
      type: isRefusingMesh ? 'No Mesh (Tissue repair)' : 'Conditional (Lichtenstein flat mesh ONLY if no bowel resection / contamination)',
      specifications: 'If bowel resection or frank ischemia is present, synthetic mesh is contraindicated; perform Shouldice tissue repair.',
      warnings: ['Synthetic mesh placed in a contaminated or infected field carries high risk of mesh sepsis and sinus formation.'],
    };

    const fixation: FixationRecommendation = {
      needed: true,
      type: 'Monofilament absorbable / non-absorbable sutures',
      rationale: 'Precise suture anchor avoiding ischemia of compromised tissues.',
    };

    return {
      primaryProcedure: primaryEmergency,
      anesthesia,
      mesh,
      fixation,
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Moderate (5-10%)',
        cpipExplanation: 'Higher inflammatory reaction from acute incarceration.',
        recurrenceRateEstimate: '3-7% (higher due to tissue edema)',
        convalescenceDays: '14-21 days (extended due to emergency recovery)',
        daySurgerySuitability: 'Inpatient Monitoring Advised',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 3. Absolute General Anesthesia Contraindication
  if (isUnfitGA) {
    stepByStepRationale.push('Anesthesia fitness: Patient is UNFIT for General Anesthesia (severe cardiopulmonary comorbidities / high ASA score).');
    stepByStepRationale.push('Laparoscopic repair (TEP/TAPP) strictly requires general endotracheal anesthesia and carbon dioxide pneumoperitoneum. Therefore, laparoscopy is contraindicated.');
    stepByStepRationale.push('Open Mesh Lichtenstein repair under Local Infiltration Anesthesia is the gold standard and safest strategy.');
    
    alerts.push({
      level: 'warning',
      title: 'Unfit for General Anesthesia: Local Infiltration Mandated',
      message: 'Per HerniaSurge and Table 1, patients unfit for GA must undergo open anterior repair under local infiltration anesthesia. Laparoscopy is contraindicated.',
      source: 'Table 1/2/3',
    });

    const lichtensteinProc = getLichtensteinProcedureDetail(patient, hernia);
    const shouldiceProc = getShouldiceProcedureDetail();

    return {
      primaryProcedure: isRefusingMesh ? shouldiceProc : lichtensteinProc,
      alternativeProcedure: isRefusingMesh ? undefined : shouldiceProc,
      anesthesia: {
        preferred: 'Local Infiltration Anesthesia',
        alternative: 'General anesthesia is contraindicated; regional (spinal) carries higher urinary retention and hypotension in elderly.',
        rationale: 'Local infiltration provides superior hemodynamic stability, lowest postoperative urinary retention (0.5% vs 10-15% spinal), and immediate post-op ambulation.',
      },
      mesh: getMeshSpecs(isRefusingMesh, hernia),
      fixation: getFixationStrategy(hernia, 'LICHTENSTEIN'),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Low-Moderate (3-5%)',
        cpipExplanation: 'Local anesthesia reduces central sensitization; nerve identification crucial.',
        recurrenceRateEstimate: '<2%',
        convalescenceDays: '7-14 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 4. Patient Refuses Mesh
  if (isRefusingMesh) {
    stepByStepRationale.push('Patient specifically refuses prosthetic mesh implantation after shared decision making.');
    stepByStepRationale.push('HerniaSurge Strong Recommendation: The Shouldice technique is the gold standard non-mesh tissue repair.');
    stepByStepRationale.push('Laparoscopic repairs (TEP/TAPP) require a mesh prosthesis to bridge the defect; therefore, open Shouldice is the procedure of choice.');
    alerts.push({
      level: 'info',
      title: 'Non-Mesh Tissue Repair Selected (Shouldice)',
      message: 'HerniaSurge guidelines state Shouldice 4-layer repair has the lowest recurrence among non-mesh techniques. Note recurrence rate is ~2-3x higher than mesh repair in general practice.',
      source: 'HerniaSurge 2018/2023',
    });

    const shouldice = getShouldiceProcedureDetail();
    return {
      primaryProcedure: shouldice,
      anesthesia: {
        preferred: patient.ageGroup === 'elderly' ? 'Local Infiltration Anesthesia' : 'General or Regional Anesthesia',
        alternative: 'Local anesthesia with sedation',
        rationale: 'Shouldice can be performed under local, regional, or general anesthesia depending on patient comfort and surgeon experience.',
      },
      mesh: {
        type: 'No Mesh (Tissue repair)',
        specifications: 'Pure autologous tissue repair utilizing continuous 4-layer polypropylene or steel wire suturing of transversalis fascia and conjoint tendon.',
        warnings: ['Inform patient of higher recurrence rate compared with mesh-based Lichtenstein or TEP/TAPP.'],
      },
      fixation: {
        needed: false,
        type: 'Continuous 4-layer suture',
        rationale: 'Tension-distributed multilayer suture closure.',
      },
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Moderate (6-10%)',
        cpipExplanation: 'Tissue tension across reconstructed floor and ilioinguinal/iliohypogastric nerve proximity.',
        recurrenceRateEstimate: '4-8% (significantly higher than mesh repairs outside specialized centers)',
        convalescenceDays: '14-21 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 5. Female Patient Specific Routing (CRITICAL HerniaSurge & EAES Guideline)
  if (isFemale) {
    stepByStepRationale.push('FEMALE PATIENT: Women have up to 10-15x higher rate of occult femoral hernias, which anterior Lichtenstein repair often misses.');
    stepByStepRationale.push('HerniaSurge & EAES 2026 STRONG RECOMMENDATION: Laparo-endoscopic repair with mesh (TAPP or TEP) is recommended for ALL female groin hernias.');
    stepByStepRationale.push('Laparo-endoscopic posterior mesh covers the entire Myopectineal Orifice of Fruchaud (including the femoral ring), drastically lowering recurrence and emergency reoperation.');

    alerts.push({
      level: 'critical',
      title: 'Female Groin Hernia: Laparo-Endoscopic Repair Mandated',
      message: 'EAES & HerniaSurge Strong Recommendation: Women with groin hernia must be offered laparo-endoscopic repair with mesh to cover the femoral ring and prevent missed femoral hernia recurrence.',
      source: 'EAES 2026 Multi-Society',
    });

    const lapSubtype = determineLapSubtype(patient, hernia);
    const lapProc = getLaparoscopicProcedureDetail(lapSubtype.subtype);
    const altLichtenstein = getLichtensteinProcedureDetail(patient, hernia);

    return {
      primaryProcedure: lapProc,
      alternativeProcedure: altLichtenstein,
      laparoscopicSubtype: lapSubtype.subtype,
      laparoscopicNuance: lapSubtype.nuance,
      anesthesia: {
        preferred: 'General Anesthesia',
        alternative: 'Endotracheal general anesthesia with muscle relaxation',
        rationale: 'Minimally invasive preperitoneal / transabdominal approach requires general anesthesia.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, lapSubtype.subtype),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Very Low (1-2%)',
        cpipExplanation: 'Posterior plane placement spares anterior sensory nerves (ilioinguinal, iliohypogastric, genital branch).',
        recurrenceRateEstimate: '<1.5% (protects both inguinal and femoral orifices)',
        convalescenceDays: '3-5 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 6. Bilateral Groin Hernia
  if (isBilateral) {
    stepByStepRationale.push('BILATERAL HERNIAS: Laparo-endoscopic repair (TEP/TAPP) is strongly recommended over bilateral open repairs.');
    stepByStepRationale.push('Benefits: Both sides repaired through the exact same 3 port incisions without additional skin incisions; dramatically less postoperative pain, shorter convalescence, and superior patient satisfaction.');

    alerts.push({
      level: 'info',
      title: 'Bilateral Inguinal Hernia: Laparoscopic Priority',
      message: 'HerniaSurge Strong Recommendation: Laparo-endoscopic repair is the gold standard for bilateral groin hernias, eliminating the morbidity of dual open groin cuts.',
      source: 'HerniaSurge 2018/2023',
    });

    const lapSubtype = determineLapSubtype(patient, hernia);
    const lapProc = getLaparoscopicProcedureDetail(lapSubtype.subtype);
    const altLichtenstein = getLichtensteinProcedureDetail(patient, hernia);

    return {
      primaryProcedure: lapProc,
      alternativeProcedure: altLichtenstein,
      laparoscopicSubtype: lapSubtype.subtype,
      laparoscopicNuance: lapSubtype.nuance,
      anesthesia: {
        preferred: 'General Anesthesia',
        alternative: 'General anesthesia with endotracheal tube or LMA',
        rationale: 'Bilateral laparo-endoscopic repair requires general anesthesia.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, lapSubtype.subtype),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Low (1.5-3%)',
        cpipExplanation: 'Significantly lower chronic pain compared to dual anterior Lichtenstein incisions.',
        recurrenceRateEstimate: '<2%',
        convalescenceDays: '4-7 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 7. Recurrent Hernia Principle (Opposite Plane Rule)
  if (isRecurrentAfterOpen) {
    stepByStepRationale.push('RECURRENT AFTER OPEN: Operating through previous anterior scar tissue significantly elevates risk of chronic nerve injury and ischemic orchitis.');
    stepByStepRationale.push('Opposite Plane Rule (HerniaSurge Strong Recommendation): Use posterior laparo-endoscopic repair (TEP or TAPP) through virgin anatomical tissue planes.');

    alerts.push({
      level: 'info',
      title: 'Recurrence after Open: Posterior Laparoscopic Repair Indicated',
      message: 'HerniaSurge Strong Recommendation: Use a posterior approach (TEP/TAPP) to avoid scarred anterior tissue and reduce risk of chronic nerve pain.',
      source: 'Table 1/2/3',
    });

    const lapSubtype = determineLapSubtype(patient, hernia);
    const lapProc = getLaparoscopicProcedureDetail(lapSubtype.subtype);
    const altLichtenstein = getLichtensteinProcedureDetail(patient, hernia);

    return {
      primaryProcedure: lapProc,
      alternativeProcedure: altLichtenstein,
      laparoscopicSubtype: lapSubtype.subtype,
      laparoscopicNuance: lapSubtype.nuance,
      anesthesia: {
        preferred: 'General Anesthesia',
        alternative: 'Endotracheal general anesthesia',
        rationale: 'Posterior preperitoneal dissection requires GA.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, lapSubtype.subtype),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Low (2-4%)',
        cpipExplanation: 'Virgin posterior plane avoids previously sensitized anterior nerves.',
        recurrenceRateEstimate: '2-3%',
        convalescenceDays: '4-7 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  if (isRecurrentAfterLap) {
    stepByStepRationale.push('RECURRENT AFTER LAPAROSCOPIC: Previous preperitoneal dissection and mesh placement makes revision laparoscopy technically hazardous (dense pelvic fibrosis, bladder and vascular adherence).');
    stepByStepRationale.push('Opposite Plane Rule (HerniaSurge Strong Recommendation): Perform Open Lichtenstein anterior mesh repair through pristine anterior planes.');

    alerts.push({
      level: 'info',
      title: 'Recurrence after Laparoscopy: Anterior Open Lichtenstein Indicated',
      message: 'HerniaSurge Strong Recommendation: Anterior open Lichtenstein mesh repair is recommended after failed posterior repair.',
      source: 'HerniaSurge 2018/2023',
    });

    const lichtensteinProc = getLichtensteinProcedureDetail(patient, hernia);
    return {
      primaryProcedure: lichtensteinProc,
      anesthesia: {
        preferred: patient.ageGroup === 'elderly' ? 'Local Infiltration Anesthesia' : 'General or Regional Anesthesia',
        alternative: 'Local anesthesia is feasible and safe',
        rationale: 'Anterior approach allows flexible choice of local, spinal, or general anesthesia.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, 'LICHTENSTEIN'),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Moderate (5-8%)',
        cpipExplanation: 'Re-operative field carries increased risk of sensory branch entrapment; careful nerve identification mandatory.',
        recurrenceRateEstimate: '<3%',
        convalescenceDays: '7-14 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 8. Large Inguinoscrotal Hernias
  if (isScrotalOrLarge) {
    stepByStepRationale.push('LARGE / INGUINOSCROTAL DEFECT (>3cm / extending into scrotum): Table 2 & EAES clinical assumptions note that open repair is safer and more effective.');
    stepByStepRationale.push('Laparoscopic reduction of massive chronic scrotal sacs carries high conversion rates, risk of peritoneal tear, large dead-space seroma, and inadequate mesh coverage.');
    stepByStepRationale.push('Open Mesh Lichtenstein repair allows complete control of the scrotal component, transection of the sac if densely adherent to spermatic cord, and robust flat mesh buttressing.');

    alerts.push({
      level: 'warning',
      title: 'Large Scrotal Hernia: Open Lichtenstein Favored',
      message: 'Per Table 2 & EAES 2026, open repair is more effective and anatomically suited for large/scrotal hernias than laparo-endoscopic repair.',
      source: 'Table 1/2/3',
    });

    const lichtensteinProc = getLichtensteinProcedureDetail(patient, hernia);
    const lapProc = getLaparoscopicProcedureDetail('TAPP');

    return {
      primaryProcedure: lichtensteinProc,
      alternativeProcedure: lapProc,
      laparoscopicSubtype: 'TAPP',
      laparoscopicNuance: 'If laparoscopy is attempted for large scrotal hernia, TAPP is strongly preferred over TEP for wider working space and peritoneal inspection, with transection of the distal sac.',
      anesthesia: {
        preferred: patient.ageGroup === 'elderly' ? 'Local Infiltration Anesthesia' : 'General or Regional Anesthesia',
        alternative: 'General anesthesia',
        rationale: 'Lichtenstein under local anesthesia or GA with nerve block.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, 'LICHTENSTEIN'),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Moderate (4-7%)',
        cpipExplanation: 'Extensive dissection along the cord structures in giant scrotal hernia.',
        recurrenceRateEstimate: '2-4%',
        convalescenceDays: '10-14 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 9. Previous Extraperitoneal Pelvic Surgery (Prostatectomy / Peritoneal Dialysis)
  if (hasPriorExtraperitoneal || hasPeritonealDialysis) {
    stepByStepRationale.push('PRIOR EXTRAPERITONEAL / PELVIC SURGERY: Dissection of the Retzius extraperitoneal space carries significant vascular, bladder, and prosthetic damage risk.');
    stepByStepRationale.push('TEP is strongly NOT RECOMMENDED due to scar obliteration of the preperitoneal space.');
    stepByStepRationale.push('Procedure Choices: Anterior Open Lichtenstein is the safest option. If a minimally invasive approach is strongly desired, TAPP by an experienced surgeon is acceptable, but Open Lichtenstein remains primary recommendation.');

    alerts.push({
      level: 'warning',
      title: 'Prior Extraperitoneal Surgery: Avoid TEP',
      message: 'EAES & HerniaSurge caution: Prior radical prostatectomy, bladder surgery, or pelvic radiation obliterates the preperitoneal plane. Avoid TEP. Choose Open Lichtenstein or experienced TAPP.',
      source: 'EAES 2026 Multi-Society',
    });

    const lichtensteinProc = getLichtensteinProcedureDetail(patient, hernia);
    const tappProc = getLaparoscopicProcedureDetail('TAPP');

    return {
      primaryProcedure: lichtensteinProc,
      alternativeProcedure: tappProc,
      laparoscopicSubtype: 'TAPP',
      laparoscopicNuance: 'TEP is contraindicated due to preperitoneal scarring. TAPP allows direct intra-abdominal visualization of scarred planes, bladder margin, and safe preperitoneal flap creation.',
      anesthesia: {
        preferred: patient.ageGroup === 'elderly' ? 'Local Infiltration Anesthesia' : 'General or Regional Anesthesia',
        alternative: 'General anesthesia for TAPP',
        rationale: 'Local infiltration for open Lichtenstein eliminates cardiopulmonary risks.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, 'LICHTENSTEIN'),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Low-Moderate (3-5%)',
        cpipExplanation: 'Anterior dissection avoids scarred pelvic nerve plexus.',
        recurrenceRateEstimate: '<2%',
        convalescenceDays: '7-10 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // 10. Prior Lower Midline Surgery (Scarring)
  if (hasPriorLowerMidline) {
    stepByStepRationale.push('Prior lower abdominal midline surgery introduces subcutaneous and anterior rectus sheath scarring.');
    stepByStepRationale.push('Table 1 note: "Previous Lower Abdominal Surgery: Yes = Open is safer". However, if laparoscopic is chosen, TAPP is preferred over TEP because TAPP enters away from midline adhesions via lateral umbilical trocars.');
    alerts.push({
      level: 'info',
      title: 'Previous Lower Abdominal Incision',
      message: 'Table 1 highlights that Open is safer when extensive lower abdominal scarring exists. If laparoscopic approach is preferred, TAPP is superior to TEP.',
      source: 'Table 1/2/3',
    });
  }

  // 11. Elderly Patient (>65) Considerations
  if (patient.ageGroup === 'elderly' || patient.exactAge >= 65) {
    alerts.push({
      level: 'info',
      title: 'Elderly Patient (>=65 yr): Local Anesthesia Advantage',
      message: 'HerniaSurge Strong Recommendation: Open Lichtenstein under local anesthesia is superior to spinal anesthesia in patients >=65 due to lower rates of urinary retention, hypotension, and cardiac complications.',
      source: 'HerniaSurge 2018/2023',
    });
  }

  // 12. Obese Patient (BMI >= 30) Considerations
  if (isObese) {
    alerts.push({
      level: 'info',
      title: 'Obesity (BMI >= 30): Laparoscopic Benefits',
      message: 'Table 1 confirms laparoscopic repair is superior in obese patients due to lower wound infection and faster recovery. ' + (isSevereObese ? 'EAES 2026 notes for BMI >= 35, technical difficulty increases and surgical expertise is required.' : ''),
      source: 'Table 1/2/3',
    });
  }

  // 13. Active Worker / Athlete Considerations
  if (isAthleticOrWorker) {
    alerts.push({
      level: 'info',
      title: 'High Physical Activity / Athletic Profile',
      message: 'Table 1 notes heavy workers and athletes gain maximal benefit from laparo-endoscopic repair due to early return to full physical load (3-5 days vs 2-3 weeks in open).',
      source: 'Table 1/2/3',
    });
  }

  // 14. Standard Primary Unilateral Groin Hernia (Male, Adult, Fit for GA)
  // HerniaSurge 2023 & EAES 2026 recommend Laparo-endoscopic (TEP or TAPP) or Open Lichtenstein based on expertise and patient tailoring.
  // When active or obese, laparo-endoscopic is distinctly favored.
  // When elderly or low resource, Lichtenstein is favored.
  const favorLap = isAthleticOrWorker || isObese || isFemoral;

  if (favorLap) {
    stepByStepRationale.push('Young active athlete / heavy manual worker or obese patient profile.');
    stepByStepRationale.push('HerniaSurge & Table 1 Recommendation: Laparo-endoscopic repair (TEP/TAPP) delivers significantly faster recovery times (return to unrestricted activity in 3-5 days), reduced wound infection risk in high BMI, and significantly lower chronic postoperative inguinal pain (CPIP 1-2% vs 5-10%).');
    
    const lapSubtype = determineLapSubtype(patient, hernia);
    const lapProc = getLaparoscopicProcedureDetail(lapSubtype.subtype);
    const lichtensteinProc = getLichtensteinProcedureDetail(patient, hernia);

    return {
      primaryProcedure: lapProc,
      alternativeProcedure: lichtensteinProc,
      laparoscopicSubtype: lapSubtype.subtype,
      laparoscopicNuance: lapSubtype.nuance,
      anesthesia: {
        preferred: 'General Anesthesia',
        alternative: 'Endotracheal tube or LMA',
        rationale: 'Laparo-endoscopic procedures require general anesthesia and pneumoperitoneum.',
      },
      mesh: getMeshSpecs(false, hernia),
      fixation: getFixationStrategy(hernia, lapSubtype.subtype),
      alerts,
      stepByStepRationale,
      evidenceScorecard: {
        cpipRiskScore: 'Very Low (1-2%)',
        cpipExplanation: 'Placement of mesh behind abdominal wall avoids cutaneous groin nerve injury.',
        recurrenceRateEstimate: '<1.5% with adequate surgeon caseload',
        convalescenceDays: '3-5 days',
        daySurgerySuitability: 'Recommended Day Surgery',
      },
      ehsClassificationCode: computeEHSClassification(hernia),
    };
  }

  // Default balanced case: Open Lichtenstein (Gold Standard Anterior Mesh) or Laparoscopic (TEP/TAPP)
  stepByStepRationale.push('Primary Unilateral Groin Hernia: Both Open Lichtenstein and Laparo-endoscopic (TEP/TAPP) are proven first-line options.');
  stepByStepRationale.push('Open Mesh Lichtenstein remains the global Gold Standard anterior repair: easy to master, reproducible, low recurrence (<1.5%), can be performed under local anesthesia with minimal equipment.');
  stepByStepRationale.push('Laparo-endoscopic (TEP/TAPP) is an equally valid alternative if the surgeon has completed the learning curve (>100 cases) and general anesthesia is agreed upon.');

  const lichtensteinProc = getLichtensteinProcedureDetail(patient, hernia);
  const lapSubtype = determineLapSubtype(patient, hernia);
  const lapProc = getLaparoscopicProcedureDetail(lapSubtype.subtype);

  return {
    primaryProcedure: lichtensteinProc,
    alternativeProcedure: lapProc,
    laparoscopicSubtype: lapSubtype.subtype,
    laparoscopicNuance: lapSubtype.nuance,
    anesthesia: {
      preferred: patient.ageGroup === 'elderly' ? 'Local Infiltration Anesthesia' : 'Local Infiltration Anesthesia or General Anesthesia',
      alternative: 'Spinal regional anesthesia (note higher urinary retention risk)',
      rationale: 'Lichtenstein under local infiltration provides outstanding safety, low cost, zero anesthesia hangover, and same-day discharge within 2 hours.',
    },
    mesh: getMeshSpecs(false, hernia),
    fixation: getFixationStrategy(hernia, 'LICHTENSTEIN'),
    alerts,
    stepByStepRationale,
    evidenceScorecard: {
      cpipRiskScore: 'Low-Moderate (3-5%)',
      cpipExplanation: 'Requires identification and preservation of the ilioinguinal, iliohypogastric, and genital nerves.',
      recurrenceRateEstimate: '<1.5%',
      convalescenceDays: '7-10 days',
      daySurgerySuitability: 'Recommended Day Surgery',
    },
    ehsClassificationCode: computeEHSClassification(hernia),
  };
}

function determineLapSubtype(patient: PatientCriteria, hernia: HerniaCriteria): { subtype: 'TEP' | 'TAPP'; nuance: string } {
  if (patient.priorSurgery === 'extraperitoneal_prostatectomy' || patient.priorSurgery === 'peritoneal_dialysis') {
    return {
      subtype: 'TAPP',
      nuance: 'TAPP is mandatory because extraperitoneal scarring from prostatectomy/pelvic surgery makes TEP balloon expansion impossible or dangerous.',
    };
  }
  if (patient.priorSurgery === 'lower_midline_open') {
    return {
      subtype: 'TAPP',
      nuance: 'TAPP is preferred over TEP to introduce ports lateral to previous midline abdominal adhesions.',
    };
  }
  if (hernia.anatomy === 'femoral' || patient.sex === 'female') {
    return {
      subtype: 'TAPP',
      nuance: 'TAPP facilitates excellent direct inspection of the contralateral groin and deep femoral ring, and allows round ligament management.',
    };
  }
  if (hernia.defectSize === 'large' || hernia.defectSize === 'scrotal') {
    return {
      subtype: 'TAPP',
      nuance: 'TAPP provides a larger working envelope and superior visualization for reducing large scrotal contents compared to the confined TEP balloon space.',
    };
  }
  // Standard elective:
  return {
    subtype: 'TEP',
    nuance: 'TEP remains entirely extraperitoneal, avoiding entering the peritoneal cavity, minimizing visceral injury risk and zero trocar site bowel herniation.',
  };
}

function getLichtensteinProcedureDetail(patient: PatientCriteria, hernia: HerniaCriteria): ProcedureDetail {
  return {
    code: 'LICHTENSTEIN',
    name: 'Open Lichtenstein Mesh Repair (Gold Standard)',
    category: 'Open Mesh (Anterior)',
    summary: 'Tension-free anterior reinforcement of the inguinal canal floor using a flat, large-pore polypropylene mesh sutured to the inguinal ligament and conjoint tendon.',
    keyBenefits: [
      'Gold standard anterior repair with decades of proven long-term durability',
      'Can be performed safely under Local Infiltration Anesthesia',
      'Ideal for elderly, frail patients, or those with GA contraindications',
      'Minimal technical learning curve compared to laparoscopic procedures (~25-50 cases vs >100 cases)',
      'Highly cost-effective in low-resource settings with low disposables',
    ],
    keyRisks: [
      'Chronic Postoperative Inguinal Pain (CPIP) if sensory nerves are sutured or trapped (10-12% baseline if nerves not recognized)',
      'Slightly longer convalescence (7-14 days) than laparo-endoscopic repair',
      'Superficial wound hematoma or surgical site infection in high BMI patients',
    ],
    evidenceLevel: 'Strong Recommendation (GRADE Level 1)',
    techniqueHighlights: [
      'Oblique skin crease incision 2cm above and parallel to inguinal ligament',
      'Systematic identification and preservation of the three nerves: iliohypogastric, ilioinguinal, and genital branch',
      'Mesh size: minimum 7 x 15 cm flat monofilament large-pore mesh',
      'Medial overlap: mesh must overlap the pubic tubercle by 1.5 - 2 cm and be secured to the anterior rectus sheath',
      'Tension-free fixation: continuous or interrupted absorbable/non-absorbable sutures, avoiding nerve entrapment',
    ],
  };
}

function getLaparoscopicProcedureDetail(subtype: 'TEP' | 'TAPP'): ProcedureDetail {
  if (subtype === 'TEP') {
    return {
      code: 'TEP',
      name: 'Laparoscopic TEP (Totally Extra-Peritoneal) Repair',
      category: 'Laparo-Endoscopic (Posterior)',
      summary: 'Minimally invasive preperitoneal mesh placement completely outside the peritoneal cavity using a balloon dissection in the space of Retzius and Bogros.',
      keyBenefits: [
        'Peritoneum is not violated: zero risk of intra-abdominal adhesions or trocar bowel herniation',
        'Lower acute postoperative pain and significantly lower chronic pain (CPIP <2%)',
        'Rapid convalescence: return to full work and athletic activity in 3-5 days',
        'Single access for both groins in bilateral hernias without new incisions',
        'Superior cosmetic results with three small puncture wounds',
      ],
      keyRisks: [
        'Steep learning curve (>100 mentored cases needed for proficiency)',
        'Peritoneal perforation during dissection may obscure preperitoneal space (requires Veress needle / venting or conversion to TAPP)',
        'Requires General Endotracheal Anesthesia',
        'Not recommended in prior prostatectomy, pelvic radiation, or large scrotal hernias',
      ],
      evidenceLevel: 'Strong Recommendation (GRADE Level 1)',
      techniqueHighlights: [
        'Subumbilical incision into the anterior rectus sheath down to posterior sheath',
        'Space creation with optical or balloon trocar towards the pubic symphysis',
        'Two 5mm midline working ports placed under direct visualization',
        'Complete parietalization of the spermatic cord and reduction of indirect/direct sacs',
        'Large prosthetic mesh (minimum 10 x 15 cm) covering myopectineal orifice without wrinkles',
      ],
    };
  }

  return {
    code: 'TAPP',
    name: 'Laparoscopic TAPP (Trans-Abdominal Pre-Peritoneal) Repair',
    category: 'Laparo-Endoscopic (Posterior)',
    summary: 'Minimally invasive approach entering the abdominal cavity, creating a peritoneal flap above the hernia defect, placing a large preperitoneal mesh, and closing the peritoneum.',
    keyBenefits: [
      'Wide anatomic visualization of the entire pelvic floor and deep inguinal rings',
      'Permits thorough inspection of contralateral groin (detects occult bilateral hernias in up to 15-20%)',
      'Ideal for difficult anatomy, females (rules out femoral hernia), previous lower abdominal surgery, or large hernias',
      'Significantly lower chronic pain (CPIP <2%) and fast recovery (3-5 days)',
    ],
    keyRisks: [
      'Peritoneal cavity entered: tiny risk of bowel/vascular trocar injury (<0.1%)',
      'Requires meticulous peritoneal flap closure (sutured or tacks) to prevent bowel entrapment',
      'Requires General Anesthesia with muscle relaxation',
      'Higher disposable instrument costs',
    ],
    evidenceLevel: 'Strong Recommendation (GRADE Level 1)',
    techniqueHighlights: [
      'Umbilical port for 30-degree laparoscope + two bilateral 5mm working ports at midclavicular line',
      'Peritoneal incision from anterior superior iliac spine (ASIS) to medial umbilical fold, 2-3 cm above defect',
      'Dissection of Cooper ligament, pubic tubercle, and cord parietalization',
      'Large mesh (minimum 10 x 15 cm) covering direct, indirect, and femoral spaces',
      'Peritoneal flap re-approximated with continuous barbed suture or atraumatic glue',
    ],
  };
}

function getShouldiceProcedureDetail(): ProcedureDetail {
  return {
    code: 'SHOULDICE',
    name: 'Open Shouldice Repair (Gold Standard Non-Mesh Tissue Repair)',
    category: 'Open Non-Mesh (Tissue)',
    summary: 'Anatomical multi-layer pure tissue repair incising the transversalis fascia and reconstructing the posterior inguinal canal wall in 4 continuous overlapping layers.',
    keyBenefits: [
      'Zero prosthetic foreign material (no mesh contracture, erosion, or mesh sepsis)',
      'HerniaSurge Strong Recommendation as the best non-mesh tissue repair technique',
      'Essential skill in contaminated/infected fields, strangulated bowel resection, or patient mesh refusal',
      'Can be performed under local, regional, or general anesthesia',
    ],
    keyRisks: [
      'Higher recurrence rate in general surgical hands (4-8% vs <1-2% for mesh)',
      'Higher early tension and acute postoperative pain compared to Lichtenstein',
      'Demanding surgical technique requiring exact anatomical reconstruction',
    ],
    evidenceLevel: 'Strong Recommendation (GRADE Level 1 for non-mesh indications)',
    techniqueHighlights: [
      'Complete opening of the inguinal canal and isolation of cord structures and nerves',
      'Division and ligation of cremasteric muscle fibers to clearly expose posterior wall',
      'Longitudinal incision of the transversalis fascia from internal ring to pubic tubercle',
      'Four continuous suture lines (traditionally 34-gauge monofilament stainless steel wire or 2-0 polypropylene)',
      'Reconstruction of a snug internal ring calibrated to allow cord vascularity without compression',
    ],
  };
}

function getMeshSpecs(refusesMesh: boolean, hernia: HerniaCriteria): MeshRecommendation {
  if (refusesMesh) {
    return {
      type: 'No Mesh Used',
      specifications: 'Patient refusal / tissue repair indicated.',
      warnings: ['Pure autologous tissue repair chosen.'],
    };
  }

  return {
    type: 'Monofilament Macroporous Synthetic Flat Mesh (Polypropylene / Polyester)',
    specifications: 'Large-pore (>1.0 - 1.5 mm), monofilament synthetic flat mesh with minimum burst strength >16 N/cm². Dimensions: min 7 x 15 cm for Lichtenstein; min 10 x 15 cm for TEP/TAPP.',
    warnings: [
      'Do NOT use 3D implants (plug-and-patch or bilayer devices) - HerniaSurge strongly advises against due to chronic pain, excessive foreign material, and erosion risk.',
      'Do NOT select mesh on weight alone; avoid ultra-low-weight mesh in large direct defects (EHS M2/M3) due to increased recurrence.',
    ],
  };
}

function getFixationStrategy(hernia: HerniaCriteria, procedure: 'LICHTENSTEIN' | 'TEP' | 'TAPP'): FixationRecommendation {
  if (procedure === 'LICHTENSTEIN') {
    return {
      needed: true,
      type: 'Atraumatic / Low-tension Suture or Fibrin Glue',
      rationale: 'Secure lower edge to inguinal ligament with continuous monofilament or atraumatic glue. Never place deep penetrating sutures in the pubic tubercle periosteum or lateral to the internal ring (prevents chronic osteitis pubis and ilioinguinal nerve entrapment).',
    };
  }

  // Laparoscopic
  const isLargeDirect = hernia.anatomy === 'direct' && (hernia.defectSize === 'large' || hernia.defectSize === 'medium');
  if (isLargeDirect) {
    return {
      needed: true,
      type: 'Atraumatic Fibrin Glue or Self-Fixating Mesh (Avoid penetrating metallic tacks)',
      rationale: 'HerniaSurge Strong Recommendation: Large direct defects (EHS M3) require fixation to prevent mesh inversion into the defect. Glue or atraumatic fixation is preferred to avoid traumatic nerve entrapment in the Triangle of Doom / Triangle of Pain.',
    };
  }

  return {
    needed: false,
    type: 'No Fixation Needed (Routine TEP/TAPP)',
    rationale: 'HerniaSurge Strong Recommendation: In routine laparo-endoscopic repair of indirect and small/medium defects, NO fixation is needed when an appropriately sized mesh (>10 x 15 cm) is well-spread. Eliminates tacker-induced nerve injury and chronic pain.',
  };
}
