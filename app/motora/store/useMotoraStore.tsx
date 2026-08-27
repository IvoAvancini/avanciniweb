"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import {
  Vehicle,
  VehicleFilterState,
  SortVehicleOption,
  FinancingSimulation,
  LeadContact,
  TestDriveBooking,
  TradeInValuation,
} from "../types";
import { MOTORA_VEHICLES } from "../data/vehicles";

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "error";
}

interface MotoraContextType {
  vehicles: Vehicle[];
  
  // Favorites
  favorites: string[];
  favoritesCount: number;
  toggleFavorite: (vehicleId: string) => void;
  isFavorite: (vehicleId: string) => boolean;

  // Compare (up to 3)
  compareList: string[];
  compareCount: number;
  toggleCompare: (vehicleId: string) => boolean;
  isComparing: (vehicleId: string) => boolean;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;

  // Filters & Sorting
  filters: VehicleFilterState;
  setFilters: React.Dispatch<React.SetStateAction<VehicleFilterState>>;
  sortOption: SortVehicleOption;
  setSortOption: (opt: SortVehicleOption) => void;
  resetFilters: () => void;

  // Financing Calculator
  calculateFinancing: (price: number, downPayment: number, installments: number) => FinancingSimulation;

  // Modals & Overlays
  isLeadModalOpen: boolean;
  leadVehicle: Vehicle | null;
  openLeadModal: (vehicle: Vehicle) => void;
  closeLeadModal: () => void;
  submitLead: (lead: Omit<LeadContact, "id" | "date">) => LeadContact;

  isTestDriveModalOpen: boolean;
  testDriveVehicle: Vehicle | null;
  openTestDriveModal: (vehicle: Vehicle) => void;
  closeTestDriveModal: () => void;
  submitTestDrive: (booking: Omit<TestDriveBooking, "id" | "status">) => TestDriveBooking;

  isTradeInModalOpen: boolean;
  openTradeInModal: () => void;
  closeTradeInModal: () => void;
  submitTradeIn: (data: Omit<TradeInValuation, "id" | "estimatedValueRange" | "date">) => TradeInValuation;

  isWhatsAppModalOpen: boolean;
  openWhatsAppModal: () => void;
  closeWhatsAppModal: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Toasts
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;

  // User submissions history
  leads: LeadContact[];
  testDrives: TestDriveBooking[];
  valuations: TradeInValuation[];
}

const initialFilters: VehicleFilterState = {
  brand: "all",
  bodyType: "all",
  condition: "all",
  transmission: "all",
  fuel: "all",
  priceRange: [0, 2500000],
  yearRange: [2020, 2025],
  maxMileage: 150000,
  onlyOffers: false,
  searchQuery: "",
};

const MotoraContext = createContext<MotoraContextType | null>(null);

