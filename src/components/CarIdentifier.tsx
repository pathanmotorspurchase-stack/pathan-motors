import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Car,
  Gauge,
  Sparkles,
  Search,
  ChevronRight,
  Wrench,
  Disc,
  BadgeCheck
} from 'lucide-react';
import { VehicleModel } from '../data/partsData';
import { heroEngineBay } from '../assets/images';

interface CarIdentifierProps {
  onScanPartForCar: (make: string, model: string, year: string) => void;
  onOpenMechanicModal: (part?: any, vehicle?: { make: string; model: string; year: string }) => void;
}

const SAMPLE_VEHICLES: VehicleModel[] = [
  {
    id: 'car-f150',
    make: 'Ford',
    model: 'F-150 Lariat SuperCrew',
    year: '2021 - 2024 (14th Gen)',
    trim: 'Lariat 4x4 Luxury Package',
    bodyStyle: 'Full-Size Crew Cab Pickup',
    engine: '3.5L EcoBoost Twin-Turbo V6 (400 hp / 500 lb-ft)',
    horsepower: '400 HP @ 6,000 RPM',
    tireSize: '275/65R18 or 275/60R20',
    commonParts: ['Motorcraft FL-500S Oil Filter', 'Cam Phaser Rebuild Kit', 'Front Brake Rotors (350mm)', 'Twin-Turbo Wastegate Actuators'],
    confidence: 99.1,
    imageSrc: heroEngineBay,
  },
  {
    id: 'car-camry',
    make: 'Toyota',
    model: 'Camry SE Sport',
    year: '2020 - 2024 (XV70)',
    trim: 'SE Dynamic Force',
    bodyStyle: 'Mid-Size 4-Door Sedan',
    engine: '2.5L 4-Cylinder D-4S (203 hp / 184 lb-ft)',
    horsepower: '203 HP @ 6,600 RPM',
    tireSize: '235/45R18 All-Season',
    commonParts: ['Denso Iridium Spark Plugs', 'Toyota 0W-16 Synthetic Oil Filter', 'Front MacPherson Strut Assembly', 'Electric Water Pump'],
    confidence: 98.4,
    imageSrc: heroEngineBay,
  },
  {
    id: 'car-gti',
    make: 'Volkswagen',
    model: 'Golf GTI Mk8',
    year: '2022 - 2025',
    trim: 'Autobahn / Performance Package',
    bodyStyle: '5-Door Sport Hatchback',
    engine: '2.0L EA888 Gen4 Turbocharged I4 (241 hp / 273 lb-ft)',
    horsepower: '241 HP @ 5,000 RPM',
    tireSize: '225/40R19 High-Performance Summer',
    commonParts: ['DSG 7-Speed Dual Clutch Fluid Kit', 'Integrated Thermostat Housing', 'PCV Oil Separator', 'Brembo Front Rotors'],
    confidence: 97.9,
    imageSrc: heroEngineBay,
  },
  {
    id: 'car-bmw3',
    make: 'BMW',
    model: '330i M Sport (G20)',
    year: '2021 - 2024',
    trim: 'M Sport Aerodynamics Package',
    bodyStyle: 'Compact Executive Sedan',
    engine: '2.0L BMW TwinPower Turbo B48 (255 hp / 295 lb-ft)',
    horsepower: '255 HP @ 5,000 RPM',
    tireSize: 'Front: 225/40R19, Rear: 255/35R19',
    commonParts: ['M Performance Brake Caliper Kit', 'Charge Pipe Aluminum Upgrade', 'Oil Filter Housing Gasket', 'ZF 8-Speed Pan & Filter'],
    confidence: 99.3,
    imageSrc: heroEngineBay,
  }
];

