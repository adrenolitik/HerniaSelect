import React, { useState } from 'react';
import { pdfDocuments } from '../data/guidelinesData';
import { FileText, Download, ExternalLink, Eye } from 'lucide-react';

interface SourcePdfsTabProps {
  initialPdfId?: string;
}

export const SourcePdfsTab: React.FC<SourcePdfsTabProps> = ({ initialPdfId = 'table1-2-3' }) => {
  const [selectedPdfId, setSelectedPdfId] = useState<string>(initialPdfId);

  const currentPdf = pdfDocuments.find((p) => p.id === selectedPdfId) || pdfDocuments[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
            Clinical Guidelines Source PDF Documents
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Inspect the official clinical guideline source files provided for this inguinal hernia surgery criteria application. 
          All algorithmic decisions map directly to these source documents.
        </p>
      </div>

      {/* PDF Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {pdfDocuments.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedPdfId(doc.id)}
            className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
              selectedPdfId === doc.id
                ? 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-600 text-teal-950 dark:text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5">
              <span className="text-xs font-bold truncate pr-2">{doc.title}</span>
              <span className="text-[10px] font-mono text-slate-400">PDF</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {doc.description}
            </p>
          </button>
        ))}
      </div>

      {/* Active PDF Actions Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Currently Viewing: {currentPdf.title}
          </span>
          <p className="text-[11px] font-mono text-slate-500 truncate">
            {currentPdf.filename}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={currentPdf.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Tab</span>
          </a>
          <a
            href={currentPdf.path}
            download={currentPdf.filename}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
        <div className="w-full h-[750px] bg-slate-100 dark:bg-slate-950 flex flex-col">
          <iframe
            src={`${currentPdf.path}#toolbar=1`}
            title={currentPdf.title}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
