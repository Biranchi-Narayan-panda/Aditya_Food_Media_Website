import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ProductCard } from '../components/ProductCard';
import { Milk, Search, Filter, ShieldCheck, Sparkles } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products, getWhatsAppUrl } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Milk', 'Ghee', 'Butter', 'Paneer', 'Curd'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.specifications && p.specifications.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 pt-6">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
          <Milk className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dairy Portfolio</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
          Our Dairy Products
        </h1>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Crafted with pure whole milk and traditional processing techniques. Free from preservatives, additives, or synthetic binders.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0c121e] border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products or specs..."
              className="w-full bg-[#070a10] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#0c121e] border border-white/10 rounded-3xl p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-serif text-lg text-white">No products found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your category filter or search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Bulk / Commercial Supply Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0d1612] via-[#09110d] to-[#0c1410] border border-emerald-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Institutional & Bulk Commercial Supply
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Are you a restaurant chain, hotel, bakery, or distributor seeking wholesale supplies of fresh milk, pure ghee, or paneer? Contact our supply team directly.
            </p>
          </div>

          <a
            href={getWhatsAppUrl('Hello Aditya Food & Media, I would like to enquire about wholesale/bulk dairy supply orders.')}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
          >
            Bulk Supply Enquiry
          </a>
        </div>
      </section>
    </div>
  );
};
