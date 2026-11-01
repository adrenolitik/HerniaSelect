import React, { useState, useId } from 'react';
import {
  PatientCriteria,
  HerniaCriteria,
  RecommendationResult,
  AgeGroup,
  BiologicalSex,
  AnesthesiaFitness,
  ActivityLevel,
  PriorSurgery,
  MeshPreference,
  HerniaSide,
  HerniaPresentation,
  HerniaDefectSize,
  HerniaStatus,
  HerniaAnatomy,
  SymptomSeverity,
} from '../types/hernia';
import { calculateBMI } from '../utils/decisionEngine';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  HeartPulse,
  Scale,
  Clock,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface CalculatorTabProps {
  patient: PatientCriteria;
  setPatient: React.Dispatch<React.SetStateAction<PatientCriteria>>;
  hernia: HerniaCriteria;
  setHernia: React.Dispatch<React.SetStateAction<HerniaCriteria>>;
  result: RecommendationResult;
  onSelectTab: (tab: 'calculator' | 'matrix' | 'guidelines' | 'cases' | 'sources') => void;
}

export const CalculatorTab: React.FC<CalculatorTabProps> = ({
  patient,
  setPatient,
  hernia,
  setHernia,
  result,
  onSelectTab,
}) => {
  const [showTepVsTapp, setShowTepVsTapp] = useState(false);
  const ageInputId = useId();
  const heightInputId = useId();
  const weightInputId = useId();

  const handleAgeChange = (val: number) => {
    let group: AgeGroup = 'adult';
    if (val < 18) group = 'child';
    else if (val >= 65) group = 'elderly';
    setPatient((prev) => ({ ...prev, exactAge: val, ageGroup: group }));
  };

  const handleHeightWeightChange = (height: number, weight: number) => {
    const { bmi, category } = calculateBMI(weight, height);
    setPatient((prev) => ({
      ...prev,
      heightCm: height,
      weightKg: weight,
      bmi,
      bmiCategory: category,
    }));
  };

  const handleResetToDefault = () => {
    setPatient({
      ageGroup: 'adult',
      exactAge: 45,
      sex: 'male',
      heightCm: 175,
      weightKg: 75,
      bmi: 24.5,
      bmiCategory: 'normal',
      anesthesiaFitness: 'fit_general',
      activityLevel: 'moderate',
      priorSurgery: 'none',
      meshPreference: 'accepts_mesh',
      lowResourceSetting: false,
    });
    setHernia({
      side: 'unilateral_right',
      presentation: 'primary',
      defectSize: 'medium',
      status: 'reducible',
      anatomy: 'indirect',
      symptomSeverity: 'moderately_symptomatic',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider uppercase text-teal-700 dark:text-teal-400 font-mono">
              Clinical Decision Engine
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              HerniaSurge & EAES 2026 Multidisciplinary Framework
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Inguinal Hernia Surgical Technique & Approach Selection
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleResetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Inputs</span>
          </button>
          <button
            onClick={() => onSelectTab('cases')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Load Preset Vignettes</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2 Columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Section 1: Patient-Related Criteria (Table 1) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Table 1: Patient-Related Criteria
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Patient Factors</span>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={ageInputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Patient Age
                </label>
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{patient.exactAge}</span>
                  <span className="text-slate-500">years</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-teal-700 dark:text-teal-400 capitalize">{patient.ageGroup}</span>
                </div>
              </div>
              <input
                id={ageInputId}
                type="range"
                min={1}
                max={95}
                value={patient.exactAge}
                onChange={(e) => handleAgeChange(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Child (&lt;18)</span>
                <span>Adult (18–64)</span>
                <span>Elderly (≥65)</span>
              </div>
            </div>

            {/* Biological Sex */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Biological Sex
                </label>
                {patient.sex === 'female' && (
                  <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                    High femoral hernia risk
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPatient((p) => ({ ...p, sex: 'male' }))}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    patient.sex === 'male'
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-800 dark:text-teal-300 shadow-2xs'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setPatient((p) => ({ ...p, sex: 'female' }))}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    patient.sex === 'female'
                      ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 shadow-2xs'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  Female (EAES Lap Favored)
                </button>
              </div>
            </div>

            {/* BMI Calculator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  BMI & Body Habitus
                </label>
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{patient.bmi}</span>
                  <span className="text-slate-500">kg/m²</span>
                  <span className="text-slate-400">·</span>
                  <span className={`capitalize ${patient.bmi >= 30 ? 'text-amber-600 font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
                    {patient.bmiCategory.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label htmlFor={heightInputId} className="text-[11px] text-slate-500 dark:text-slate-400">Height (cm)</label>
                  <input
                    id={heightInputId}
                    type="number"
                    min={60}
                    max={220}
                    value={patient.heightCm}
                    onChange={(e) => handleHeightWeightChange(parseInt(e.target.value, 10) || 170, patient.weightKg)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:border-teal-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor={weightInputId} className="text-[11px] text-slate-500 dark:text-slate-400">Weight (kg)</label>
                  <input
                    id={weightInputId}
                    type="number"
                    min={10}
                    max={250}
                    value={patient.weightKg}
                    onChange={(e) => handleHeightWeightChange(patient.heightCm, parseInt(e.target.value, 10) || 70)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Anesthesia Fitness */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Anesthesia Fitness & ASA Physical Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPatient((p) => ({ ...p, anesthesiaFitness: 'fit_general' }))}
                  className={`p-2.5 text-left rounded-lg border transition-all cursor-pointer ${
                    patient.anesthesiaFitness === 'fit_general'
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold block">Fit for General (GA)</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    ASA I–II / Controlled comorbidities
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPatient((p) => ({ ...p, anesthesiaFitness: 'unfit_general' }))}
                  className={`p-2.5 text-left rounded-lg border transition-all cursor-pointer ${
                    patient.anesthesiaFitness === 'unfit_general'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-600 text-amber-900 dark:text-amber-200'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs font-semibold block">Unfit for GA (High Risk)</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                    ASA III–IV / Severe cardiopulmonary
                  </span>
                </button>
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Patient Activity Level & Occupation
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'heavy_worker_athlete', label: 'Heavy / Athlete', desc: 'Fast recovery priority' },
                  { key: 'moderate', label: 'Moderate', desc: 'Standard ambulation' },
                  { key: 'sedentary', label: 'Sedentary', desc: 'Low functional demand' },
                ].map((act) => (
                  <button
                    key={act.key}
                    type="button"
                    onClick={() => setPatient((p) => ({ ...p, activityLevel: act.key as ActivityLevel }))}
                    className={`p-2 text-center rounded-lg border transition-all cursor-pointer ${
                      patient.activityLevel === act.key
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-semibold block">{act.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{act.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Previous Lower Abdominal / Pelvic Surgery */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Previous Lower Abdominal / Pelvic History
              </label>
              <select
                value={patient.priorSurgery}
                onChange={(e) => setPatient((p) => ({ ...p, priorSurgery: e.target.value as PriorSurgery }))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:border-teal-500 focus:outline-none"
              >
                <option value="none">None (Virgin Lower Abdomen / Groin)</option>
                <option value="lower_midline_open">Previous Lower Midline Laparotomy</option>
                <option value="extraperitoneal_prostatectomy">Previous Radical Prostatectomy / Pelvic Radiation (Avoid TEP)</option>
                <option value="peritoneal_dialysis">Peritoneal Dialysis Patient</option>
              </select>
            </div>

            {/* Mesh Preference */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Prosthetic Mesh Acceptance
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPatient((p) => ({ ...p, meshPreference: 'accepts_mesh' }))}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    patient.meshPreference === 'accepts_mesh'
                      ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-800 dark:text-teal-300'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Accepts Mesh (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setPatient((p) => ({ ...p, meshPreference: 'refuses_mesh' }))}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    patient.meshPreference === 'refuses_mesh'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-600 text-amber-800 dark:text-amber-300'
                      : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Refuses Mesh (Shouldice)
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Hernia-Related Criteria (Table 2) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Table 2: Hernia-Related Criteria
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Hernia Anatomy</span>
            </div>

            {/* Side */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Hernia Laterality / Side
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'unilateral_right', label: 'Right Unilateral' },
                  { key: 'unilateral_left', label: 'Left Unilateral' },
                  { key: 'bilateral', label: 'Bilateral (Lap Priority)' },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setHernia((h) => ({ ...h, side: s.key as HerniaSide }))}
                    className={`py-2 px-2 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      hernia.side === s.key
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Presentation: Primary vs Recurrent */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Presentation: Primary vs Recurrence
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'primary', label: 'Primary Hernia' },
                  { key: 'recurrent_after_open', label: 'Recurrent after Open (Lap)' },
                  { key: 'recurrent_after_lap', label: 'Recurrent after Lap (Open)' },
                  { key: 'recurrent_multi', label: 'Multiple Recurrences' },
                ].map((rep) => (
                  <button
                    key={rep.key}
                    type="button"
                    onClick={() => setHernia((h) => ({ ...h, presentation: rep.key as HerniaPresentation }))}
                    className={`p-2 text-left text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      hernia.presentation === rep.key
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {rep.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Defect Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Hernia Defect Size (EHS Classification)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'small', label: 'Small', sub: '<1.5cm (1 finger)' },
                  { key: 'medium', label: 'Medium', sub: '1.5-3cm (1-2 fin)' },
                  { key: 'large', label: 'Large', sub: '>3cm (>2 fin)' },
                  { key: 'scrotal', label: 'Scrotal', sub: 'Giant / Inguinoscrotal' },
                ].map((sz) => (
                  <button
                    key={sz.key}
                    type="button"
                    onClick={() => setHernia((h) => ({ ...h, defectSize: sz.key as HerniaDefectSize }))}
                    className={`p-2 text-center rounded-lg border transition-all cursor-pointer ${
                      hernia.defectSize === sz.key
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200 shadow-2xs'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-semibold block">{sz.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{sz.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clinical Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Clinical Status
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'reducible', label: 'Reducible', color: 'teal' },
                  { key: 'incarcerated', label: 'Incarcerated', color: 'amber' },
                  { key: 'strangulated', label: 'Strangulated (EMERGENCY)', color: 'rose' },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setHernia((h) => ({ ...h, status: st.key as HerniaStatus }))}
                    className={`py-2 px-2 text-center text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      hernia.status === st.key
                        ? st.key === 'strangulated'
                          ? 'bg-rose-100 dark:bg-rose-950/60 border-rose-600 text-rose-900 dark:text-rose-200 font-bold'
                          : 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Anatomical Defect Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Anatomical Defect Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'indirect', label: 'Indirect (Lateral / L)', note: 'Internal deep ring' },
                  { key: 'direct', label: 'Direct (Medial / M)', note: 'Hesselbach triangle' },
                  { key: 'femoral', label: 'Femoral (F)', note: 'Below inguinal lig (Lap)' },
                  { key: 'combined_pantaloon', label: 'Combined (Pantaloon)', note: 'Direct + Indirect' },
                ].map((anat) => (
                  <button
                    key={anat.key}
                    type="button"
                    onClick={() => setHernia((h) => ({ ...h, anatomy: anat.key as HerniaAnatomy }))}
                    className={`p-2 text-left rounded-lg border transition-all cursor-pointer ${
                      hernia.anatomy === anat.key
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 text-teal-900 dark:text-teal-200'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-semibold block">{anat.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{anat.note}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Algorithmic Decision Output (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Clinical Alerts / Red Flags */}
          {result.alerts.length > 0 && (
            <div className="space-y-2.5">
              {result.alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                    alert.level === 'critical'
                      ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
                      : alert.level === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
                      : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/60 text-blue-900 dark:text-blue-200'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {alert.level === 'critical' ? (
                      <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    ) : alert.level === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider">{alert.title}</h3>
                      <span className="text-[10px] opacity-75 font-mono">[{alert.source}]</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Primary Recommended Procedure Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-teal-700 dark:text-teal-400">
                  <span className="font-semibold uppercase tracking-wider">Primary Recommendation</span>
                  <span>·</span>
                  <span>{result.ehsClassificationCode}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {result.primaryProcedure.name}
                </h3>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {result.primaryProcedure.category}
                </span>
              </div>

              <div className="flex flex-col sm:items-end">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Evidence Supported
                </span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                  {result.primaryProcedure.evidenceLevel}
                </span>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {result.primaryProcedure.summary}
            </p>

            {/* Laparoscopic Subtype Specifics if TEP/TAPP */}
            {result.laparoscopicSubtype && (
              <div className="p-4 bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/60 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
                    Laparoscopic Approach Nuance: {result.laparoscopicSubtype}
                  </span>
                  <button
                    onClick={() => setShowTepVsTapp(!showTepVsTapp)}
                    className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
                  >
                    {showTepVsTapp ? 'Hide TEP vs TAPP Breakdown' : 'Compare TEP vs TAPP'}
                  </button>
                </div>
                <p className="text-xs text-teal-800 dark:text-teal-300 leading-relaxed">
                  {result.laparoscopicNuance}
                </p>

                {showTepVsTapp && (
                  <div className="mt-3 pt-3 border-t border-teal-200 dark:border-teal-900/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-teal-100 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white">TEP (Totally Extra-Peritoneal)</span>
                      <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-3">
                        <li>Entirely extraperitoneal: no peritoneal breach</li>
                        <li>Zero risk of intra-abdominal trocar bowel hernia</li>
                        <li>Steeper learning curve; difficult after prostatectomy</li>
                      </ul>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded border border-teal-100 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white">TAPP (Trans-Abdominal Pre-Peritoneal)</span>
                      <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-3">
                        <li>Familiar transabdominal laparoscopic views</li>
                        <li>Enables complete inspection of contralateral groin</li>
                        <li>Preferred for women, femoral, or previous pelvic surgery</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Key Benefits and Technique Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-2 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Key Clinical Benefits
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {result.primaryProcedure.keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-2 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Procedural Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {result.primaryProcedure.techniqueHighlights.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 shrink-0">·</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alternative Option if available */}
            {result.alternativeProcedure && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    Evidence-Based Alternative Option
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {result.alternativeProcedure.name} ({result.alternativeProcedure.category})
                  </p>
                </div>
                <button
                  onClick={() => onSelectTab('matrix')}
                  className="text-xs font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1 hover:underline cursor-pointer self-start sm:self-auto"
                >
                  <span>Compare Techniques</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Anesthesia, Mesh, and Fixation Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Anesthesia */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>Anesthesia Protocol</span>
              </div>
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 block">
                {result.anesthesia.preferred}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {result.anesthesia.rationale}
              </p>
            </div>

            {/* Prosthetic Mesh */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Mesh Specifications</span>
              </div>
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 block truncate" title={result.mesh.type}>
                {result.mesh.type}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {result.mesh.specifications}
              </p>
            </div>

            {/* Fixation Strategy */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Fixation Strategy</span>
              </div>
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 block">
                {result.fixation.needed ? 'Fixation Indicated' : 'No Fixation Needed'}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                {result.fixation.rationale}
              </p>
            </div>
          </div>

          {/* Evidence Scorecard */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Outcome & Evidence Scorecard (GRADE Evaluated)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">EAES 2026 / HerniaSurge</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Chronic Pain (CPIP)</span>
                <span className="text-sm font-bold font-mono text-teal-700 dark:text-teal-400 block mt-0.5">
                  {result.evidenceScorecard.cpipRiskScore}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Recurrence Rate</span>
                <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 block mt-0.5">
                  {result.evidenceScorecard.recurrenceRateEstimate}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Convalescence</span>
                <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 block mt-0.5">
                  {result.evidenceScorecard.convalescenceDays}
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Day Surgery</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
                  {result.evidenceScorecard.daySurgerySuitability}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              * Note on CPIP: {result.evidenceScorecard.cpipExplanation}
            </p>
          </div>

          {/* Step-by-Step Clinical Rationale */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Step-by-Step Algorithmic Rationale
              </h3>
            </div>
            <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-decimal pl-4">
              {result.stepByStepRationale.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
