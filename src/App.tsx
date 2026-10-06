import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { PartScanner } from './components/PartScanner';
import { CarIdentifier } from './components/CarIdentifier';
import { BrandsDirectory } from './components/BrandsDirectory';
import { PartsCatalog } from './components/PartsCatalog';
import { BlogGuides } from './components/BlogGuides';
import { AboutView, ContactView } from './components/AboutView';
import { MechanicModal } from './components/MechanicModal';
import { WhiteLabelModal } from './components/WhiteLabelModal';
import { ExportModal } from './components/ExportModal';
import { ScanHistoryDrawer, HistoryItem } from './components/ScanHistoryDrawer';
import { Footer } from './components/Footer';
import { CarPart, BrandInfo, SAMPLE_PARTS } from './data/partsData';
import { partDieselSeparator } from './assets/images';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [currentTab, setCurrentTab] = useState<NavTab>('part-scanner');
  
  // Modals state
  const [isMechanicModalOpen, setIsMechanicModalOpen] = useState(false);
  const [mechanicPart, setMechanicPart] = useState<CarPart | null>(null);
  const [mechanicVehicle, setMechanicVehicle] = useState<{ make: string; model: string; year: string } | undefined>(undefined);
  
  const [isWhiteLabelModalOpen, setIsWhiteLabelModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);

  // Scan History
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('cpi_saved_scans_v1');
      if (stored) {
        setHistoryItems(JSON.parse(stored));
      } else {
        // Pre-populate with the initial identified component from the user's prompt!
        const initialItem: HistoryItem = {
          id: 'hist-1',
          part: SAMPLE_PARTS[0],
          imageSrc: partDieselSeparator,
          timestamp: 'Just now',
        };
        setHistoryItems([initialItem]);
        localStorage.setItem('cpi_saved_scans_v1', JSON.stringify([initialItem]));
      }
    } catch {
      // fallback
    }
  }, []);

  const handleSaveToHistory = (part: CarPart, imageSrc: string) => {
    const newItem: HistoryItem = {
      id: `scan-${Date.now()}`,
      part,
      imageSrc,
      timestamp: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setHistoryItems((prev) => {
      // Avoid duplicate top item
      const filtered = prev.filter((p) => p.part.name !== part.name);
      const updated = [newItem, ...filtered].slice(0, 15);
      try {
        localStorage.setItem('cpi_saved_scans_v1', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
    try {
      localStorage.removeItem('cpi_saved_scans_v1');
    } catch {}
  };

  const handleSelectBrand = (brand: BrandInfo) => {
    setCurrentTab('part-scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMechanic = (part?: CarPart, vehicle?: { make: string; model: string; year: string }) => {
    setMechanicPart(part || null);
    setMechanicVehicle(vehicle);
    setIsMechanicModalOpen(true);
  };

  const handleInspectPartFromCatalog = (part: CarPart) => {
    setCurrentTab('part-scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        historyCount={historyItems.length}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        onOpenMechanicModal={() => handleOpenMechanic()}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {currentTab === 'part-scanner' && (
          <PartScanner
            onSelectBrand={handleSelectBrand}
            onOpenMechanicModal={handleOpenMechanic}
            onOpenWhiteLabelModal={() => setIsWhiteLabelModalOpen(true)}
            onNavigateToCarScanner={() => {
              setCurrentTab('car-scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSaveToHistory={handleSaveToHistory}
          />
        )}

        {currentTab === 'car-scanner' && (
          <CarIdentifier
            onScanPartForCar={(make, model, year) => {
              setCurrentTab('part-scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMechanicModal={handleOpenMechanic}
          />
        )}

        {currentTab === 'brands' && (
          <BrandsDirectory
            onSelectBrandForScanning={handleSelectBrand}
          />
        )}

        {currentTab === 'catalog' && (
          <PartsCatalog
            onInspectPartInScanner={handleInspectPartFromCatalog}
            onOpenMechanicModal={(part) => handleOpenMechanic(part)}
          />
        )}

        {currentTab === 'guides' && (
          <BlogGuides
            onGoToScanner={() => {
              setCurrentTab('part-scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            onStartScanning={() => {
              setCurrentTab('part-scanner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* Modals & Drawers */}
      <MechanicModal
        isOpen={isMechanicModalOpen}
        onClose={() => setIsMechanicModalOpen(false)}
        initialPart={mechanicPart}
        initialVehicle={mechanicVehicle}
      />

      <WhiteLabelModal
        isOpen={isWhiteLabelModalOpen}
        onClose={() => setIsWhiteLabelModalOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <ScanHistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        items={historyItems}
        onSelectHistoryItem={(item) => {
          setCurrentTab('part-scanner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onClearHistory={handleClearHistory}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onFilterMake={(make) => {
          setCurrentTab('part-scanner');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
