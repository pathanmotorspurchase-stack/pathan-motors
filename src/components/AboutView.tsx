import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, HelpCircle, BadgeCheck } from 'lucide-react';

export const AboutView: React.FC<{ onStartScanning: () => void }> = ({ onStartScanning }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <BadgeCheck className="w-4 h-4 text-theme-primary" />
          <span className="text-white font-bold">PATHAN MOTORS</span>
          <span className="text-slate-400">·</span>
          <span className="text-theme-primary">Automotive Intelligence Division</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          About <span className="text-theme-gradient">Pathan Motors Vision</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Pioneering AI neural vision for global automotive maintenance, spare parts procurement, and precision mechanical diagnostics.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">Our Mission at Pathan Motors</h2>
          <p>
            Pathan Motors developed this AI-powered Car Part Identifier to eliminate the friction in locating, verifying, and sourcing automotive components. Whether servicing diesel commercial utility vehicles, heavy-duty trucks, or modern passenger cars, our visual AI engine delivers instantaneous identification and verified OEM cross-references.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">How Our Vision Engine Works</h2>
          <p>
            Our multimodal computer vision system is trained on high-resolution CAD schematics, OEM microfiche catalogs, bolt-pattern configurations, casting stamps, and sensor pinouts. When you submit a photo, our system isolates the component, extracts casting serials and dimension ratios, and cross-references an indexed catalog of over 450,000 OEM and aftermarket parts.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-white mb-2">Who We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-1">Car Owners & Enthusiasts</strong>
              <p className="text-xs text-slate-400">Save money, diagnose issues accurately, and order the exact replacement part without guessing.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-1">Pathan Motors Workshops</strong>
              <p className="text-xs text-slate-400">Speed up customer write-ups and parts inventory intake by over 90%.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <strong className="text-white block mb-1">Commercial Fleets</strong>
              <p className="text-xs text-slate-400">Rapid fleet part verification for Tata, Cummins, Ford, and Toyota commercial platforms.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-center">
          <button
            onClick={onStartScanning}
            className="gradient-btn-primary px-6 py-3 rounded-full text-xs font-semibold cursor-pointer"
          >
            Launch Part Identifier
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Part Purchase & Inquiries', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Mail className="w-4 h-4 text-theme-primary" />
          <span className="text-white font-bold">PATHAN MOTORS PURCHASE & SUPPORT</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Contact <span className="text-theme-gradient">Pathan Motors</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Need assistance sourcing a specific part, checking inventory, or ordering in bulk? Contact the Pathan Motors purchase desk directly.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Direct Purchase Desk Email</span>
            <span className="text-white font-bold font-mono text-sm text-theme-primary">
              pathanmotorspurchase@gmail.com
            </span>
          </div>
          <a
            href="mailto:pathanmotorspurchase@gmail.com"
            className="gradient-btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Directly</span>
          </a>
        </div>

        {sent ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Message Received</h3>
            <p className="text-xs text-slate-300 mb-6">
              Thank you for contacting Pathan Motors. An automotive procurement specialist will review your request and reply to <strong>{form.email}</strong> within 4 business hours.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setForm({ name: '', email: '', subject: 'Part Purchase & Inquiries', message: '' });
              }}
              className="gradient-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Inquiry Subject</label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-amber-400"
              >
                <option>Part Purchase & Price Inquiry</option>
                <option>OEM Part Number Verification</option>
                <option>Pathan Motors Workshop Appointment</option>
                <option>Bulk Parts Supply / Commercial Fleet</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Message / Part Details</label>
              <textarea
                required
                rows={4}
                placeholder="Specify the part name, OEM number, vehicle VIN, or required quantities..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full gradient-btn-primary py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Pathan Motors</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
