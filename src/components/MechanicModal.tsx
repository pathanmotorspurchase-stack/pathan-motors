import React, { useState } from 'react';
import { X, Wrench, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Car } from 'lucide-react';
import { CarPart } from '../data/partsData';

interface MechanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPart?: CarPart | null;
  initialVehicle?: { make: string; model: string; year: string };
}

export const MechanicModal: React.FC<MechanicModalProps> = ({
  isOpen,
  onClose,
  initialPart,
  initialVehicle,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCode: '',
    serviceType: 'Mobile Mechanic (On-Site Repair)',
    partName: initialPart?.name || 'Fuel/Water Separator',
    vehicleDetails: `${initialVehicle?.year || '2021'} ${initialVehicle?.make || 'Vehicle'} ${initialVehicle?.model || ''}`.trim(),
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel max-w-lg w-full rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Dispatched to Pathan Motors!</h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
              We have received your repair & parts inquiry for <strong className="text-theme-primary">{formData.partName}</strong>. Pathan Motors technicians will reach out directly to <strong className="text-white">{formData.phone || formData.email}</strong> with parts pricing and labor options.
            </p>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 mb-6 text-left">
              <p><strong>Pathan Work Order:</strong> PM-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>Desk Contact:</strong> pathanmotorspurchase@gmail.com</p>
              <p><strong>Estimated Labor Range:</strong> {initialPart?.laborHours || '1.0 - 1.5 hrs'}</p>
              <p><strong>Warranty:</strong> 12-Month / 12,000-Mile Guarantee</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="gradient-btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-slate-900 text-theme-primary border border-slate-700">
                <Wrench className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                PATHAN MOTORS REPAIR & PARTS DESK
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2">Request Mechanic Help & Parts</h3>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Need assistance installing this component or ordering genuine stock? Get an upfront, transparent estimate from Pathan Motors certified service desk.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Identified Part</label>
                <input
                  type="text"
                  required
                  value={formData.partName}
                  onChange={(e) => setFormData({ ...formData, partName: e.target.value })}
                  className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Vehicle Make / Model / Year</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2021 Ford F-150"
                    value={formData.vehicleDetails}
                    onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
                    className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 90210"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number (For SMS Quote)</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="glass-input px-3.5 py-2.5 rounded-xl w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Service Type</label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3.5 py-2.5 w-full focus:outline-none focus:border-cyan-400"
                >
                  <option>Mobile Mechanic (Comes To Your Home/Work)</option>
                  <option>Local Certified Repair Shop</option>
                  <option>Diagnostic Only</option>
                  <option>Pre-Purchase Inspection</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full gradient-btn-primary py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Submit Free Quote Request</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your information is encrypted and only shared with vetted technicians.</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
