export interface GuidelineTableItem {
  criteria: string;
  options: string;
  impact: string;
  clinicalNote: string;
}

export interface SurgicalChoiceItem {
  method: string;
  whenToChoose: string;
  rationale: string;
  evidenceStrength: string;
}

export const table1PatientCriteria: GuidelineTableItem[] = [
  {
    criteria: 'Age',
    options: 'Child / Adult / Elderly',
    impact: 'Child = No mesh (Herniotomy). Elderly = Open under local anesthesia',
    clinicalNote: 'Pediatric hernias require simple sac high ligation. In elderly frail individuals, local anesthesia avoids respiratory depression and urinary retention.',
  },
  {
    criteria: 'Sex',
    options: 'Male / Female',
    impact: 'Female = Laparoscopic better (TEP / TAPP)',
    clinicalNote: 'Women have a significantly higher rate of occult femoral hernias (up to 15x). Anterior open repairs frequently miss the femoral orifice, causing early recurrences with high risk of strangulation.',
  },
  {
    criteria: 'BMI',
    options: 'Normal / Obese',
    impact: 'Obese = Laparoscopic better',
    clinicalNote: 'Minimally invasive repair avoids thick subcutaneous wound incisions, reducing surgical site infections (SSI) and wound complications. (EAES 2026 notes for BMI ≥35, lap requires advanced expertise).',
  },
  {
    criteria: 'Anesthesia Fitness',
    options: 'Fit for General / Not fit',
    impact: 'Not fit = Only Open under Local',
    clinicalNote: 'Laparoscopy requires general endotracheal anesthesia and CO2 pneumoperitoneum. Patients with severe cardiopulmonary compromise must undergo open anterior repair under local infiltration.',
  },
  {
    criteria: 'Activity Level',
    options: 'Heavy worker / Athlete / Sedentary',
    impact: 'Heavy worker / Athlete = Laparoscopic for fast recovery',
    clinicalNote: 'Minimally invasive posterior repair reduces acute postoperative pain and enables return to heavy physical labor / sports within 3–7 days (versus 2–3 weeks for open).',
  },
  {
    criteria: 'Previous Lower Abdominal Surgery',
    options: 'Yes / No',
    impact: 'Yes = Open is safer (or TAPP over TEP)',
    clinicalNote: 'Previous lower midline laparotomy or radical prostatectomy obliterates the Retzius space, creating dangerous adhesions for TEP. Open Lichtenstein or transabdominal TAPP avoids blinded dissection.',
  },
];

export const table2HerniaCriteria: GuidelineTableItem[] = [
  {
    criteria: 'Side',
    options: 'Unilateral / Bilateral',
    impact: 'Bilateral = Laparoscopic',
    clinicalNote: 'Laparo-endoscopic repair treats both groins through the exact same 3 small punctures with no additional skin cuts and significantly lower cumulative pain.',
  },
  {
    criteria: 'Type',
    options: 'Primary / Recurrent',
    impact: 'Recurrent after Open = Laparoscopic. Recurrent after Lap = Open',
    clinicalNote: 'The Opposite Plane Principle: Avoid scarred re-operative fields to prevent sensory nerve entrapment, ischemic orchitis, and recurrent tissue failure.',
  },
  {
    criteria: 'Size',
    options: 'Small <1.5cm / Medium / Large >3cm',
    impact: 'Large / Scrotal = Open',
    clinicalNote: 'Massive inguinoscrotal hernias have high peritoneal tear risk and poor visualization during laparoscopy. Open Lichtenstein allows controlled sac division and direct floor buttressing.',
  },
  {
    criteria: 'Status',
    options: 'Reducible / Incarcerated / Strangulated',
    impact: 'Strangulated = Emergency Open, No Laparoscopic',
    clinicalNote: 'Suspected bowel gangrene mandates urgent open exploration. If bowel resection is required or contamination exists, avoid permanent synthetic mesh (perform Shouldice).',
  },
  {
    criteria: 'Type Anatomy',
    options: 'Indirect / Direct / Femoral',
    impact: 'Femoral = Laparoscopic',
    clinicalNote: 'Laparoscopic posterior mesh covers the entire Myopectineal Orifice of Fruchaud (including the deep femoral canal), preventing femoral recurrence.',
  },
];

export const table3SurgicalMethodChoice: SurgicalChoiceItem[] = [
  {
    method: 'Open Mesh – Lichtenstein – Gold Standard',
    whenToChoose: "First time, Unilateral, Large hernia, Emergency, Can't have General anesthesia, Low cost needed",
    rationale: 'Established worldwide gold standard for anterior repair. High reproducibility, lowest learning curve (~25 cases), feasible under local infiltration anesthesia, and low material cost.',
    evidenceStrength: 'Strong Recommendation (GRADE Level 1)',
  },
  {
    method: 'Laparoscopic – TEP / TAPP',
    whenToChoose: 'Bilateral, Recurrent after open, Female, Obese, Young active patient',
    rationale: 'Posterior preperitoneal mesh placement behind muscular wall. Minimal acute pain, lowest chronic pain (CPIP <2%), covers femoral ring, and facilitates 3-5 day return to normal activity.',
    evidenceStrength: 'Strong Recommendation (GRADE Level 1)',
  },
  {
    method: 'Open Non-Mesh – Shouldice / Herniotomy',
    whenToChoose: 'Children, Infected / Strangulated bowel field where mesh is dangerous, Patient refuses mesh',
    rationale: 'Autologous 4-layer continuous reconstruction (Shouldice) or pediatric sac high ligation (Herniotomy). Zero foreign body risk when prosthetic mesh is unsafe or refused.',
    evidenceStrength: 'Strong Recommendation for non-mesh indications',
  },
];

export const pdfDocuments = [
  {
    id: 'table1-2-3',
    title: 'Table 1, 2, 3 Criteria Reference',
    filename: 'TABLE_1_1__1__9e1397ef.pdf',
    path: '/assets/aistudio/TABLE_1_1__1__9e1397ef.pdf',
    description: 'Patient-Related Criteria, Hernia-Related Criteria, and Surgical Method Choice decision matrix.',
  },
  {
    id: 'eaes-2026',
    title: 'EAES Clinical Practice Guidelines 2026',
    filename: 'EAES_clinical_practice_guidelines_2026_7606ffca.pdf',
    path: '/assets/aistudio/EAES_clinical_practice_guidelines_2026_7606ffca.pdf',
    description: 'Multi-society recommendations (EAES, EHS, SAGES) covering elective repair, TEP vs TAPP, subgroup analyses (females, BMI ≥35, scrotal, prior extraperitoneal surgery), and GRADE evidence.',
  },
  {
    id: 'herniasurge-ehs',
    title: 'HerniaSurge & EHS International Guidelines',
    filename: 'Groin_ENG_cov13178_ehs_groin_hernia_management_a5_en_10_lr_1_b05a57f7.pdf',
    path: '/assets/aistudio/Groin_ENG_cov13178_ehs_groin_hernia_management_a5_en_10_lr_1_b05a57f7.pdf',
    description: 'International guidelines for groin hernia management: individualization of care, mesh specifications, fixation guidelines, chronic pain prevention, and day surgery recommendations.',
  },
];
