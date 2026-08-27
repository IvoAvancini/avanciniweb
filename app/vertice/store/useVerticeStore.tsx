"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { Product, CartItem, Order, UserProfile, FilterState, SortOption } from "../types";
import { VERTICE_PRODUCTS } from "../data/products";

const FREE_SHIPPING_THRESHOLD = 399.0;

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "error";
}

interface VerticeContextType {
  // Products
  products: Product[];
  
  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  appliedCoupon: { code: string; discountPercent: number } | null;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string, size?: string, color?: string) => void;

  // UI Overlays & Modals
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  
  quickShopProduct: Product | null;
  isQuickShopOpen: boolean;
  openQuickShop: (product: Product) => void;
  closeQuickShop: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  // Toasts
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;

  // Auth & Orders
  user: UserProfile | null;
  isLoggedIn: boolean;
  orders: Order[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  createOrder: (
    items: CartItem[],
    paymentMethod: "pix" | "credit_card" | "boleto",
    address: Order["shippingAddress"]
  ) => Order;

  // Filter & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  category: "all",
  gender: "all",
  sport: "all",
  collection: "all",
  sizes: [],
  colors: [],
  priceRange: [0, 1500],
  onlyOffers: false,
  onlyNew: false,
  rating: null,
  searchQuery: "",
};

const defaultOrders: Order[] = [
  {
    id: "VTC-10293",
    date: "25 de Agosto de 2026",
    status: "EM TRANSPORTE",
    trackingCode: "BR918230198VT",
    items: [
      {
        id: "v-flow-pro-item",
        productName: "Vértice Flow Pro Carbon",
        image: "/concepts/nike-sneaker.jpg",
        color: "Cyber Onyx",
        size: "41",
        quantity: 1,
        price: 899.9,
      },
      {
        id: "v-socks-item",
        productName: "Vértice Grip Socks (Pack 3)",
        image: "/concepts/nike-backpack.jpg",
        color: "Black / White",
        size: "39-42",
        quantity: 1,
        price: 99.9,
      },
    ],
    subtotal: 999.8,
    discount: 0,
    shipping: 0,
    total: 999.8,
    paymentMethod: "pix",
    shippingAddress: {
      street: "Av. Paulista",
      number: "1842",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-200",
    },
  },
  {
    id: "VTC-10188",
    date: "12 de Julho de 2026",
    status: "ENTREGUE",
    trackingCode: "BR817293844VT",
    items: [
      {
        id: "v-fleece-item",
        productName: "Vértice Tech Fleece Full-Zip",
        image: "/concepts/nike-tech-fleece.jpg",
        color: "Preto Carbono",
        size: "M",
        quantity: 1,
        price: 549.9,
      },
    ],
    subtotal: 549.9,
    discount: 54.99,
    shipping: 0,
    total: 494.91,
    paymentMethod: "credit_card",
    shippingAddress: {
      street: "Av. Paulista",
      number: "1842",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-200",
    },
  },
];

const VerticeContext = createContext<VerticeContextType | null>(null);