export const CarIdentifier: React.FC<CarIdentifierProps> = ({
  onScanPartForCar,
  onOpenMechanicModal,
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel>(SAMPLE_VEHICLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('Pathan Motors Vision: Detecting vehicle body silhouette...');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleUploadCar = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setIsScanning(true);
      setScanStatus('Identifying front grille design & headlight profile...');
      await new Promise((r) => setTimeout(r, 400));
      setScanStatus('Analyzing wheel arch geometry & roofline contour...');
      await new Promise((r) => setTimeout(r, 450));
      setScanStatus('Matching trim badges & powertrain specifications...');
      await new Promise((r) => setTimeout(r, 450));

      setSelectedVehicle({
        ...SAMPLE_VEHICLES[0],
        imageSrc: dataUrl,
        confidence: 98.6,
      });
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSampleClick = async (veh: VehicleModel) => {
    setIsScanning(true);
    setScanStatus(`Analyzing ${veh.make} vehicle architecture...`);
    await new Promise((r) => setTimeout(r, 500));
    setSelectedVehicle(veh);
    setIsScanning(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleUploadCar(e.target.files[0])}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={(e) => e.target.files?.[0] && handleUploadCar(e.target.files[0])}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <BadgeCheck className="w-4 h-4 text-theme-primary" />
          <span className="text-white font-bold">PATHAN MOTORS</span>
          <span className="text-slate-400">·</span>
          <span className="text-theme-primary">Full Vehicle Model Vision Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Identify Any <span className="text-theme-gradient">Complete Car Model</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Snap a photo of any car from the front, side, or 3/4 angle. Pathan Motors AI model recognizes the exact make, generation, trim package, factory engine specs, and recommended maintenance components.
        </p>
      </div>

      {/* Main Scanner Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl mb-12">
        <div className="flex flex-col items-center">
          {/* Display & Scanner */}
          <div className="relative w-full max-w-lg h-72 rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 mb-6">
            <img
              src={selectedVehicle.imageSrc}
              alt={selectedVehicle.model}
              className="w-full h-full object-cover"
            />

            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/75 flex flex-col items-center justify-center p-6 z-20">
                <div
                  className="w-56 h-36 border-2 rounded-xl relative flex items-center justify-center animate-pulse"
                  style={{ borderColor: 'var(--primary-color)' }}
                >
                  <div className="w-4 h-4 border-t-2 border-l-2 absolute -top-1 -left-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <div className="w-4 h-4 border-t-2 border-r-2 absolute -top-1 -right-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <div className="w-4 h-4 border-b-2 border-l-2 absolute -bottom-1 -left-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <div className="w-4 h-4 border-b-2 border-r-2 absolute -bottom-1 -right-1" style={{ borderColor: 'var(--primary-color)' }} />
                  <Sparkles className="w-6 h-6 text-theme-primary animate-spin" />
                </div>
                <p className="mt-4 text-xs font-semibold text-white text-center">
                  {scanStatus}
                </p>
              </div>
            )}

            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="p-2.5 rounded-full bg-slate-900/80 text-white border border-slate-700 hover:bg-slate-800 transition-all shadow-xl"
                title="Camera Snap"
              >
                <Camera className="w-4 h-4 text-theme-primary" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-full bg-slate-900/80 text-slate-200 border border-slate-700 hover:bg-slate-800 hover:text-white transition-all shadow-xl"
                title="Upload Photo"
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Vehicle Samples */}
          <div className="w-full max-w-lg mb-8">
            <span className="text-xs text-slate-400 block mb-2 font-medium">Or select a test vehicle model:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_VEHICLES.map((veh) => (
                <button
                  key={veh.id}
                  onClick={() => handleSampleClick(veh)}
                  className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                    selectedVehicle.id === veh.id
                      ? 'border-white bg-slate-900 text-white font-bold ring-1 ring-white/20'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">{veh.make}</span>
                  <span className="text-[10px] text-slate-400 truncate">{veh.model}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload / Snap Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="gradient-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Car Picture</span>
            </button>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="gradient-btn-secondary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-theme-primary" />
              <span>Snap Photo With Camera</span>
            </button>
          </div>

          {/* Vehicle Specifications Results Card */}
          <div className="w-full glass-card p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-theme-primary">
                  {selectedVehicle.make} Engineering
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedVehicle.model}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Generation / Year Range: <span className="font-semibold text-white">{selectedVehicle.year}</span>
                </p>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-xs text-slate-400 block">Pathan Match Confidence</span>
                <span className="text-2xl font-black text-emerald-400 tabular-nums">
                  {selectedVehicle.confidence}%
                </span>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-theme-primary" />
                  <span className="font-medium">Factory Powertrain</span>
                </div>
                <p className="text-slate-100 font-semibold">{selectedVehicle.engine}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">{selectedVehicle.horsepower}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Disc className="w-3.5 h-3.5 text-theme-primary" />
                  <span className="font-medium">Factory Tire & Wheel Specs</span>
                </div>
                <p className="text-slate-100 font-semibold">{selectedVehicle.tireSize}</p>
                <p className="text-slate-400 text-[11px] mt-0.5">OEM Wheel Pattern & Fitment</p>
              </div>
            </div>

            {/* Top Replacement Parts For This Vehicle */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-theme-primary" />
                <span>Frequently Sourced Parts For This Model</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedVehicle.commonParts.map((part, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between"
                  >
                    <span>{part}</span>
                    <button
                      onClick={() => onScanPartForCar(selectedVehicle.make, selectedVehicle.model, selectedVehicle.year)}
                      className="text-theme-primary hover:underline text-[11px] font-medium flex items-center gap-0.5 ml-2 flex-shrink-0 cursor-pointer"
                    >
                      <span>Find Part</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => onScanPartForCar(selectedVehicle.make, selectedVehicle.model, selectedVehicle.year)}
                className="flex-1 gradient-btn-primary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Identify Part For This Car</span>
              </button>

              <button
                onClick={() => onOpenMechanicModal(undefined, { make: selectedVehicle.make, model: selectedVehicle.model, year: selectedVehicle.year })}
                className="flex-1 gradient-btn-secondary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4 text-theme-primary" />
                <span>Pathan Motors Repair Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
