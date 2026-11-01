import React from 'react';
import { PatientCriteria, HerniaCriteria, RecommendationResult } from '../types/hernia';
import { X, Printer, Copy, Check } from 'lucide-react';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientCriteria;
  hernia: HerniaCriteria;
  result: RecommendationResult;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  isOpen,
  onClose,
  patient,
  hernia,
  result,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const text = `
HERNIA SURGERY PROCEDURE SELECTION REPORT
Generated: ${new Date().toLocaleDateString()}
Classification: ${result.ehsClassificationCode}

PATIENT PROFILE:
- Age: ${patient.exactAge} years (${patient.ageGroup})
- Sex: ${patient.sex.toUpperCase()}
- BMI: ${patient.bmi} kg/m² (${patient.bmiCategory})
- Anesthesia Fitness: ${patient.anesthesiaFitness === 'fit_general' ? 'Fit for GA' : 'UNFIT for General Anesthesia'}
- Activity Level: ${patient.activityLevel}
- Prior Pelvic/Abdominal Surgery: ${patient.priorSurgery}
- Mesh Preference: ${patient.meshPreference}

HERNIA PRESENTATION:
- Side: ${hernia.side}
- Presentation: ${hernia.presentation}
- Size: ${hernia.defectSize}
- Clinical Status: ${hernia.status}
- Anatomy: ${hernia.anatomy}

PRIMARY RECOMMENDATION:
Procedure: ${result.primaryProcedure.name} (${result.primaryProcedure.category})
Recommendation Grade: ${result.primaryProcedure.evidenceLevel}
${result.laparoscopicSubtype ? `Laparoscopic Subtype: ${result.laparoscopicSubtype} - ${result.laparoscopicNuance}` : ''}

ANESTHESIA STRATEGY:
- Preferred: ${result.anesthesia.preferred}
- Rationale: ${result.anesthesia.rationale}

MESH & FIXATION:
- Mesh: ${result.mesh.type} (${result.mesh.specifications})
- Fixation: ${result.fixation.type} - ${result.fixation.rationale}

OUTCOME ESTIMATES:
- Chronic Pain (CPIP): ${result.evidenceScorecard.cpipRiskScore}
- Recurrence Risk: ${result.evidenceScorecard.recurrenceRateEstimate}
- Convalescence: ${result.evidenceScorecard.convalescenceDays}
- Day Surgery: ${result.evidenceScorecard.daySurgerySuitability}

RATIONALE:
${result.stepByStepRationale.map((r, i) => `${i + 1}. ${r}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Surgical Consultation & Recommendation Sheet
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">
              Ready for Clinical Records / Informed Consent Documentation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-xs">
          {/* Header of Report */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                INGUINAL HERNIA PROCEDURE SELECTION REPORT
              </h2>
              <p className="text-[11px] text-slate-500">
                HerniaSurge International & EAES 2026 Multidisciplinary Guideline System
              </p>
            </div>
            <div className="text-right font-mono text-[11px]">
              <div className="font-bold text-teal-700 dark:text-teal-400">{result.ehsClassificationCode}</div>
              <div className="text-slate-400">{new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Patient and Hernia Profile Grids */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-500 block">
                Patient Baseline Characteristics
              </span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Age / Sex:</span>
                  <span className="font-semibold">{patient.exactAge} yr · {patient.sex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">BMI:</span>
                  <span className="font-semibold font-mono">{patient.bmi} kg/m² ({patient.bmiCategory})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">GA Fitness:</span>
                  <span className="font-semibold">{patient.anesthesiaFitness === 'fit_general' ? 'Fit for GA' : 'UNFIT for GA'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activity:</span>
                  <span className="font-semibold capitalize">{patient.activityLevel.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Surgical History:</span>
                  <span className="font-semibold truncate max-w-[150px]">{patient.priorSurgery}</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-[11px] text-slate-500 block">
                Hernia Morphological Presentation
              </span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Laterality:</span>
                  <span className="font-semibold capitalize">{hernia.side.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Presentation:</span>
                  <span className="font-semibold capitalize">{hernia.presentation.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Defect Size:</span>
                  <span className="font-semibold capitalize">{hernia.defectSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinical Status:</span>
                  <span className="font-semibold capitalize">{hernia.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Anatomical Type:</span>
                  <span className="font-semibold capitalize">{hernia.anatomy}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Primary Recommendation */}
          <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 rounded-lg space-y-2">
            <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
              Primary Recommended Surgical Procedure
            </span>
            <div className="text-base font-bold text-slate-900 dark:text-white">
              {result.primaryProcedure.name}
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              {result.primaryProcedure.summary}
            </p>
            {result.laparoscopicSubtype && (
              <p className="text-xs font-semibold text-teal-800 dark:text-teal-300">
                Approach: {result.laparoscopicSubtype} — {result.laparoscopicNuance}
              </p>
            )}
          </div>

          {/* Protocol Strategy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-[11px] text-slate-500 block">Anesthesia Protocol</span>
              <p className="font-semibold text-teal-800 dark:text-teal-300">{result.anesthesia.preferred}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">{result.anesthesia.rationale}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-[11px] text-slate-500 block">Mesh Specification</span>
              <p className="font-semibold text-slate-900 dark:text-white">{result.mesh.type}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">{result.mesh.specifications}</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-[11px] text-slate-500 block">Fixation Strategy</span>
              <p className="font-semibold text-slate-900 dark:text-white">{result.fixation.type}</p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">{result.fixation.rationale}</p>
            </div>
          </div>

          {/* Rationale Steps */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-[11px] text-slate-500 block">
              Step-by-Step Guideline Rationale
            </span>
            <ol className="list-decimal pl-4 space-y-1 text-slate-700 dark:text-slate-300">
              {result.stepByStepRationale.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>

          {/* Evidence Prognosis */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-around text-center font-mono">
            <div>
              <span className="text-[10px] text-slate-500 block">CPIP Chronic Pain</span>
              <span className="font-bold text-teal-700 dark:text-teal-400">{result.evidenceScorecard.cpipRiskScore}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Recurrence Est.</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.evidenceScorecard.recurrenceRateEstimate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Convalescence</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.evidenceScorecard.convalescenceDays}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Setting</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{result.evidenceScorecard.daySurgerySuitability}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
