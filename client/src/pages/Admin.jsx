import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import { useProducts } from '../contexts/ProductContext.jsx';
import { useOrders } from '../contexts/OrderContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { formatPrice } from '../lib/utils.js';
import { FloralMotif } from '../assets/Logo.jsx';

export function Admin() {
  const { user, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, categories } = useProducts();
  const { orders, updateOrderStatus, returns, updateReturnStatus, wholesales } = useOrders();

  const [activeTab, setActiveTab] = useState('studio'); // 'analytics', 'studio', 'catalogue', 'orders', 'returns', 'wholesale'

  // Multi-Angle Photography Studio Form State
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

  // Multi-Angle Image Array
  const [imageUrls, setImageUrls] = useState([
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
  ]);
  const [urlInput, setUrlInput] = useState('');
  const [studioNotice, setStudioNotice] = useState('');

  // File multi-upload handler using FileReader for local device uploads
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

  const handleCreateSaree = (e) => {
    e.preventDefault();
    if (!name || !price) {
      setStudioNotice('Please enter Saree Name and Price.');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newSaree = {
      name,
      slug,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category,
      categorySlug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      weave,
      fabric,
      zari,
      color,
      occasion,
      origin,
      stock: Number(stock) || 1,
      isSilkMark,
      hasBlouse,
      blouseDetail,
      length,
      description: description || `${name} handcrafted with pure ${fabric} and ${zari}.`,
      weaveStory: weaveStory || `Woven by master artisans preserving traditional ${weave} technique.`,
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'],
    };

    addProduct(newSaree);
    setStudioNotice(`✓ Successfully added "${name}" to live catalogue!`);

    // Reset inputs
    setName('');
    setPrice('');
    setOriginalPrice('');
    setDescription('');
    setWeaveStory('');
    setTimeout(() => setStudioNotice(''), 3000);
  };

  // Analytics Calculations from genuine records
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === 'PAID' ? o.total : 0), 0);
  const pendingActions = orders.filter((o) => o.orderStatus === 'CONFIRMED' || o.orderStatus === 'PENDING').length;
  const pendingReturns = returns.filter((r) => r.status === 'REQUESTED').length;

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Admin Top Navigation */}
      <header className="bg-[#280030] text-white border-b border-[#F0C860]/40 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg font-bold tracking-wider text-[#F0C860] uppercase">
              SLSH Weaves · Admin Management Console
            </span>
            <span className="bg-[#F0C860] text-[#280030] text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-widest hidden sm:inline">
              Super Admin Mode
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-stone-300 hidden md:inline">Logged in as Venkateshwarlu (Proprietor)</span>
            <button
              onClick={logout}
              className="text-[#BD3D78] hover:text-white font-semibold cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-[#E8DFE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto text-xs font-semibold uppercase tracking-wider no-scrollbar">
          <button
            onClick={() => setActiveTab('studio')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'studio' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            ✦ Multi-Angle Photo Studio
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'catalogue' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            Live Catalogue ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'orders' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            Orders & Tracking ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'returns' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            Returns & Refunds ({returns.length})
          </button>

          <button
            onClick={() => setActiveTab('wholesale')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'wholesale' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            B2B Enquiries ({wholesales.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3.5 px-4 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'analytics' ? 'border-[#280030] text-[#280030] font-bold' : 'border-transparent text-[#706873] hover:text-[#280030]'
            }`}
          >
            Analytics Overview
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= TAB 1: MULTI-ANGLE STUDIO ================= */}
        {activeTab === 'studio' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFE5] pb-4 mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#280030] flex items-center gap-2">
                    <span>Multi-Angle Saree Photography Studio</span>
                  </h2>
                  <p className="text-xs text-[#706873] mt-0.5">
                    Upload multiple high-definition device photographs representing angles 1 to 6 (Model Drape, Pallu Zari, Border Motif, Pleats, Blouse, Daylight true-tone).
                  </p>
                </div>
              </div>

              {studioNotice && (
                <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-xs">
                  {studioNotice}
                </div>
              )}

              <form onSubmit={handleCreateSaree} className="space-y-6">
                {/* 1. Multi-Image Studio Strip */}
                <div className="bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs p-5 space-y-4">
                  <h3 className="font-serif text-sm font-bold text-[#280030] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#F0C860]" />
                    <span>Angles & Photographs ({imageUrls.length} Loaded)</span>
                  </h3>

                  {/* Device Multi-File Upload & URL Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border-2 border-dashed border-[#280030]/30 rounded-xs bg-white text-center">
                      <Upload className="w-6 h-6 text-[#280030] mx-auto mb-2" />
                      <p className="text-xs font-bold text-[#280030]">Upload Multiple Saree Photos</p>
                      <p className="text-[10px] text-[#706873] mt-0.5">Select multiple files from device camera or folder</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="mt-3 block w-full text-xs text-stone-500 file:mr-2 file:py-1 file:px-3 file:rounded-xs file:border-0 file:text-xs file:font-semibold file:bg-[#280030] file:text-white cursor-pointer"
                      />
                    </div>

                    <div className="p-4 border border-[#E8DFE5] rounded-xs bg-white flex flex-col justify-center space-y-2">
                      <p className="text-xs font-bold text-[#280030]">Or Paste Image URL</p>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="https://..."
                          value={urlInput}
                          onChange={(e) => setUrlInput(e.target.value)}
                          className="flex-1 p-2 border border-[#E8DFE5] rounded-xs text-xs"
                        />
                        <button
                          type="button"
                          onClick={addImageUrl}
                          className="px-4 py-2 bg-[#280030] text-white text-xs font-semibold rounded-xs hover:bg-[#3b0347] cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Angle Order Cards with Primary Cover Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                    {imageUrls.map((img, idx) => (
                      <div
                        key={idx}
                        className={`relative group bg-white border-2 rounded-xs overflow-hidden shadow-xs flex flex-col ${
                          idx === 0 ? 'border-[#F0C860]' : 'border-[#E8DFE5]'
                        }`}
                      >
                        <div className="aspect-[3/4] relative bg-stone-100">
                          <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />

                          {/* Cover Star indicator */}
                          {idx === 0 ? (
                            <span className="absolute top-1.5 left-1.5 bg-[#280030] text-[#F0C860] px-1.5 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                              <Star className="w-2.5 h-2.5 fill-[#F0C860]" />
                              Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setCoverImage(idx)}
                              className="absolute top-1.5 left-1.5 bg-white/90 text-[#280030] hover:bg-[#280030] hover:text-[#F0C860] p-1 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Set as Main Cover Photo"
                            >
                              <Star className="w-3 h-3" />
                            </button>
                          )}

                          {/* Delete Photo */}
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1.5 right-1.5 bg-red-600 text-white p-1 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Angle Sequence Controls */}
                        <div className="p-1.5 bg-[#FAF7F2] border-t border-[#E8DFE5] flex items-center justify-between text-[10px]">
                          <span className="font-bold text-[#706873]">Angle {idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveImage(idx, -1)}
                              className="p-0.5 hover:bg-stone-200 rounded-xs disabled:opacity-30 cursor-pointer"
                              title="Move Left / Earlier"
                            >
                              <ArrowUp className="w-3 h-3 -rotate-90" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === imageUrls.length - 1}
                              onClick={() => moveImage(idx, 1)}
                              className="p-0.5 hover:bg-stone-200 rounded-xs disabled:opacity-30 cursor-pointer"
                              title="Move Right / Later"
                            >
                              <ArrowDown className="w-3 h-3 -rotate-90" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Saree Specifications Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <label className="block font-semibold text-[#29232A] mb-1">Saree Name / Title *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Royal Peacock Blue Korvai Kanchipuram Pattu"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Selling Price (INR) *</label>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="38500"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Original Price (for Genuine Discount)</label>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="44000"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Collection / Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    >
                      <option value="Handloom Pattu Sarees">Handloom Pattu Sarees</option>
                      <option value="Uppada Silk Sarees">Uppada Jamdani Silks</option>
                      <option value="Banarasi Brocades">Banarasi Brocades</option>
                      <option value="Gadwal Handlooms">Gadwal Handlooms</option>
                      <option value="Wedding & Bridal">Wedding & Bridal</option>
                      <option value="Fancy & Boutique Sarees">Fancy & Boutique Sarees</option>
                      <option value="Dress Materials">Pure Silk Dress Materials</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Weave Technique</label>
                    <input
                      type="text"
                      value={weave}
                      onChange={(e) => setWeave(e.target.value)}
                      placeholder="e.g. Kanjeevaram Korvai"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Fabric Base</label>
                    <input
                      type="text"
                      value={fabric}
                      onChange={(e) => setFabric(e.target.value)}
                      placeholder="e.g. Pure Mulberry Silk"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Zari Specification</label>
                    <input
                      type="text"
                      value={zari}
                      onChange={(e) => setZari(e.target.value)}
                      placeholder="e.g. Pure Gold Zari"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Color Description</label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g. Peacock Teal & Crimson"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Festivals">Festivals</option>
                      <option value="Family Celebrations">Family Celebrations</option>
                      <option value="Traditional Ceremonies">Traditional Ceremonies</option>
                      <option value="Everyday Wear">Everyday Wear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Loom Origin</label>
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="e.g. Kanchipuram, Tamil Nadu"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Inventory Stock Units</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  {/* Silk Mark & Blouse Toggles */}
                  <div className="flex items-center gap-6 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[#280030]">
                      <input
                        type="checkbox"
                        checked={isSilkMark}
                        onChange={(e) => setIsSilkMark(e.target.checked)}
                        className="w-4 h-4 text-[#280030]"
                      />
                      <span>Silk Mark Certified</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[#280030]">
                      <input
                        type="checkbox"
                        checked={hasBlouse}
                        onChange={(e) => setHasBlouse(e.target.checked)}
                        className="w-4 h-4 text-[#280030]"
                      />
                      <span>Includes Blouse Piece</span>
                    </label>
                  </div>
                </div>

                {/* Description & Weave Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Detailed Description</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explain the motifs, border styling, and feel of the drape..."
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Artisan Loom Story</label>
                    <textarea
                      rows={3}
                      value={weaveStory}
                      onChange={(e) => setWeaveStory(e.target.value)}
                      placeholder="Notes about the weaving technique, number of days taken on loom..."
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#F0C860]" />
                    <span>Publish Saree to Live Catalogue</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LIVE CATALOGUE ================= */}
        {activeTab === 'catalogue' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#280030]">
              Active Catalogue Products ({products.length})
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF8F0] border-y border-[#E8DFE5] text-[#706873] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Saree</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Weave</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Silk Mark</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFE5]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FFF8F0]/50">
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.images?.[0]} alt={p.name} className="w-10 h-12 object-cover rounded-xs" />
                        <div>
                          <p className="font-bold text-[#29232A] line-clamp-1">{p.name}</p>
                          <p className="text-[10px] text-[#706873]">SKU: {p.sku}</p>
                        </div>
                      </td>
                      <td className="p-3 text-[#706873]">{p.category}</td>
                      <td className="p-3 text-[#706873]">{p.weave}</td>
                      <td className="p-3 font-serif font-bold text-[#280030]">{formatPrice(p.price)}</td>
                      <td className="p-3 font-semibold">{p.stock} units</td>
                      <td className="p-3">
                        {p.isSilkMark ? (
                          <span className="text-[#426B46] font-bold">✓ Certified</span>
                        ) : (
                          <span className="text-stone-400">Regular</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-[#BD3D78] hover:text-red-700 p-1 cursor-pointer"
                          title="Delete Saree"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#280030]">
              Customer Orders & Fulfillment ({orders.length})
            </h2>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-4 border border-[#E8DFE5] rounded-xs bg-[#FFF8F0]/30 space-y-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DFE5] pb-2 font-semibold">
                    <div>
                      <span className="text-[#706873]">Ref:</span> <span className="font-mono text-[#280030]">{ord.id}</span>
                      <span className="mx-2 text-[#E8DFE5]">|</span>
                      <span>Customer: {ord.customerName} ({ord.customerPhone})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-sm text-[#280030]">{formatPrice(ord.total)}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#426B46]/10 text-[#426B46]">
                        {ord.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Transition status buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[#706873] font-semibold">Update Status:</span>
                    {['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => updateOrderStatus(ord.id, st)}
                        className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                          ord.orderStatus === st ? 'bg-[#280030] text-[#FFF8F0]' : 'bg-white border border-[#E8DFE5] text-[#706873] hover:border-[#280030]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: RETURNS ================= */}
        {activeTab === 'returns' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#280030]">
              Return Requests & Razorpay Refunds ({returns.length})
            </h2>

            {returns.length === 0 ? (
              <p className="text-xs text-[#706873] py-8 text-center">No active return requests.</p>
            ) : (
              <div className="space-y-4 text-xs">
                {returns.map((ret) => (
                  <div key={ret.id} className="p-4 border border-[#E8DFE5] rounded-xs space-y-3">
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
                        onClick={() => updateReturnStatus(ret.id, 'APPROVED')}
                        className="px-3 py-1 bg-[#426B46] text-white font-semibold rounded-xs"
                      >
                        Approve Return
                      </button>
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'REFUNDED')}
                        className="px-3 py-1 bg-[#280030] text-[#F0C860] font-semibold rounded-xs"
                      >
                        Initiate Razorpay Refund
                      </button>
                      <button
                        onClick={() => updateReturnStatus(ret.id, 'REJECTED')}
                        className="px-3 py-1 border border-red-300 text-red-600 rounded-xs"
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

        {/* ================= TAB 5: WHOLESALE ENQUIRIES ================= */}
        {activeTab === 'wholesale' && (
          <div className="bg-white border border-[#E8DFE5] rounded-xs p-6 shadow-xs space-y-4">
            <h2 className="font-serif text-xl font-bold text-[#280030]">
              Wholesale & Bulk Enquiries ({wholesales.length})
            </h2>

            <div className="space-y-3 text-xs">
              {wholesales.map((w) => (
                <div key={w.id} className="p-4 border border-[#E8DFE5] rounded-xs bg-[#FFF8F0]/30 space-y-1">
                  <div className="flex justify-between font-bold text-[#280030]">
                    <span>{w.name} {w.businessName && `(${w.businessName})`}</span>
                    <span>{w.city}</span>
                  </div>
                  <p className="text-[#706873]">WhatsApp: <a href={`https://wa.me/${w.phone.replace(/[^0-9]/g, '')}`} className="font-bold text-[#426B46] underline">{w.phone}</a></p>
                  <p className="text-[#706873]">Collection: <span className="font-semibold text-[#29232A]">{w.category}</span> • Qty: <span className="font-semibold text-[#29232A]">{w.estimatedQuantity}</span></p>
                  {w.message && <p className="text-[#706873] italic">"{w.message}"</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: ANALYTICS OVERVIEW ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-[#E8DFE5] rounded-xs text-center">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Verified Sales</p>
                <p className="font-serif text-2xl font-bold text-[#280030] mt-1">{formatPrice(totalRevenue)}</p>
              </div>

              <div className="p-5 bg-white border border-[#E8DFE5] rounded-xs text-center">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Total Orders</p>
                <p className="font-serif text-2xl font-bold text-[#280030] mt-1">{totalOrders}</p>
              </div>

              <div className="p-5 bg-white border border-[#E8DFE5] rounded-xs text-center">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Action Needed</p>
                <p className="font-serif text-2xl font-bold text-[#BD3D78] mt-1">{pendingActions}</p>
              </div>

              <div className="p-5 bg-white border border-[#E8DFE5] rounded-xs text-center">
                <p className="text-[10px] text-[#706873] uppercase font-bold tracking-wider">Pending Returns</p>
                <p className="font-serif text-2xl font-bold text-[#426B46] mt-1">{pendingReturns}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
