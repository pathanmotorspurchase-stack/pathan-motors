import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Camera,
  Search,
  Wrench,
  RotateCcw,
  Sparkles,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  BookmarkPlus,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  PhoneCall,
  BadgeCheck
} from 'lucide-react';
import { CarPart, SAMPLE_PARTS, AUTOMOTIVE_BRANDS, BrandInfo } from '../data/partsData';
import { analyzeCarPartImage } from '../utils/aiVision';
import {
  partDieselSeparator,
  partAlternator,
  partBrakeCaliper,
  heroEngineBay,
} from '../assets/images';

interface PartScannerProps {
  onSelectBrand: (brand: BrandInfo) => void;
  onOpenMechanicModal: (part?: CarPart, vehicle?: { make: string; model: string; year: string }) => void;
  onOpenWhiteLabelModal: () => void;
  onNavigateToCarScanner: () => void;
  onSaveToHistory: (part: CarPart, imageSrc: string) => void;
}

export const PartScanner: React.FC<PartScannerProps> = ({
  onSelectBrand,
  onOpenMechanicModal,
  onOpenWhiteLabelModal,
  onNavigateToCarScanner,
  onSaveToHistory,
}) => {
  // Vehicle Filter
  const [vehicleFilter, setVehicleFilter] = useState({
    make: '',
    model: '',
    year: '',
  });

  // Active Image & State
  const [selectedImage, setSelectedImage] = useState<string>(partDieselSeparator);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('Initializing Pathan Motors neural detector...');
  const [identifiedPart, setIdentifiedPart] = useState<CarPart | null>(SAMPLE_PARTS[0]);
  const [copiedOem, setCopiedOem] = useState<string | null>(null);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Drag and drop state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Brand carousel index
  const [brandScrollIndex, setBrandScrollIndex] = useState(0);

  // Initialize first sample part image
  useEffect(() => {
    if (SAMPLE_PARTS[0]) {
      SAMPLE_PARTS[0].imageSrc = partDieselSeparator;
    }
    if (SAMPLE_PARTS[1]) {
      SAMPLE_PARTS[1].imageSrc = partAlternator;
    }
    if (SAMPLE_PARTS[2]) {
      SAMPLE_PARTS[2].imageSrc = partBrakeCaliper;
    }
    if (SAMPLE_PARTS[3]) {
      SAMPLE_PARTS[3].imageSrc = heroEngineBay;
    }
  }, []);

  // Handle image upload from file or camera
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      runScan(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // Perform AI Scan
  const runScan = async (imageSrc: string, samplePreset?: CarPart) => {
    setSelectedImage(imageSrc);
    setIsScanning(true);
    setIdentifiedPart(null);

    // Progressive scanning HUD feedback
    setScanStep('Pathan Motors Vision: Scanning edge geometry & contours...');
    await new Promise((r) => setTimeout(r, 400));
    setScanStep('Deciphering OEM casting markings & serial codes...');
    await new Promise((r) => setTimeout(r, 450));
    setScanStep('Matching global parts database & fitment tables...');
    await new Promise((r) => setTimeout(r, 450));

    let result: CarPart;
    if (samplePreset) {
      result = { ...samplePreset, imageSrc };
    } else {
      result = await analyzeCarPartImage(imageSrc, vehicleFilter);
      result.imageSrc = imageSrc;
    }

    setIdentifiedPart(result);
    setIsScanning(false);
    onSaveToHistory(result, imageSrc);
  };

  const handleSelectSample = (sample: CarPart, image: string) => {
    runScan(image, sample);
  };

  const handleCopyOem = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedOem(num);
    setTimeout(() => setCopiedOem(null), 2000);
  };

  const handleShare = () => {
    if (navigator.share && identifiedPart) {
      navigator.share({
        title: `Car Part Identified: ${identifiedPart.name} | Pathan Motors`,
        text: `Identified a ${identifiedPart.name} (${identifiedPart.manufacturer}) via Pathan Motors Car Part Identifier!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `I identified a ${identifiedPart?.name || 'car part'} with Pathan Motors Car Part Identifier!`
      );
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleSaveToGarage = () => {
    if (identifiedPart) {
      onSaveToHistory(identifiedPart, selectedImage);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  // Search links
  const getAmazonSearchUrl = () => {
    if (!identifiedPart) return 'https://www.amazon.com/s?k=car+parts';
    const query = encodeURIComponent(`${identifiedPart.name} ${vehicleFilter.make} ${identifiedPart.oemNumbers[0] || ''}`);
    return `https://www.amazon.com/s?k=${query}&tag=carpartid-20`;
  };

  const getEbaySearchUrl = () => {
    if (!identifiedPart) return 'https://www.ebay.com/b/Auto-Parts-and-Vehicles/6000/bn_1865334';
    const query = encodeURIComponent(`${identifiedPart.name} ${identifiedPart.oemNumbers[0] || ''}`);
    return `https://www.ebay.com/sch/i.html?_nkw=${query}`;
  };

  // Brands scroll navigation
  const nextBrands = () => {
    setBrandScrollIndex((prev) => (prev + 3 >= AUTOMOTIVE_BRANDS.length ? 0 : prev + 3));
  };
  const prevBrands = () => {
    setBrandScrollIndex((prev) => (prev - 3 < 0 ? Math.max(0, AUTOMOTIVE_BRANDS.length - 3) : prev - 3));
  };

  return (
    <div className="w-full">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Hero Header with Pathan Motors branding */}
      <div className="text-center max-w-4xl mx-auto pt-6 pb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-6">
          <BadgeCheck className="w-4 h-4 text-theme-primary" />
          <span className="text-white font-bold">PATHAN MOTORS</span>
          <span className="text-slate-400">·</span>
          <span className="text-theme-primary">AI Automotive Vision Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
          Car Part Identifier <span className="text-theme-gradient">PATHAN MOTORS</span>
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-200 mb-6">
          Discover, Identify, and Source Any Car Part with Pathan Motors Precision
        </h2>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
          Welcome to Pathan Motors Car Part Identifier, your premier automotive intelligence tool.
          Upload or take a photo of any automotive component to analyze specifications, OEM cross-references, vehicle compatibility, and replacement difficulty in seconds.
        </p>

        {/* Quick Contact / Procurement Banner */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 px-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mb-2">
          <span className="flex items-center gap-1.5 font-semibold text-white">
            <Wrench className="w-3.5 h-3.5 text-theme-primary" />
            <span>Pathan Motors Purchase & Workshop Hub:</span>
          </span>
          <span className="text-slate-400">Direct Genuine Parts Sourcing & Mobile Mechanic Dispatch</span>
          <button
            onClick={() => onOpenMechanicModal(identifiedPart || undefined, vehicleFilter)}
            className="text-theme-primary hover:underline font-bold ml-1 flex items-center gap-1 cursor-pointer"
          >
            <span>Inquire Now</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Scanner & Analysis Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 mb-16 border border-slate-800/90 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none pulse-glow"
          style={{ backgroundColor: 'var(--accent-glow)' }}
        />

        {/* Optional Vehicle Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-theme-primary" />
              <span>Optional Vehicle Filter (Make / Model / Year)</span>
            </label>
            <span className="text-[11px] text-slate-400">Pathan Motors Exact Fit Match</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              placeholder="Vehicle Make (e.g. Tata, Ford, Toyota, BMW)"
              value={vehicleFilter.make}
              onChange={(e) => setVehicleFilter({ ...vehicleFilter, make: e.target.value })}
              className="glass-input px-4 py-2.5 rounded-xl text-xs w-full placeholder:text-slate-500"
              type="text"
            />
            <input
              placeholder="Vehicle Model (e.g. Harrier, F-150, Camry, Safari)"
              value={vehicleFilter.model}
              onChange={(e) => setVehicleFilter({ ...vehicleFilter, model: e.target.value })}
              className="glass-input px-4 py-2.5 rounded-xl text-xs w-full placeholder:text-slate-500"
              type="text"
            />
            <input
              placeholder="Vehicle Year (e.g. 2021)"
              value={vehicleFilter.year}
              onChange={(e) => setVehicleFilter({ ...vehicleFilter, year: e.target.value })}
              className="glass-input px-4 py-2.5 rounded-xl text-xs w-full placeholder:text-slate-500"
              type="text"
            />
          </div>
        </div>

        {/* Scanner Work Area */}
        <div className="flex flex-col items-center">
          {/* Main Visual Display & Scan Overlay */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative w-full max-w-md rounded-2xl overflow-hidden border shadow-2xl mb-6 group bg-slate-950 transition-all ${
              isDragging ? 'border-amber-400 ring-2 ring-amber-500/30' : 'border-slate-700/80'
            }`}
          >
            {/* Display Image */}
            <img
              src={selectedImage}
              alt="Uploaded automotive part"
              className="w-full h-72 object-contain bg-slate-950"
            />

            {/* Scanning Laser and Node HUD */}
            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-20">
                {/* Horizontal scan line */}
                <div
                  className="absolute left-0 right-0 h-1 scanner-beam shadow-lg"
                  style={{
                    background: 'var(--theme-gradient)',
                    boxShadow: '0 0 16px var(--primary-color)',
                  }}
                />

                {/* Simulated bounding boxes */}
                <div
                  className="w-48 h-48 border-2 border-dashed rounded-lg relative flex items-center justify-center animate-pulse"
                  style={{ borderColor: 'var(--primary-color)' }}
                >
                  <div className="absolute top-2 left-2 text-[10px] text-white font-mono">
                    PATHAN_VISION: ACTIVE
                  </div>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white">
                    SCORE: 99.8%
                  </div>
                  <div className="w-3 h-3 border-t-2 border-l-2 absolute -top-1 -left-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <div className="w-3 h-3 border-t-2 border-r-2 absolute -top-1 -right-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <div className="w-3 h-3 border-b-2 border-l-2 absolute -bottom-1 -left-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <div className="w-3 h-3 border-b-2 border-r-2 absolute -bottom-1 -right-1" style={{ borderColor: 'var(--primary-color)' }} />
                </div>

                <p className="mt-4 text-xs font-semibold text-white tracking-wide text-center">
                  {scanStep}
                </p>
              </div>
            )}

            {/* Quick Upload / Camera action triggers in image corner */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="p-2 rounded-full bg-slate-900/80 text-white border border-slate-700/80 hover:bg-slate-800 transition-all shadow-xl"
                title="Use Camera to Snap Part"
                aria-label="Use camera"
              >
                <Camera className="w-4 h-4 text-theme-primary" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-full bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all shadow-xl"
                title="Upload New Photo"
                aria-label="Upload photo"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Select Sample Gallery */}
          <div className="w-full max-w-xl mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-medium">Or test with verified part samples:</span>
              <span className="text-[11px] text-theme-primary font-semibold">Click to run AI scan</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleSelectSample(SAMPLE_PARTS[0], partDieselSeparator)}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  identifiedPart?.id === 'sample-fuel-water-separator'
                    ? 'border-white bg-slate-900 text-white font-bold ring-1 ring-white/20'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold truncate">Fuel/Water Separator</span>
                <span className="text-[10px] text-slate-400">TATA / Fleetguard</span>
              </button>

              <button
                onClick={() => handleSelectSample(SAMPLE_PARTS[1], partAlternator)}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  identifiedPart?.id === 'sample-alternator'
                    ? 'border-white bg-slate-900 text-white font-bold ring-1 ring-white/20'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold truncate">High-Output Alternator</span>
                <span className="text-[10px] text-slate-400">Denso 150-Amp</span>
              </button>

              <button
                onClick={() => handleSelectSample(SAMPLE_PARTS[2], partBrakeCaliper)}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  identifiedPart?.id === 'sample-brake-caliper'
                    ? 'border-white bg-slate-900 text-white font-bold ring-1 ring-white/20'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold truncate">Brake Caliper</span>
                <span className="text-[10px] text-slate-400">Brembo Dual-Piston</span>
              </button>

              <button
                onClick={() => handleSelectSample(SAMPLE_PARTS[3], heroEngineBay)}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  identifiedPart?.id === 'sample-turbocharger'
                    ? 'border-white bg-slate-900 text-white font-bold ring-1 ring-white/20'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="font-semibold truncate">Turbocharger Unit</span>
                <span className="text-[10px] text-slate-400">Garrett Twin-Scroll</span>
              </button>
            </div>
          </div>

          {/* Upload Drop Zone Trigger Button */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="gradient-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Part Photo</span>
            </button>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="gradient-btn-secondary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-theme-primary" />
              <span>Take Photo With Camera</span>
            </button>
          </div>

          {/* Identified Results Card */}
          {identifiedPart && (
            <div className="w-full max-w-2xl">
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl transition-all">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-xs font-semibold mb-2 border border-slate-700 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary-color)' }} />
                    <span className="text-white">Identified Component</span>
                    <span className="text-slate-400">· Pathan Motors</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    {identifiedPart.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 text-left sm:text-center">
                    {identifiedPart.description}
                  </p>

                  {/* Compatibility & Details */}
                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 mb-4 text-left">
                    <p className="mb-1">
                      <strong className="text-white">Verified Compatibility: </strong>
                      {identifiedPart.compatibility}
                    </p>
                    <p className="text-slate-400">
                      <strong className="text-slate-300">Manufacturer / OEM Supplier: </strong>
                      {identifiedPart.manufacturer}
                    </p>
                  </div>

                  {/* Difficulty, Labor, Price Metrics */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 mb-6 text-xs text-center">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Difficulty</span>
                      <strong
                        className={`font-bold ${
                          identifiedPart.difficulty === 'Easy'
                            ? 'text-emerald-400'
                            : identifiedPart.difficulty === 'Moderate'
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {identifiedPart.difficulty}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Est. Labor Time</span>
                      <strong className="font-bold text-slate-200">
                        {identifiedPart.laborHours}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Est. Part Cost</span>
                      <strong className="font-bold text-theme-primary">
                        {identifiedPart.estimatedPrice}
                      </strong>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Pathan AI Confidence Score</span>
                      <span className="text-white font-bold tabular-nums">
                        {identifiedPart.confidence}%
                      </span>
                    </div>
                    <div className="bg-slate-800 rounded-full h-2.5 mb-2 p-0.5 overflow-hidden border border-slate-700">
                      <div
                        className="h-full rounded-full shadow-md transition-all duration-500"
                        style={{
                          width: `${identifiedPart.confidence}%`,
                          background: 'var(--btn-gradient)',
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 italic text-center">
                      Always cross-reference OEM part numbers with your vehicle VIN before purchase.
                    </p>
                  </div>
                </div>

                {/* OEM Cross Reference Numbers */}
                <div className="mb-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-theme-primary" />
                      <span>OEM Cross-Reference Part Numbers</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Click to copy</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {identifiedPart.oemNumbers.map((oem) => (
                      <button
                        key={oem}
                        onClick={() => handleCopyOem(oem)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 hover:border-amber-400 transition-colors flex items-center gap-1.5"
                      >
                        <span className="text-theme-primary">{oem}</span>
                        {copiedOem === oem ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-slate-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Symptoms of Failure */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Common Failure Symptoms</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {identifiedPart.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools Required */}
                <div className="mb-6 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-1 font-medium">Recommended DIY Tools:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {identifiedPart.toolsNeeded.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[11px]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <a
                    href={getAmazonSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-btn-primary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search on Amazon</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <a
                    href={getEbaySearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gradient-btn-secondary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4 text-amber-400" />
                    <span>Search on eBay</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <button
                    onClick={() => onOpenMechanicModal(identifiedPart, vehicleFilter)}
                    className="gradient-btn-secondary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Wrench className="w-4 h-4 text-theme-primary" />
                    <span>Pathan Motors Repair Quote</span>
                  </button>

                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                    className="gradient-btn-secondary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Scan Another Part</span>
                  </button>
                </div>

                {/* Save to Garage and Share */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                  <button
                    onClick={handleSaveToGarage}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {savedSuccess ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <BookmarkPlus className="w-4 h-4 text-theme-primary" />
                    )}
                    <span>{savedSuccess ? 'Saved to Garage!' : 'Save Scan to Garage'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-theme-primary" />
                    <span>{shareCopied ? 'Link Copied!' : 'Share Identification'}</span>
                  </button>
                </div>

                <p className="text-[10px] text-slate-500 text-center mt-4">
                  Pathan Motors Automotive Vision · Verified OEM Compatibility Index
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick 3-Step Guide */}
      <div className="glass-panel rounded-3xl p-8 mb-16 border border-slate-800/80 shadow-2xl relative overflow-hidden">
        <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
          <span className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-theme-primary">
            <Zap className="w-4 h-4" />
          </span>
          <span>Pathan Motors 3-Step Part Lookup</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-3xl font-extrabold text-theme-gradient mb-2 block">01</span>
              <h4 className="text-base font-semibold text-white mb-2">Capture or Upload</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Snap a photo of the isolated car part. Works best with clean, well-lit close-ups showing bolt patterns or casting stamps.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-3xl font-extrabold text-theme-gradient mb-2 block">02</span>
              <h4 className="text-base font-semibold text-white mb-2">AI Analysis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pathan Motors neural vision model scans component geometry, connector pins, and casting numbers in real time.
              </p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-3xl font-extrabold text-theme-gradient mb-2 block">03</span>
              <h4 className="text-base font-semibold text-white mb-2">Get Answers & OEM Links</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review part identity, DIY difficulty score, compatible makes, and direct purchase options on Amazon & eBay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Automotive Brands Carousel */}
      <div className="w-full my-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Supported <span className="text-theme-gradient">Automotive Brands</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pathan Motors supports certified OEM catalogues for leading global vehicle manufacturers
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
          <button
            onClick={prevBrands}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-panel border border-slate-700/80 text-slate-300 hover:text-white shadow-xl transition-all"
            aria-label="Previous brands"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="overflow-hidden py-2">
            <div className="flex justify-center gap-4 transition-all duration-300 ease-in-out">
              {AUTOMOTIVE_BRANDS.slice(brandScrollIndex, brandScrollIndex + 4).map((brand) => (
                <button
                  key={brand.slug}
                  onClick={() => onSelectBrand(brand)}
                  className="flex-shrink-0 w-1/2 sm:w-1/3 lg:w-1/4 group text-left cursor-pointer focus:outline-none"
                >
                  <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center h-44 relative overflow-hidden group-hover:border-slate-600 transition-all duration-300">
                    {/* Brand Badge Visual */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 text-white font-extrabold text-xl shadow-lg group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: brand.accentColor }}
                    >
                      {brand.name.substring(0, 2).toUpperCase()}
                    </div>

                    <p className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors flex items-center gap-1.5">
                      <span>{brand.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <span className="text-[11px] text-slate-400 mt-0.5">{brand.country}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={nextBrands}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full glass-panel border border-slate-700/80 text-slate-300 hover:text-white shadow-xl transition-all"
            aria-label="Next brands"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Callout: Identify Entire Vehicle Model */}
      <div className="my-16">
        <div
          onClick={onNavigateToCarScanner}
          className="glass-panel p-8 rounded-3xl border border-slate-800/80 hover:border-slate-600 transition-all duration-300 block group relative overflow-hidden cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-theme-primary text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  Pathan Motors Vehicle Scanner: Identify Full Car Models
                </h3>
                <p className="text-xs text-slate-400">
                  Snap a photo of any complete car to extract trim specs, engine specs, fuel ranges, and tire dimensions.
                </p>
              </div>
            </div>

            <div className="gradient-btn-primary px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 flex-shrink-0">
              <span>Launch Car Scanner</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise White Label API Section */}
      <div className="relative overflow-hidden glass-panel rounded-3xl mb-16 border border-slate-800/80 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-theme-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-theme-primary" />
              <span>Pathan Motors B2B & Dealership API</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Unlock Your Own <span className="text-theme-gradient">Branded Car Part Vision AI</span>
            </h2>

            <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Supercharge your auto dealership, parts marketplace, or repair network with Pathan Motors white-label AI vehicle identification API.
            </p>
          </div>

          <div className="text-center">
            <div className="glass-card p-8 rounded-2xl border border-slate-700/80 mb-8 max-w-2xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Partner with Pathan Motors</h3>
              <p className="text-slate-300 text-sm mb-6">
                Test our real-time REST API endpoints, inspect JSON schemas, or request custom enterprise licensing.
              </p>
              <button
                onClick={onOpenWhiteLabelModal}
                className="inline-flex items-center gap-2 gradient-btn-primary font-bold py-3.5 px-8 rounded-full text-sm shadow-xl cursor-pointer"
              >
                <span>Request Demo / Test API Key</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
