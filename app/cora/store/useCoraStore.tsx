"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import {
  Property,
  Neighborhood,
  Consultant,
  LaunchProject,
  FilterState,
  ScheduledVisit,
  SimulationRecord,
  PropertySubmission,
  ToastMessage,
  FloorPlan,
} from "../types";
import { PROPERTIES } from "../data/properties";
import { NEIGHBORHOODS } from "../data/neighborhoods";
import { CONSULTANTS } from "../data/consultants";
import { LAUNCH_PROJECTS } from "../data/launches";

const STORAGE_KEYS = {
  FAVORITES: "cora_favorites_v1",
  COMPARE: "cora_compare_v1",
  RECENTLY_VIEWED: "cora_recently_viewed_v1",
  VISITS: "cora_visits_v1",
  SIMULATIONS: "cora_simulations_v1",
  SUBMISSIONS: "cora_submissions_v1",
};

const INITIAL_FILTERS: FilterState = {
  purpose: "todos",
  type: "todos",
  neighborhood: "todos",
  priceMin: "",
  priceMax: "",
  areaMin: "",
  areaMax: "",
  bedrooms: "todos",
  suites: "todos",
  parkingSpaces: "todos",
  features: [],
  lifestyle: "todos",
  searchQuery: "",
  sortBy: "relevantes",
};

interface CoraContextType {
  // Datasets
  properties: Property[];
  neighborhoods: Neighborhood[];
  consultants: Consultant[];
  launches: LaunchProject[];

  // Favorites & Compare
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;

  compareList: string[];
  toggleCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;

  // History & User Records
  recentlyViewedSlugs: string[];
  recordViewed: (slug: string) => void;

  scheduledVisits: ScheduledVisit[];
  addScheduledVisit: (
    visit: Omit<ScheduledVisit, "id" | "protocol" | "createdAt" | "status">
  ) => ScheduledVisit;

  simulations: SimulationRecord[];
  addSimulation: (
    sim: Omit<SimulationRecord, "id" | "createdAt">
  ) => SimulationRecord;

  propertySubmissions: PropertySubmission[];
  addPropertySubmission: (
    sub: Omit<PropertySubmission, "id" | "protocol" | "createdAt">
  ) => PropertySubmission;

  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProperties: Property[];

  // Modals & UI Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;

  isVisitModalOpen: boolean;
  visitTargetProperty: Property | null;
  openVisitModal: (property?: Property | null) => void;
  closeVisitModal: () => void;

  isWhatsAppOpen: boolean;
  openWhatsAppModal: () => void;
  closeWhatsAppModal: () => void;

  isLeadConsultantOpen: boolean;
  selectedConsultant: Consultant | null;
  openLeadConsultantModal: (consultant: Consultant) => void;
  closeLeadConsultantModal: () => void;

  isGalleryOpen: boolean;
  activeGalleryIndex: number;
  galleryImages: string[];
  openGallery: (images: string[], index?: number) => void;
  closeGallery: () => void;

  isFloorPlanOpen: boolean;
  activeFloorPlan: FloorPlan | null;
  openFloorPlan: (plan: FloorPlan) => void;
  closeFloorPlan: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const CoraContext = createContext<CoraContextType | undefined>(undefined);

export function CoraProvider({ children }: { children: ReactNode }) {
  // Datasets
  const [properties] = useState<Property[]>(PROPERTIES);
  const [neighborhoods] = useState<Neighborhood[]>(NEIGHBORHOODS);
  const [consultants] = useState<Consultant[]>(CONSULTANTS);
  const [launches] = useState<LaunchProject[]>(LAUNCH_PROJECTS);

  // Local Storage State
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>([]);
  const [scheduledVisits, setScheduledVisits] = useState<ScheduledVisit[]>([]);
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);
  const [propertySubmissions, setPropertySubmissions] = useState<PropertySubmission[]>([]);

