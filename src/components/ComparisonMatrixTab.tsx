import React, { useState } from 'react';
import { Layers, Check, X, AlertCircle } from 'lucide-react';

interface TechniqueComparison {
  name: string;
  code: string;
  category: string;
  plane: string;
  anesthesia: string;
  cpipRate: string;
  recurrenceRate: string;
  convalescence: string;
  bilateralSuitability: string;
  femaleSuitability: string;
  scrotalSuitability: string;
  postProstatectomySuitability: string;
  learningCurve: string;
  costProfile: string;
  guidelineStatus: string;
}

const techniques: TechniqueComparison[] = [
  {
    name: 'Open Lichtenstein',
    code: 'LICHTENSTEIN',
    category: 'Open Anterior Mesh',
    plane: 'Anterior (between internal oblique and external oblique aponeurosis)',
    anesthesia: 'Local infiltration (Gold standard), Regional (spinal), or General',
    cpipRate: '3% – 5% (with strict nerve identification; up to 10% unselected)',
    recurrenceRate: '< 1.5% in expert and general hands',
    convalescence: '7 – 14 days to normal activities',
    bilateralSuitability: 'Requires 2 separate groin incisions; higher cumulative pain',
    femaleSuitability: 'Inferior: does not cover femoral canal, high missed femoral recurrence',
    scrotalSuitability: 'Excellent: gold standard for giant inguinoscrotal hernias',
    postProstatectomySuitability: 'Excellent: safe anterior virgin plane away from pelvic scars',
    learningCurve: 'Short (~25–50 cases for proficiency)',
    costProfile: 'Lowest cost: flat mesh, standard suture instruments, no disposables',
    guidelineStatus: 'Strong Recommendation: Gold standard anterior repair',
  },
  {
    name: 'Laparoscopic TEP',
    code: 'TEP',
    category: 'Minimally Invasive Posterior',
    plane: 'Posterior Preperitoneal (Space of Retzius & Bogros outside peritoneum)',
    anesthesia: 'General Endotracheal Anesthesia strictly required',
    cpipRate: '< 1.5% – 2% (minimal anterior nerve trauma)',
    recurrenceRate: '< 1.5% with adequate surgeon caseload',
    convalescence: '3 – 5 days (rapid return to athletic training/heavy work)',
    bilateralSuitability: 'Ideal: both groins addressed via same 3 small puncture ports',
    femaleSuitability: 'Excellent: covers entire myopectineal orifice including femoral ring',
    scrotalSuitability: 'Difficult: high peritoneal tear risk, limited balloon working space',
    postProstatectomySuitability: 'Contraindicated / Hazardous: Retzius space obliterated by scarring',
    learningCurve: 'Steep (>100 mentored procedures for benchmark results)',
    costProfile: 'Higher: laparoscopy tower, balloon dissector/trocars, mesh',
    guidelineStatus: 'Strong Recommendation for bilateral, female, active, and recurrent',
  },
  {
    name: 'Laparoscopic TAPP',
    code: 'TAPP',
    category: 'Minimally Invasive Posterior',
    plane: 'Posterior Preperitoneal (via Trans-Abdominal peritoneal flap incision)',
    anesthesia: 'General Endotracheal Anesthesia strictly required',
    cpipRate: '< 1.5% – 2% (avoids anterior groin sensory nerves)',
    recurrenceRate: '< 1.5% with adequate surgeon caseload',
    convalescence: '3 – 5 days to unrestricted physical activity',
    bilateralSuitability: 'Ideal: inspects and repairs bilateral rings through same ports',
    femaleSuitability: 'Superior: direct inspection of femoral ring & round ligament',
    scrotalSuitability: 'Fair to Good: wider working view than TEP for distal sac division',
    postProstatectomySuitability: 'Feasible: can enter preperitoneal space laterally under direct vision',
    learningCurve: 'Moderate to Steep (~50–80 cases for proficiency)',
    costProfile: 'Higher: laparoscopy tower, trocars, closure devices/barbed suture',
    guidelineStatus: 'Strong Recommendation: preferred in women and difficult anatomy',
  },
  {
    name: 'Open Shouldice',
    code: 'SHOULDICE',
    category: 'Open Pure Tissue (Non-Mesh)',
    plane: 'Anterior (4 continuous overlapping layers of transversalis fascia)',
    anesthesia: 'Local infiltration, Regional, or General',
    cpipRate: '5% – 8% (tissue tension on reconstructed floor)',
    recurrenceRate: '4% – 8% in general practice (<2% only in specialized hernia clinics)',
    convalescence: '14 – 21 days due to muscular tissue tension',
    bilateralSuitability: 'Poor: dual open tension repairs prolong convalescence',
    femaleSuitability: 'Poor: does not repair femoral defect',
    scrotalSuitability: 'Moderate for reducible defects',
    postProstatectomySuitability: 'Safe anterior plane',
    learningCurve: 'High: requires nuanced understanding of transversalis anatomy',
    costProfile: 'Extremely low: simple suture, zero mesh prosthetic cost',
    guidelineStatus: 'Strong Recommendation ONLY when patient refuses mesh or contaminated field',
  },
  {
    name: 'Pediatric Herniotomy',
    code: 'HERNIOTOMY',
    category: 'Pediatric Sac Ligation',
    plane: 'Superficial inguinal ring down to internal ring (sac ligation only)',
    anesthesia: 'General Anesthesia + regional caudal/ilioinguinal block',
    cpipRate: '< 0.5% (no mesh, minimal tissue manipulation)',
    recurrenceRate: '< 1% for uncomplicated patent processus vaginalis',
    convalescence: '1 – 3 days (children resume normal play quickly)',
    bilateralSuitability: 'Dual groin skin crease incisions if bilateral',
    femaleSuitability: 'Standard pediatric ligation of canal of Nuck',
    scrotalSuitability: 'Routine pediatric sac dissection from cord',
    postProstatectomySuitability: 'Not applicable (pediatric population)',
    learningCurve: 'Moderate pediatric surgical core competence',
    costProfile: 'Lowest: absorbable transfixion suture only',
    guidelineStatus: 'Strictly Recommended: Mesh is contraindicated in children',
  },
];

