import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  CheckCircle2,
  Package,
  Filter,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  MapPin,
  History,
  Clock,
  ExternalLink,
  ChevronLeft,
  Maximize2,
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Zap
} from 'lucide-react';

/**
 * TITAN STORE - Showroom V8 (Cleanse Update)
 * Features:
 * - Fixed: Zap icon import and component rendering.
 * - Standard Terminology: Track Order, Purchased, My Cart.
 * - Catalog Expansion: 12 unique premium items with diverse imagery.
 * - Help & Support: Dedicated support interface.
 * - Navigation: Fixed "View Catalog" auto-scroll.
 */

const MOCK_PRODUCTS = [
  // --- ELECTRONICS ---
  { 
    _id: 'e1', 
    name: 'Neural Studio Over-Ear', 
    price: 349, 
    category: 'Electronics', 
    baseImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    description: 'Professional grade spatial audio with active noise cancellation and 40h battery.',
    specs: ['40h Battery', 'Active Noise Cancelling', 'Leather Cushions']
  },
  { 
    _id: 'e2', 
    name: 'Vertex Sapphire Watch', 
    price: 249, 
    category: 'Electronics', 
    baseImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    description: 'Precision tracking in a sapphire glass housing with 5-day endurance.',
    specs: ['OLED Display', 'Heart Rate Monitor', 'Waterproof 50m']
  },
  { 
    _id: 'e3', 
    name: 'Titan Mechanical V2', 
    price: 185, 
    category: 'Electronics', 
    baseImage: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
    description: 'Premium linear mechanical keyboard with CNC aluminum chassis.',
    specs: ['Linear Switches', 'RGB Backlit', 'Hot-Swappable']
  },
  { 
    _id: 'e4', 
    name: 'Nano Wireless Buds', 
    price: 159, 
    category: 'Electronics', 
    baseImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
    description: 'Ultra-lightweight wireless audio with instant pairing and clear mic.',
    specs: ['6h Playback', 'Touch Controls', 'USB-C Charging']
  },
  // --- APPAREL ---
  { 
    _id: 'a1', 
    name: 'Graphene Urban Shell', 
    price: 310, 
    category: 'Apparel', 
    baseImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3',
    description: 'Advanced waterproof technical jacket with internal climate control.',
    specs: ['Breathable', 'Laser-Cut Zips', 'Wind Resistant']
  },
  { 
    _id: 'a2', 
    name: 'Titan Modular Backpack', 
    price: 160, 
    category: 'Apparel', 
    baseImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    description: 'Heavy-duty modular storage with dedicated 16-inch laptop vault.',
    specs: ['1000D Nylon', 'MOLLE System', 'Waterproof Zips']
  },
  { 
    _id: 'a3', 
    name: 'Arctic Insulated Parka', 
    price: 420, 
    category: 'Apparel', 
    baseImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea',
    description: 'Extreme cold weather protection with recycled down insulation.',
    specs: ['-20C Rated', 'Removable Hood', 'Internal Straps']
  },
  { 
    _id: 'a4', 
    name: 'Technical Base Layer', 
    price: 85, 
    category: 'Apparel', 
    baseImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
    description: 'Compression-fit technical tee for moisture management.',
    specs: ['Moisture Wicking', 'Seamless', 'Anti-Odor']
  },
  // --- ACCESSORIES ---
  { 
    _id: 'acc1', 
    name: 'Precision Bolt Pen', 
    price: 95, 
    category: 'Accessories', 
    baseImage: 'https://images.unsplash.com/photo-1585336139118-132f7f21503e',
    description: 'Machined titanium bolt-action pen for ultimate writing feedback.',
    specs: ['Titanium Body', 'Refillable', 'Balanced Weight']
  },
  { 
    _id: 'acc2', 
    name: 'Titanium Smart Ring', 
    price: 199, 
    category: 'Accessories', 
    baseImage: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833',
    description: 'The world\'s lightest health tracker, finished in grade 5 titanium.',
    specs: ['Sleep Tracking', 'O2 Levels', '6-Day Battery']
  },
  { 
    _id: 'acc3', 
    name: 'Matte Hydro Flask', 
    price: 45, 
    category: 'Accessories', 
    baseImage: 'https://images.unsplash.com/photo-1602143307185-83e3125d496a',
    description: 'Triple-insulated bottle designed to keep liquids cold for 48 hours.',
    specs: ['750ml', 'BPA Free', 'Powder Coat']
  },
  { 
    _id: 'acc4', 
    name: 'Minimalist Card Holder', 
    price: 70, 
    category: 'Accessories', 
    baseImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
    description: 'RFID blocking carbon fiber wallet for the modern professional.',
    specs: ['Holds 12 Cards', 'Carbon Fiber', 'Elastic Cash Strap']
  }
];

