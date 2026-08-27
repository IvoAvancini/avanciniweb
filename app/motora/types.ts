export type VehicleBodyType =
  | "suv"
  | "sedan"
  | "hatch"
  | "picape"
  | "eletrico"
  | "esportivo";

export type VehicleTransmission = "Automático" | "Manual" | "CVT" | "Dupla Embreagem";

export type VehicleFuel = "Flex" | "Gasolina" | "Diesel" | "Híbrido" | "Elétrico";

export type VehicleCondition = "novo" | "seminovo";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  version: string;
  year: string; // e.g. "2024/2024" or "2023/2024"
  mileage: number; // in km
  price: number;
  oldPrice?: number;
  discount?: number;
  fuel: VehicleFuel;
  transmission: VehicleTransmission;
  engine: string; // e.g. "2.0 Turbo 16V"
  power: string; // e.g. "252 cv"
  doors: number;
  color: string;
  plateEnd: string;
  bodyType: VehicleBodyType;
  bodyTypeLabel: string;
  location: string;
  images: string[];
  features: string[];
  description: string;
  inspectionHighlights?: string[];
  isNew: boolean;
  isFeatured?: boolean;
  isOffer?: boolean;
  stock: number;
}

export interface FinancingSimulation {
  vehiclePrice: number;
  downPayment: number;
  installments: number;
  monthlyPayment: number;
  totalFinanced: number;
  interestRate: number; // e.g. 1.19%
}

export interface TradeInValuation {
  id: string;
  brand: string;
  model: string;
  year: string;
  version: string;
  mileage: number;
  color: string;
  city: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  estimatedValueRange: [number, number];
  date: string;
}

export interface TestDriveBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  storeName: string;
  date: string;
  time: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  status: "CONFIRMADO" | "PENDENTE" | "CONCLUÍDO";
}

export interface LeadContact {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehiclePrice: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  contactPreference: "whatsapp" | "phone" | "email";
  message?: string;
  date: string;
}

export type SortVehicleOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "year_desc"
  | "mileage_asc";

export interface VehicleFilterState {
  brand: string | "all";
  bodyType: VehicleBodyType | "all";
  condition: VehicleCondition | "all";
  transmission: VehicleTransmission | "all";
  fuel: VehicleFuel | "all";
  priceRange: [number, number];
  yearRange: [number, number];
  maxMileage: number;
  onlyOffers: boolean;
  searchQuery: string;
}
