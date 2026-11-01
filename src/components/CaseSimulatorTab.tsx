import React from 'react';
import { clinicalCases } from '../data/caseStudies';
import { ClinicalCase, PatientCriteria, HerniaCriteria } from '../types/hernia';
import { Sparkles, ArrowRight, UserCheck, Stethoscope, Lightbulb } from 'lucide-react';

interface CaseSimulatorTabProps {
  onLoadCase: (patient: PatientCriteria, hernia: HerniaCriteria) => void;
}

export const CaseSimulatorTab: React.FC<CaseSimulatorTabProps> = ({ onLoadCase }) => {
  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Clinical Vignettes & Case Simulator
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Select any real-world surgical case vignette below to load its exact patient factors and hernia anatomy directly into the recommendation engine. 
          Each vignette illustrates key decision branch points from Table 1, Table 2, and Table 3.
        </p>
      </div>

      {/* Grid of 8 Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clinicalCases.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {c.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {c.tagline}
              </p>

              {/* Patient and Hernia Quick Badges (Clean text, no pill clutter) */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-[11px] text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Patient:</span>
                  <span>{c.patientCriteria.exactAge}yo {c.patientCriteria.sex}</span>
                  <span>·</span>
                  <span>BMI {c.patientCriteria.bmi}</span>
                  <span>·</span>
                  <span>{c.patientCriteria.anesthesiaFitness === 'fit_general' ? 'Fit for GA' : 'Unfit for GA'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Hernia:</span>
                  <span className="capitalize">{c.herniaCriteria.side.replace('_', ' ')}</span>
                  <span>·</span>
                  <span className="capitalize">{c.herniaCriteria.defectSize}</span>
                  <span>·</span>
                  <span className="capitalize">{c.herniaCriteria.anatomy}</span>
                  <span>·</span>
                  <span className="capitalize">{c.herniaCriteria.status}</span>
                </div>
              </div>

              {/* Clinical Pearls */}
              <div className="p-3 bg-teal-50/60 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/50 rounded-lg space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 dark:text-teal-200">
                  <Lightbulb className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Pearl</span>
                </div>
                <p className="text-[11px] text-teal-800 dark:text-teal-300 leading-relaxed">
                  {c.clinicalPearls}
                </p>
              </div>
            </div>

            {/* Load Button */}
            <button
              onClick={() => onLoadCase(c.patientCriteria, c.herniaCriteria)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 dark:bg-teal-600 rounded-lg hover:bg-slate-800 dark:hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Load Case Into Decision Engine</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
