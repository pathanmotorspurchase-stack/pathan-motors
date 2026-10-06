import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, FolderArchive, ExternalLink, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate self-contained HTML bundle
  const generateStandaloneHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Car Part Identifier - PATHAN MOTORS</title>
  <meta name="description" content="AI-powered automotive visual search engine by Pathan Motors. Identify car parts, OEM numbers, and vehicle specifications." />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: #f59e0b;
      --secondary: #ea580c;
    }
    body { background-color: #0b0f19; color: #f1f5f9; font-family: system-ui, -apple-system, sans-serif; }
    .text-gradient { background: linear-gradient(135deg, #fbbf24, #f59e0b, #ea580c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .glass-card { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); }
    .btn-primary { background: linear-gradient(135deg, #f59e0b, #ea580c); color: #fff; font-weight: 600; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3); }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between">
  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-xl">
          PM
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-extrabold text-lg text-white">Car Part <span class="text-gradient">Identifier</span></span>
            <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">PATHAN MOTORS</span>
          </div>
          <span class="text-[10px] uppercase tracking-wider text-slate-400 font-medium">AI Automotive Vision</span>
        </div>
      </div>
      <a href="mailto:pathanmotorspurchase@gmail.com" class="btn-primary text-xs px-4 py-2 rounded-xl transition hover:opacity-90">
        Contact Purchase Desk
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <main class="max-w-4xl mx-auto px-4 py-12 flex-grow">
    <div class="text-center mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
        PATHAN MOTORS · AUTOMOTIVE VISION ENGINE
      </div>
      <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">
        Car Part Identifier <span class="text-gradient">PATHAN MOTORS</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Upload or photograph any automotive part to detect OEM specifications, vehicle compatibility, and replacement difficulty in seconds.
      </p>
    </div>

    <!-- Active Scanner Box -->
    <div class="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800">
      <div class="text-center mb-6">
        <span class="text-xs uppercase tracking-wider text-amber-400 font-bold">Featured Component</span>
        <h2 class="text-2xl font-bold text-white mt-1">High Performance Fuel/Water Separator</h2>
        <p class="text-xs text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
          Manufactured by TATA Genuine / Fleetguard. Engineered to coalesce and drain water contamination from diesel fuel lines before entering high-pressure common-rail injectors.
        </p>
      </div>

      <div class="grid grid-cols-3 gap-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-center text-xs mb-6">
        <div>
          <span class="text-slate-400 block text-[11px]">Difficulty</span>
          <strong class="text-amber-400 font-bold">Moderate</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-[11px]">Labor Time</span>
          <strong class="text-white font-bold">0.5 - 1.0 hr</strong>
        </div>
        <div>
          <span class="text-slate-400 block text-[11px]">OEM Numbers</span>
          <strong class="text-amber-300 font-mono">2786 0710 0104</strong>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <a href="https://www.amazon.com/s?k=Fuel+Water+Separator+TATA" target="_blank" class="btn-primary flex-1 py-3 px-4 rounded-xl text-xs text-center">
          Search on Amazon
        </a>
        <a href="https://www.ebay.com/sch/i.html?_nkw=Fuel+Water+Separator+TATA" target="_blank" class="glass-card text-white flex-1 py-3 px-4 rounded-xl text-xs text-center border border-slate-700 hover:border-amber-400 transition">
          Search on eBay
        </a>
        <a href="mailto:pathanmotorspurchase@gmail.com?subject=Part%20Inquiry%20-%20Fuel/Water%20Separator" class="glass-card text-amber-300 flex-1 py-3 px-4 rounded-xl text-xs text-center border border-slate-700 hover:border-amber-400 transition">
          Inquire Pathan Motors
        </a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-slate-800 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
    <p class="text-slate-400 font-semibold mb-1">Car Part Identifier · PATHAN MOTORS</p>
    <p>Direct Support & Purchase Desk: <a href="mailto:pathanmotorspurchase@gmail.com" class="text-amber-400 underline">pathanmotorspurchase@gmail.com</a></p>
    <p class="mt-2 text-[11px]">© 2026 Pathan Motors. All rights reserved.</p>
  </footer>
</body>
</html>`;
    return htmlContent;
  };

  const handleDownload = () => {
    const htmlString = generateStandaloneHTML();
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'car-part-identifier-pathan-motors.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const htmlString = generateStandaloneHTML();
    navigator.clipboard.writeText(htmlString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-lg w-full rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-slate-900 text-theme-primary border border-slate-700">
            <Download className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Export & HTML Download
          </span>
        </div>

        <h3 className="text-2xl font-black text-white mb-2">
          How to Download Your HTML
        </h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          You can download a standalone single-file HTML version right now, or download the full source code package from Google AI Studio.
        </p>

        {/* Option 1: Instant Standalone HTML Download */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-theme-primary" />
              <h4 className="text-sm font-bold text-white">1. Instant Standalone HTML File</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Direct Download
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Downloads a ready-to-run <code className="text-theme-primary font-mono">.html</code> file with complete styling and Pathan Motors branding that runs instantly in any browser offline.
          </p>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleDownload}
              className="flex-1 gradient-btn-primary py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download .HTML File</span>
            </button>

            <button
              onClick={handleCopyCode}
              className="gradient-btn-secondary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              title="Copy HTML to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Option 2: Full Source Code from Google AI Studio */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5 mb-6">
          <div className="flex items-center gap-2">
            <FolderArchive className="w-4 h-4 text-slate-400" />
            <h4 className="text-sm font-bold text-white">2. Full React + Vite Source Code (ZIP)</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            In the <strong>Google AI Studio Build</strong> interface header (top right of your screen):
          </p>

          <ol className="text-xs text-slate-400 space-y-1.5 list-decimal list-inside pl-1">
            <li>Look for the <strong>Export / Download</strong> icon (or three dots <span className="text-white font-mono">⋮</span>).</li>
            <li>Click <strong>Download Code</strong> or <strong>Export to GitHub</strong>.</li>
            <li>You will receive a complete ZIP containing all files (<code className="text-slate-300 font-mono">index.html</code>, <code className="text-slate-300 font-mono">package.json</code>, components, and assets).</li>
          </ol>
        </div>

        <div className="text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
