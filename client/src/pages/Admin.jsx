import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  RefreshCw, 
  Building2, 
  Search,
  ExternalLink,
  ShieldCheck,
  Award,
  BarChart3,
  FileText,
  Truck,
  RotateCcw,
  Sparkles,
  Layers,
  Calendar,
  MessageSquare,
  Printer,
  X,
  Edit3,
  DollarSign,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useProducts } from '../contexts/ProductContext.jsx';
import { useOrders } from '../contexts/OrderContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { formatPrice } from '../lib/utils.js';

export function Admin() {
  const { user, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, adjustStock, categories } = useProducts();
  const { orders, updateOrderStatus, returns, updateReturnStatus, wholesales } = useOrders();

  // Active module tab
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'catalogue', 'orders', 'looms', 'wholesale', 'returns', 'studio', 'announcements'

  // Analytics view mode: Graphical flow vs Textual view
  const [analyticsViewMode, setAnalyticsViewMode] = useState('graphical'); // 'graphical' | 'textual'
  const [timeRange, setTimeRange] = useState('month'); // 'today', 'week', 'month', 'all'

  // Catalogue filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'low', 'out', 'in'

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Invoice Modal State
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  // Notification Banner
  const [adminNotice, setAdminNotice] = useState('');
  const showNotice = (msg) => {
    setAdminNotice(msg);
    setTimeout(() => setAdminNotice(''), 3000);
  };

  // ==============================================================
  // MULTI-ANGLE STUDIO STATE
  // ==============================================================
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Handloom Pattu Sarees');
  const [weave, setWeave] = useState('Kanjeevaram Korvai');
  const [fabric, setFabric] = useState('Pure Mulberry Silk');
  const [zari, setZari] = useState('Pure Gold Zari (Zari Testing Certified)');
  const [color, setColor] = useState('Crimson Maroon');
  const [occasion, setOccasion] = useState('Weddings');
  const [origin, setOrigin] = useState('Kanchipuram, Tamil Nadu');
  const [stock, setStock] = useState('3');
  const [isSilkMark, setIsSilkMark] = useState(true);
  const [hasBlouse, setHasBlouse] = useState(true);
  const [blouseDetail, setBlouseDetail] = useState('Matching Silk Brocade with Zari Border (80 cm)');
  const [length, setLength] = useState('6.3 Meters');
  const [description, setDescription] = useState('');
  const [weaveStory, setWeaveStory] = useState('');

  const [imageUrls, setImageUrls] = useState([
    '/images/kanjeevaram-crimson-pure.jpg',
    '/images/kanjeevaram-pallu-pure.jpg',
    '/images/zari-pallu-macro.jpg',
  ]);
  const [urlInput, setUrlInput] = useState('');

  // Pit Loom Registry State
  const [pitLooms, setPitLooms] = useState([
    {
      id: 'loom-01',
      artisan: 'Master Weaver Narayana',
      location: 'Bhoodan Pochampally, Telangana',
      loomType: 'Traditional Pit Loom (Double Ikat)',
      sareeTitle: 'Navaratna Geometric Pure Silk Pochampally Ikat',
      warpProgress: 84,
      daysElapsed: 16,
      estimatedDays: 18,
      fairWageStatus: 'Verified Paid',
      status: 'In Progress',
    },
    {
      id: 'loom-02',
      artisan: 'Master Weaver Murugan',
      location: 'Chinna Kanchipuram, Tamil Nadu',
      loomType: 'Three-Shuttle Interlocking Korvai Pit Loom',
      sareeTitle: 'Vaidarbhi Royal Peacock Korvai Bridal Silk',
      warpProgress: 65,
      daysElapsed: 22,
      estimatedDays: 32,
      fairWageStatus: 'Verified Paid',
      status: 'In Progress',
    },
    {
      id: 'loom-03',
      artisan: 'Master Weaver Appala Raju',
      location: 'Uppada Coastal Hamlet, Andhra Pradesh',
      loomType: 'Non-Structural Weft Jamdani Frame Loom',
      sareeTitle: 'Royal Peacock Jamdani Pure Uppada Silk',
      warpProgress: 92,
      daysElapsed: 20,
      estimatedDays: 21,
      fairWageStatus: 'Verified Paid',
      status: 'Final Finishing',
    },
    {
      id: 'loom-04',
      artisan: 'Master Weaver Kondaiah',
      location: 'Jogulamba Gadwal, Telangana',
      loomType: 'Cotton-Silk Interlocking Kupadam Pit Loom',
      sareeTitle: 'Telangana Heritage Mustard Pure Gadwal Kupadam',
      warpProgress: 70,
      daysElapsed: 14,
      estimatedDays: 18,
      fairWageStatus: 'Verified Paid',
      status: 'In Progress',
    },
    {
      id: 'loom-05',
      artisan: 'Master Weaver Ramprasad Ansari',
      location: 'Madanpura, Varanasi, Uttar Pradesh',
      loomType: 'Traditional Kadwa Konia Pit Loom',
      sareeTitle: 'Shahi Konia Meenakari Pure Katan Banarasi Silk',
      warpProgress: 50,
      daysElapsed: 15,
      estimatedDays: 30,
      fairWageStatus: 'Verified Paid',
      status: 'In Progress',
    },
    {
      id: 'loom-06',
      artisan: 'Master Weaver Venkataramana',
      location: 'Dharmavaram, Andhra Pradesh',
      loomType: 'Wide-Beam Brocade Temple Pit Loom',
      sareeTitle: 'Sita Kalyanam Royal Green Dharmavaram Bridal Pattu',
      warpProgress: 88,
      daysElapsed: 23,
      estimatedDays: 26,
      fairWageStatus: 'Verified Paid',
      status: 'In Progress',
    },
  ]);

  // Announcements State
  const [announcementText, setAnnouncementText] = useState(
    'Established 2003 • Pattu Sarees • Wholesale & Retail • Hyderabad • Complimentary Fall & Pico'
  );
  const [festiveBannerActive, setFestiveBannerActive] = useState(true);

  // ==============================================================
  // COMPUTED ANALYTICS & STATS
  // ==============================================================
  const totalOrders = orders.length;
  const verifiedRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 1284500; // includes retail store sales
  const averageOrderValue = Math.round(verifiedRevenue / (totalOrders + 38));
  const totalInventoryItems = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
  const silkMarkItemsCount = products.filter((p) => p.isSilkMark).length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 2).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // Cluster distribution
  const clusterStats = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const cluster = p.weave || p.category;
      map[cluster] = (map[cluster] || 0) + 1;
    });
    return Object.entries(map).map(([cluster, count]) => ({
      cluster,
      count,
      percent: Math.round((count / products.length) * 100),
    }));
  }, [products]);

  // Filtered catalogue
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q || 
        p.name.toLowerCase().includes(q) || 
        p.sku?.toLowerCase().includes(q) || 
        p.weave?.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q);

      const matchesCategory = 
        categoryFilter === 'all' || 
        p.category === categoryFilter || 
        p.categorySlug === categoryFilter;

      let matchesStock = true;
      if (stockFilter === 'low') matchesStock = p.stock > 0 && p.stock <= 2;
      else if (stockFilter === 'out') matchesStock = p.stock === 0;
      else if (stockFilter === 'in') matchesStock = p.stock > 0;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchQuery, categoryFilter, stockFilter]);

  // Handle Image Upload & Reordering
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrls((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addImageUrl = () => {
    if (urlInput.trim()) {
      setImageUrls((prev) => [...prev, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const removeImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const setCoverImage = (index) => {
    if (index === 0) return;
    setImageUrls((prev) => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
  };

  const moveImage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= imageUrls.length) return;
    setImageUrls((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!name || !price) {
      showNotice('Please provide at least a saree title and selling price.');
      return;
    }

    const newProd = {
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      price: parseInt(price, 10),
      originalPrice: originalPrice ? parseInt(originalPrice, 10) : Math.round(parseInt(price, 10) * 1.15),
      category,
      categorySlug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      weave,
      fabric,
      zari,
      color,
      colorHex: '#800020',
      occasion,
      origin,
      stock: parseInt(stock, 10) || 1,
      availability: (parseInt(stock, 10) || 1) > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
      isSilkMark,
      hasBlouse,
      blouseDetail,
      length,
      description: description || 'Certified handloom pure silk saree handwoven on traditional pit loom.',
      weaveStory: weaveStory || 'Handcrafted by master artisans with authentic Silk Mark certification.',
      images: imageUrls.length > 0 ? imageUrls : ['/images/kanjeevaram-crimson-pure.jpg'],
    };

    addProduct(newProd);
    showNotice(`✓ Added "${name}" (${products.length + 1} total sarees)!`);
    setIsAddModalOpen(false);

    // Reset inputs
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setWeaveStory('');
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    showNotice(`✓ Updated "${editingProduct.name}" details!`);
    setEditingProduct(null);
  };

  const handleLoomProgressAdvance = (id) => {
    setPitLooms((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const newProgress = Math.min(100, l.warpProgress + 10);
          return {
            ...l,
            warpProgress: newProgress,
            status: newProgress === 100 ? 'Completed & Inspected' : l.status,
          };
        }
        return l;
      })
    );
    showNotice('Loom warp progress updated successfully.');
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen text-[#29232A]">
      {/* ============================================================== */}
      {/* 1. ENTERPRISE ADMIN HEADER                                    */}
      {/* ============================================================== */}
      <header className="bg-[#280030] text-white border-b border-[#F0C860]/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#F0C860]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wider text-[#F0C860] uppercase">
                  SLSH Weaves · Enterprise Console
                </span>
                <span className="bg-[#F0C860] text-[#280030] text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest">
                  Estd. 2003
                </span>
              </div>
              <p className="text-[11px] text-stone-300">
                Sri Lakshmi Saree House • Dilsukhnagar, Hyderabad • Handloom Master Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-stone-300 hidden md:inline">
              Venkateshwarlu (Proprietor)
            </span>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#F0C860] hover:bg-[#ffe394] text-[#280030] font-bold rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Saree</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 border border-stone-600 hover:border-[#F0C860] text-stone-300 hover:text-white rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3 text-[#F0C860]" />
            </a>
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-800 rounded-xs font-semibold cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Floating Notice Alert */}
      {adminNotice && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3">
          <div className="p-3 bg-green-50 border border-green-300 text-green-800 text-xs rounded-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="font-semibold">{adminNotice}</span>
            </div>
            <button onClick={() => setAdminNotice('')} className="text-green-700 hover:text-green-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. NAVIGATION MODULE TABS                                      */}
      {/* ============================================================== */}
      <div className="bg-white border-b border-[#E8DFE5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto text-xs font-semibold uppercase tracking-wider no-scrollbar">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'analytics' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#F0C860]" />
            <span>Analytics & Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'catalogue' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <Layers className="w-4 h-4 text-[#BD3D78]" />
            <span>Handloom Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'orders' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <Package className="w-4 h-4 text-[#426B46]" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('looms')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'looms' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#F0C860]" />
            <span>Artisan Pit Looms ({pitLooms.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wholesale')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'wholesale' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#280030]" />
            <span>Wholesale Desk ({wholesales.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'returns' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-amber-600" />
            <span>Returns & Quality ({returns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'studio' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#005f73]" />
            <span>Photo Staging Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('announcements')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'announcements' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Store Notices</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ============================================================== */}
        {/* MODULE 1: ANALYTICS & REVENUE FLOW (GRAPHICAL & TEXTUAL)       */}
        {/* ============================================================== */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* View Mode & Date Range Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 border border-[#E8DFE5] rounded-xs shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#706873]">Analytics View:</span>
                <div className="inline-flex rounded-xs border border-[#E8DFE5] p-0.5 bg-[#FFF8F0]">
                  <button
                    onClick={() => setAnalyticsViewMode('graphical')}
                    className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-colors ${
                      analyticsViewMode === 'graphical' ? 'bg-[#280030] text-[#F0C860]' : 'text-[#706873] hover:text-[#280030]'
                    }`}
                  >
                    📊 Graphical Flow View
                  </button>
                  <button
                    onClick={() => setAnalyticsViewMode('textual')}
                    className={`px-3 py-1 text-xs font-bold rounded-xs cursor-pointer transition-colors ${
                      analyticsViewMode === 'textual' ? 'bg-[#280030] text-[#F0C860]' : 'text-[#706873] hover:text-[#280030]'
                    }`}
                  >
                    📄 Textual Executive Data
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-4 h-4 text-[#706873]" />
                <span className="font-semibold text-[#706873]">Period:</span>
                {['today', 'week', 'month', 'all'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-bold cursor-pointer ${
                      timeRange === t ? 'bg-[#280030] text-white' : 'bg-stone-100 text-[#706873] hover:bg-stone-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* High-Level Metric Tiles */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
              <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs shadow-xs">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Gross Sales (MTD)</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#280030] mt-1">{formatPrice(verifiedRevenue)}</p>
                <span className="inline-flex items-center text-[10px] text-green-700 font-semibold mt-1">
                  ↑ +18.4% vs last month
                </span>
              </div>

              <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs shadow-xs">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Average Order Value</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#280030] mt-1">{formatPrice(averageOrderValue)}</p>
                <span className="text-[10px] text-[#706873] mt-1 block">Pure silk handlooms</span>
              </div>

              <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs shadow-xs">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Inventory Capital</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#280030] mt-1">{formatPrice(totalInventoryValue)}</p>
                <span className="text-[10px] text-[#BD3D78] font-semibold mt-1 block">{totalInventoryItems} sarees in stock</span>
              </div>

              <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs shadow-xs">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Active Pit Looms</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#426B46] mt-1">{pitLooms.length} Stations</p>
                <span className="text-[10px] text-[#706873] mt-1 block">Telangana & AP clusters</span>
              </div>

              <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs shadow-xs">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Silk Mark Certified</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#280030] mt-1">
                  {Math.round((silkMarkItemsCount / products.length) * 100)}%
                </p>
                <span className="text-[10px] text-green-700 font-semibold mt-1 block">{silkMarkItemsCount} / {products.length} pure silks</span>
              </div>

              <div className="p-4 bg-white border border-[#E8DFE5] rounded-xs shadow-xs">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Low Stock Warnings</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-600 mt-1">{lowStockCount} Sarees</p>
                <span className="text-[10px] text-red-600 mt-1 block">{outOfStockCount} out of stock</span>
              </div>
            </div>

            {/* GRAPHICAL FLOW VIEW */}
            {analyticsViewMode === 'graphical' ? (
              <div className="space-y-6">
                {/* 1. Revenue Trajectory Area Chart */}
                <div className="bg-white border border-[#E8DFE5] p-6 rounded-xs shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFE5] pb-3">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#280030]">
                        Visual Revenue Trajectory & Festive Demand Curve
                      </h3>
                      <p className="text-xs text-[#706873]">
                        Monthly gross volume across Muhurtham, Festive, and Bespoke Handloom Drops
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-3 h-3 bg-[#280030] rounded-xs inline-block" />
                        <span>Kanjeevaram & Uppada</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="w-3 h-3 bg-[#F0C860] rounded-xs inline-block" />
                        <span>Banarasi & Gadwal</span>
                      </span>
                    </div>
                  </div>

                  {/* Handcrafted Responsive SVG Area Curve */}
                  <div className="h-64 w-full relative pt-4">
                    <svg viewBox="0 0 900 240" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#280030" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#F0C860" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="40" y1="20" x2="880" y2="20" stroke="#F0EAE1" strokeDasharray="4 4" />
                      <line x1="40" y1="80" x2="880" y2="80" stroke="#F0EAE1" strokeDasharray="4 4" />
                      <line x1="40" y1="140" x2="880" y2="140" stroke="#F0EAE1" strokeDasharray="4 4" />
                      <line x1="40" y1="200" x2="880" y2="200" stroke="#E8DFE5" />

                      {/* Area Fill */}
                      <path
                        d="M 60 170 Q 180 150 260 110 T 440 90 T 620 40 T 800 65 T 880 30 L 880 200 L 60 200 Z"
                        fill="url(#revenueGrad)"
                      />

                      {/* Primary Bezier Curve */}
                      <path
                        d="M 60 170 Q 180 150 260 110 T 440 90 T 620 40 T 800 65 T 880 30"
                        fill="none"
                        stroke="#280030"
                        strokeWidth="3.5"
                      />

                      {/* Secondary Gold Curve */}
                      <path
                        d="M 60 190 Q 180 170 260 140 T 440 120 T 620 80 T 800 100 T 880 70"
                        fill="none"
                        stroke="#F0C860"
                        strokeWidth="2.5"
                        strokeDasharray="6 3"
                      />

                      {/* Data Nodes */}
                      {[
                        { x: 60, y: 170, label: 'May', val: '₹4.2L' },
                        { x: 260, y: 110, label: 'Jun', val: '₹6.8L' },
                        { x: 440, y: 90, label: 'Jul', val: '₹8.4L' },
                        { x: 620, y: 40, label: 'Aug (Festive)', val: '₹14.2L' },
                        { x: 800, y: 65, label: 'Sep', val: '₹11.8L' },
                        { x: 880, y: 30, label: 'Oct (Muhurtham)', val: '₹16.5L' },
                      ].map((node, i) => (
                        <g key={i}>
                          <circle cx={node.x} cy={node.y} r="5" fill="#280030" stroke="#F0C860" strokeWidth="2" />
                          <text x={node.x} y={node.y - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#280030">
                            {node.val}
                          </text>
                          <text x={node.x} y="220" textAnchor="middle" fontSize="10" fill="#706873">
                            {node.label}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* 2. Cluster Contribution & Fulfillment Funnel Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cluster Revenue Share Bar Chart */}
                  <div className="bg-white border border-[#E8DFE5] p-6 rounded-xs shadow-xs space-y-4">
                    <h3 className="font-serif text-base font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                      Revenue Share by Handloom Weave Cluster
                    </h3>
                    <div className="space-y-3 text-xs">
                      {[
                        { cluster: 'Kanjeevaram Korvai & Bridal', share: 44, amount: '₹7.26L', color: '#280030' },
                        { cluster: 'Uppada Jamdani Fine Silks', share: 22, amount: '₹3.63L', color: '#005f73' },
                        { cluster: 'Banarasi Katan & Kadwa Brocades', share: 18, amount: '₹2.97L', color: '#800f2f' },
                        { cluster: 'Gadwal Kupadam Handlooms', share: 10, amount: '₹1.65L', color: '#d4a373' },
                        { cluster: 'Pochampally Ikat & Paithani', share: 6, amount: '₹0.99L', color: '#426B46' },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>{item.cluster}</span>
                            <span className="text-[#280030] font-mono font-bold">{item.amount} ({item.share}%)</span>
                          </div>
                          <div className="w-full h-3 bg-stone-100 rounded-xs overflow-hidden">
                            <div 
                              className="h-full rounded-xs transition-all duration-700"
                              style={{ width: `${item.share}%`, backgroundColor: item.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Journey Funnel */}
                  <div className="bg-white border border-[#E8DFE5] p-6 rounded-xs shadow-xs space-y-4">
                    <h3 className="font-serif text-base font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                      Handloom Patron Conversion Funnel
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      {[
                        { step: '1. Storefront Visitors', count: '14,820 Patrons', percent: 100, color: '#280030' },
                        { step: '2. Detailed Saree Spec Views', count: '6,450 Views', percent: 43, color: '#3b0347' },
                        { step: '3. WhatsApp Video Drape Requests', count: '890 Calls', percent: 14, color: '#426B46' },
                        { step: '4. Shopping Bag Additions', count: '540 Additions', percent: 8, color: '#BD3D78' },
                        { step: '5. Completed Orders (Razorpay)', count: '168 Orders', percent: 4, color: '#F0C860' },
                      ].map((step, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between font-semibold">
                            <span>{step.step}</span>
                            <span className="text-[#280030] font-mono font-bold">{step.count} ({step.percent}%)</span>
                          </div>
                          <div className="w-full h-2.5 bg-stone-100 rounded-xs overflow-hidden">
                            <div 
                              className="h-full rounded-xs"
                              style={{ width: `${step.percent}%`, backgroundColor: step.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TEXTUAL EXECUTIVE DATA VIEW */
              <div className="bg-white border border-[#E8DFE5] p-6 rounded-xs shadow-xs space-y-6 text-xs">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                    Executive Textile & Commercial Balance Report
                  </h3>
                  <p className="text-[#706873] mt-1">
                    Audited overview of current catalogue stock velocity, weaver settlement compliance, and revenue ratios.
                  </p>
                </div>

                {/* Textual Breakdown Table */}
                <div className="overflow-x-auto border border-[#E8DFE5] rounded-xs">
                  <table className="w-full text-left">
                    <thead className="bg-[#FFF8F0] border-b border-[#E8DFE5] text-[11px] uppercase tracking-wider text-[#280030] font-bold">
                      <tr>
                        <th className="p-3">Weave Category</th>
                        <th className="p-3">Primary Cluster Origin</th>
                        <th className="p-3">Live SKUs</th>
                        <th className="p-3">Units Sold</th>
                        <th className="p-3">Avg Selling Price</th>
                        <th className="p-3">Gross Revenue</th>
                        <th className="p-3">Silk Mark Audit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFE5]">
                      <tr>
                        <td className="p-3 font-bold text-[#280030]">Handloom Pattu Sarees</td>
                        <td className="p-3 text-[#706873]">Kanchipuram, Tamil Nadu</td>
                        <td className="p-3 font-mono font-semibold">10 Sarees</td>
                        <td className="p-3 font-mono font-semibold">24 Units</td>
                        <td className="p-3 font-mono">₹41,200</td>
                        <td className="p-3 font-mono font-bold text-[#280030]">₹9,88,800</td>
                        <td className="p-3 text-green-700 font-semibold">✓ 100% Passed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#280030]">Uppada Jamdani Silks</td>
                        <td className="p-3 text-[#706873]">Uppada, Andhra Pradesh</td>
                        <td className="p-3 font-mono font-semibold">8 Sarees</td>
                        <td className="p-3 font-mono font-semibold">18 Units</td>
                        <td className="p-3 font-mono">₹25,400</td>
                        <td className="p-3 font-mono font-bold text-[#280030]">₹4,57,200</td>
                        <td className="p-3 text-green-700 font-semibold">✓ 100% Passed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#280030]">Banarasi Brocades</td>
                        <td className="p-3 text-[#706873]">Varanasi, Uttar Pradesh</td>
                        <td className="p-3 font-mono font-semibold">8 Sarees</td>
                        <td className="p-3 font-mono font-semibold">14 Units</td>
                        <td className="p-3 font-mono">₹33,800</td>
                        <td className="p-3 font-mono font-bold text-[#280030]">₹4,73,200</td>
                        <td className="p-3 text-green-700 font-semibold">✓ 100% Passed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#280030]">Gadwal Handlooms</td>
                        <td className="p-3 text-[#706873]">Jogulamba Gadwal, Telangana</td>
                        <td className="p-3 font-mono font-semibold">6 Sarees</td>
                        <td className="p-3 font-mono font-semibold">21 Units</td>
                        <td className="p-3 font-mono">₹19,800</td>
                        <td className="p-3 font-mono font-bold text-[#280030]">₹4,15,800</td>
                        <td className="p-3 text-green-700 font-semibold">✓ 100% Passed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#280030]">Pochampally Ikat Silks</td>
                        <td className="p-3 text-[#706873]">Bhoodan Pochampally, Telangana</td>
                        <td className="p-3 font-mono font-semibold">6 Sarees</td>
                        <td className="p-3 font-mono font-semibold">19 Units</td>
                        <td className="p-3 font-mono">₹17,900</td>
                        <td className="p-3 font-mono font-bold text-[#280030]">₹3,40,100</td>
                        <td className="p-3 text-green-700 font-semibold">✓ 100% Passed</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#280030]">Paithani & Venkatagiri</td>
                        <td className="p-3 text-[#706873]">Yeola & Venkatagiri</td>
                        <td className="p-3 font-mono font-semibold">8 Sarees</td>
                        <td className="p-3 font-mono font-semibold">12 Units</td>
                        <td className="p-3 font-mono">₹31,000</td>
                        <td className="p-3 font-mono font-bold text-[#280030]">₹3,72,000</td>
                        <td className="p-3 text-green-700 font-semibold">✓ 100% Passed</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Key Executive Insights */}
                <div className="bg-[#FFF8F0] p-4 border border-[#E8DFE5] rounded-xs space-y-2">
                  <h4 className="font-bold text-[#280030] uppercase text-[11px] tracking-wider">
                    Executive Strategy Takeaways for Sri Lakshmi Saree House:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-[#706873]">
                    <li><strong>Highest Grossing Category:</strong> Traditional Kanjeevaram Korvai with 3-shuttle temple borders continues to drive 44% of bridal revenue.</li>
                    <li><strong>Telangana Regional Craft Pride:</strong> Gadwal Kupadam and Pochampally Double Ikats generated over ₹7.5 Lakhs with 0% returns due to verified pre-dispatch inspection.</li>
                    <li><strong>Complimentary Fall & Pico Hemming:</strong> Requested on 91% of domestic retail deliveries, providing strong customer loyalty against multi-brand retail portals.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 2: HANDLOOM INVENTORY CATALOGUE (50 SAREES - FULL CRUD) */}
        {/* ============================================================== */}
        {activeTab === 'catalogue' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 border border-[#E8DFE5] rounded-xs shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex-1 min-w-[240px] relative">
                <input
                  type="text"
                  placeholder="Search 50 handloom sarees by title, SKU, weave, or cluster..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
                <Search className="w-4 h-4 text-[#706873] absolute left-3 top-2.5" />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="p-2 border border-[#E8DFE5] rounded-xs bg-white text-xs outline-none"
                >
                  <option value="all">All Weave Categories ({products.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="p-2 border border-[#E8DFE5] rounded-xs bg-white text-xs outline-none"
                >
                  <option value="all">All Stock Status</option>
                  <option value="in">In Stock Only</option>
                  <option value="low">Low Stock (≤ 2)</option>
                  <option value="out">Out of Stock</option>
                </select>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-4 py-2 bg-[#280030] text-[#F0C860] font-bold rounded-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#3b0347]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Saree</span>
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center text-xs text-[#706873] px-1">
              <span>Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> authentic handloom sarees</span>
              <span>Proprietor Instant Actions: Click <strong>[+]</strong> or <strong>[-]</strong> to modify live stock</span>
            </div>

            {/* Saree Catalogue Table */}
            <div className="bg-white border border-[#E8DFE5] rounded-xs shadow-xs overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF8F0] border-b border-[#E8DFE5] text-[11px] uppercase tracking-wider text-[#280030] font-bold">
                  <tr>
                    <th className="p-3">Saree Preview</th>
                    <th className="p-3">Title & SKU</th>
                    <th className="p-3">Cluster & Weave</th>
                    <th className="p-3">Pricing</th>
                    <th className="p-3 text-center">Live Stock</th>
                    <th className="p-3 text-center">Silk Mark</th>
                    <th className="p-3 text-center">Featured</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFE5]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FFF8F0]/30 transition-colors">
                      {/* Image Thumbnail */}
                      <td className="p-3">
                        <img
                          src={p.images?.[0] || '/images/kanjeevaram-crimson-pure.jpg'}
                          alt={p.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                          }}
                          className="w-12 h-16 object-cover object-top rounded-xs border border-[#E8DFE5]"
                        />
                      </td>

                      {/* Title & SKU */}
                      <td className="p-3 max-w-[240px]">
                        <p className="font-serif font-bold text-[#280030] truncate" title={p.name}>
                          {p.name}
                        </p>
                        <p className="font-mono text-[10px] text-[#706873] mt-0.5">{p.sku}</p>
                        <p className="text-[10px] text-stone-500 truncate">{p.origin}</p>
                      </td>

                      {/* Cluster & Weave */}
                      <td className="p-3 max-w-[180px]">
                        <span className="font-semibold text-[#29232A] block truncate">{p.weave}</span>
                        <span className="text-[10px] text-[#BD3D78] block truncate">{p.category}</span>
                      </td>

                      {/* Pricing */}
                      <td className="p-3 font-mono">
                        <span className="font-bold text-[#280030] block">{formatPrice(p.price)}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-[10px] text-stone-400 line-through block">
                            {formatPrice(p.originalPrice)}
                          </span>
                        )}
                      </td>

                      {/* Instant Stock Counter */}
                      <td className="p-3 text-center">
                        <div className="inline-flex items-center border border-[#E8DFE5] rounded-xs overflow-hidden">
                          <button
                            onClick={() => adjustStock(p.id, -1)}
                            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-[#280030] font-bold cursor-pointer"
                            title="Decrease stock"
                          >
                            -
                          </button>
                          <span className={`px-2.5 py-0.5 font-mono font-bold text-xs ${
                            p.stock === 0 ? 'text-red-600 bg-red-50' : p.stock <= 2 ? 'text-amber-700 bg-amber-50' : 'text-[#280030]'
                          }`}>
                            {p.stock}
                          </span>
                          <button
                            onClick={() => adjustStock(p.id, 1)}
                            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-[#280030] font-bold cursor-pointer"
                            title="Increase stock"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Silk Mark Seal Toggle */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => updateProduct(p.id, { isSilkMark: !p.isSilkMark })}
                          className={`p-1 rounded-xs cursor-pointer ${
                            p.isSilkMark ? 'text-green-700 bg-green-50 border border-green-200' : 'text-stone-300 border border-stone-200'
                          }`}
                          title="Toggle Silk Mark Certification"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                          className={`p-1 rounded-xs cursor-pointer ${
                            p.isFeatured ? 'text-[#F0C860] bg-[#280030]' : 'text-stone-300 hover:text-stone-500'
                          }`}
                          title="Toggle Featured on Homepage"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/product/${p.slug || p.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-stone-500 hover:text-[#280030] border border-[#E8DFE5] rounded-xs"
                            title="View on site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 text-[#280030] hover:bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs cursor-pointer"
                            title="Edit details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete "${p.name}" from inventory?`)) {
                                deleteProduct(p.id);
                                showNotice(`Deleted "${p.name}".`);
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xs cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 3: ORDERS & DISPATCH FULFILLMENT PIPELINE               */}
        {/* ============================================================== */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFE5] pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#280030]">
                  Orders & Handloom Fulfillment Pipeline ({orders.length})
                </h2>
                <p className="text-xs text-[#706873]">
                  Track pre-dispatch Fall & Pico finishing, courier tracking assignments, and tax invoices.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-[#280030]">Active Stage Guide:</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-xs">Pending Hemming</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-xs">Dispatched</span>
                <span>→</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-xs">Delivered</span>
              </div>
            </div>

            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="border border-[#E8DFE5] rounded-xs p-5 bg-[#FFF8F0]/20 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8DFE5] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#280030]">{o.id}</span>
                        <span className="px-2 py-0.5 bg-[#280030] text-[#F0C860] font-bold text-[10px] rounded-xs uppercase">
                          {o.orderStatus || 'CONFIRMED'}
                        </span>
                      </div>
                      <p className="text-xs text-[#706873] mt-0.5">
                        Placed by <strong className="text-[#29232A]">{o.shippingAddress?.fullName || 'Patron'}</strong> ({o.shippingAddress?.phone}) • {o.shippingAddress?.city}, {o.shippingAddress?.state}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-base text-[#280030]">{formatPrice(o.total)}</span>
                      <button
                        onClick={() => setSelectedInvoiceOrder(o)}
                        className="px-3 py-1 bg-white border border-[#E8DFE5] hover:border-[#280030] text-[#280030] text-xs font-semibold rounded-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Invoice</span>
                      </button>
                    </div>
                  </div>

                  {/* Saree Items in Order */}
                  <div className="space-y-2">
                    {o.items?.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-white p-2.5 border border-[#E8DFE5] rounded-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={it.images?.[0] || '/images/kanjeevaram-crimson-pure.jpg'}
                            alt={it.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                            }}
                            className="w-10 h-12 object-cover rounded-xs border border-stone-200"
                          />
                          <div>
                            <p className="font-serif font-bold text-[#280030]">{it.name}</p>
                            <p className="text-[11px] text-[#706873]">Qty: {it.quantity || 1} • {it.weave || 'Pure Silk'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-semibold text-[#280030]">{formatPrice(it.price * (it.quantity || 1))}</span>
                          <span className="text-[10px] text-green-700 block font-medium">✓ Complimentary Fall & Pico Included</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#706873] font-semibold">Advance Pipeline:</span>
                      <button
                        onClick={() => {
                          updateOrderStatus(o.id, 'HEMMING_FALL_PICO');
                          showNotice(`Order ${o.id} marked as In Hemming (Fall & Pico).`);
                        }}
                        className="px-2.5 py-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border border-yellow-300 font-semibold rounded-xs cursor-pointer"
                      >
                        1. Hemming (Fall & Pico)
                      </button>
                      <button
                        onClick={() => {
                          updateOrderStatus(o.id, 'DISPATCHED');
                          showNotice(`Order ${o.id} marked as Dispatched.`);
                        }}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 font-semibold rounded-xs cursor-pointer"
                      >
                        2. Dispatched (BlueDart)
                      </button>
                      <button
                        onClick={() => {
                          updateOrderStatus(o.id, 'DELIVERED');
                          showNotice(`Order ${o.id} marked as Delivered.`);
                        }}
                        className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 font-semibold rounded-xs cursor-pointer"
                      >
                        3. Delivered
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-stone-500 font-mono text-[11px]">
                      <Truck className="w-3.5 h-3.5 text-[#426B46]" />
                      <span>Tracking: BLUEDART-SLSH-{o.id.replace(/[^0-9]/g, '').slice(-6) || '749201'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 4: ARTISAN PIT LOOM REGISTRY                           */}
        {/* ============================================================== */}
        {activeTab === 'looms' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFE5] pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#280030]">
                  Master Weaver & Artisan Pit Loom Registry ({pitLooms.length} Active Stations)
                </h2>
                <p className="text-xs text-[#706873]">
                  Direct-from-loom tracking across Telangana, Andhra Pradesh, Kanchipuram, and Varanasi artisan hamlets.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 px-3 py-1.5 rounded-xs flex items-center gap-1.5 text-xs text-green-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>100% Fair Wage Guaranteed Directly to Master Weavers</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pitLooms.map((loom) => (
                <div key={loom.id} className="border border-[#E8DFE5] rounded-xs p-4 bg-[#FFF8F0]/30 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-serif text-base font-bold text-[#280030] block">{loom.artisan}</span>
                      <span className="text-xs text-[#706873]">{loom.location}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-[#280030] text-[#F0C860] font-bold text-[10px] rounded-xs uppercase">
                      {loom.status}
                    </span>
                  </div>

                  <div className="p-2.5 bg-white border border-[#E8DFE5] rounded-xs text-xs space-y-1">
                    <p className="font-semibold text-[#29232A]">Active Saree: {loom.sareeTitle}</p>
                    <p className="text-[11px] text-[#706873]">Loom Style: {loom.loomType}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Warp & Weft Completion</span>
                      <span className="font-mono text-[#280030]">{loom.warpProgress}% ({loom.daysElapsed} of {loom.estimatedDays} days)</span>
                    </div>
                    <div className="w-full h-2.5 bg-stone-200 rounded-xs overflow-hidden">
                      <div 
                        className="h-full bg-[#426B46] rounded-xs transition-all duration-500"
                        style={{ width: `${loom.warpProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-green-700 font-semibold">✓ {loom.fairWageStatus}</span>
                    <button
                      onClick={() => handleLoomProgressAdvance(loom.id)}
                      className="px-3 py-1 bg-[#280030] text-[#FFF8F0] font-bold text-[11px] uppercase tracking-wider rounded-xs hover:bg-[#3b0347] cursor-pointer"
                    >
                      Advance Warp (+10%)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 5: WHOLESALE & BULK TRADE DESK                         */}
        {/* ============================================================== */}
        {activeTab === 'wholesale' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8DFE5] pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#280030]">
                  Wholesale & Boutique Trade Desk ({wholesales.length})
                </h2>
                <p className="text-xs text-[#706873]">
                  Direct wholesale enquiries from multi-brand boutiques, bridal stylists, and overseas Telugu associations.
                </p>
              </div>

              <span className="text-xs text-[#280030] font-semibold bg-[#F0C860]/40 px-3 py-1.5 rounded-xs">
                Minimum Wholesale Order: 10 Pieces
              </span>
            </div>

            <div className="space-y-3">
              {wholesales.map((w) => (
                <div key={w.id} className="p-4 border border-[#E8DFE5] rounded-xs bg-[#FFF8F0]/30 space-y-2 text-xs">
                  <div className="flex flex-wrap justify-between items-center gap-2">
                    <span className="font-bold text-sm text-[#280030]">
                      {w.name} {w.businessName && `(${w.businessName})`}
                    </span>
                    <span className="font-mono text-stone-500">{w.city || 'India'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-stone-600">
                    <p>Phone: <strong className="text-[#29232A]">{w.phone}</strong></p>
                    <p>Category: <strong className="text-[#29232A]">{w.category || 'Handloom Pattu Sarees'}</strong></p>
                    <p>Quantity: <strong className="text-[#29232A]">{w.estimatedQuantity || '25-50 Pieces'}</strong></p>
                  </div>

                  {w.message && (
                    <p className="text-stone-600 italic bg-white p-2.5 rounded-xs border border-stone-200">
                      "{w.message}"
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/${w.phone.replace(/[^0-9]/g, '')}?text=Namaste%20${encodeURIComponent(w.name)},%20this%20is%20Venkateshwarlu%20from%20Sri%20Lakshmi%20Saree%20House%20Hyderabad%20regarding%20your%20wholesale%20enquiry%20for%20${encodeURIComponent(w.category || 'Handlooms')}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 bg-[#426B46] hover:bg-[#325235] text-white font-bold rounded-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send Official Wholesale Quote on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 6: RETURNS & QUALITY INSPECTION DESK                   */}
        {/* ============================================================== */}
        {activeTab === 'returns' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
              Returns & Razorpay Refund Authorization ({returns.length})
            </h2>

            {returns.length === 0 ? (
              <p className="text-xs text-[#706873] py-8 text-center">No active return requests. Current return rate &lt; 1.2%.</p>
            ) : (
              <div className="space-y-4 text-xs">
                {returns.map((ret) => (
                  <div key={ret.id} className="p-4 border border-[#E8DFE5] rounded-xs space-y-3 bg-[#FFF8F0]/20">
                    <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-2">
                      <span className="font-mono font-bold text-[#280030]">{ret.id}</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 font-bold rounded-xs uppercase">
                        {ret.status}
                      </span>
                    </div>
                    <p className="font-semibold text-[#29232A]">Item: {ret.item?.name}</p>
                    <p className="text-[#706873]">Reason: {ret.reason}</p>
                    {ret.details && <p className="text-[#706873]">Note: {ret.details}</p>}

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          updateReturnStatus(ret.id, 'APPROVED');
                          showNotice(`Return ${ret.id} approved for inspection.`);
                        }}
                        className="px-3 py-1 bg-[#426B46] text-white font-semibold rounded-xs cursor-pointer"
                      >
                        Approve Inspection
                      </button>
                      <button
                        onClick={() => {
                          updateReturnStatus(ret.id, 'REFUNDED');
                          showNotice(`Razorpay refund triggered for ${ret.id}.`);
                        }}
                        className="px-3 py-1 bg-[#280030] text-[#F0C860] font-semibold rounded-xs cursor-pointer"
                      >
                        Trigger Razorpay Refund
                      </button>
                      <button
                        onClick={() => {
                          updateReturnStatus(ret.id, 'REJECTED');
                          showNotice(`Return ${ret.id} rejected.`);
                        }}
                        className="px-3 py-1 border border-red-300 text-red-600 rounded-xs cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 7: MULTI-ANGLE PHOTO STAGING STUDIO                     */}
        {/* ============================================================== */}
        {activeTab === 'studio' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#280030]">
                Multi-Angle Handloom Photography Staging Studio
              </h2>
              <p className="text-xs text-[#706873] mt-1">
                Stage 1 to 6 authentic angles for each handloom saree: Folded drape, Pallu macro zari, Border motif, Pleats, and Daylight true color.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Saree Name / Heritage Title *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Swarnamani Korvai Bridal Kanjeevaram Pattu"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-[#29232A] mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="38500"
                        className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#29232A] mb-1">Original MRP Price (₹)</label>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="44000"
                        className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold text-[#29232A] mb-1">Weave Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2.5 border border-[#E8DFE5] rounded-xs bg-white outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-[#29232A] mb-1">Weave Technique *</label>
                      <input
                        type="text"
                        value={weave}
                        onChange={(e) => setWeave(e.target.value)}
                        className="w-full p-2.5 border border-[#E8DFE5] rounded-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-[#29232A] mb-1">Zari Specification *</label>
                      <input
                        type="text"
                        value={zari}
                        onChange={(e) => setZari(e.target.value)}
                        className="w-full p-2.5 border border-[#E8DFE5] rounded-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Textile Story & Weaver Legacy</label>
                    <textarea
                      rows={3}
                      value={weaveStory}
                      onChange={(e) => setWeaveStory(e.target.value)}
                      placeholder="Handwoven over 32 days on a traditional pit loom with authentic Silk Mark certification..."
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs outline-none"
                    />
                  </div>
                </div>

                {/* Staging Photo Box */}
                <div className="bg-[#FFF8F0] p-4 border border-[#E8DFE5] rounded-xs space-y-4">
                  <h3 className="font-serif font-bold text-[#280030] text-sm">
                    Angle Order & Staging ({imageUrls.length} Angles)
                  </h3>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold text-[#706873]">Upload from Device</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="w-full text-xs text-stone-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-[#280030] file:text-white cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold text-[#706873]">Or Add Image URL</label>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 p-2 bg-white border border-[#E8DFE5] rounded-xs outline-none text-xs"
                      />
                      <button
                        type="button"
                        onClick={addImageUrl}
                        className="px-3 py-1 bg-[#280030] text-white rounded-xs font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Previews */}
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {imageUrls.map((url, i) => (
                      <div key={i} className="flex items-center gap-2 p-1.5 bg-white border border-[#E8DFE5] rounded-xs">
                        <img 
                          src={url} 
                          alt={`Angle ${i + 1}`} 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/kanjeevaram-crimson-pure.jpg';
                          }}
                          className="w-10 h-12 object-cover rounded-xs" 
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-[11px] block">
                            {i === 0 ? '✦ Primary Cover' : `Angle ${i + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {i !== 0 && (
                            <button
                              type="button"
                              onClick={() => setCoverImage(i)}
                              className="p-1 text-amber-600 hover:text-amber-800"
                              title="Set as Cover Photo"
                            >
                              <Star className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#280030] hover:bg-[#3b0347] text-[#F0C860] font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-sm"
                  >
                    Publish Saree to Catalogue
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================== */}
        {/* MODULE 8: STOREFRONT ANNOUNCEMENTS & FESTIVE NOTICES          */}
        {/* ============================================================== */}
        {activeTab === 'announcements' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#280030]">
                Storefront Announcements & Header Marquee
              </h2>
              <p className="text-xs text-[#706873] mt-1">
                Customize the top fixed announcement banner visible to all visitors.
              </p>
            </div>

            <div className="space-y-4 text-xs max-w-2xl">
              <div>
                <label className="block font-semibold text-[#29232A] mb-1">
                  Fixed Header Announcement Strip Text
                </label>
                <input
                  type="text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full p-3 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="festiveToggle"
                  checked={festiveBannerActive}
                  onChange={(e) => setFestiveBannerActive(e.target.checked)}
                  className="w-4 h-4 text-[#280030] rounded-xs"
                />
                <label htmlFor="festiveToggle" className="font-semibold text-[#29232A]">
                  Enable Festive Wedding Drop Badge on Homepage
                </label>
              </div>

              <button
                type="button"
                onClick={() => showNotice('✓ Storefront announcement banner updated successfully!')}
                className="px-6 py-2.5 bg-[#280030] text-[#F0C860] font-bold uppercase tracking-wider rounded-xs hover:bg-[#3b0347] cursor-pointer"
              >
                Save Announcement
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL: EDIT PRODUCT DETAILS                                    */}
      {/* ============================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full border border-[#E8DFE5] rounded-xs p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#280030]">
                Edit Handloom Saree: {editingProduct.sku}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-[#706873] hover:text-[#280030]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value, 10) })}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseInt(e.target.value, 10) })}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) })}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Weave Technique</label>
                  <input
                    type="text"
                    value={editingProduct.weave}
                    onChange={(e) => setEditingProduct({ ...editingProduct, weave: e.target.value })}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Zari Specification</label>
                  <input
                    type="text"
                    value={editingProduct.zari}
                    onChange={(e) => setEditingProduct({ ...editingProduct, zari: e.target.value })}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Textile Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E8DFE5]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-[#E8DFE5] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#280030] text-[#F0C860] font-bold rounded-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD PRODUCT QUICK MODAL                                 */}
      {/* ============================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full border border-[#E8DFE5] rounded-xs p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs">
            <div className="flex justify-between items-center border-b border-[#E8DFE5] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#280030]">
                Add New Handloom Saree to Catalogue
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#706873] hover:text-[#280030]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Saree Heritage Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Swarnavalli Korvai Bridal Kanjeevaram Pattu"
                  className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="34500"
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Stock Count *</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="3"
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs bg-white outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Origin Cluster</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full p-2 border border-[#E8DFE5] rounded-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E8DFE5]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#E8DFE5] rounded-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#280030] text-[#F0C860] font-bold rounded-xs"
                >
                  Add to Live Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: PRINTABLE TAX INVOICE                                   */}
      {/* ============================================================== */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full border border-[#E8DFE5] rounded-xs p-8 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto text-xs font-sans">
            <div className="flex justify-between items-start border-b border-[#E8DFE5] pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#280030]">SRI LAKSHMI SAREE HOUSE</h2>
                <p className="text-[11px] text-[#706873]">Estd. 2003 • Proprietor: Venkateshwarlu</p>
                <p className="text-[10px] text-stone-500">H.No. 12-118 & 124, P&T Colony Main Road, Dilsukhnagar, Hyderabad - 500060</p>
                <p className="text-[10px] text-stone-500">GSTIN: 36AAJFS4829K1Z4 • Silk Mark Authenticated Handlooms</p>
              </div>
              <button onClick={() => setSelectedInvoiceOrder(null)} className="text-stone-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[11px]">
              <div>
                <span className="text-[#706873] block">Tax Invoice To:</span>
                <strong className="text-[#280030] block">{selectedInvoiceOrder.shippingAddress?.fullName}</strong>
                <span>{selectedInvoiceOrder.shippingAddress?.addressLine1}</span>
                <span className="block">{selectedInvoiceOrder.shippingAddress?.city}, {selectedInvoiceOrder.shippingAddress?.postalCode}</span>
                <span>Phone: {selectedInvoiceOrder.shippingAddress?.phone}</span>
              </div>
              <div className="text-right">
                <span className="text-[#706873] block">Invoice Number:</span>
                <strong className="font-mono text-[#280030] block">INV-SLSH-{selectedInvoiceOrder.id}</strong>
                <span className="text-[#706873] block">Date: {new Date().toLocaleDateString('en-IN')}</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 font-bold rounded-xs uppercase text-[10px] inline-block mt-1">
                  Payment: Verified Paid (Razorpay)
                </span>
              </div>
            </div>

            {/* Invoice Line Items */}
            <table className="w-full text-left border border-[#E8DFE5] rounded-xs">
              <thead className="bg-stone-50 text-[10px] uppercase font-bold text-[#280030] border-b border-[#E8DFE5]">
                <tr>
                  <th className="p-2">Item Description</th>
                  <th className="p-2 text-center">HSN</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFE5] text-[11px]">
                {selectedInvoiceOrder.items?.map((it, i) => (
                  <tr key={i}>
                    <td className="p-2 font-semibold">
                      {it.name}
                      <span className="block text-[9px] text-[#426B46]">✓ Includes Fall & Pico Tailoring</span>
                    </td>
                    <td className="p-2 text-center font-mono">5007</td>
                    <td className="p-2 text-center font-mono">{it.quantity || 1}</td>
                    <td className="p-2 text-right font-mono font-bold">{formatPrice(it.price * (it.quantity || 1))}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center pt-2 border-t border-[#E8DFE5] text-xs">
              <span className="text-stone-500">Thank you for patronizing genuine Telangana & Indian handloom weavers.</span>
              <div className="text-right">
                <span className="text-[#706873] text-[10px] block">Grand Total:</span>
                <strong className="font-serif text-lg font-bold text-[#280030]">{formatPrice(selectedInvoiceOrder.total)}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#280030] text-[#F0C860] font-bold rounded-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Tax Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
