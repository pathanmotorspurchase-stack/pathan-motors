import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Code2, Sparkles, ShieldCheck } from 'lucide-react';

interface WhiteLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhiteLabelModal: React.FC<WhiteLabelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeTab, setActiveTab] = useState<'curl' | 'response' | 'contact'>('curl');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const sampleCurl = `curl -X POST https://api.carpartidentifier.com/v1/vision/identify \\
  -H "Authorization: Bearer cpi_live_99f8d1e2..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "image_url": "https://storage.dealership.com/inventory/part_9910.jpg",
    "target_vehicle": { "make": "Ford", "model": "F-150", "year": "2021" },
    "extract_oem_matrix": true
  }'`;

  const sampleResponse = `{
  "status": "success",
  "latency_ms": 142,
  "identification": {
    "component_name": "High Performance Fuel/Water Separator",
    "part_category": "Fuel System",
    "primary_manufacturer": "TATA Genuine / Fleetguard",
    "confidence_score": 0.998,
    "oem_cross_references": [
      "2786 0710 0104",
      "FS19732",
      "TATA-D44901"
    ],
    "compatibility": {
      "verified_models": ["TATA Xenon", "Safari 2.2L DICOR", "Harrier Diesel"],
      "fitment_grade": "OEM Exact Fit"
    },
    "replacement_difficulty": "Moderate",
    "estimated_labor_hours": "0.75"
  }
}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-2xl w-full rounded-3xl border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            Developer & B2B API Suite
          </span>
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-2">
          Enterprise Automotive Vision API
        </h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Embed instant sub-200ms car part visual recognition directly into your mobile app, auto parts marketplace, or dealer inventory scanner.
        </p>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 mb-4 gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('curl')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'curl'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            cURL Request
          </button>
          <button
            onClick={() => setActiveTab('response')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'response'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            JSON Schema Response
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Request Sandbox Key
          </button>
        </div>

        {activeTab === 'curl' && (
          <div className="relative">
            <button
              onClick={() => handleCopy(sampleCurl)}
              className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 flex items-center gap-1.5 z-10"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCurl ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed">
              {sampleCurl}
            </pre>
          </div>
        )}

        {activeTab === 'response' && (
          <div className="relative">
            <button
              onClick={() => handleCopy(sampleResponse)}
              className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs border border-slate-700 flex items-center gap-1.5 z-10"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCurl ? 'Copied' : 'Copy'}</span>
            </button>
            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {sampleResponse}
            </pre>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            {submitted ? (
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white mb-1">Sandbox Credentials Issued!</h4>
                <p className="text-xs text-slate-300 mb-4">
                  We sent your free 1,000-call developer API token and documentation link to <strong>{email}</strong>.
                </p>
                <button
                  onClick={() => setActiveTab('curl')}
                  className="gradient-btn-primary px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  View Integration Code
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestAccess} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Business Email</label>
                  <input
                    type="email"
                    required
                    placeholder="engineering@dealership.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Platform Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Auto Parts Network"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full gradient-btn-primary py-3 rounded-xl text-xs font-semibold"
                >
                  Generate Free Sandbox Key
                </button>
              </form>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>Enterprise SLA: 99.9% uptime · Dedicated endpoint provisioned in &lt; 24h</span>
        </div>
      </div>
    </div>
  );
};
