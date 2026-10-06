import React, { useState } from 'react';
import { Search, ChevronRight, Layers, Car, Globe, Wrench } from 'lucide-react';
import { AUTOMOTIVE_BRANDS, BrandInfo } from '../data/partsData';

interface BrandsDirectoryProps {
  onSelectBrandForScanning: (brand: BrandInfo) => void;
}

export const BrandsDirectory: React.FC<BrandsDirectoryProps> = ({
  onSelectBrandForScanning,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const filteredBrands = AUTOMOTIVE_BRANDS.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.popularModels.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      brand.topParts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCountry = selectedCountry === 'all' || brand.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const countries = ['all', 'USA', 'Japan', 'Germany', 'India'];

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Globe className="w-3.5 h-3.5 text-theme-primary" />
          <span>OEM Part Directory & Catalogues</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Automotive <span className="text-theme-gradient">Brand Identifiers</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Explore manufacturer-specific OEM numbering patterns, common failure points, and specialized visual identification parameters for major automotive brands worldwide.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search make, model, or part..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input pl-10 pr-4 py-2 rounded-xl text-xs w-full placeholder:text-slate-500"
          />
        </div>

        {/* Country filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCountry(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedCountry === c
                  ? 'bg-cyan-500 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {c === 'all' ? 'All Origins' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBrands.map((brand) => (
          <div
            key={brand.slug}
            className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md"
                    style={{ backgroundColor: brand.accentColor }}
                  >
                    {brand.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{brand.name}</h3>
                    <p className="text-xs text-slate-400">
                      Origin: {brand.country} · Est. {brand.founded}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectBrandForScanning(brand)}
                  className="gradient-btn-primary px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Filter Scanner</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* OEM Format */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs mb-4">
                <span className="text-slate-400 font-medium block mb-0.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>OEM Part Number Pattern:</span>
                </span>
                <span className="text-cyan-300 font-mono font-medium">{brand.oemCodeFormat}</span>
              </div>

              {/* Popular Models */}
              <div className="mb-4 text-xs">
                <span className="text-slate-400 block mb-1.5 font-medium flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-slate-400" />
                  <span>Key Vehicles Supported:</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {brand.popularModels.map((model) => (
                    <span
                      key={model}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px]"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frequently Replaced Parts */}
              <div className="mb-4 text-xs">
                <span className="text-slate-400 block mb-1.5 font-medium flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-amber-400" />
                  <span>Top High-Demand Parts:</span>
                </span>
                <ul className="space-y-1 text-slate-300">
                  {brand.topParts.map((part, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{part}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Verified OEM Catalog Mapping</span>
              <button
                onClick={() => onSelectBrandForScanning(brand)}
                className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
              >
                <span>Launch Scanner for {brand.name}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
