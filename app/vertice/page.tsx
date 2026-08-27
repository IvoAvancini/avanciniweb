"use client";

import { useState, useEffect } from "react";
import { VerticeProvider, useVertice } from "./store/useVerticeStore";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { QuickShopDrawer } from "./components/QuickShopDrawer";
import { SearchOverlay } from "./components/SearchOverlay";
import { SizeGuideModal } from "./components/SizeGuideModal";
import { ToastContainer } from "./components/Toast";
import { HomePage } from "./pages/HomePage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AccountPage } from "./pages/AccountPage";
import { LoginPage } from "./pages/LoginPage";
import { Product, ProductCategory, ProductGender, ProductSport } from "./types";
import "./vertice.css";

function VerticeAppContent() {
  const { products, setFilters, resetFilters } = useVertice();
  const [currentView, setCurrentView] = useState<
    "home" | "catalog" | "product" | "cart" | "checkout" | "wishlist" | "account" | "login"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView]);

  const handleNavigate = (view: string, param?: string) => {
    if (view === "home") {
      setCurrentView("home");
      return;
    }

    if (view === "catalog") {
      resetFilters();
      if (param) {
        if (param === "new") {
          setFilters((prev) => ({ ...prev, onlyNew: true }));
        } else if (param === "offers" || param === "sale") {
          setFilters((prev) => ({ ...prev, onlyOffers: true }));
        } else if (param === "masculino" || param === "feminino" || param === "infantil") {
          setFilters((prev) => ({ ...prev, gender: param as ProductGender }));
        } else if (param === "corrida" || param === "academia" || param === "streetwear" || param === "lifestyle") {
          setFilters((prev) => ({ ...prev, sport: param as ProductSport }));
        } else if (param === "performance" || param === "essentials" || param === "street" || param === "new-season") {
          setFilters((prev) => ({ ...prev, collection: param as any }));
        } else {
          setFilters((prev) => ({ ...prev, category: param as ProductCategory }));
        }
      }
      setCurrentView("catalog");
      return;
    }

    if (view === "cart") {
      setCurrentView("cart");
      return;
    }

    if (view === "checkout") {
      setCurrentView("checkout");
      return;
    }

    if (view === "wishlist") {
      setCurrentView("wishlist");
      return;
    }

    if (view === "account") {
      setCurrentView("account");
      return;
    }

    if (view === "login") {
      setCurrentView("login");
      return;
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView("product");
  };

  return (
    <div className="vertice-app">
      {/* 1. HEADER */}
      <Header
        onNavigate={handleNavigate}
        activeView={currentView}
      />

      {/* 2. MAIN ROUTING VIEWS */}
      <main>
        {currentView === "home" && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onNavigateCatalog={(cat) => handleNavigate("catalog", cat)}
          />
        )}

        {currentView === "catalog" && (
          <ProductListingPage
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => handleNavigate("home")}
          />
        )}

        {currentView === "product" && (
          <ProductDetailPage
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => handleNavigate("home")}
            onNavigateCatalog={(cat) => handleNavigate("catalog", cat)}
          />
        )}

        {currentView === "cart" && (
          <CartPage
            onGoToCheckout={() => setCurrentView("checkout")}
            onContinueShopping={() => handleNavigate("catalog")}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutPage
            onOrderCompleted={() => setCurrentView("account")}
            onBackToCart={() => setCurrentView("cart")}
          />
        )}

        {currentView === "wishlist" && (
          <WishlistPage
            onSelectProduct={handleSelectProduct}
            onExploreProducts={() => handleNavigate("catalog")}
          />
        )}

        {currentView === "account" && (
          <AccountPage
            onGoToLogin={() => setCurrentView("login")}
          />
        )}

        {currentView === "login" && (
          <LoginPage
            onSuccess={() => setCurrentView("account")}
          />
        )}
      </main>

      {/* 3. FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* 4. DRAWERS, OVERLAYS & TOASTS */}
      <CartDrawer
        onGoToCart={() => setCurrentView("cart")}
        onGoToCheckout={() => setCurrentView("checkout")}
      />

      <QuickShopDrawer />

      <SearchOverlay
        onSelectProduct={handleSelectProduct}
        onSearchCategory={(cat) => handleNavigate("catalog", cat)}
      />

      <SizeGuideModal />

      <ToastContainer />
    </div>
  );
}

export default function VerticePage() {
  return (
    <VerticeProvider>
      <VerticeAppContent />
    </VerticeProvider>
  );
}
