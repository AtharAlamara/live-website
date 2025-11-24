import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { LocaleLink as Link } from '@/lib/LocaleLink';
import GlobalHeader from '../Components/GlobalHeader';
import SiteFooter from '../Components/SiteFooter';
import PageWrapper from '../Components/PageWrapper';
import { supabase } from '../lib/supabaseClient';

function ServicesPage() {
  const { pathname } = useLocation();
  const locale = pathname.startsWith('/sa/') ? 'ar' : 'en';
  const [texts, setTexts] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    let cancelled = false;
    supabase
      .from('ServicesPage')
      .select('name,texts')
      .eq('locale', locale)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('ServicesPage fetch error:', error);
          setTexts({});
          return;
        }
        const map: Record<string, string> = {};
        (data || []).forEach((row: any) => {
          map[row.name] = row.texts;
        });
        setTexts(map);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const t = (maybeKey: string, fallback?: string) => {
    const m = typeof maybeKey === 'string' ? maybeKey.match(/^\{(.+)\}$/) : null;
    if (m) return texts[m[1]] ?? (fallback ?? maybeKey);
    return maybeKey ?? fallback ?? '';
  };

  const services = [
    { id: 1, title: "{architecture}", imageUrl: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtZf8QmT1IwQ42fTitNUoEO7HnMs6muXZFWAgq", slug: "architecture" },
    { id: 2, title: "{interiordesign}", imageUrl: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtRfMgUIbasyJRoDmA4vpVjN1HYUn52CWOQPgq", slug: "interiordesign" },
    { id: 3, title: "{landscapedesign}", imageUrl: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtum7wCyEZPg9BSDseXGfwOamrp8LY37zxiHnQ", slug: "landscapedesign" },
    { id: 4, title: "{projectsupervision}", imageUrl: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtoGZE6UgQM4ObdcC3ln1UzqD9si0WALVgpZvr", slug: "projectsupervision" },
    { id: 5, title: "{designconsultations}", imageUrl: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtQFLMqgKseYRaG4HqyPtcznBgDI6LvCrZ2wTx", slug: "designconsultations" },
    { id: 6, title: "{furnitureaccessories}", imageUrl: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtCXRhJpYUxyJWIcq1kSK9o6mvLgniXlMQZrpe", slug: "furnitureaccessories" },
  ];

  return (
    <>
      <Helmet>
        <title>{t('{seo-services-title}', 'Athar Architecture | Services')}</title>
        <meta
          name="description"
          content={t(
            '{seo-services-description}',
            'Comprehensive architecture and interior design services in Riyadh, Saudi Arabia.'
          )}
        />
      </Helmet>

      <GlobalHeader />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Desktop Video */}
        <div className="hidden md:block absolute inset-0">
          <iframe
            src="https://customer-3a18rxl1od32bsw3.cloudflarestream.com/74130aec1e2a48d6db852ab010c0305c/iframe?autoplay=1&muted=1&loop=1"
            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Athar Services Video"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Desktop Title — moves to right if Arabic */}
        <div
          className={`hidden md:block absolute bottom-6 z-10 ${
            locale === 'ar' ? 'right-10' : 'left-10'
          }`}
        >
          <h1
            className="text-4xl font-medium text-white tracking-widest"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {t('{services-label}', 'Services')}
          </h1>
        </div>

        {/* Mobile Video */}
        <div className="block md:hidden absolute inset-0">
          <iframe
            src="https://customer-3a18rxl1od32bsw3.cloudflarestream.com/74130aec1e2a48d6db852ab010c0305c/iframe?autoplay=1&muted=1&loop=1"
            className="absolute top-1/2 left-1/2 w-[350vw] h-[350vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Athar Services Video Mobile"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Mobile Title — also shifts for Arabic */}
        <div
          className={`block md:hidden absolute bottom-6 z-10 ${
            locale === 'ar' ? 'right-4' : 'left-4'
          }`}
        >
          <h1
            className="text-4xl font-medium text-white tracking-widest"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {t('{services-label}', 'Services')}
          </h1>
        </div>
      </section>

      <PageWrapper>
        <main className="relative z-10 bg-[#FFFFFF]">
          {/* Grid locked in LTR mode */}
          <section dir="ltr" className="relative">
            <div className="h-2 bg-white w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 relative">
              <div className="hidden md:block absolute left-1/2 top-0 w-2 h-full bg-white -translate-x-1/2 z-10" />

              {services.map((service, index) => (
                <React.Fragment key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="relative h-[50vh] cursor-pointer group overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${service.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-700 ease-out group-hover:opacity-0" />
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <h2
                        className="text-white text-2xl md:text-3xl lg:text-4xl uppercase tracking-widest transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{
                          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                          fontWeight: 100,
                        }}
                      >
                        {t(service.title)}
                      </h2>
                    </div>
                  </Link>

                  {/* Horizontal dividers for mobile */}
                  {index < services.length - 1 && (
                    <div className="h-2 bg-white w-full md:hidden" />
                  )}

                  {/* Horizontal dividers for desktop */}
                  {index === 1 && (
                    <div className="hidden md:block absolute top-[33.33%] left-0 w-full h-2 bg-white z-10" />
                  )}
                  {index === 3 && (
                    <div className="hidden md:block absolute top-[66.66%] left-0 w-full h-2 bg-white z-10" />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="h-2 bg-white w-full" />
          </section>
        </main>
        <SiteFooter />
      </PageWrapper>
    </>
  );
}

export default ServicesPage;
