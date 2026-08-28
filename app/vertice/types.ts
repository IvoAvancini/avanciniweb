export type ProductGender = "masculino" | "feminino" | "unissex" | "infantil";

export type ProductCategory =
  | "tenis"
  | "camisetas"
  | "moletons"
  | "jaquetas"
  | "calcas"
  | "shorts"
  | "tops"
  | "acessorios";

export type ProductSport = "corrida" | "academia" | "streetwear" | "lifestyle";

export type ProductCollection = "performance" | "essentials" | "street" | "new-season";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory: string;
  gender: ProductGender;
  sport: ProductSport;
  collection: ProductCollection;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: string[];
  description: string;
  storytelling?: {
    headline: string;
    text: string;
    techFeatures: string[];
    materials: string;
  };
  badge?: "NOVO" | "BEST SELLER" | "OFERTA" | "LIMITED";
  featured?: boolean;
  isNew?: boolean;
  bestSeller?: boolean;
  stock: Record<string, number>; // size -> quantity
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  price: number;
}

export interface OrderItem {
  id: string;
  productName: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: "CONFIRMADO" | "EM SEPARAÇÃO" | "EM TRANSPORTE" | "ENTREGUE";
  trackingCode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: "pix" | "credit_card" | "boleto";
  shippingAddress: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: {
    id: string;
    name: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
  }[];
}

export type SortOption =
  | "relevance"
  | "best_sellers"
  | "newest"
  | "price_asc"
  | "price_desc"
  | "rating";

export interface FilterState {
  category: ProductCategory | "all";
  gender: ProductGender | "all";
  sport: ProductSport | "all";
  collection: ProductCollection | "all";
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  onlyOffers: boolean;
  onlyNew: boolean;
  rating: number | null;
  searchQuery: string;
}
