export type AgeGroup = 'child' | 'adult' | 'elderly';
export type BiologicalSex = 'male' | 'female';
export type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese' | 'severe_obese';
export type AnesthesiaFitness = 'fit_general' | 'unfit_general';
export type ActivityLevel = 'heavy_worker_athlete' | 'moderate' | 'sedentary';
export type PriorSurgery = 'none' | 'lower_midline_open' | 'extraperitoneal_prostatectomy' | 'peritoneal_dialysis';
export type MeshPreference = 'accepts_mesh' | 'refuses_mesh';

export type HerniaSide = 'unilateral_right' | 'unilateral_left' | 'bilateral';
export type HerniaPresentation = 'primary' | 'recurrent_after_open' | 'recurrent_after_lap' | 'recurrent_multi';
export type HerniaDefectSize = 'small' | 'medium' | 'large' | 'scrotal'; // small <1.5cm, medium 1.5-3cm, large >3cm, scrotal
export type HerniaStatus = 'reducible' | 'incarcerated' | 'strangulated';
export type HerniaAnatomy = 'indirect' | 'direct' | 'femoral' | 'combined_pantaloon';
export type SymptomSeverity = 'asymptomatic' | 'mildly_symptomatic' | 'moderately_symptomatic' | 'severely_painful';

export interface PatientCriteria {
  ageGroup: AgeGroup;
  exactAge: number;
  sex: BiologicalSex;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: BmiCategory;
  anesthesiaFitness: AnesthesiaFitness;
  activityLevel: ActivityLevel;
  priorSurgery: PriorSurgery;
  meshPreference: MeshPreference;
  lowResourceSetting: boolean;
}

export interface HerniaCriteria {
  side: HerniaSide;
  presentation: HerniaPresentation;
  defectSize: HerniaDefectSize;
  status: HerniaStatus;
  anatomy: HerniaAnatomy;
  symptomSeverity: SymptomSeverity;
}

export type ProcedureCode = 'LICHTENSTEIN' | 'TEP' | 'TAPP' | 'SHOULDICE' | 'HERNIOTOMY' | 'EMERGENCY_OPEN_RESECTION';

export interface ProcedureDetail {
  code: ProcedureCode;
  name: string;
  category: 'Open Mesh (Anterior)' | 'Laparo-Endoscopic (Posterior)' | 'Open Non-Mesh (Tissue)' | 'Pediatric Herniotomy' | 'Emergency Exploration';
  summary: string;
  keyBenefits: string[];
  keyRisks: string[];
  evidenceLevel:
    | 'Strong Recommendation (GRADE Level 1)'
    | 'Moderate Recommendation (GRADE Level 2)'
    | 'Conditional / Tailored'
    | 'Strong Recommendation (GRADE Level 1 for non-mesh indications)';
  techniqueHighlights: string[];
}

export interface AnesthesiaDetail {
  preferred:
    | 'Local Infiltration Anesthesia'
    | 'General Anesthesia'
    | 'General or Regional Anesthesia'
    | 'Local Infiltration Anesthesia or General Anesthesia';
  alternative: string;
  rationale: string;
}

export interface MeshRecommendation {
  type: string;
  specifications: string;
  warnings: string[];
}

export interface FixationRecommendation {
  needed: boolean;
  type: string;
  rationale: string;
}

export interface ClinicalAlert {
  level: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  source: 'Table 1/2/3' | 'HerniaSurge 2018/2023' | 'EAES 2026 Multi-Society';
}

export interface RecommendationResult {
  primaryProcedure: ProcedureDetail;
  alternativeProcedure?: ProcedureDetail;
  laparoscopicSubtype?: 'TEP' | 'TAPP' | 'TEP or TAPP (Surgeon Discretion)';
  laparoscopicNuance?: string;
  anesthesia: AnesthesiaDetail;
  mesh: MeshRecommendation;
  fixation: FixationRecommendation;
  alerts: ClinicalAlert[];
  stepByStepRationale: string[];
  evidenceScorecard: {
    cpipRiskScore: string; // Chronic Postoperative Inguinal Pain
    cpipExplanation: string;
    recurrenceRateEstimate: string;
    convalescenceDays: string;
    daySurgerySuitability: 'Recommended Day Surgery' | 'Inpatient Monitoring Advised';
  };
  ehsClassificationCode: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  tagline: string;
  patientCriteria: PatientCriteria;
  herniaCriteria: HerniaCriteria;
  expectedOutcome: string;
  clinicalPearls: string;
}
