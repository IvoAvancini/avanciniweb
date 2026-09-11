"use client";

import { useState } from "react";
import { MotoraProvider, useMotora } from "./store/useMotoraStore";
import { Vehicle } from "./types";
import "./motora.css";

// Components
import { Header } from "./components/Header";
import { ComparisonBar } from "./components/ComparisonBar";
import { LeadModal } from "./components/LeadModal";
import { TestDriveModal } from "./components/TestDriveModal";
import { TradeInModal } from "./components/TradeInModal";
import { MockWhatsAppModal } from "./components/MockWhatsAppModal";
import { SearchOverlay } from "./components/SearchOverlay";
import { ToastContainer } from "./components/Toast";
import { Footer } from "./components/Footer";

// Pages
import { HomePage } from "./pages/HomePage";
import { VehiclesListingPage } from "./pages/VehiclesListingPage";
import { VehicleDetailPage } from "./pages/VehicleDetailPage";
import { ComparePage } from "./pages/ComparePage";
import { FinancingPage } from "./pages/FinancingPage";
import { TradeInPage } from "./pages/TradeInPage";
import { TestDrivePage } from "./pages/TestDrivePage";
import { OffersPage } from "./pages/OffersPage";
import { ServicesPage } from "./pages/ServicesPage";
import { StoresPage } from "./pages/StoresPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { GaragePage } from "./pages/GaragePage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";

function MotoraContent() {
  const { vehicles, setFilters, openWhatsAppModal } = useMotora();

  const [activeView, setActiveView] = useState<string>("home");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(vehicles[0] || null);

  const navigateTo = (view: string, param?: string) => {
    if (param === "new") {
      setFilters((p) => ({ ...p, condition: "novo" }));
    } else if (param === "used") {
      setFilters((p) => ({ ...p, condition: "seminovo" }));
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectVehicle = (v: Vehicle) => {
    setSelectedVehicle(v);
    setActiveView("vehicle-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="motora-app">
      {/* HEADER */}
      <Header onNavigate={navigateTo} activeView={activeView} />

      {/* VIEW ROUTER */}
      <main>
        {activeView === "home" && (
          <HomePage
            onSelectVehicle={handleSelectVehicle}
            onNavigate={navigateTo}
          />
        )}

        {activeView === "vehicles" && (
          <VehiclesListingPage
            onSelectVehicle={handleSelectVehicle}
            onNavigateHome={() => navigateTo("home")}
          />
        )}

        {activeView === "vehicle-detail" && selectedVehicle && (
          <VehicleDetailPage
            vehicle={selectedVehicle}
            onSelectVehicle={handleSelectVehicle}
            onNavigateHome={() => navigateTo("home")}
            onNavigateStock={() => navigateTo("vehicles")}
          />
        )}

        {activeView === "compare" && (
          <ComparePage
            onExploreStock={() => navigateTo("vehicles")}
          />
        )}

        {activeView === "financing" && (
          <FinancingPage
            onExploreStock={() => navigateTo("vehicles")}
          />
        )}

        {activeView === "tradein" && (
          <TradeInPage
            onExploreStock={() => navigateTo("vehicles")}
          />
        )}

        {activeView === "testdrive" && (
          <TestDrivePage />
        )}

        {activeView === "offers" && (
          <OffersPage
            onSelectVehicle={handleSelectVehicle}
          />
        )}

        {activeView === "services" && (
          <ServicesPage />
        )}

        {activeView === "stores" && (
          <StoresPage
            onExploreStock={() => navigateTo("vehicles")}
          />
        )}

        {activeView === "garage" && (
          <GaragePage
            onSelectVehicle={handleSelectVehicle}
            onExploreStock={() => navigateTo("vehicles")}
            onGoToCompare={() => navigateTo("compare")}
          />
        )}

        {activeView === "favorites" && (
          <FavoritesPage
            onSelectVehicle={handleSelectVehicle}
            onExploreStock={() => navigateTo("vehicles")}
          />
        )}

        {activeView === "contact" && (
          <ContactPage />
        )}

        {activeView === "about" && (
          <AboutPage
            onExploreStock={() => navigateTo("vehicles")}
          />
        )}
      </main>

      {/* FLOATING COMPARISON BAR */}
      <ComparisonBar onGoToCompare={() => navigateTo("compare")} />

      {/* FLOATING WHATSAPP TRIGGER WITH SMART OFFSET ON MOBILE PDP */}
      <button
        type="button"
        className={`m-whatsapp-trigger ${activeView === "vehicle-detail" ? "with-sticky-cta" : ""}`}
        onClick={openWhatsAppModal}
        aria-label="Abrir WhatsApp MOTORA"
        title="Falar com Consultor"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
        </svg>
      </button>

      {/* MODALS */}
      <LeadModal />
      <TestDriveModal />
      <TradeInModal />
      <MockWhatsAppModal onSelectOption={navigateTo} />
      <SearchOverlay onSelectVehicle={handleSelectVehicle} />

      {/* TOASTS */}
      <ToastContainer />

      {/* FOOTER */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

export default function MotoraPage() {
  return (
    <MotoraProvider>
      <MotoraContent />
    </MotoraProvider>
  );
}