const CATEGORIES = [
  { name: 'All', color: 'bg-[#4285F4]' },    
  { name: 'Electronics', color: 'bg-[#EA4335]' }, 
  { name: 'Apparel', color: 'bg-[#FBBC05]' },     
  { name: 'Accessories', color: 'bg-[#34A853]' }  
];

const getOptimizedUrl = (baseUrl, width = 600, quality = 75) => {
  if (!baseUrl) return '';
  return `${baseUrl}?auto=format&fit=crop&q=${quality}&w=${width}`;
};

export default function App() {
  const [view, setView] = useState('store'); // store, orders, help
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const catalogRef = useRef(null);
  
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('titan_cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [orders, setOrders] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('titan_orders');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zip: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 400); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('titan_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('titan_orders', JSON.stringify(orders));
  }, [orders]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, image: getOptimizedUrl(product.baseImage, 300) }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProcessOrder = async () => {
    setCheckoutStep('processing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: cartTotal,
      status: 'In Transit',
      shipping: { ...shippingInfo }
    };

    setOrders([newOrder, ...orders]);
    setCheckoutStep('success');
    setCart([]);
    
    setTimeout(() => {
      setCheckoutStep('cart');
      setIsCartOpen(false);
    }, 4000);
  };

  const scrollToCatalog = () => {
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F9FA] text-slate-900 font-sans antialiased selection:bg-[#4285F4]/20">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer shrink-0" onClick={() => { setView('store'); setSearch(''); setActiveCategory('All'); setSelectedProduct(null); }}>
            <div className="bg-[#4285F4] p-1 rounded shadow-sm">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="text-lg font-bold flex tracking-tight">
              <span className="text-[#4285F4]">T</span>
              <span className="text-[#EA4335]">i</span>
              <span className="text-[#FBBC05]">t</span>
              <span className="text-[#4285F4]">a</span>
              <span className="text-[#34A853]">n</span>
              <span className="ml-1 text-slate-500 font-semibold">Store</span>
            </div>
          </div>

          <div className="flex-1 max-lg mx-8 hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#4285F4]" />
              <input 
                type="text" 
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-100 border border-transparent rounded-full py-1.5 pl-10 pr-4 focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-[#4285F4]/10 transition-all outline-none text-xs font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
             <button 
              onClick={() => { setView('help'); setSelectedProduct(null); }}
              className={`p-2 rounded-full transition-all hover:bg-slate-100 ${view === 'help' ? 'text-[#4285F4] bg-blue-50' : 'text-slate-400'}`}
              title="Help & Support"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { setView(view === 'orders' ? 'store' : 'orders'); setSelectedProduct(null); }}
              className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider ${
                view === 'orders' ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{view === 'orders' ? 'Store' : 'My Orders'}</span>
            </button>
            <button 
              onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }}
              className="relative p-2 hover:bg-slate-100 rounded-full transition-all active:scale-90 group"
            >
              <ShoppingBag className="w-6 h-6 text-slate-600 group-hover:text-[#4285F4]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#EA4335] text-white text-[9px] font-bold px-1 py-0.5 rounded-full min-w-[18px] text-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {view === 'store' ? (
          <div className="animate-in fade-in duration-700">
            
            {/* HERO */}
            <section className="mb-8 bg-white rounded-2xl p-4 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 overflow-hidden relative">
              <div className="flex-1 text-center md:text-left z-10 pl-2">
                <h1 className="text-3xl sm:text-5xl font-black mb-2 tracking-tight">
                  Elite <span className="text-[#4285F4]">Titan</span> Hardware.
                </h1>
                <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
                  The highest quality electronics and apparel for global professionals. Shop our latest collection of premium tools.
                </p>
                <div className="flex justify-center md:justify-start">
                  <button 
                    onClick={scrollToCatalog}
                    className="bg-[#4285F4] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-all text-xs uppercase tracking-widest"
                  >
                    View Catalog
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full max-w-[150px] sm:max-w-[200px]">
                 <div className="aspect-square w-full bg-slate-50 rounded-[2.5rem] flex items-center justify-center p-8 shadow-inner">
                    <Package className="w-20 h-20 text-[#4285F4] opacity-20" />
                 </div>
              </div>
            </section>

            {/* CATEGORIES */}
            <div ref={catalogRef} className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 scroll-mt-20">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-5 py-2 rounded-full text-[11px] font-bold transition-all border shrink-0 uppercase tracking-wider ${
                      activeCategory === cat.name 
                      ? `${cat.color} text-white border-transparent shadow-md` 
                      : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Filter className="w-3 h-3" />
                <span>{filteredProducts.length} results</span>
              </div>
            </div>

            {/* DENSE GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredProducts.map((product, idx) => (
                <div 
                  key={product._id} 
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full relative cursor-pointer animate-in fade-in zoom-in slide-in-from-bottom-10"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="aspect-square overflow-hidden relative bg-slate-100">
                    <img 
                      src={getOptimizedUrl(product.baseImage, 400, 70)} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name} 
                    />
                    <div className="absolute top-3 left-3 z-20">
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider text-slate-400 border border-slate-100 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                        className="bg-[#4285F4] p-2.5 rounded-xl shadow-lg text-white hover:bg-slate-900 transition-all transform active:scale-90"
                      >
                        <Plus className="w-4 h-4" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-[#4285F4] transition-colors mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-slate-400 text-[10px] font-medium leading-relaxed mb-4 flex-1 line-clamp-2 uppercase tracking-tight opacity-70">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                      <span className="font-black text-[#EA4335] text-base tracking-tighter font-mono">${product.price}</span>
                      <div className="flex items-center gap-1 text-slate-200">
                        <Maximize2 className="w-3 h-3" />
                        <span className="text-[8px] font-black uppercase tracking-widest">View</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : view === 'orders' ? (
          /* ORDERS LOG */
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-4xl mx-auto">
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase">My Orders</h2>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Track order progress and history</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-24 text-center border border-slate-200 shadow-sm flex flex-col items-center">
                <History className="w-16 h-16 text-slate-100 mb-6" />
                <h3 className="text-lg font-bold text-slate-900 mb-8 uppercase tracking-widest opacity-50">No Orders Detected</h3>
                <button onClick={() => setView('store')} className="px-8 py-3 bg-[#4285F4] text-white rounded-full font-bold shadow-lg text-xs uppercase tracking-widest">Begin Shopping</button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500">
                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-wrap gap-8 justify-between items-center text-xs">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Order ID</p>
                        <h4 className="font-bold text-slate-900 font-mono">{order.id}</h4>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34A853]/10 text-[#34A853] text-[10px] font-bold uppercase">
                          <Truck className="w-3 h-3" /> {order.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Valuation</p>
                        <p className="font-black text-[#EA4335] text-sm">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Purchased Items</p>
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <img src={item.image} className="w-10 h-10 rounded-lg object-cover bg-slate-50 shadow-inner" alt={item.name} />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-900 text-xs truncate">{item.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.quantity} units • ${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Track Order</p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                          <p className="font-bold text-slate-900 mb-1 uppercase tracking-tighter">{order.shipping.name}</p>
                          <p className="text-slate-400 font-medium">{order.shipping.address}</p>
                          <p className="text-[#4285F4] font-black mt-2 uppercase tracking-widest">{order.shipping.city}, {order.shipping.zip}</p>
                        </div>
                        <button className="w-full py-2 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors">
                           Track via Satellite <ExternalLink className="w-3 h-3 inline-block ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* HELP & SUPPORT VIEW */
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 max-w-4xl mx-auto">
             <div className="mb-12 text-center">
                <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4 uppercase">Support Center</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">How can we assist you today?</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 hover:shadow-lg transition-all">
                   <div className="w-12 h-12 bg-blue-50 text-[#4285F4] rounded-2xl flex items-center justify-center mx-auto">
                      <MessageSquare className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-slate-900">Live Chat</h3>
                   <p className="text-xs text-slate-400 font-medium">Instant support from our technical architects.</p>
                   <button className="text-[10px] font-black text-[#4285F4] uppercase tracking-widest">Open Chat</button>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 hover:shadow-lg transition-all">
                   <div className="w-12 h-12 bg-green-50 text-[#34A853] rounded-2xl flex items-center justify-center mx-auto">
                      <Mail className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-slate-900">Email Support</h3>
                   <p className="text-xs text-slate-400 font-medium">Detailed inquiries responded within 12 hours.</p>
                   <button className="text-[10px] font-black text-[#34A853] uppercase tracking-widest">Send Ticket</button>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 hover:shadow-lg transition-all">
                   <div className="w-12 h-12 bg-red-50 text-[#EA4335] rounded-2xl flex items-center justify-center mx-auto">
                      <Phone className="w-6 h-6" />
                   </div>
                   <h3 className="font-bold text-slate-900">Priority Line</h3>
                   <p className="text-xs text-slate-400 font-medium">Global support hotline for elite members.</p>
                   <button className="text-[10px] font-black text-[#EA4335] uppercase tracking-widest">View Number</button>
                </div>
             </div>

             <div className="bg-white rounded-3xl border border-slate-200 p-10">
                <h3 className="font-black text-slate-900 uppercase text-xs tracking-[4px] mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6">
                   {[
                     { q: "What is your return policy?", a: "We offer a 30-day no-friction return policy on all technical apparel and hardware." },
                     { q: "Do you ship internationally?", a: "Yes, Titan Store provides global expedited shipping with live satellite tracking." },
                     { q: "How do I claim a warranty?", a: "Warranty claims can be initiated through the 'My Orders' log using your Order ID." }
                   ].map((faq, i) => (
                     <div key={i} className="space-y-2 border-b border-slate-50 pb-6 last:border-0">
                        <p className="font-bold text-slate-900 text-sm">{faq.q}</p>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </main>

      {/* DETAIL MODAL (Tile Opened Up) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10">
          <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl transition-opacity animate-in fade-in" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative w-full max-w-5xl h-full max-h-[750px] bg-white rounded-[2.5rem] shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-500">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-50 p-3 bg-white/80 rounded-full hover:bg-[#EA4335] hover:text-white transition-all shadow-md active:scale-90">
              <X className="w-6 h-6" strokeWidth={3} />
            </button>
            <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center">
               <img 
                src={getOptimizedUrl(selectedProduct.baseImage, 1200, 85)} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl" 
                alt={selectedProduct.name} 
               />
            </div>
            <div className="flex-1 p-10 md:p-16 overflow-y-auto no-scrollbar flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#4285F4] rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                      <Zap className="w-3 h-3 fill-[#4285F4]" /> Premium Asset Identified
                   </div>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-slate-400 font-bold uppercase tracking-wide leading-relaxed text-sm opacity-80">
                    {selectedProduct.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   {selectedProduct.specs?.map((spec, i) => (
                     <div key={i} className="space-y-1">
                        <p className="text-[9px] font-bold text-[#34A853] uppercase tracking-widest">Key Specification</p>
                        <p className="font-bold text-slate-900 tracking-tight text-sm uppercase">{spec}</p>
                     </div>
                   ))}
                </div>
                <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-10">
                   <div>
                     <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-1">Price</p>
                     <p className="text-4xl font-black text-[#EA4335] tracking-tighter font-mono">${selectedProduct.price}</p>
                   </div>
                   <button 
                     onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setIsCartOpen(true); }}
                     className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[3px] shadow-xl hover:bg-[#4285F4] transition-all transform active:scale-95 flex items-center gap-2"
                   >
                     Add to Cart <Plus className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART & CHECKOUT SIDEBAR */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-700">
              
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  {checkoutStep !== 'cart' && checkoutStep !== 'processing' && checkoutStep !== 'success' && (
                    <button onClick={() => setCheckoutStep(prev => prev === 'payment' ? 'shipping' : 'cart')} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    {checkoutStep === 'cart' ? 'My Cart' : checkoutStep === 'shipping' ? 'Logistics' : 'Payment'}
                  </h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
                
                {checkoutStep === 'cart' && (
                  cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                      <ShoppingBag className="w-16 h-16 text-slate-300" strokeWidth={1} />
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Cart is empty</h3>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item._id} className="flex gap-5 group items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-slate-900 text-sm truncate uppercase tracking-tighter">{item.name}</h4>
                            <button onClick={() => removeFromCart(item._id)} className="text-slate-300 hover:text-[#EA4335] transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[#EA4335] font-black text-xs mb-3 font-mono">${item.price}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center bg-slate-100 rounded-lg px-2 py-1 border border-slate-200">
                              <button onClick={() => updateQuantity(item._id, -1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600" disabled={item.quantity <= 1}>
                                <Minus className="w-3 h-3" strokeWidth={3} />
                              </button>
                              <span className="w-8 text-center text-[10px] font-black text-slate-900 font-mono">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item._id, 1)} className="p-1 hover:bg-white rounded shadow-sm text-slate-600">
                                <Plus className="w-3 h-3" strokeWidth={3} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                )}

                {checkoutStep === 'shipping' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-10">
                    <div className="space-y-4">
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[4px]">Logistics Details</p>
                      <input 
                        type="text" 
                        placeholder="Full Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:bg-white focus:border-[#4285F4] outline-none text-xs font-bold uppercase tracking-wider"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                      />
                      <textarea 
                        placeholder="Shipping Address"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:bg-white focus:border-[#4285F4] outline-none text-xs font-bold uppercase tracking-wider h-32 resize-none"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="City" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-[#4285F4] text-xs font-bold uppercase tracking-wider" value={shippingInfo.city} onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}/>
                        <input type="text" placeholder="Zip" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 outline-none focus:border-[#4285F4] text-xs font-bold uppercase tracking-wider" value={shippingInfo.zip} onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}/>
                      </div>
                    </div>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-10">
                    <div className="p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden shadow-xl">
                       <div className="relative z-10 space-y-10">
                          <div className="flex justify-between items-center">
                             <ShieldCheck className="w-8 h-8 text-[#4285F4]" />
                             <span className="text-[8px] font-bold uppercase tracking-[4px] opacity-40">Titan Secure</span>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Authorized Member</p>
                             <p className="text-lg font-bold uppercase tracking-tighter">{shippingInfo.name || 'GUEST MEMBER'}</p>
                          </div>
                          <div className="flex justify-between items-end">
                             <p className="text-base font-mono tracking-widest">•••• •••• •••• 9920</p>
                             <div className="flex gap-1.5">
                                <div className="w-6 h-6 rounded-full bg-[#EA4335]/90" />
                                <div className="w-6 h-6 rounded-full bg-[#FBBC05]/90 -ml-3" />
                             </div>
                          </div>
                       </div>
                       <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-24 translate-x-12 blur-3xl" />
                    </div>
                  </div>
                )}

                {checkoutStep === 'processing' && (
                  <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in zoom-in">
                    <div className="w-16 h-16 border-8 border-slate-100 border-t-[#4285F4] rounded-full animate-spin"></div>
                    <h3 className="text-lg font-bold text-slate-900 text-center uppercase tracking-widest">Finalizing <br /> Purchase...</h3>
                  </div>
                )}

                {checkoutStep === 'success' && (
                  <div className="h-full flex flex-col items-center justify-center space-y-8 text-center animate-in zoom-in">
                    <div className="w-20 h-20 bg-[#34A853] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#34A853]/30 animate-bounce">
                      <CheckCircle2 className="w-10 h-10" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Purchased</h3>
                      <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-3 px-10 leading-relaxed">Your order is confirmed. Check your tracking in 'My Orders'.</p>
                    </div>
                  </div>
                )}

              </div>

              {cart.length > 0 && checkoutStep !== 'processing' && checkoutStep !== 'success' && (
                <div className="p-10 bg-slate-50 border-t border-slate-200">
                  <div className="space-y-4 mb-10">
                    <div className="flex justify-between text-slate-900 text-2xl font-black tracking-tighter">
                      <span className="uppercase text-[10px] tracking-[4px] mt-2">Order Total</span>
                      <span className="text-[#4285F4] font-mono">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      if (checkoutStep === 'cart') setCheckoutStep('shipping');
                      else if (checkoutStep === 'shipping') setCheckoutStep('payment');
                      else handleProcessOrder();
                    }}
                    className="w-full py-5 rounded-full font-black text-[10px] flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-2xl bg-slate-900 text-white hover:bg-[#4285F4] uppercase tracking-[3px]"
                  >
                    <span>{checkoutStep === 'cart' ? 'Checkout' : checkoutStep === 'shipping' ? 'Logistics' : 'Place Order'}</span>
                    <ArrowRight className="w-5 h-5" strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}