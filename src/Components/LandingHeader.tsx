import React, { useState, useEffect } from 'react';
import { Menu, Instagram } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { getLocale, localePath, setArabic, setEnglish } from '../lib/useTranslations';

function LandingPageHeader() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Locale + toggle label
  const locale = getLocale();
  const isAr = locale === 'ar';
  const toggleLabel = isAr ? 'EN' : 'العربية';

  // Fetch header labels from Supabase
  const [texts, setTexts] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    supabase
      .from('Header')
      .select('name, text')
      .eq('locale', locale)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching header translations:', error);
          return;
        }
        const map: { [key: string]: string } = {};
        data?.forEach(({ name, text }) => {
          map[name] = text;
        });
        setTexts(map);
      });
  }, [locale]);

  const {
    'Header Projects': headerProjects = '',
    'Header Services': headerServices = '',
    'Header Studio': headerStudio = '',
    'Header News': headerNews = '',
    'Header Contact': headerContact = '',
    'Header Careers': headerCareers = '',
  } = texts;

  // Show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setIsHeaderVisible(scrollPosition > heroHeight * 0.05);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect if user is on Mac
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  // Shared style for all uppercase header nav links
  const headerNavStyle = {
    direction: locale === "ar" ? "rtl" : "ltr",
    textAlign: locale === "ar" ? "right" : "left",
    unicodeBidi: "isolate",
    display: "inline-block",
    fontWeight: isMac ? 300 : 100, // 300 (thin) for Mac, 100 (hairline) for Windows
    textShadow: isMac ? "none" : "0 0 0.5px rgba(0,0,0,0)", // text-shadow only for Windows
  };

  return (
    <>
      {/* Mobile Hero Logo - Mobile Only */}
      <div className="md:hidden fixed top-0 left-0 w-full flex justify-center items-center z-[100] pointer-events-none">
        <img
          src="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtrUu0dUMye0fMipAwBazW7nTb3VuFLlOCNx4J"
          alt="Athar Architecture Logo"
          className="h-[200px] max-h-none w-auto transform -translate-y-16"
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isHeaderVisible
            ? 'bg-black/50 translate-y-0 opacity-100 backdrop-blur-sm border-b border-white/30'
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 h-16 md:h-[80px] lg:h-20 flex items-center justify-between relative">
          {/* MOBILE HEADER (≤ lg) */}
          <div className="flex lg:hidden w-full items-center justify-between relative px-4 h-20 md:h-24 lg:h-20">
            <button
              className="text-white z-[160] pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>

            <Link
              to={localePath('/')}
              className="hidden sm:block mx-auto pointer-events-auto"
              aria-label="Athar Architecture"
            >
              <img
                src=""
                alt=""
                className="w-48 md:w-56 lg:w-64 h-auto"
              />
            </Link>

            <div className="w-6" />
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center w-full">
            {/* Left Column */}
            <div className="flex-1 flex items-center">
              {/* Icons Container - with flex-row-reverse for Arabic */}
              <div className={`flex items-center gap-3 mr-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/athar.alamara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Instagram size={13} />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/966550867366"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <SiWhatsapp size={13} />
                </a>
              </div>

              {/* LEFT NAV GROUP */}
              <div
                className={`flex items-center gap-8 ml-auto ${
                  isAr ? 'mr-32' : '-mr-40'
                }`}
              >
                <Link
                  to={localePath('/projects')}
                  className="uppercase text-white font-thin tracking-wide text-s hover:opacity-80 transition-opacity duration-300"
                  style={headerNavStyle}
                >
                  {headerProjects}
                </Link>
                <Link
                  to={localePath('/services')}
                  className="uppercase text-white font-thin tracking-wide text-s hover:opacity-80 transition-opacity duration-300"
                  style={headerNavStyle}
                >
                  {headerServices}
                </Link>
                <Link
                  to={localePath('/studio')}
                  className="uppercase text-white font-thin tracking-wide text-s hover:opacity-80 transition-opacity duration-300"
                  style={headerNavStyle}
                >
                  {headerStudio}
                </Link>
              </div>
            </div>

            {/* Center Column */}
            <div className="flex-grow flex items-center justify-center pointer-events-none">
              <div className="w-48 md:w-56 lg:w-64 h-auto opacity-0 pointer-events-none">
                Placeholder
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex items-center">
              {/* RIGHT NAV GROUP */}
              <div
                className={`flex items-center gap-8 ${
                  isAr ? 'ml-32' : '-ml-40'
                } mr-auto`}
              >
                <Link
                  to={localePath('/news')}
                  className="uppercase text-white font-thin tracking-wide text-s hover:opacity-80 transition-opacity duration-300"
                  style={headerNavStyle}
                >
                  {headerNews}
                </Link>
                <Link
                  to={localePath('/contact')}
                  className="uppercase text-white font-thin tracking-wide text-s hover:opacity-80 transition-opacity duration-300"
                  style={headerNavStyle}
                >
                  {headerContact}
                </Link>
                <Link
                  to={localePath('/careers')}
                  className="uppercase text-white font-thin tracking-wide text-s hover:opacity-80 transition-opacity duration-300"
                  style={headerNavStyle}
                >
                  {headerCareers}
                </Link>
              </div>

              {/* Language toggle */}
              {isAr ? (
                <button
                  onClick={setEnglish}
                  className="uppercase text-white font-thin tracking-wide text-[11px] whitespace-nowrap ml-auto hover:underline"
                  style={headerNavStyle}
                >
                  EN
                </button>
              ) : (
                <button
                  onClick={setArabic}
                  className="uppercase text-white font-thin tracking-wide text-[11px] whitespace-nowrap ml-auto hover:underline"
                  style={headerNavStyle}
                >
                  العربية
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-50 transform transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 h-auto flex items-center justify-start pt-4">
          <button
            className="text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="block w-6 h-px bg-white mt-2" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-8">
          {[
            { path: '/projects', label: headerProjects },
            { path: '/services', label: headerServices },
            { path: '/studio', label: headerStudio },
            { path: '/news', label: headerNews },
            { path: '/contact', label: headerContact },
            { path: '/careers', label: headerCareers },
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={localePath(path)}
              className="uppercase text-white font-thin tracking-wide text-xl hover:opacity-80 transition-opacity duration-300"
              style={headerNavStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Bottom Icons & Language Toggle */}
        <div className={`flex justify-between items-center w-full px-6 pb-6 ${isAr ? 'flex-row-reverse' : ''}`}>
          {/* Icons Container */}
          <div className={`flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/athar.alamara/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <Instagram size={22} />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/966550867366"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <SiWhatsapp size={22} />
            </a>
          </div>

          {isAr ? (
            <button
              onClick={() => { setIsMobileMenuOpen(false); setEnglish(); }}
              className="uppercase text-white font-thin tracking-wide text-[18px] whitespace-nowrap"
              style={headerNavStyle}
            >
              EN
            </button>
          ) : (
            <button
              onClick={() => { setIsMobileMenuOpen(false); setArabic(); }}
              className="uppercase text-white font-thin tracking-wide text-[18px] whitespace-nowrap"
              style={headerNavStyle}
            >
              العربية
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;