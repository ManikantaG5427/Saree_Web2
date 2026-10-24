import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ArrowRight, BookOpen } from 'lucide-react';
import { FloralMotif } from '../assets/Logo.jsx';

export function HandloomGuide() {
  const weaves = [
    {
      title: 'Kanchipuram Korvai Pattu',
      origin: 'Kanchipuram, Tamil Nadu',
      desc: 'The Korvai technique is a revered handloom method where the body of the saree and the contrast borders are woven on separate shuttles by two weavers working in complete rhythm. The temple interlocking spikes (known as Rekku) symbolize ancient Dravidian temple architecture. Korvai drapes have superior strength and can be passed down generations.',
      motifs: 'Mayil (Peacock), Rudraksha, Yali, Temple Spikes, Mango (Paisley)',
      fabric: 'Heavy 3-ply twisted pure mulberry silk',
      image: '/images/kanjeevaram-bridal.jpg',
    },
    {
      title: 'Uppada Jamdani Silks',
      origin: 'Uppada, East Godavari, Andhra Pradesh',
      desc: 'Jamdani is a non-structural supplementary weft technique dating back centuries. In coastal Uppada, master weavers hand-place every individual gold and silver zari thread into the fine silk warp using bamboo needles. The result is an impossibly light saree (often under 400 grams) with no loose threads or floats on the reverse side.',
      motifs: 'Floral Jaal, Geometric Creepers, Birds of Paradise',
      fabric: '100-count pure filament silk',
      image: '/images/uppada-peacock.jpg',
    },
    {
      title: 'Banarasi Kadwa Katan Brocade',
      origin: 'Varanasi, Uttar Pradesh',
      desc: 'Kadwa is the pinnacle of Banarasi weaving. Unlike fyling-shuttle brocades where threads are cut at the back, in Kadwa weaving, each motif is individually hand-engraved into the warp. This laborious method requires upwards of 4 weeks on the loom, resulting in a smooth backside and elevated motifs that feel three-dimensional.',
      motifs: 'Meenakari Florals, Shikargah (Hunting scenes), Jangla, Paisley',
      fabric: 'Pure Katan (Twisted silk filaments)',
      image: '/images/emerald-banarasi.jpg',
    },
    {
      title: 'Gadwal Kupadam Handlooms',
      origin: 'Gadwal, Telangana',
      desc: 'Telangana’s prized geographical indication handloom. Woven with a cooling, breathable high-count cotton body joined to rich pure silk borders through the interlocking Kupadam technique. It offers the majestic ceremonial presence of pure silk while remaining comfortable in tropical heat.',
      motifs: 'Temple Borders, Traditional Hansa, Diamond Checks',
      fabric: 'Cotton body with pure silk border & pallu',
      image: '/images/gadwal-mustard.jpg',
    },
  ];

  return (
    <div className="bg-[#FFF8F0] min-h-screen">
      <div className="bg-[#280030] text-[#FFF8F0] py-14 border-b border-[#F0C860]/40 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <FloralMotif className="w-8 h-8 text-[#F0C860] mx-auto" />
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Indian Handloom & Weave Guide
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            An educational guide to understanding authentic weaving techniques, genuine zari purity, and Silk Mark certifications.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Weaves List */}
        {weaves.map((w, idx) => (
          <div
            key={w.title}
            className="bg-white border border-[#E8DFE5] rounded-xs overflow-hidden shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 sm:p-8"
          >
            <div className="md:col-span-5 aspect-[4/3] rounded-xs overflow-hidden bg-[#300030]">
              <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
            </div>

            <div className="md:col-span-7 space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#BD3D78] font-bold">
                {w.origin}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#280030]">{w.title}</h3>
              <p className="text-xs text-[#706873] leading-relaxed">{w.desc}</p>

              <div className="pt-2 border-t border-[#E8DFE5] text-xs space-y-1">
                <p><span className="font-bold text-[#29232A]">Signature Motifs:</span> <span className="text-[#706873]">{w.motifs}</span></p>
                <p><span className="font-bold text-[#29232A]">Fabric Base:</span> <span className="text-[#706873]">{w.fabric}</span></p>
              </div>

              <div className="pt-2">
                <Link
                  to={`/shop?search=${encodeURIComponent(w.title.split(' ')[0])}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#280030] hover:text-[#BD3D78] uppercase tracking-wider"
                >
                  <span>Explore {w.title.split(' ')[0]} Sarees</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F0C860]" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Zari & Silk Mark Guide Section */}
        <div className="bg-[#280030] text-[#FFF8F0] p-8 rounded-xs border border-[#F0C860]/40 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-[#F0C860]">Understanding Zari Purity</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              <strong>Pure Gold Zari:</strong> Made of fine silver threads electroplated with genuine 24-carat gold around a natural silk core. It never loses its luster and is considered an asset.<br />
              <strong>Tested Zari:</strong> Crafted using copper or alloy electroplating that provides the rich ceremonial sheen at an accessible price point for festive occasions.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-[#F0C860]">Silk Mark India Certification</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Issued by the Central Silk Board under the Ministry of Textiles, Government of India. The Silk Mark label contains an authentic serial numbered hologram verifying that the saree consists of 100% natural pure silk fibers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
