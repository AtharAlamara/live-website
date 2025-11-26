// src/Components/SiteFooter.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LocaleLink as Link } from '@/lib/LocaleLink';
import { supabase } from '../lib/supabaseClient';
import { Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';

export default function SiteFooter() {
  const path = useLocation().pathname;
  const locale = path.startsWith('/sa/') ? 'ar' : 'en';
  const isAr = locale === 'ar';

  const [texts, setTexts] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    supabase
      .from('Footer')
      .select('name, text')
      .eq('locale', locale)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching footer translations:', error);
          return;
        }
        const map: { [key: string]: string } = {};
        (data || []).forEach(({ name, text }) => {
          map[name] = text;
        });
        setTexts(map);
      });
  }, [locale]);

  const {
    'Footer Contact': footerContact = '',
    'Footer Address': footerAddress = '',
    'Footer Projects': footerProjects = '',
    'Footer Services': footerServices = '',
    'Footer Studio': footerStudio = '',
    'Footer News': footerNews = '',
    'Footer Careers': footerCareers = '',
    'Footer Terms': footerTerms = '',
    'Footer Privacy': footerPrivacy = '',
    'Footer Copyright': footerCopyright = '',
    'Footer Website By': footerWebsiteBy = '',
  } = texts;

  // Arabic thin style
  const arThin = isAr
    ? { fontWeight: 200, fontFamily: "'Helvetica Neue', sans-serif" }
    : {};

  // Phone number fix – stay LTR in Arabic
  const fixedNumber = (children: React.ReactNode) => (
    <bdi
      style={{
        direction: 'ltr',
        unicodeBidi: 'bidi-override',
        fontWeight: isAr ? 200 : undefined,
      }}
    >
      {children}
    </bdi>
  );

  return (
    <footer className="bg-[#2C2C2C] py-12">
      {/* ---------- MOBILE FOOTER ---------- */}
      <div className="md:hidden container mx-auto px-6">
        <div className="flex flex-col items-start space-y-8">
          
          {/* Contact Block */}
          <div className="flex flex-col items-start w-full">
            <Link
              to="/contact"
              className="text-[#FFFFFF] text-xs uppercase mb-4 hover:underline"
              style={arThin}
            >
              {footerContact}
            </Link>

            <div
              className="text-[#FFFFFF] space-y-2"
              style={arThin}
            >
              <p className="uppercase text-xs" style={arThin}>
                {footerAddress}
              </p>

              <a
                href="tel:+966550867366"
                className="uppercase text-xs text-[#FFFFFF] hover:underline block"
                style={arThin}
              >
                {fixedNumber('+966 55 086 7366')}
              </a>

              <a
                href="tel:+966530740220"
                className="uppercase text-xs text-[#FFFFFF] hover:underline block"
                style={arThin}
              >
                {fixedNumber('+966 53 074 0220')}
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-start gap-3 w-full">
            <Link to="/projects" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerProjects}</Link>
            <Link to="/services" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerServices}</Link>
            <Link to="/studio" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerStudio}</Link>
            <Link to="/news" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerNews}</Link>
            <Link to="/contact" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerContact}</Link>
            <Link to="/careers" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerCareers}</Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 w-full">
            <a href="https://www.tiktok.com/@athararch" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><SiTiktok size={18}/></a>
            <a href="https://x.com/AtharAlamara" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><FaXTwitter size={18}/></a>
            <a href="https://www.facebook.com/profile.php?id=61576986000561" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><Facebook size={18}/></a>
            <a href="https://www.instagram.com/athar.alamara/" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><Instagram size={18}/></a>
          </div>

          {/* Divider */}
          <div className="border-t border-[#FFFFFF]/20 pt-8 w-full">
            <div className="flex flex-col items-start gap-2">
              <div className="flex flex-col gap-3 mb-6">
                <Link to="/terms" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerTerms}</Link>
                <Link to="/privacy" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerPrivacy}</Link>
              </div>

              <p className="text-[#FFFFFF] text-xs" style={arThin}>{footerCopyright}</p>

              <a href="https://bespokegrowth.net/" target="_blank" rel="noopener noreferrer" className="text-[#C4BDB7] text-xs hover:underline" style={arThin}>
                {footerWebsiteBy}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ---------- DESKTOP FOOTER ---------- */}
      <div className="hidden md:block container mx-auto px-6">
        <div className="grid grid-cols-4 gap-8">
          
          {/* Contact Block */}
          <div>
            <Link to="/contact" className="text-[#FFFFFF] text-xs uppercase mb-4 block hover:underline" style={arThin}>
              {footerContact}
            </Link>

            <div className="text-[#FFFFFF] space-y-2" style={arThin}>
              <p className="uppercase text-xs" style={arThin}>{footerAddress}</p>

              <a href="tel:+966550867366" className="uppercase text-xs text-[#FFFFFF] hover:underline block" style={arThin}>
                {fixedNumber('+966 55 086 7366')}
              </a>

              <a href="tel:+966530740220" className="uppercase text-xs text-[#FFFFFF] hover:underline block" style={arThin}>
                {fixedNumber('+966 53 074 0220')}
              </a>
            </div>
          </div>

          {/* Menu Navigation */}
          <div className="col-span-2 flex gap-16">
            <div className="flex flex-col gap-1">
              <Link to="/projects" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerProjects}</Link>
              <Link to="/services" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerServices}</Link>
              <Link to="/studio" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerStudio}</Link>
              <Link to="/news" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerNews}</Link>
              <Link to="/contact" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerContact}</Link>
              <Link to="/careers" className="text-[#FFFFFF] hover:underline uppercase text-xs" style={arThin}>{footerCareers}</Link>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-end items-center gap-6">
            <a href="https://www.tiktok.com/@athararch" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><SiTiktok size={18}/></a>
            <a href="https://x.com/AtharAlamara" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><FaXTwitter size={18}/></a>
            <a href="https://www.facebook.com/profile.php?id=61576986000561" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><Facebook size={18}/></a>
            <a href="https://www.instagram.com/athar.alamara/" target="_blank" rel="noopener noreferrer" className="text-[#FFFFFF] hover:opacity-80"><Instagram size={18}/></a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#FFFFFF]/20 mt-12 pt-8">
          <div className="flex justify-between items-center text-[#FFFFFF] gap-6">
            <p className="text-xs" style={arThin}>{footerCopyright}</p>
            <Link to="/terms" className="text-[#FFFFFF] hover:underline text-xs" style={arThin}>{footerTerms}</Link>
            <Link to="/privacy" className="text-[#FFFFFF] hover:underline text-xs" style={arThin}>{footerPrivacy}</Link>
            <a href="https://bespokegrowth.net/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#C4BDB7] hover:underline" style={arThin}>
              {footerWebsiteBy}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
