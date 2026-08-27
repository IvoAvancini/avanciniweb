export type PropertyPurpose = "venda" | "locacao";

export type PropertyType =
  | "apartamento"
  | "casa"
  | "cobertura"
  | "studio"
  | "terreno"
  | "comercial"
  | "lancamento";

export type LifestyleCategory =
  | "perto-de-tudo"
  | "espaco-para-crescer"
  | "vista-que-transforma"
  | "primeiro-endereco"
  | "arquitetura-extraordinaria";

export interface Consultant {
  id: string;
  slug: string;
  name: string;
  role: string;
  creci: string;
  photo: string;
  bio: string;
  regions: string[];
  languages: string[];
  phone: string;
  email: string;
  activePropertiesCount: number;
  featuredQuote?: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  area: number;
  bedrooms: number;
  suites: number;
  image: string;
  description?: string;
}

export interface PointOfInterest {
  category: "gastronomia" | "escola" | "parque" | "saude" | "transporte" | "cultura";
  name: string;
  distance: string;
}

export interface Property {
  id: string;
  slug: string;
  code: string;
  title: string;
  headline: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  price: number;
  condominium: number;
  iptu: number;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  area: number;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  features: string[];
  condoAmenities: string[];
  images: string[];
  floorPlans?: FloorPlan[];
  consultant: Consultant;
  badges: string[];
  isFeatured?: boolean;
  isLaunch?: boolean;
  launchStage?: "breve-lancamento" | "em-obras" | "pronto";
  lifestyle?: LifestyleCategory;
  yearBuilt?: number;
  deliveryDate?: string;
  nearbyPoints?: PointOfInterest[];
  createdAt: string;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  headline: string;
  description: string;
  image: string;
  averagePricePerM2: number;
  characteristics: string[];
  lifestyleHighlights: string[];
  pointsOfInterest: {
    category: string;
    items: string[];
  }[];
  totalProperties: number;
}

export interface LaunchProject {
  id: string;
  slug: string;
  title: string;
  developer: string;
  neighborhood: string;
  city: string;
  stage: "breve-lancamento" | "em-obras" | "pronto";
  minArea: number;
  maxArea: number;
  minBedrooms: number;
  maxBedrooms: number;
  minPrice: number;
  deliveryForecast: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface ScheduledVisit {
  id: string;
  protocol: string;
  propertyId: string;
  propertyTitle: string;
  propertyNeighborhood: string;
  propertyPrice: number;
  propertyImage: string;
  visitType: "presencial" | "video";
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  createdAt: string;
  status: "confirmada" | "em-analise" | "concluida";
}

export interface SimulationRecord {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  propertyPrice: number;
  downPayment: number;
  loanAmount: number;
  termMonths: number;
  interestRate: number;
  monthlyPayment: number;
  suggestedIncome: number;
  createdAt: string;
}

export interface PropertySubmission {
  id: string;
  protocol: string;
  purpose: "venda" | "locacao";
  propertyType: PropertyType;
  city: string;
  neighborhood: string;
  address: string;
  area: number;
  bedrooms: number;
  suites: number;
  parkingSpaces: number;
  expectedPrice: number;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  notes?: string;
  createdAt: string;
}

export interface FilterState {
  purpose: PropertyPurpose | "todos";
  type: PropertyType | "todos";
  neighborhood: string | "todos";
  priceMin: number | "";
  priceMax: number | "";
  areaMin: number | "";
  areaMax: number | "";
  bedrooms: number | "todos";
  suites: number | "todos";
  parkingSpaces: number | "todos";
  features: string[];
  lifestyle: LifestyleCategory | "todos";
  searchQuery: string;
  sortBy: "relevantes" | "menor-preco" | "maior-preco" | "maior-area" | "recentes";
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning";
}
