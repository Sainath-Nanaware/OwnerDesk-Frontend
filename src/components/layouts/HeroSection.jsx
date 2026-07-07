// components/HeroSection.jsx
import React from 'react';
import { FaArrowRight, FaPlayCircle, FaBuilding, FaUsers, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const HeroSection = () => {
  // Features data
  const features = [
    { icon: <FaBuilding className="w-5 h-5" />, label: 'Property Management' },
    { icon: <FaUsers className="w-5 h-5" />, label: 'Tenant Tracking' },
    { icon: <FaChartLine className="w-5 h-5" />, label: 'Smart Analytics' },
    { icon: <FaShieldAlt className="w-5 h-5" />, label: 'Secure Platform' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f5f5f5]">
      {/* ===== DECORATIVE BACKGROUND ELEMENTS ===== */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/10 rounded-full blur-2xl" />
      
      {/* Decorative dots pattern */}
      <div className="absolute top-10 right-20 opacity-10">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-indigo-600 rounded-full" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 left-20 opacity-10">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-purple-600 rounded-full" />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* ===== LEFT CONTENT ===== */}
          <div className="space-y-6">
            {/* Main Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1]">
                Smart Management
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] gradient-animation">
                  Starts Here.
                </span>
              </h1>
              
              {/* Decorative line under heading */}
              <div className="flex items-center gap-3 mt-4">
                <div className="h-1 w-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full" />
                <div className="h-1 w-8 bg-indigo-300 rounded-full" />
                <div className="h-1 w-4 bg-indigo-200 rounded-full" />
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Streamline your rental property management with OwnerDesk. 
              Track rent, manage tenants, and grow your business effortlessly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-indigo-600 hover:text-indigo-600 hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                <FaPlayCircle className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-white transition-all duration-300 cursor-pointer"
                >
                  <span className="text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2 border-t border-gray-200/60">
              <div className="text-center group cursor-pointer">
                <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">10K+</p>
                <p className="text-xs text-gray-500">Properties</p>
              </div>
              <div className="text-center group cursor-pointer">
                <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">50K+</p>
                <p className="text-xs text-gray-500">Tenants</p>
              </div>
              <div className="text-center group cursor-pointer">
                <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">₹100M+</p>
                <p className="text-xs text-gray-500">Rent Collected</p>
              </div>
            </div>
          </div>

          {/* ===== RIGHT CONTENT - IMAGE ===== */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50">
              {/* Image */}
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Property Management Dashboard"
                className="w-full h-[360px] md:h-[420px] object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="420"%3E%3Crect width="800" height="420" fill="%23f3f4f6"/%3E%3Ctext x="400" y="210" font-family="Arial" font-size="24" fill="%239ca3af" text-anchor="middle"%3EProperty Management%3C/text%3E%3C/svg%3E`;
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />

              {/* ===== FLOATING STATS CARDS ===== */}
              
              {/* Card 1 - Top Right */}
              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-3.5 border border-gray-100 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-400/30">
                    <FaChartLine className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">94%</p>
                    <p className="text-xs text-gray-500">Occupancy Rate</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Bottom Left */}
              <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-3.5 border border-gray-100 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-400/30">
                    <FaUsers className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">48</p>
                    <p className="text-xs text-gray-500">Active Tenants</p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Bottom Right */}
              <div className="absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-3.5 border border-gray-100 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-400/30">
                    <FaBuilding className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">Properties</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Rings */}
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 border-4 border-indigo-200/20 rounded-full" />
            <div className="absolute -z-10 -bottom-6 -left-6 w-40 h-40 border-4 border-purple-200/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* ===== WAVE DIVIDER ===== */}
      <div className="relative">
        <svg 
          className="absolute bottom-0 w-full h-10 md:h-12" 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 40L60 50C120 60 240 80 360 80C480 80 600 60 720 50C840 40 960 40 1080 50C1200 60 1320 80 1380 80L1440 80V120H1380C1320 120 1200 120 1080 120H360C240 120 120 120 60 120H0V40Z" 
            fill="#f5f5f5"
          />
        </svg>
      </div>

      {/* ===== CSS ANIMATIONS (Inline Style) ===== */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-animation {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;