"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { CoraProvider, useCora } from "./store/useCoraStore";
import { Header, Footer } from "./components/HeaderAndFooter";
import { HomePage } from "./pages/HomePage";
import { PropertiesListingPage } from "./pages/PropertiesListingPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { ComparePage, FavoritesPage, MyCoraPage } from "./pages/UserHubPages";
import { SubmitPropertyPage, FinancingSimulatorPage } from "./pages/OperationsPages";
import {
  LaunchesPage,
  NeighborhoodsPage,
  NeighborhoodDetailPage,
  ConsultantsPage,
  AboutPage,
  ContactPage,
} from "./pages/EditorialPages";
import { SearchOverlay } from "./components/SearchBox";
import { ComparisonBar } from "./components/ComparisonBar";
import { VisitModal } from "./components/VisitModal";
import { MockWhatsAppModal, LeadConsultantModal } from "./components/ConciergeModals";
import { GalleryModal, FloorPlanModal } from "./components/GalleryAndStickyModals";
import { ToastContainer } from "./components/CommonComponents";
import { Property } from "./types";
import "./cora.css";

function CoraAppInner() {
  const {
    properties,
    toasts,
    removeToast,
    openWhatsAppModal,
    openVisitModal,
    setFilters,
  } = useCora();

  const [activeView, setActiveView] = useState<string>("home");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedNeighborhoodSlug, setSelectedNeighborhoodSlug] = useState<string>("");

  // Helper para sincronizar URL do navegador com pathnames reais (/cora/imovel/slug)
  const syncFromLocation = useCallback(() => {
    const pathname = window.location.pathname;
    const hash = window.location.hash.replace("#", "");

    // 1. Prioridade: Pathname real (/cora/imovel/:slug)
    if (pathname.includes("/cora/imovel/")) {
      const slug = pathname.split("/cora/imovel/")[1]?.split("/")[0];
      const prop = properties.find((p) => p.slug === slug);
      if (prop) {
        setSelectedProperty(prop);
        setActiveView("property-detail");
        return;
      }
    } else if (pathname.includes("/cora/bairros/")) {
      const slug = pathname.split("/cora/bairros/")[1]?.split("/")[0];
      if (slug) {
        setSelectedNeighborhoodSlug(slug);
        setActiveView("neighborhood-detail");
        return;
      }
    } else if (pathname.endsWith("/cora/imoveis") || pathname.endsWith("/cora/comprar")) {
      setFilters((p) => ({ ...p, purpose: "venda" }));
      setActiveView("properties");
      return;
    } else if (pathname.endsWith("/cora/alugar")) {
      setFilters((p) => ({ ...p, purpose: "locacao" }));
      setActiveView("properties");
      return;
    } else if (pathname.endsWith("/cora/comparar")) {
      setActiveView("compare");
      return;
    } else if (pathname.endsWith("/cora/favoritos")) {
      setActiveView("favorites");
      return;
    } else if (pathname.endsWith("/cora/minha-cora")) {
      setActiveView("my-cora");
      return;
    } else if (pathname.endsWith("/cora/anuncie-seu-imovel") || pathname.endsWith("/cora/anuncie")) {
      setActiveView("submit-property");
      return;
    } else if (pathname.endsWith("/cora/simulador")) {
      setActiveView("simulator");
      return;
    } else if (pathname.endsWith("/cora/lancamentos")) {
      setActiveView("launches");
      return;
    } else if (pathname.endsWith("/cora/bairros")) {
      setActiveView("neighborhoods");
      return;
    } else if (pathname.endsWith("/cora/consultores")) {
      setActiveView("consultants");
      return;
    } else if (pathname.endsWith("/cora/sobre")) {
      setActiveView("about");
      return;
    } else if (pathname.endsWith("/cora/contato")) {
      setActiveView("contact");
      return;
    }

    // 2. Fallback: Hash routing
    if (!hash || hash === "inicio" || hash === "cora") {
      setActiveView("home");
    } else if (hash === "comprar") {
      setFilters((p) => ({ ...p, purpose: "venda" }));
      setActiveView("properties");
    } else if (hash === "alugar") {
      setFilters((p) => ({ ...p, purpose: "locacao" }));
      setActiveView("properties");
    } else if (hash === "imoveis") {
      setActiveView("properties");
    } else if (hash.startsWith("imovel-") || hash.startsWith("imovel/")) {
      const slug = hash.replace("imovel-", "").replace("imovel/", "");
      const prop = properties.find((p) => p.slug === slug);
      if (prop) {
        setSelectedProperty(prop);
        setActiveView("property-detail");
      }
    } else if (hash.startsWith("bairro-") || hash.startsWith("bairros/")) {
      const slug = hash.replace("bairro-", "").replace("bairros/", "");
      setSelectedNeighborhoodSlug(slug);
      setActiveView("neighborhood-detail");
    } else if (hash === "comparar") {
      setActiveView("compare");
    } else if (hash === "favoritos") {
      setActiveView("favorites");
    } else if (hash === "minha-cora") {
      setActiveView("my-cora");
    } else if (hash === "anuncie" || hash === "submit-property" || hash === "anuncie-seu-imovel") {
      setActiveView("submit-property");
    } else if (hash === "simulador") {
      setActiveView("simulator");
    } else if (hash === "lancamentos") {
      setActiveView("launches");
    } else if (hash === "bairros") {
      setActiveView("neighborhoods");
    } else if (hash === "consultores") {
      setActiveView("consultants");
    } else if (hash === "sobre") {
      setActiveView("about");
    } else if (hash === "contato") {
      setActiveView("contact");
    }
  }, [properties, setFilters]);

  useEffect(() => {
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    const initialSync = window.requestAnimationFrame(syncFromLocation);
    return () => {
      window.cancelAnimationFrame(initialSync);
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [syncFromLocation]);

  // Navigate handler com URLs reais e pushState
  const handleNavigate = (view: string, param?: string) => {
    setActiveView(view);
    let targetUrl = "/cora";

    if (view === "properties") {
      if (param === "venda") {
        setFilters((p) => ({ ...p, purpose: "venda" }));
        targetUrl = "/cora/comprar";
      } else if (param === "locacao") {
        setFilters((p) => ({ ...p, purpose: "locacao" }));
        targetUrl = "/cora/alugar";
      } else {
        targetUrl = "/cora/imoveis";
      }
    } else if (view === "neighborhood-detail" && param) {
      setSelectedNeighborhoodSlug(param);
      targetUrl = `/cora/bairros/${param}`;
    } else if (view === "neighborhoods") {
      targetUrl = "/cora/bairros";
    } else if (view === "compare") {
      targetUrl = "/cora/comparar";
    } else if (view === "favorites") {
      targetUrl = "/cora/favoritos";
    } else if (view === "my-cora") {
      targetUrl = "/cora/minha-cora";
    } else if (view === "submit-property") {
      targetUrl = "/cora/anuncie-seu-imovel";
    } else if (view === "simulator") {
      targetUrl = "/cora/simulador";
    } else if (view === "launches") {
      targetUrl = "/cora/lancamentos";
    } else if (view === "consultants") {
      targetUrl = "/cora/consultores";
    } else if (view === "about") {
      targetUrl = "/cora/sobre";
    } else if (view === "contact") {
      targetUrl = "/cora/contato";
    } else {
      targetUrl = "/cora";
    }

    if (window.location.pathname.startsWith("/cora") || window.location.pathname === "/") {
      try {
        window.history.pushState({ view, param }, "", targetUrl);
      } catch {
        window.location.hash = targetUrl.replace("/cora/", "");
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveView("property-detail");
    const targetUrl = `/cora/imovel/${property.slug}`;

    if (window.location.pathname.startsWith("/cora") || window.location.pathname === "/") {
      try {
        window.history.pushState({ view: "property-detail", slug: property.slug }, "", targetUrl);
      } catch {
        window.location.hash = `imovel-${property.slug}`;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="cora-app">
      {/* HEADER */}
      <Header
        activeView={activeView}
        onNavigate={handleNavigate}
        isSolid={activeView !== "home"}
      />

      {/* MAIN VIEW CONTENT */}
      <main>
        {activeView === "home" && (
          <HomePage
            onSelectProperty={handleSelectProperty}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === "properties" && (
          <PropertiesListingPage
            onSelectProperty={handleSelectProperty}
            onNavigateHome={() => handleNavigate("home")}
          />
        )}

        {activeView === "property-detail" && selectedProperty && (
          <PropertyDetailPage
            property={selectedProperty}
            onSelectProperty={handleSelectProperty}
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
          />
        )}

        {activeView === "compare" && (
          <ComparePage
            onSelectProperty={handleSelectProperty}
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
          />
        )}

        {activeView === "favorites" && (
          <FavoritesPage
            onSelectProperty={handleSelectProperty}
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
          />
        )}

        {activeView === "my-cora" && (
          <MyCoraPage
            onSelectProperty={handleSelectProperty}
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
            onNavigateSchedule={() => openVisitModal()}
            onNavigateSubmit={() => handleNavigate("submit-property")}
          />
        )}

        {activeView === "submit-property" && (
          <SubmitPropertyPage
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
          />
        )}

        {activeView === "simulator" && (
          <FinancingSimulatorPage
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
          />
        )}

        {activeView === "launches" && (
          <LaunchesPage
            onNavigateHome={() => handleNavigate("home")}
            onSelectLaunch={() => handleNavigate("properties")}
          />
        )}

        {activeView === "neighborhoods" && (
          <NeighborhoodsPage
            onNavigateHome={() => handleNavigate("home")}
            onSelectNeighborhood={(slug) => handleNavigate("neighborhood-detail", slug)}
          />
        )}

        {activeView === "neighborhood-detail" && (
          <NeighborhoodDetailPage
            slug={selectedNeighborhoodSlug}
            onNavigateHome={() => handleNavigate("home")}
            onNavigateNeighborhoods={() => handleNavigate("neighborhoods")}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {activeView === "consultants" && (
          <ConsultantsPage
            onNavigateHome={() => handleNavigate("home")}
          />
        )}

        {activeView === "about" && (
          <AboutPage
            onNavigateHome={() => handleNavigate("home")}
            onNavigateProperties={() => handleNavigate("properties")}
          />
        )}

        {activeView === "contact" && (
          <ContactPage onNavigateHome={() => handleNavigate("home")} />
        )}
      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* FLOATING COMPARISON DOCK */}
      <ComparisonBar onGoToCompare={() => handleNavigate("compare")} />

      {/* FLOATING WHATSAPP BUTTON */}
      <button
        type="button"
        onClick={openWhatsAppModal}
        className="cora-whatsapp-float-btn"
        title="Falar com a Cora no WhatsApp"
        aria-label="Abrir WhatsApp da Cora Imóveis"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.297.144.35.491 1.196.534 1.284.043.089.072.193.014.308-.058.116-.087.188-.173.289l-.26.302c-.087.086-.178.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.073.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.086.289.13.332.202.043.073.043.419-.101.824z" />
        </svg>
      </button>

      {/* GLOBAL MODALS */}
      <SearchOverlay
        onSelectProperty={handleSelectProperty}
        onNavigate={handleNavigate}
      />
      <VisitModal />
      <MockWhatsAppModal onNavigate={handleNavigate} />
      <LeadConsultantModal />
      <GalleryModal />
      <FloorPlanModal />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function CoraPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fbfaf8" }} />}>
      <CoraProvider>
        <CoraAppInner />
      </CoraProvider>
    </Suspense>
  );
}
