import React, { useState } from 'react';
import { Car, Camera, History, Wrench, Menu, X, Palette, Check, Download } from 'lucide-react';
import { useTheme, THEME_OPTIONS, ThemeColor } from '../context/ThemeContext';

export type NavTab = 'part-scanner' | 'car-scanner' | 'brands' | 'catalog' | 'guides' | 'about' | 'contact';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  historyCount: number;
  onOpenHistory: () => void;
  onOpenMechanicModal: () => void;
  onOpenExportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  historyCount,
  onOpenHistory,
  onOpenMechanicModal,
  onOpenExportModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks: { id: NavTab; label: string }[] = [
    { id: 'part-scanner', label: 'Part Identifier' },
    { id: 'car-scanner', label: 'Car Identifier' },
    { id: 'brands', label: 'Brand Directory' },
    { id: 'catalog', label: 'Parts Catalog' },
    { id: 'guides', label: 'Repair Guides' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const currentThemeObj = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark with Pathan Motors branding */}
        <button
          onClick={() => handleNavClick('part-scanner')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300"
            style={{ background: 'var(--theme-gradient)' }}
          >
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
              <Car className="w-5 h-5 text-theme-primary group-hover:brightness-125 transition-all" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white leading-tight">
                Car Part <span className="text-theme-gradient">Identifier</span>
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
                PATHAN MOTORS
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-400 font-medium uppercase -mt-0.5">
              Pathan Motors Automotive Vision AI
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <ul className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white border shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--accent-glow)',
                          borderColor: 'var(--primary-color)',
                          color: '#ffffff',
                        }
                      : {}
                  }
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Zone 3: Actions + Theme Color Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Color Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-colors"
              title="Change Theme Colour"
            >
              <div
                className="w-3.5 h-3.5 rounded-full ring-2 ring-white/20"
                style={{ backgroundColor: currentThemeObj.hex }}
              />
              <span className="capitalize">{currentThemeObj.name.split('/')[0].trim()}</span>
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-950 border border-slate-800 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-800/80 mb-1">
                  Change Theme Colour
                </div>
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setTheme(opt.id);
                      setThemeDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      theme === opt.id
                        ? 'bg-slate-900 text-white font-bold border border-slate-700'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full ring-1 ring-white/30 flex-shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <span>{opt.name}</span>
                    </div>
                    {theme === opt.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-colors shadow-sm"
            title="Download HTML File"
          >
            <Download className="w-3.5 h-3.5 text-theme-primary" />
            <span>Download HTML</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800 transition-colors"
            title="Scan History"
          >
            <History className="w-3.5 h-3.5 text-theme-primary" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-800 text-white text-[10px] font-bold tabular-nums">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('car-scanner')}
            className="gradient-btn-primary px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Car</span>
          </button>
        </div>

        {/* Mobile menu and theme buttons */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Quick theme cycle on mobile */}
          <button
            onClick={() => {
              const currentIdx = THEME_OPTIONS.findIndex((t) => t.id === theme);
              const nextIdx = (currentIdx + 1) % THEME_OPTIONS.length;
              setTheme(THEME_OPTIONS[nextIdx].id);
            }}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/60"
            title="Toggle theme color"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: currentThemeObj.hex }}
            />
          </button>
          <button
            onClick={onOpenHistory}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/60"
            aria-label="Scan History"
          >
            <History className="w-4 h-4 text-theme-primary" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-200 border border-slate-700/60 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2 backdrop-blur-xl">
          <div className="px-3 py-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
            <span>PATHAN MOTORS WORKSHOP</span>
            <span className="text-[10px] text-slate-400">THEME: {currentThemeObj.name}</span>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-slate-900 text-white font-bold border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                onOpenExportModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-theme-primary" />
              <span>Download Standalone HTML</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onOpenMechanicModal();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-medium border border-slate-700 flex items-center justify-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5 text-theme-primary" />
                <span>Pathan Support</span>
              </button>
              <button
                onClick={() => handleNavClick('car-scanner')}
                className="flex-1 gradient-btn-primary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan Car</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
