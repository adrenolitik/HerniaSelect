import React, { useState } from 'react';
import {
  table1PatientCriteria,
  table2HerniaCriteria,
  table3SurgicalMethodChoice,
} from '../data/guidelinesData';
import { BookOpen, CheckSquare, ExternalLink, HelpCircle } from 'lucide-react';

interface GuidelinesMatrixTabProps {
  onOpenPdf: (pdfId: string) => void;
}

export const GuidelinesMatrixTab: React.FC<GuidelinesMatrixTabProps> = ({ onOpenPdf }) => {
  const [activeSection, setActiveSection] = useState<'tables' | 'ehs' | 'eaes' | 'herniasurge'>('tables');

  return (
    <div className="space-y-6">
      {/* Navigation Bar for Guidelines */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Evidence Guidelines & Consensus Tables
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveSection('tables')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSection === 'tables'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Tables 1, 2 & 3
          </button>
          <button
            onClick={() => setActiveSection('ehs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSection === 'ehs'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            EHS Classification
          </button>
          <button
            onClick={() => setActiveSection('eaes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSection === 'eaes'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            EAES 2026 Protocol
          </button>
          <button
            onClick={() => setActiveSection('herniasurge')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeSection === 'herniasurge'
                ? 'bg-white dark:bg-slate-700 text-teal-800 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            HerniaSurge Core Rules
          </button>
        </div>
      </div>

      {/* Content depending on active section */}
      {activeSection === 'tables' && (
        <div className="space-y-6">
          {/* Quick PDF link pill */}
          <div className="p-3 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 rounded-xl flex items-center justify-between text-xs">
            <span className="text-teal-900 dark:text-teal-200">
              Directly synthesized from the official guideline asset: <strong className="font-mono">TABLE_1_1__1__9e1397ef.pdf</strong>
            </span>
            <button
              onClick={() => onOpenPdf('table1-2-3')}
              className="font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View Source PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TABLE 1: Patient-Related Criteria */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold tracking-wide">TABLE 1: Patient-Related Criteria</h3>
                <p className="text-xs text-slate-300">Impact of baseline patient physiology on procedural selection</p>
              </div>
              <span className="text-xs font-mono text-teal-400">6 Clinical Variables</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    <th className="p-3 w-1/4">Criteria</th>
                    <th className="p-3 w-1/4">Options</th>
                    <th className="p-3 w-1/4">Impact on Surgery</th>
                    <th className="p-3 w-1/4">Clinical & Anatomic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {table1PatientCriteria.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{item.criteria}</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{item.options}</td>
                      <td className="p-3 font-semibold text-teal-700 dark:text-teal-400">{item.impact}</td>
                      <td className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">{item.clinicalNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 2: Hernia-Related Criteria */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold tracking-wide">TABLE 2: Hernia-Related Criteria</h3>
                <p className="text-xs text-slate-300">Morphological and anatomical determinants of surgical approach</p>
              </div>
              <span className="text-xs font-mono text-teal-400">5 Morphological Factors</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    <th className="p-3 w-1/4">Criteria</th>
                    <th className="p-3 w-1/4">Options</th>
                    <th className="p-3 w-1/4">Impact on Surgery</th>
                    <th className="p-3 w-1/4">Clinical & Anatomic Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {table2HerniaCriteria.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{item.criteria}</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">{item.options}</td>
                      <td className="p-3 font-semibold text-teal-700 dark:text-teal-400">{item.impact}</td>
                      <td className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">{item.clinicalNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TABLE 3: Surgical Method Choice */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold tracking-wide">TABLE 3: Surgical Method Choice</h3>
                <p className="text-xs text-slate-300">Matching patient presentations to operative technique</p>
              </div>
              <span className="text-xs font-mono text-teal-400">Primary Modalities</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                    <th className="p-3 w-1/4">Surgical Method</th>
                    <th className="p-3 w-1/3">When to Choose It</th>
                    <th className="p-3 w-5/12">Evidence & Practical Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {table3SurgicalMethodChoice.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        <span className="block">{item.method}</span>
                        <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono font-normal">{item.evidenceStrength}</span>
                      </td>
                      <td className="p-3 font-semibold text-teal-800 dark:text-teal-300 leading-relaxed">
                        {item.whenToChoose}
                      </td>
                      <td className="p-3 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {item.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EHS Classification Section */}
      {activeSection === 'ehs' && (
        <div className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xs">
          <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              European Hernia Society (EHS) Groin Hernia Classification
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Standardized classification for surgical documentation, audit, and randomized trial reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
                1. Presentation Type
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p><strong>P</strong> = Primary Groin Hernia</p>
                <p><strong>R</strong> = Recurrent Groin Hernia (specify previous repairs)</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
                2. Anatomical Localization
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p><strong>L (Lateral)</strong> = Indirect (Internal Inguinal Ring)</p>
                <p><strong>M (Medial)</strong> = Direct (Hesselbach Triangle floor)</p>
                <p><strong>F (Femoral)</strong> = Femoral Canal (below inguinal ligament)</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block">
                3. Defect Size
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <p><strong>Size 1</strong> = &lt; 1.5 cm (&le; 1 index finger tip)</p>
                <p><strong>Size 2</strong> = 1.5 – 3.0 cm (1 to 2 finger breadths)</p>
                <p><strong>Size 3</strong> = &gt; 3.0 cm (&gt; 2 finger breadths / scrotal)</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 rounded-lg text-xs space-y-2">
            <span className="font-bold text-teal-900 dark:text-teal-200 block">
              Clinical Significance of EHS Size 3 Direct (M3):
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              In large medial defects (EHS M3), there is a recognized hazard of preperitoneal mesh herniation or inversion into the defect. 
              HerniaSurge Strong Recommendation states: <em>Mesh fixation is recommended in patients with large direct hernias (M3) undergoing TAPP or TEP to reduce recurrence risk</em>, 
              preferring atraumatic fibrin glue or self-gripping mesh over penetrating tacks to protect underlying nerve corridors.
            </p>
          </div>
        </div>
      )}

      {/* EAES 2026 Protocol Section */}
      {activeSection === 'eaes' && (
        <div className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                EAES Clinical Practice Guidelines 2026 (Protocol Framework)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Multi-society consensus protocol (EAES, EHS, SAGES) utilizing GRADE & AGREE-S methodologies.
              </p>
            </div>
            <button
              onClick={() => onOpenPdf('eaes-2026')}
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View 18-Page Protocol PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 font-mono">KEY QUESTION 1 (KQ#1)</span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                Should adult patients with primary groin hernia, who are candidates for elective surgical repair, be offered laparo-endoscopic or anterior open repair?
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Synthesis of 30+ randomized controlled trials published since 2015 comparing anterior open (Lichtenstein) with TEP and TAPP across patient-important outcomes.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-teal-800 dark:text-teal-300 font-mono">KEY QUESTION 2 (KQ#2)</span>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
                Should adult patients with primary groin hernia undergoing elective minimally invasive surgery be offered a Totally Extra-Peritoneal (TEP) or Trans-Abdominal Pre-Peritoneal (TAPP) approach?
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Equivalence trial evaluation assessing recurrence, peritoneal breach, conversion rates, and operative duration between both laparoscopic techniques.
              </p>
            </div>
          </div>

          {/* Clinical Assumptions & Subgroup Analyses */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 block">
              Predefined Subgroup Hypotheses (EAES 2026 Page 8):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Male vs Female</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Shorter inguinal canal and higher femoral hernia rate in females favors laparo-endoscopic mesh repair.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">BMI ≥ 35 kg/m²</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Advantage of laparoscopy may be diminished over open repair due to technical difficulty in morbid obesity.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Unilateral vs Bilateral</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Benefit of laparoscopy is significantly more pronounced in bilateral hernias (single 3-port access).
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Scrotal Hernia</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Open repair may be more effective in scrotal hernias due to direct anatomical access and sac control.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Prior Extraperitoneal Surgery</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Dissection of extraperitoneal space poses severe vascular/bladder risks after prostatectomy; avoid TEP.
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Prior Outcomes Prioritized</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  30-day mortality, Clavien-Dindo ≥3b, QoL, 3-yr recurrence, acute pain (&lt;30d), and CPIP at 3 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HerniaSurge Section */}
      {activeSection === 'herniasurge' && (
        <div className="space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                HerniaSurge International Guidelines (EHS Core Recommendations)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Gold-standard worldwide consensus endorsed by all 5 Hernia Societies and EAES.
              </p>
            </div>
            <button
              onClick={() => onOpenPdf('herniasurge-ehs')}
              className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>View 23-Page EHS Booklet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Chapter 6: Mesh vs Non-Mesh</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong>STRONG:</strong> A mesh-based repair technique is recommended for patients with inguinal hernias. 
                Shouldice is recommended if non-mesh is chosen or required. 3D plug-and-patch and bilayer implants are not recommended due to chronic pain and cost.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Chapter 13: Anesthesia Selection</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong>STRONG:</strong> Local anesthesia is recommended for open repair of reducible inguinal hernias. 
                General or local anesthesia is suggested over regional (spinal) in patients aged 65 and older to minimize cardiac and urinary complications.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Chapter 19: CPIP (Chronic Pain) Prevention</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong>STRONG:</strong> Chronic pain is defined as bothersome moderate pain lasting ≥ 3 months. 
                Nerve anatomy awareness and systematic identification of the ilioinguinal, iliohypogastric, and genital nerves during open surgery is mandatory.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Chapter 20: Recurrent Hernias</span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                <strong>STRONG:</strong> Laparo-endoscopic repair is recommended after failed anterior tissue or Lichtenstein repair. 
                Anterior repair is recommended after failed posterior repair.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
