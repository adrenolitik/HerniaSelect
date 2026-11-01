import React from 'react';
import { Stethoscope, Printer, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'calculator' | 'matrix' | 'guidelines' | 'cases' | 'sources';
  setActiveTab: (tab: 'calculator' | 'matrix' | 'guidelines' | 'cases' | 'sources') => void;
  onOpenPrintReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenPrintReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-teal-700 dark:bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <button
              onClick={() => setActiveTab('calculator')}
              className="text-left cursor-pointer group"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
                HerniaSelect
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                activeTab === 'calculator' ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400' : ''
              }`}
            >
              Procedure Calculator
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                activeTab === 'matrix' ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400' : ''
              }`}
            >
              Technique Comparison
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                activeTab === 'guidelines' ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400' : ''
              }`}
            >
              Guideline Tables
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                activeTab === 'cases' ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400' : ''
              }`}
            >
              Clinical Cases
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`hover:text-teal-700 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer pb-0.5 ${
                activeTab === 'sources' ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-700 dark:border-teal-400' : ''
              }`}
            >
              Source PDFs
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPrintReport}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-teal-600 rounded-lg hover:bg-slate-800 dark:hover:bg-teal-700 transition-colors whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
              title="Generate printable surgical consultation sheet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Consultation Report</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
