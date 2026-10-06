import React from 'react';
import { Car, BadgeCheck } from 'lucide-react';
import { NavTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onFilterMake: (make: string) => void;
  onOpenExportModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onFilterMake, onOpenExportModal }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl relative overflow-hidden text-slate-400">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, var(--accent-glow) 50%, transparent 100%)',
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <button
              onClick={() => onSelectTab('part-scanner')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div
                className="w-9 h-9 rounded-xl p-0.5 shadow-md"
                style={{ background: 'var(--theme-gradient)' }}
              >
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                  <Car className="w-4 h-4 text-theme-primary" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-tight">
                  Car Part <span className="text-theme-gradient">Identifier</span>
                </span>
                <span className="text-[10px] tracking-wider text-amber-400 font-bold uppercase">
                  PATHAN MOTORS
                </span>
              </div>
            </button>
            <p className="text-xs leading-relaxed text-slate-400">
              Next-generation AI-powered automotive visual search engine powered by Pathan Motors. Instantly identify car parts, OEM numbers, and full vehicle specifications from any photo.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <BadgeCheck className="w-4 h-4 text-theme-primary" />
              <span>Pathan Motors Purchase & Auto Care</span>
            </div>
          </div>

          {/* Core Identifiers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-primary" />
              <span>Core Identifiers</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('part-scanner')}
                  className="hover:text-white transition-colors text-left"
                >
                  AI Part Identification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('car-scanner')}
                  className="hover:text-white transition-colors text-left"
                >
                  Full Car Model Specs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('brands')}
                  className="hover:text-white transition-colors text-left"
                >
                  Brand Identifiers Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('catalog')}
                  className="hover:text-white transition-colors text-left"
                >
                  Parts Catalog Search
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Makes */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-primary" />
              <span>Popular Makes</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onFilterMake('Ford')}
                  className="hover:text-white transition-colors text-left"
                >
                  Ford Parts Identification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterMake('Toyota')}
                  className="hover:text-white transition-colors text-left"
                >
                  Toyota Parts Identification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterMake('Tata Motors')}
                  className="hover:text-white transition-colors text-left font-semibold text-slate-300"
                >
                  Tata Motors Diesel Parts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterMake('BMW')}
                  className="hover:text-white transition-colors text-left"
                >
                  BMW Parts Identification
                </button>
              </li>
              <li>
                <button
                  onClick={() => onFilterMake('Volkswagen')}
                  className="hover:text-white transition-colors text-left"
                >
                  Volkswagen Parts Identification
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-primary" />
              <span>Pathan Motors Support</span>
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Pathan Motors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact Support / Purchase Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('guides')}
                  className="hover:text-white transition-colors text-left"
                >
                  Repair DIY Guides
                </button>
              </li>
              {onOpenExportModal && (
                <li>
                  <button
                    onClick={onOpenExportModal}
                    className="hover:text-theme-primary transition-colors text-left font-semibold text-white flex items-center gap-1"
                  >
                    <span>Download Standalone HTML</span>
                  </button>
                </li>
              )}
              <li className="text-[11px] text-slate-500 pt-1">
                Affiliate Disclosure: Qualifying purchases via external links may generate commissions.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1 text-slate-400">
            Engineered for{' '}
            <span className="text-white font-bold inline-flex items-center gap-1">
              PATHAN MOTORS
            </span>
          </p>
          <p className="text-slate-400">© 2026 Car Part Identifier · Pathan Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