export const ComparisonMatrixTab: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<string>('ALL');

  const filteredTechniques = selectedTechnique === 'ALL'
    ? techniques
    : techniques.filter((t) => t.code === selectedTechnique);

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Surgical Technique Multi-Dimensional Comparison
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Comparison of the 5 standardized inguinal hernia surgical approaches established by the HerniaSurge International Guidelines, European Hernia Society (EHS), and EAES 2026.
        </p>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Filter View:</span>
          {['ALL', 'LICHTENSTEIN', 'TEP', 'TAPP', 'SHOULDICE', 'HERNIOTOMY'].map((code) => (
            <button
              key={code}
              onClick={() => setSelectedTechnique(code)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedTechnique === code
                  ? 'bg-teal-700 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {code === 'ALL' ? 'All 5 Techniques' : code}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white">
              <th className="p-3.5 min-w-[180px] sticky left-0 bg-slate-50 dark:bg-slate-800/80">Clinical Dimension</th>
              {filteredTechniques.map((t) => (
                <th key={t.code} className="p-3.5 min-w-[210px] border-l border-slate-200 dark:border-slate-700">
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold block text-teal-800 dark:text-teal-300">{t.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal block">{t.category}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {/* Plane */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Dissection Plane
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  {t.plane}
                </td>
              ))}
            </tr>

            {/* Anesthesia */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Anesthesia Options
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  <span className={t.anesthesia.includes('Local') ? 'text-teal-700 dark:text-teal-400 font-semibold' : ''}>
                    {t.anesthesia}
                  </span>
                </td>
              ))}
            </tr>

            {/* CPIP */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Chronic Pain (CPIP ≥3 mo)
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800 font-mono">
                  <span className={t.cpipRate.includes('< 1.5%') ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                    {t.cpipRate}
                  </span>
                </td>
              ))}
            </tr>

            {/* Recurrence */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Recurrence Rate
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800 font-mono">
                  {t.recurrenceRate}
                </td>
              ))}
            </tr>

            {/* Convalescence */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Return to Unrestricted Activity
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800 font-mono font-semibold">
                  {t.convalescence}
                </td>
              ))}
            </tr>

            {/* Bilateral */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Bilateral Groin Hernias
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  {t.bilateralSuitability}
                </td>
              ))}
            </tr>

            {/* Female */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Female Patients & Femoral Ring
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  {t.femaleSuitability}
                </td>
              ))}
            </tr>

            {/* Giant Scrotal */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Large Inguinoscrotal Hernias
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  {t.scrotalSuitability}
                </td>
              ))}
            </tr>

            {/* Post Prostatectomy */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Prior Extraperitoneal Surgery (Prostatectomy)
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  <span className={t.postProstatectomySuitability.includes('Contraindicated') ? 'text-rose-600 font-semibold' : ''}>
                    {t.postProstatectomySuitability}
                  </span>
                </td>
              ))}
            </tr>

            {/* Learning Curve */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Surgeon Learning Curve
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  {t.learningCurve}
                </td>
              ))}
            </tr>

            {/* Cost */}
            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
              <td className="p-3.5 font-semibold text-slate-900 dark:text-white bg-slate-50/70 dark:bg-slate-800/50 sticky left-0">
                Equipment & Cost Burden
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800">
                  {t.costProfile}
                </td>
              ))}
            </tr>

            {/* Guideline recommendation */}
            <tr className="bg-slate-50/30 dark:bg-slate-800/30">
              <td className="p-3.5 font-bold text-slate-900 dark:text-white bg-slate-100/70 dark:bg-slate-800/80 sticky left-0">
                Guideline Status (EHS / EAES)
              </td>
              {filteredTechniques.map((t) => (
                <td key={t.code} className="p-3.5 border-l border-slate-200/80 dark:border-slate-800 font-medium text-teal-800 dark:text-teal-300">
                  {t.guidelineStatus}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
