import React, { useState, useMemo, useEffect } from 'react';
import { PatientCriteria, HerniaCriteria } from './types/hernia';
import { evaluateHerniaSurgery } from './utils/decisionEngine';
import { Header } from './components/Header';
import { CalculatorTab } from './components/CalculatorTab';
import { ComparisonMatrixTab } from './components/ComparisonMatrixTab';
import { GuidelinesMatrixTab } from './components/GuidelinesMatrixTab';
import { CaseSimulatorTab } from './components/CaseSimulatorTab';
import { SourcePdfsTab } from './components/SourcePdfsTab';
import { PrintReportModal } from './components/PrintReportModal';
import { Moon, Sun, Shield, BookOpen, Layers, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'matrix' | 'guidelines' | 'cases' | 'sources'>('calculator');
  const [activePdfId, setActivePdfId] = useState<string>('table1-2-3');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Synchronize dark class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initial clinical state (representative adult male with standard primary hernia)
  const [patient, setPatient] = useState<PatientCriteria>({
    ageGroup: 'adult',
    exactAge: 48,
    sex: 'male',
    heightCm: 176,
    weightKg: 78,
    bmi: 25.2,
    bmiCategory: 'overweight',
    anesthesiaFitness: 'fit_general',
    activityLevel: 'heavy_worker_athlete',
    priorSurgery: 'none',
    meshPreference: 'accepts_mesh',
    lowResourceSetting: false,
  });

  const [hernia, setHernia] = useState<HerniaCriteria>({
    side: 'unilateral_right',
    presentation: 'primary',
    defectSize: 'medium',
    status: 'reducible',
    anatomy: 'indirect',
    symptomSeverity: 'moderately_symptomatic',
  });

  // Real-time recommendation evaluation
  const result = useMemo(() => {
    return evaluateHerniaSurgery(patient, hernia);
  }, [patient, hernia]);

  const handleLoadCase = (loadedPatient: PatientCriteria, loadedHernia: HerniaCriteria) => {
    setPatient(loadedPatient);
    setHernia(loadedHernia);
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPdfFromGuidelines = (pdfId: string) => {
    setActivePdfId(pdfId);
    setActiveTab('sources');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Universal 3-Zone Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPrintReport={() => setIsPrintModalOpen(true)}
      />

      {/* Main App Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Navigation Segmented Tabs */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto pb-3 mb-4 border-b border-slate-200 dark:border-slate-800 gap-1">
          {[
            { id: 'calculator', label: 'Calculator' },
            { id: 'matrix', label: 'Techniques' },
            { id: 'guidelines', label: 'Guidelines' },
            { id: 'cases', label: 'Cases' },
            { id: 'sources', label: 'PDFs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-teal-700 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Views */}
        {activeTab === 'calculator' && (
          <CalculatorTab
            patient={patient}
            setPatient={setPatient}
            hernia={hernia}
            setHernia={setHernia}
            result={result}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'matrix' && <ComparisonMatrixTab />}

        {activeTab === 'guidelines' && (
          <GuidelinesMatrixTab onOpenPdf={handleOpenPdfFromGuidelines} />
        )}

        {activeTab === 'cases' && <CaseSimulatorTab onLoadCase={handleLoadCase} />}

        {activeTab === 'sources' && <SourcePdfsTab initialPdfId={activePdfId} />}
      </main>

      {/* Printable / Copyable Report Modal */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        patient={patient}
        hernia={hernia}
        result={result}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">HerniaSelect Engine</span>
            <span>·</span>
            <span>HerniaSurge 2018/2023</span>
            <span>·</span>
            <span>EAES Multi-Society Guidelines 2026</span>
            <span>·</span>
            <span>EHS Groin Classification</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
              <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
            <span className="text-[11px] text-slate-400">
              For professional clinical decision support
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
