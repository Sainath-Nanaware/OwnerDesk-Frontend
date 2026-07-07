// components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaBars, 
  FaTimes,
  FaChevronDown,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';
import { MdDashboard, MdSettings, MdLogout } from 'react-icons/md';

const Header = ({ isLoggedIn = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ============================================
  // NAVIGATION ITEMS - Conditional based on login state
  // ============================================
  
  // For NON-LOGGED IN users - Show Login & Signup
  const guestNavItems = [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
    { id: 'login', label: 'Login', path: '/login', isLogin: true },
    { id: 'signup', label: 'Sign Up', path: '/signup', isSignup: true },
  ];

  // For LOGGED IN users - Show only main tabs (no Login/Signup)
  const userNavItems = [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
  ];

  // Select navigation items based on login state
  const navItems = isLoggedIn ? userNavItems : guestNavItems;

  // ============================================
  // DROPDOWN ITEMS - Only for logged-in users
  // ============================================
  const dropdownItems = [
    { icon: <FaUserCircle className="w-5 h-5" />, label: 'Profile', path: '/profile' },
    { icon: <MdDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaCog className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { divider: true },
    { icon: <FaSignOutAlt className="w-5 h-5" />, label: 'Logout', path: '/logout', danger: true },
  ];

  // ============================================
  // EFFECTS
  // ============================================
  
  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ============================================
  // LOGO COMPONENT
  // ============================================
  const Logo = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 580 140" 
      className="h-14 md:h-14 w-auto"
      role="img"
      aria-label="OwnerDesk Logo"
    >
      <defs>
        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#2563EB' }} />
          <stop offset="100%" style={{ stopColor: '#7C3AED' }} />
        </linearGradient>
      </defs>
      <g transform="translate(115, 28)">
        <text 
          x="0" y="55" 
          fontFamily="'Inter', 'Segoe UI', sans-serif" 
          fontSize="54" 
          fontWeight="700" 
          fill="#0F172A"
        >
          Owner
        </text>
        <text 
          x="170" y="60" 
          fontFamily="'Inter', 'Segoe UI', sans-serif" 
          fontSize="58" 
          fontWeight="800" 
          fill="url(#badgeGrad)"
        >
          Desk
        </text>
        <rect x="170" y="72" width="130" height="4" rx="2" fill="#F59E0B" />
        <circle cx="304" cy="74" r="3" fill="#10B981" />
      </g>
    </svg>
  );

  // ============================================
  // RENDER
  // ============================================
  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-[#f5f5f5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
        <div className="flex justify-between items-center h-14 md:h-18">
          
          {/* ===== LOGO ===== */}
          <div className="shrink-0">
            <a href="/" className="block hover:opacity-80 transition-opacity">
              <Logo />
            </a>
          </div>

          {/* ===== DESKTOP NAVIGATION ===== */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isLogin = item.isLogin;
              const isSignup = item.isSignup;

              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300
                    ${isLogin || isSignup ? 'px-6 py-2.5' : ''}
                    ${isActive && !isLogin && !isSignup 
                      ? 'text-indigo-600' 
                      : isLogin || isSignup
                        ? ''
                        : 'text-gray-600 hover:text-indigo-600'
                    }
                    ${isLogin 
                      ? 'text-gray-600 hover:text-indigo-600 border-2 border-transparent hover:border-indigo-200' 
                      : ''
                    }
                    ${isSignup 
                      ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 active:scale-95' 
                      : ''
                    }
                    group
                  `}
                >
                  <span className="relative z-10">
                    {item.label}
                  </span>
                  
                  {/* Active indicator - underline animation */}
                  {isActive && !isLogin && !isSignup && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full animate-underline" />
                  )}
                  
                  {/* Hover underline animation - no background change */}
                  {!isLogin && !isSignup && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 rounded-full transition-all duration-300 group-hover:w-full" />
                  )}
                </a>
              );
            })}

            {/* ============================================
                USER AVATAR WITH DROPDOWN - Only when logged in
                ============================================ */}
            {isLoggedIn && (
              <div className="relative ml-4" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-indigo-50/50 transition-all group"
                >
                  <div className="w-9 h-9 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    JD
                  </div>
                  <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john@ownerdesk.com</p>
                    </div>
                    <div className="py-1">
                      {dropdownItems.map((item, index) => (
                        item.divider ? (
                          <div key={index} className="my-1 border-t border-gray-100" />
                        ) : (
                          <a
                            key={index}
                            href={item.path}
                            className={`
                              flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                              ${item.danger 
                                ? 'text-red-600 hover:bg-red-50' 
                                : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                              }
                            `}
                          >
                            {item.icon}
                            {item.label}
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* ===== MOBILE MENU BUTTON ===== */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-indigo-50/50 transition-colors relative z-50"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <FaTimes className="w-7 h-7 text-gray-700" />
            ) : (
              <FaBars className="w-7 h-7 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* ===== MOBILE MENU ===== */}
      <div 
        className={`
          md:hidden fixed inset-0 bg-[#f5f5f5] transform transition-all duration-500 ease-in-out
          ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
        `}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col h-full px-6 py-8 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isLogin = item.isLogin;
            const isSignup = item.isSignup;

            return (
              <a
                key={item.id}
                href={item.path}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`
                  px-6 py-4 rounded-2xl font-medium transition-all duration-300
                  transform hover:translate-x-2
                  ${isLogin || isSignup ? 'text-center' : ''}
                  ${isLogin 
                    ? 'text-gray-600 hover:text-indigo-600 bg-white/50 hover:bg-white border border-gray-200' 
                    : ''
                  }
                  ${isSignup 
                    ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-500/30' 
                    : 'text-gray-700 hover:bg-indigo-50/50 hover:text-indigo-600'
                  }
                `}
              >
                {item.label}
              </a>
            );
          })}

          {/* ============================================
              MOBILE DROPDOWN - Only when logged in
              ============================================ */}
          {isLoggedIn && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-2xl shadow-sm">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@ownerdesk.com</p>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {dropdownItems.map((item, index) => (
                  item.divider ? (
                    <div key={index} className="my-2 border-t border-gray-200" />
                  ) : (
                    <a
                      key={index}
                      href={item.path}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors
                        ${item.danger 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                        }
                      `}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Mobile footer */}
          <div className="mt-auto pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  OD
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">OwnerDesk</p>
                  <p className="text-xs text-gray-500">v1.0.0</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;