export function VerticeProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(VERTICE_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuickShopOpen, setIsQuickShopOpen] = useState(false);
  const [quickShopProduct, setQuickShopProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [user, setUser] = useState<UserProfile | null>({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    phone: "(11) 98765-4321",
    addresses: [
      {
        id: "addr-1",
        name: "Principal (Casa)",
        street: "Av. Paulista",
        number: "1842",
        complement: "Apto 104",
        neighborhood: "Bela Vista",
        city: "São Paulo",
        state: "SP",
        zipCode: "01310-200",
        isDefault: true,
      },
    ],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [orders, setOrders] = useState<Order[]>(defaultOrders);

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>("relevance");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vertice_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("vertice_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("vertice_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.warn("Could not read from localStorage:", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("vertice_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not write cart to localStorage:", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("vertice_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not write wishlist to localStorage:", e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("vertice_orders", JSON.stringify(orders));
    } catch (e) {
      console.warn("Could not write orders to localStorage:", e);
    }
  }, [orders]);

  // Toast Helpers
  const addToast = useCallback((title: string, message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Cart Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartDiscount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercent) / 100 : 0;
  const cartShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0 ? 0 : 29.9;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const addToCart = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      const itemId = `${product.id}-${size}-${color}`;
      setCart((prev) => {
        const existing = prev.find((item) => item.id === itemId);
        if (existing) {
          return prev.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity,
            price: product.price,
          },
        ];
      });
      addToast(
        "Adicionado à sacola",
        `${product.name} (${size} · ${color})`,
        "success"
      );
      setIsCartOpen(true);
    },
    [addToast]
  );

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast("Item removido", "O produto foi retirado da sua sacola.", "info");
  }, [addToast]);

  const updateCartQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "VERTICE10" || clean === "PRIMEIRACOMPRA") {
      setAppliedCoupon({ code: clean, discountPercent: 10 });
      addToast("Cupom Aplicado!", "10% de desconto concedido na sacola.", "success");
      return true;
    } else if (clean === "VIP20") {
      setAppliedCoupon({ code: clean, discountPercent: 20 });
      addToast("Cupom VIP Aplicado!", "20% de desconto concedido na sacola.", "success");
      return true;
    } else {
      addToast("Cupom Inválido", "O código inserido expirou ou não existe.", "error");
      return false;
    }
  }, [addToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    addToast("Cupom removido", "O desconto foi retirado da sacola.", "info");
  }, [addToast]);

  // Wishlist Actions
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast("Removido dos favoritos", "Item retirado da sua lista.", "info");
        return prev.filter((id) => id !== productId);
      } else {
        const prod = products.find((p) => p.id === productId);
        addToast("Salvo nos favoritos", prod ? prod.name : "Item adicionado.", "success");
        return [...prev, productId];
      }
    });
  }, [products, addToast]);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const moveToCartFromWishlist = useCallback((productId: string, size?: string, color?: string) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const finalSize = size || prod.sizes[0];
    const finalColor = color || prod.colors[0].name;
    addToCart(prod, finalSize, finalColor, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  }, [products, addToCart]);

  // Quick Shop
  const openQuickShop = useCallback((product: Product) => {
    setQuickShopProduct(product);
    setIsQuickShopOpen(true);
  }, []);

  const closeQuickShop = useCallback(() => {
    setIsQuickShopOpen(false);
    setQuickShopProduct(null);
  }, []);

  // UI Overlays
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openSizeGuide = useCallback(() => setIsSizeGuideOpen(true), []);
  const closeSizeGuide = useCallback(() => setIsSizeGuideOpen(false), []);

  // Auth & Orders
  const login = useCallback((email: string, name = "João Silva") => {
    setUser({
      name,
      email,
      phone: "(11) 98765-4321",
      addresses: [
        {
          id: "addr-1",
          name: "Principal (Casa)",
          street: "Av. Paulista",
          number: "1842",
          neighborhood: "Bela Vista",
          city: "São Paulo",
          state: "SP",
          zipCode: "01310-200",
          isDefault: true,
        },
      ],
    });
    setIsLoggedIn(true);
    addToast("Bem-vindo de volta", `Login realizado com sucesso como ${name}.`, "success");
  }, [addToast]);

  const logout = useCallback(() => {
    setUser(null);
    setIsLoggedIn(false);
    addToast("Sessão encerrada", "Você saiu da sua conta.", "info");
  }, [addToast]);

  const createOrder = useCallback(
    (
      items: CartItem[],
      paymentMethod: "pix" | "credit_card" | "boleto",
      address: Order["shippingAddress"]
    ): Order => {
      const orderId = `VTC-${Math.floor(10000 + Math.random() * 90000)}`;
      const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
      const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 29.9;
      const total = Math.max(0, subtotal - discount + shipping);

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" }),
        status: "CONFIRMADO",
        trackingCode: `BR${Math.floor(100000000 + Math.random() * 900000000)}VT`,
        items: items.map((i) => ({
          id: `${orderId}-${i.id}`,
          productName: i.product.name,
          image: i.product.images[0],
          color: i.selectedColor,
          size: i.selectedSize,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        shippingAddress: address,
      };

      setOrders((prev) => [newOrder, ...prev]);
      clearCart();
      return newOrder;
    },
    [appliedCoupon, clearCart]
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setSortOption("relevance");
  }, []);

  return (
    <VerticeContext.Provider
      value={{
        products,
        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        freeShippingRemaining,
        freeShippingProgress,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isWishlisted,
        moveToCartFromWishlist,
        isCartOpen,
        openCart,
        closeCart,
        quickShopProduct,
        isQuickShopOpen,
        openQuickShop,
        closeQuickShop,
        isSearchOpen,
        openSearch,
        closeSearch,
        isSizeGuideOpen,
        openSizeGuide,
        closeSizeGuide,
        toasts,
        addToast,
        removeToast,
        user,
        isLoggedIn,
        orders,
        login,
        logout,
        createOrder,
        filters,
        setFilters,
        sortOption,
        setSortOption,
        resetFilters,
      }}
    >
      {children}
    </VerticeContext.Provider>
  );
}

export function useVertice() {
  const context = useContext(VerticeContext);
  if (!context) {
    throw new Error("useVertice must be used within a VerticeProvider");
  }
  return context;
}