  // Filters State
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitTargetProperty, setVisitTargetProperty] = useState<Property | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isLeadConsultantOpen, setIsLeadConsultantOpen] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isFloorPlanOpen, setIsFloorPlanOpen] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState<FloorPlan | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const favs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (favs) setFavorites(JSON.parse(favs));

      const comp = localStorage.getItem(STORAGE_KEYS.COMPARE);
      if (comp) setCompareList(JSON.parse(comp));

      const viewed = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      if (viewed) setRecentlyViewedSlugs(JSON.parse(viewed));

      const visits = localStorage.getItem(STORAGE_KEYS.VISITS);
      if (visits) setScheduledVisits(JSON.parse(visits));

      const sims = localStorage.getItem(STORAGE_KEYS.SIMULATIONS);
      if (sims) setSimulations(JSON.parse(sims));

      const subs = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (subs) setPropertySubmissions(JSON.parse(subs));
    } catch {
      // ignore JSON parse error in SSR or private mode
    }
  }, []);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K & ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsVisitModalOpen(false);
        setIsWhatsAppOpen(false);
        setIsLeadConsultantOpen(false);
        setIsGalleryOpen(false);
        setIsFloorPlanOpen(false);
        setIsFilterDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Toast System
  const addToast = useCallback(
    (title: string, description?: string, type: "success" | "info" | "warning" = "success") => {
      const id = "toast_" + Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = { id, title, description, type };
      setToasts((prev) => [...prev.slice(-3), newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Favorites Actions
  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
        } catch {}
        if (!exists) {
          const prop = PROPERTIES.find((p) => p.id === id);
          addToast("Imóvel salvo nos favoritos", prop?.title || "Adicionado à Minha Cora");
        } else {
          addToast("Imóvel removido dos favoritos", undefined, "info");
        }
        return next;
      });
    },
    [addToast]
  );

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    } catch {}
    addToast("Lista de favoritos esvaziada", undefined, "info");
  }, [addToast]);

  // Comparison Actions
  const toggleCompare = useCallback(
    (id: string) => {
      setCompareList((prev) => {
        const exists = prev.includes(id);
        if (exists) {
          const next = prev.filter((item) => item !== id);
          try {
            localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(next));
          } catch {}
          addToast("Removido do comparador", undefined, "info");
          return next;
        }

        if (prev.length >= 3) {
          addToast("Limite de comparação atingido", "Você pode comparar até 3 imóveis por vez.", "warning");
          return prev;
        }

        const next = [...prev, id];
        try {
          localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(next));
        } catch {}
        addToast("Adicionado ao comparador", `Comparando ${next.length} de 3 imóveis.`);
        return next;
      });
    },
    [addToast]
  );

  const isInCompare = useCallback(
    (id: string) => compareList.includes(id),
    [compareList]
  );

  const removeFromCompare = useCallback(
    (id: string) => {
      setCompareList((prev) => {
        const next = prev.filter((item) => item !== id);
        try {
          localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  const clearCompare = useCallback(() => {
    setCompareList([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPARE);
    } catch {}
    addToast("Comparador limpo", undefined, "info");
  }, [addToast]);

  // Recently Viewed Recording
  const recordViewed = useCallback((slug: string) => {
    setRecentlyViewedSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const next = [slug, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  // Scheduled Visits
  const addScheduledVisit = useCallback(
    (visitData: Omit<ScheduledVisit, "id" | "protocol" | "createdAt" | "status">) => {
      const code = "#CORA-" + Math.floor(10000 + Math.random() * 90000);
      const newVisit: ScheduledVisit = {
        ...visitData,
        id: "visit_" + Date.now(),
        protocol: code,
        createdAt: new Date().toISOString(),
        status: "confirmada",
      };

      setScheduledVisits((prev) => {
        const next = [newVisit, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.VISITS, JSON.stringify(next));
        } catch {}
        return next;
      });

      addToast("Visita solicitada com sucesso!", `Protocolo de agendamento ${code}`);
      return newVisit;
    },
    [addToast]
  );

  // Simulations
  const addSimulation = useCallback(
    (simData: Omit<SimulationRecord, "id" | "createdAt">) => {
      const newSim: SimulationRecord = {
        ...simData,
        id: "sim_" + Date.now(),
        createdAt: new Date().toISOString(),
      };

      setSimulations((prev) => {
        const next = [newSim, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.SIMULATIONS, JSON.stringify(next));
        } catch {}
        return next;
      });

      addToast("Simulação salva", "Disponível na sua área Minha Cora.");
      return newSim;
    },
    [addToast]
  );

  // Property Submissions
  const addPropertySubmission = useCallback(
    (subData: Omit<PropertySubmission, "id" | "protocol" | "createdAt">) => {
      const code = "#PROPRIETARIO-" + Math.floor(10000 + Math.random() * 90000);
      const newSub: PropertySubmission = {
        ...subData,
        id: "sub_" + Date.now(),
        protocol: code,
        createdAt: new Date().toISOString(),
      };

      setPropertySubmissions((prev) => {
        const next = [newSub, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(next));
        } catch {}
        return next;
      });

      addToast("Imóvel cadastrado para avaliação", `Protocolo de envio ${code}`);
      return newSub;
    },
    [addToast]
  );

  // Modals Actions
  const openVisitModal = useCallback((property?: Property | null) => {
    setVisitTargetProperty(property || null);
    setIsVisitModalOpen(true);
  }, []);

  const closeVisitModal = useCallback(() => {
    setIsVisitModalOpen(false);
    setVisitTargetProperty(null);
  }, []);

  const openWhatsAppModal = useCallback(() => setIsWhatsAppOpen(true), []);
  const closeWhatsAppModal = useCallback(() => setIsWhatsAppOpen(false), []);

  const openLeadConsultantModal = useCallback((consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setIsLeadConsultantOpen(true);
  }, []);

  const closeLeadConsultantModal = useCallback(() => {
    setIsLeadConsultantOpen(false);
    setSelectedConsultant(null);
  }, []);

  const openGallery = useCallback((images: string[], index = 0) => {
    setGalleryImages(images);
    setActiveGalleryIndex(index);
    setIsGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  const openFloorPlan = useCallback((plan: FloorPlan) => {
    setActiveFloorPlan(plan);
    setIsFloorPlanOpen(true);
  }, []);

  const closeFloorPlan = useCallback(() => {
    setIsFloorPlanOpen(false);
    setActiveFloorPlan(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Filter Engine
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Finalidade
      if (filters.purpose !== "todos" && p.purpose !== filters.purpose) {
        return false;
      }
      // Tipo
      if (filters.type !== "todos" && p.type !== filters.type) {
        return false;
      }
      // Bairro
      if (
        filters.neighborhood !== "todos" &&
        p.neighborhood.toLowerCase() !== filters.neighborhood.toLowerCase()
      ) {
        return false;
      }
      // Estilo de vida
      if (filters.lifestyle !== "todos" && p.lifestyle !== filters.lifestyle) {
        return false;
      }
      // Preço
      if (filters.priceMin !== "" && p.price < Number(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax !== "" && p.price > Number(filters.priceMax)) {
        return false;
      }
      // Área
      if (filters.areaMin !== "" && p.area < Number(filters.areaMin)) {
        return false;
      }
      if (filters.areaMax !== "" && p.area > Number(filters.areaMax)) {
        return false;
      }
      // Quartos
      if (filters.bedrooms !== "todos" && p.bedrooms < Number(filters.bedrooms)) {
        return false;
      }
      // Suítes
      if (filters.suites !== "todos" && p.suites < Number(filters.suites)) {
        return false;
      }
      // Vagas
      if (
        filters.parkingSpaces !== "todos" &&
        p.parkingSpaces < Number(filters.parkingSpaces)
      ) {
        return false;
      }
      // Características
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feat) =>
          p.features.some((f) => f.toLowerCase().includes(feat.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }
      // Query de Busca
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesNeighborhood = p.neighborhood.toLowerCase().includes(q);
        const matchesAddress = p.address.toLowerCase().includes(q);
        const matchesCode = p.code.toLowerCase().includes(q);
        if (!matchesTitle && !matchesNeighborhood && !matchesAddress && !matchesCode) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "menor-preco") return a.price - b.price;
      if (filters.sortBy === "maior-preco") return b.price - a.price;
      if (filters.sortBy === "maior-area") return b.area - a.area;
      if (filters.sortBy === "recentes") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // relevantes (featured first)
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [properties, filters]);

  const value = {
    properties,
    neighborhoods,
    consultants,
    launches,
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    compareList,
    toggleCompare,
    isInCompare,
    removeFromCompare,
    clearCompare,
    recentlyViewedSlugs,
    recordViewed,
    scheduledVisits,
    addScheduledVisit,
    simulations,
    addSimulation,
    propertySubmissions,
    addPropertySubmission,
    filters,
    setFilters,
    resetFilters,
    filteredProperties,
    isSearchOpen,
    setIsSearchOpen,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    isVisitModalOpen,
    visitTargetProperty,
    openVisitModal,
    closeVisitModal,
    isWhatsAppOpen,
    openWhatsAppModal,
    closeWhatsAppModal,
    isLeadConsultantOpen,
    selectedConsultant,
    openLeadConsultantModal,
    closeLeadConsultantModal,
    isGalleryOpen,
    activeGalleryIndex,
    galleryImages,
    openGallery,
    closeGallery,
    isFloorPlanOpen,
    activeFloorPlan,
    openFloorPlan,
    closeFloorPlan,
    toasts,
    addToast,
    removeToast,
  };

  return <CoraContext.Provider value={value}>{children}</CoraContext.Provider>;
}

export function useCora() {
  const context = useContext(CoraContext);
  if (!context) {
    throw new Error("useCora deve ser utilizado dentro de um CoraProvider");
  }
  return context;
}
