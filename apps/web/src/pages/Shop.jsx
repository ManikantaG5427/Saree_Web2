import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, ChevronDown, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext.jsx';
import { SareeCard } from '../components/ui/SareeCard.jsx';
import { FloralMotif } from '../assets/Logo.jsx';

export function Shop() {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Filter state initialized from URL params if present
  const categoryParam = searchParams.get('category') || 'All';
  const occasionParam = searchParams.get('occasion') || 'All';
  const searchParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedOccasion, setSelectedOccasion] = useState(occasionParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [onlySilkMark, setOnlySilkMark] = useState(false);
  const [sortBy, setSortBy] = useState(sortParam);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync state if URL changes
  React.useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('occasion')) setSelectedOccasion(searchParams.get('occasion'));
    if (searchParams.get('sort')) setSortBy(searchParams.get('sort'));
  }, [searchParams]);

  const fabrics = ['All', 'Pure Mulberry Silk', 'Pure Uppada Silk', 'Pure Katan Silk', 'Fine Cotton Body with Pure Silk Borders', 'Pure Silk Organza'];
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹20,000', value: 'under-20k' },
    { label: '₹20,000 to ₹35,000', value: '20k-35k' },
    { label: 'Above ₹35,000', value: 'above-35k' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (searchParam) {
          const q = searchParam.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchWeave = p.weave && p.weave.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchWeave) return false;
        }
        // Category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        // Occasion
        if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false;
        // Fabric
        if (selectedFabric !== 'All' && p.fabric !== selectedFabric) return false;
        // Silk Mark
        if (onlySilkMark && !p.isSilkMark) return false;
        // Price
        if (selectedPriceRange === 'under-20k' && p.price >= 20000) return false;
        if (selectedPriceRange === '20k-35k' && (p.price < 20000 || p.price > 35000)) return false;
        if (selectedPriceRange === 'above-35k' && p.price <= 35000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'new') return b.isNew ? 1 : -1;
        return 0; // featured default
      });
  }, [products, searchParam, selectedCategory, selectedOccasion, selectedFabric, onlySilkMark, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedPriceRange('All');
    setSelectedFabric('All');
    setOnlySilkMark(false);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#280030] text-[#FFF8F0] py-10 border-b border-[#F0C860]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-stone-300 mb-3 flex items-center gap-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#F0C860]">Catalogue</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-white">{selectedCategory}</span>
              </>
            )}
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
            {searchParam
              ? `Search Results for "${searchParam}"`
              : selectedCategory !== 'All'
              ? selectedCategory
              : 'Complete Handloom Saree Collection'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl font-light">
            Heirloom handloom sarees woven with pure silk filaments, verified authentic zari, and certified by the Silk Mark Organisation of India.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Control Bar */}
        <div className="bg-white border border-[#E8DFE5] rounded-xs p-3.5 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs text-xs font-semibold text-[#280030]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#F0C860]" />
              <span>Filters</span>
            </button>

            <span className="text-xs font-semibold text-[#706873]">
              Showing <span className="text-[#280030] font-bold">{filteredProducts.length}</span> Sarees
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#706873] hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs px-3 py-1.5 text-[#29232A] font-semibold focus:outline-none focus:border-[#280030] cursor-pointer"
            >
              <option value="featured">Curated & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="new">Newest Additions</option>
            </select>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-[#E8DFE5] pb-3">
                <span className="font-serif text-base font-bold text-[#280030]">Filters</span>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#BD3D78] hover:underline font-semibold cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Silk Mark Toggle */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-[#280030] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlySilkMark}
                    onChange={(e) => setOnlySilkMark(e.target.checked)}
                    className="rounded-xs text-[#280030] focus:ring-[#280030]"
                  />
                  <span>Silk Mark Guaranteed Only</span>
                </label>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#280030] mb-2">Category</h4>
                <div className="space-y-1.5 text-xs text-[#706873]">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`block w-full text-left py-1 transition-colors ${
                      selectedCategory === 'All' ? 'text-[#280030] font-bold' : 'hover:text-[#280030]'
                    }`}
                  >
                    All Collections
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.name)}
                      className={`block w-full text-left py-1 transition-colors ${
                        selectedCategory === c.name ? 'text-[#280030] font-bold' : 'hover:text-[#280030]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#280030] mb-2">Occasion</h4>
                <div className="space-y-1.5 text-xs text-[#706873]">
                  {['All', 'Weddings', 'Festivals', 'Traditional Ceremonies', 'Family Celebrations', 'Everyday Wear'].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => setSelectedOccasion(occ)}
                      className={`block w-full text-left py-1 transition-colors ${
                        selectedOccasion === occ ? 'text-[#280030] font-bold' : 'hover:text-[#280030]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#280030] mb-2">Price Budget</h4>
                <div className="space-y-1.5 text-xs text-[#706873]">
                  {priceRanges.map((pr) => (
                    <button
                      key={pr.value}
                      onClick={() => setSelectedPriceRange(pr.value)}
                      className={`block w-full text-left py-1 transition-colors ${
                        selectedPriceRange === pr.value ? 'text-[#280030] font-bold' : 'hover:text-[#280030]'
                      }`}
                    >
                      {pr.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#280030] mb-2">Fabric / Material</h4>
                <div className="space-y-1.5 text-xs text-[#706873]">
                  {fabrics.map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFabric(f)}
                      className={`block w-full text-left py-1 truncate transition-colors ${
                        selectedFabric === f ? 'text-[#280030] font-bold' : 'hover:text-[#280030]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid Area (3 cols) */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <SareeCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E8DFE5] rounded-xs p-12 text-center space-y-4">
                <FloralMotif className="w-10 h-10 text-[#F0C860] mx-auto opacity-70" />
                <h3 className="font-serif text-xl font-bold text-[#280030]">No Sarees Match Your Filters</h3>
                <p className="text-xs text-[#706873] max-w-md mx-auto leading-relaxed">
                  We couldn't find any sarees matching your selected filter criteria. Try resetting your filters to view all heirloom collections.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-[#280030] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#3b0347] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8DFE5] pb-3">
              <span className="font-serif text-lg font-bold text-[#280030]">Filters</span>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                <X className="w-6 h-6 text-[#29232A]" />
              </button>
            </div>

            {/* Same filter items for mobile */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-[#280030]">
                <input
                  type="checkbox"
                  checked={onlySilkMark}
                  onChange={(e) => setOnlySilkMark(e.target.checked)}
                />
                <span>Silk Mark Guaranteed Only</span>
              </label>
            </div>

            <div>
              <h4 className="font-serif text-sm font-bold text-[#280030] mb-2">Category</h4>
              <div className="space-y-1 text-xs">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c.name);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left py-1 ${
                      selectedCategory === c.name ? 'text-[#280030] font-bold' : 'text-[#706873]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFE5]">
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-[#FFF8F0] border border-[#E8DFE5] text-xs font-semibold uppercase tracking-wider text-[#BD3D78] rounded-xs"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
