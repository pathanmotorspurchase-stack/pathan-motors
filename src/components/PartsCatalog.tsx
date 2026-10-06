import React, { useState } from 'react';
import {
  Search,
  Wrench,
  Clock,
  Layers,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { CATALOG_DATABASE, CarPart } from '../data/partsData';

interface PartsCatalogProps {
  onInspectPartInScanner: (part: CarPart) => void;
  onOpenMechanicModal: (part: CarPart) => void;
}

export const PartsCatalog: React.FC<PartsCatalogProps> = ({
  onInspectPartInScanner,
  onOpenMechanicModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = [
    'All',
    'Fuel System',
    'Electrical',
    'Braking',
    'Engine',
    'Ignition',
    'Cooling',
    'Suspension'
  ];

  const difficulties = ['All', 'Easy', 'Moderate', 'Difficult'];

  const filteredParts = CATALOG_DATABASE.filter((part) => {
    const matchesSearch =
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.oemNumbers.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
      part.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || part.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5 text-theme-primary" />
          <span>Automotive Component Directory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Comprehensive <span className="text-theme-gradient">Parts Catalog</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Explore specifications, failure symptoms, DIY installation difficulty, and verified OEM cross-references for essential automotive powertrain and chassis components.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 mb-8 space-y-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by part name, OEM number, manufacturer, or symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input pl-10 pr-4 py-2.5 rounded-xl text-xs w-full placeholder:text-slate-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white font-semibold'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-slate-400 text-xs flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Difficulty:</span>
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-400"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Parts List */}
      <div className="space-y-4">
        {filteredParts.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No parts match your filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredParts.map((part) => (
            <div
              key={part.id}
              className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row gap-6 justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px] font-semibold uppercase">
                    {part.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                      part.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : part.difficulty === 'Moderate'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {part.difficulty} DIY
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{part.laborHours}</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    Est. Cost: <strong className="text-white font-mono">{part.estimatedPrice}</strong>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{part.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{part.description}</p>

                {/* Compatibility and OEM */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 mb-3 space-y-1">
                  <div>
                    <strong className="text-slate-400">OEM Cross-References: </strong>
                    <span className="font-mono text-cyan-300">
                      {part.oemNumbers.join(' · ')}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-400">Primary Fitment: </strong>
                    <span>{part.compatibility}</span>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    Warning Signs & Failure Indicators:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-0.5">
                    {part.symptoms.slice(0, 2).map((s, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex md:flex-col justify-end gap-2.5 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 md:w-48 flex-shrink-0">
                <button
                  onClick={() => onInspectPartInScanner(part)}
                  className="gradient-btn-primary py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 w-full cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Inspect in Scanner</span>
                </button>

                <a
                  href={`https://www.amazon.com/s?k=${encodeURIComponent(part.name + ' ' + part.oemNumbers[0])}&tag=carpartid-20`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-btn-secondary py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 w-full"
                >
                  <span>Amazon</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(part.name + ' ' + part.oemNumbers[0])}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-btn-secondary py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 w-full"
                >
                  <span>eBay</span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>

                <button
                  onClick={() => onOpenMechanicModal(part)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 py-1 font-medium text-center flex items-center justify-center gap-1"
                >
                  <Wrench className="w-3 h-3" />
                  <span>Quote Install</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