export function MotoraProvider({ children }: { children: ReactNode }) {
  const [vehicles] = useState<Vehicle[]>(MOTORA_VEHICLES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [filters, setFilters] = useState<VehicleFilterState>(initialFilters);
  const [sortOption, setSortOption] = useState<SortVehicleOption>("relevance");

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadVehicle, setLeadVehicle] = useState<Vehicle | null>(null);

  const [isTestDriveModalOpen, setIsTestDriveModalOpen] = useState(false);
  const [testDriveVehicle, setTestDriveVehicle] = useState<Vehicle | null>(null);

  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [leads, setLeads] = useState<LeadContact[]>([]);
  const [testDrives, setTestDrives] = useState<TestDriveBooking[]>([]);
  const [valuations, setValuations] = useState<TradeInValuation[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("motora_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedComp = localStorage.getItem("motora_compare");
      if (savedComp) setCompareList(JSON.parse(savedComp));

      const savedLeads = localStorage.getItem("motora_leads");
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      const savedTestDrives = localStorage.getItem("motora_testdrives");
      if (savedTestDrives) setTestDrives(JSON.parse(savedTestDrives));
    } catch (e) {
      console.warn("Could not load Motora localStorage data:", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("motora_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Could not save Motora favorites:", e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("motora_compare", JSON.stringify(compareList));
    } catch (e) {
      console.warn("Could not save Motora compare:", e);
    }
  }, [compareList]);

  useEffect(() => {
    try {
      localStorage.setItem("motora_leads", JSON.stringify(leads));
    } catch (e) {
      console.warn("Could not save Motora leads:", e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem("motora_testdrives", JSON.stringify(testDrives));
    } catch (e) {
      console.warn("Could not save Motora testDrives:", e);
    }
  }, [testDrives]);

  // Toast Helpers
  const addToast = useCallback((title: string, message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Favorites
  const toggleFavorite = useCallback((vehicleId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(vehicleId);
      if (exists) {
        addToast("Removido dos favoritos", "Veículo retirado da sua lista salva.", "info");
        return prev.filter((id) => id !== vehicleId);
      } else {
        const veh = vehicles.find((v) => v.id === vehicleId);
        addToast("Salvo nos favoritos", veh ? `${veh.brand} ${veh.model}` : "Veículo adicionado.", "success");
        return [...prev, vehicleId];
      }
    });
  }, [vehicles, addToast]);

  const isFavorite = useCallback((vehicleId: string) => favorites.includes(vehicleId), [favorites]);

  // Compare (max 3)
  const toggleCompare = useCallback((vehicleId: string): boolean => {
    const exists = compareList.includes(vehicleId);
    if (exists) {
      setCompareList((prev) => prev.filter((id) => id !== vehicleId));
      addToast("Removido do comparador", "Veículo retirado da comparação.", "info");
      return false;
    } else {
      if (compareList.length >= 3) {
        addToast("Limite atingido", "Você pode comparar no máximo 3 veículos simultaneamente.", "error");
        return false;
      }
      setCompareList((prev) => [...prev, vehicleId]);
      const veh = vehicles.find((v) => v.id === vehicleId);
      addToast("Adicionado ao comparador", veh ? `${veh.brand} ${veh.model}` : "Veículo pronto para comparar.", "success");
      return true;
    }
  }, [compareList, vehicles, addToast]);

  const isComparing = useCallback((vehicleId: string) => compareList.includes(vehicleId), [compareList]);

  const removeFromCompare = useCallback((vehicleId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== vehicleId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  // Financing Calculation
  const calculateFinancing = useCallback(
    (price: number, downPayment: number, installments: number): FinancingSimulation => {
      const validDown = Math.min(price * 0.9, Math.max(price * 0.1, downPayment));
      const financedAmount = Math.max(0, price - validDown);
      const monthlyRate = 0.0119; // 1.19% ao mês (taxa competitiva de mercado premium)

      // Fórmula de amortização Price: PMT = PV * (i / (1 - (1+i)^-n))
      const monthlyPayment =
        financedAmount > 0
          ? (financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, installments))) /
            (Math.pow(1 + monthlyRate, installments) - 1)
          : 0;

      return {
        vehiclePrice: price,
        downPayment: validDown,
        installments,
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalFinanced: Math.round((monthlyPayment * installments + validDown) * 100) / 100,
        interestRate: 1.19,
      };
    },
    []
  );

  // Modals & Leads
  const openLeadModal = useCallback((vehicle: Vehicle) => {
    setLeadVehicle(vehicle);
    setIsLeadModalOpen(true);
  }, []);

  const closeLeadModal = useCallback(() => {
    setIsLeadModalOpen(false);
    setLeadVehicle(null);
  }, []);

  const submitLead = useCallback(
    (leadData: Omit<LeadContact, "id" | "date">): LeadContact => {
      const newLead: LeadContact = {
        ...leadData,
        id: `LD-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
      };
      setLeads((prev) => [newLead, ...prev]);
      addToast(
        "Interesse Registrado!",
        `Um consultor MOTORA entrará em contato via ${leadData.contactPreference.toUpperCase()}.`,
        "success"
      );
      closeLeadModal();
      return newLead;
    },
    [addToast, closeLeadModal]
  );

  const openTestDriveModal = useCallback((vehicle: Vehicle) => {
    setTestDriveVehicle(vehicle);
    setIsTestDriveModalOpen(true);
  }, []);

  const closeTestDriveModal = useCallback(() => {
    setIsTestDriveModalOpen(false);
    setTestDriveVehicle(null);
  }, []);

  const submitTestDrive = useCallback(
    (bookingData: Omit<TestDriveBooking, "id" | "status">): TestDriveBooking => {
      const newBooking: TestDriveBooking = {
        ...bookingData,
        id: `TD-${Math.floor(10000 + Math.random() * 90000)}`,
        status: "CONFIRMADO",
      };
      setTestDrives((prev) => [newBooking, ...prev]);
      addToast(
        "Test-Drive Agendado!",
        `Confirmado para ${bookingData.date} às ${bookingData.time} na ${bookingData.storeName}.`,
        "success"
      );
      closeTestDriveModal();
      return newBooking;
    },
    [addToast, closeTestDriveModal]
  );

  const openTradeInModal = useCallback(() => setIsTradeInModalOpen(true), []);
  const closeTradeInModal = useCallback(() => setIsTradeInModalOpen(false), []);

  const submitTradeIn = useCallback(
    (valData: Omit<TradeInValuation, "id" | "estimatedValueRange" | "date">): TradeInValuation => {
      // Mock calculation based on year and model
      const baseEstimate = 75000 + Math.random() * 80000;
      const minEst = Math.round(baseEstimate * 0.95);
      const maxEst = Math.round(baseEstimate * 1.05);

      const newValuation: TradeInValuation = {
        ...valData,
        id: `AV-${Math.floor(10000 + Math.random() * 90000)}`,
        estimatedValueRange: [minEst, maxEst],
        date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
      };

      setValuations((prev) => [newValuation, ...prev]);
      addToast(
        "Avaliação Preliminar Concluída",
        `Estimativa de R$ ${minEst.toLocaleString("pt-BR")} a R$ ${maxEst.toLocaleString("pt-BR")} gerada.`,
        "success"
      );
      closeTradeInModal();
      return newValuation;
    },
    [addToast, closeTradeInModal]
  );

  const openWhatsAppModal = useCallback(() => setIsWhatsAppModalOpen(true), []);
  const closeWhatsAppModal = useCallback(() => setIsWhatsAppModalOpen(false), []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSortOption("relevance");
  }, []);

  return (
    <MotoraContext.Provider
      value={{
        vehicles,
        favorites,
        favoritesCount: favorites.length,
        toggleFavorite,
        isFavorite,
        compareList,
        compareCount: compareList.length,
        toggleCompare,
        isComparing,
        removeFromCompare,
        clearCompare,
        filters,
        setFilters,
        sortOption,
        setSortOption,
        resetFilters,
        calculateFinancing,
        isLeadModalOpen,
        leadVehicle,
        openLeadModal,
        closeLeadModal,
        submitLead,
        isTestDriveModalOpen,
        testDriveVehicle,
        openTestDriveModal,
        closeTestDriveModal,
        submitTestDrive,
        isTradeInModalOpen,
        openTradeInModal,
        closeTradeInModal,
        submitTradeIn,
        isWhatsAppModalOpen,
        openWhatsAppModal,
        closeWhatsAppModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        toasts,
        addToast,
        removeToast,
        leads,
        testDrives,
        valuations,
      }}
    >
      {children}
    </MotoraContext.Provider>
  );
}

export function useMotora() {
  const context = useContext(MotoraContext);
  if (!context) {
    throw new Error("useMotora must be used within a MotoraProvider");
  }
  return context;
}
