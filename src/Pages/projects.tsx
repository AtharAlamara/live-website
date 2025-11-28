import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { LocaleLink as Link } from '@/lib/LocaleLink';
import GlobalHeader from '../Components/GlobalHeader';
import SiteFooter from '../Components/SiteFooter';
import PageWrapper from '../Components/PageWrapper';
import ScrollToTop from '../Components/ScrollToTop';
import { supabase } from '../lib/supabaseClient';

function ProjectsPage() {
  const { pathname } = useLocation();
  const locale = pathname.startsWith('/sa/') ? 'ar' : 'en';
  const [texts, setTexts] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('ProjectsPage')
      .select('name,texts')
      .eq('locale', locale)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('ProjectPage fetch error:', error);
          setTexts({});
          return;
        }
        const map: Record<string, string> = {};
        (data || []).forEach((row: any) => { map[row.name] = row.texts; });
        setTexts(map);
      });
    return () => { cancelled = true; };
  }, [locale]);

  const t = (maybeKey: string, fallback?: string) => {
    const m = typeof maybeKey === 'string' ? maybeKey.match(/^\{(.+)\}$/) : null;
    if (m) {
      const key = m[1];
      return texts[key] ?? (fallback ?? maybeKey);
    }
    return maybeKey ?? fallback ?? '';
  };

  const projects = [
    { id: 1, title: "{001-villa}", date: "2020", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtIo8bZviEd0CiAkOj4lPoG1S2TUa6z3xMWfXD", slug: "001-villa" },
    { id: 2, title: "{aljoud-compound}", date: "2025", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtQ4HvvkKseYRaG4HqyPtcznBgDI6LvCrZ2wTx", slug: "aljoud-compound" },
    { id: 3, title: "{alnarjis-villa}", date: "2023", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtqS1PsE5afN5SMmPvhKDoJIycb2GWukwr4nTB", slug: "alnarjis-villa", backgroundPosition: "center 65%" },
    { id: 4, title: "{alnayfah-community}", date: "2021", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtzW6sOM4VOYoqlE8KBP1etFvkZn6fRJNjQwIW", slug: "alnayfah-community", backgroundPosition: "center 55%" },
    { id: 5, title: "{alolaya-apartment}", date: "2021", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtOy9SsBdVqPrsAn2YG0Ow496xDFlCXeJM758N", slug: "alolaya-apartment", backgroundPosition: "center 65%" },
    { id: 6, title: "{alyasmin-residence}", date: "2024", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtUD2X58o7UDdSu4zjNVOnmb39pqwgZyrRBY56", slug: "alyasmin-residence" },
    { id: 7, title: "{aura-apartment}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt3UPxGUYlzT14wWsaKpBehUvJ9nYFdoLCQi7N", slug: "aura-apartment", backgroundPosition: "center 75%" },
    { id: 8, title: "{ceo-office}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtmdaEDl125OmpJw0Ngx8nC7rvoQfIdPyLiHDY", slug: "ceo-office", backgroundPosition: "center 65%" },
    { id: 9, title: "{sakinah-villa}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtcSAsRCCDRfwX5N9Zuihrgpl2TJDnCkdoSyt1", slug: "sakinah-villa" },
    { id: 10, title: "{glow-spa}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtKCEKFKGwrOcfIhNKdVBbY47UyxEsjRgz8nT6", slug: "glow-spa", backgroundPosition: "center 65%" },
    { id: 11, title: "{indigo-villa}", date: "2023", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtBT3zjiSetPlFrqGoQeY156fncgpARx8z4ahN", slug: "indigo-villa", backgroundPosition: "center 85%" },
    { id: 12, title: "{luxury-residence}", date: "2021", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtqcseor5afN5SMmPvhKDoJIycb2GWukwr4nTB", slug: "luxury-residence", backgroundPosition: "center bottom" },
    { id: 13, title: "{minimalist-villa}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtk8fESET5wUsRrfG1tAi0XCE8dzWkBF93bZcK", slug: "minimalist-villa", backgroundPosition: "center bottom" },
    { id: 14, title: "{sedra-roshan}", date: "2025", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtx517vQOHjegRM3wv9DYo1fsrmQpyJFN4hBGn", slug: "sedra-roshan", backgroundPosition: "center 80%" },
    { id: 15, title: "{space-cafe}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtiO8ZYs7fcbVits87eYDgj5G4zflHLph1QRux", slug: "space-cafe", backgroundPosition: "center bottom" },
    { id: 16, title: "{thana-hitten}", date: "2023", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtjQdvQoUmUsC0XhLakHdiRypTbO5nS7lNoKA9", slug: "thana-hitten", backgroundPosition: "center 65%" },
    { id: 17, title: "{the-blue-mansion}", date: "2022", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtig3sVXfcbVits87eYDgj5G4zflHLph1QRuxw", slug: "the-blue-mansion" },
    { id: 18, title: "{aljubailah-farm}", date: "2025", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTt5bK6U2Lo4AGrMJHhYKm3gLkawENcRpdTxev0", slug: "aljubailah-farm" },
    { id: 19, title: "{saas-offices}", date: "2025", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtq39xpF15afN5SMmPvhKDoJIycb2GWukwr4nT", slug: "saas-offices" },
    { id: 20, title: "{terra-café}", date: "2025", image: "https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtX5LDfsuQ9S7C4WKjGuVoZwsviq3Yk2dtryPh", slug: "terra-café" },
  ];

  return (
    <>
      <Helmet>
        <title>{t('{seo-projects-title}', 'Athar Architecture | Projects')}</title>
        <meta
          name="description"
          content={t(
            '{seo-projects-description}',
            'Explore our portfolio of luxury architecture and interior design projects in Riyadh and Saudi Arabia.'
          )}
        />
      </Helmet>

      <ScrollToTop />
      <GlobalHeader />

      {/* Hero Section with locale-specific title alignment */}
      <section className="relative h-screen">
        {/* Desktop Video */}
        <div className="hidden md:block absolute inset-0">
          <iframe
            src="https://customer-3a18rxl1od32bsw3.cloudflarestream.com/318b58e6fe9bf9c84694bd4614ae1abb/iframe?autoplay=1&muted=1&loop=1"
            className="absolute top-1/2 left-1/2 w-[150vw] h-[190vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Athar Studio Video"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Title — moves to right in Arabic */}
        <div
          className={`absolute bottom-6 z-10 hidden md:block ${
            locale === 'ar' ? 'right-10' : 'left-10'
          }`}
        >
          <h1
            className="text-4xl font-medium text-white tracking-widest"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {t('{projects-label}', 'Projects')}
          </h1>
        </div>

        {/* Mobile */}
        <div
          className={`absolute bottom-6 z-10 md:hidden ${
            locale === 'ar' ? 'right-4' : 'left-4'
          }`}
        >
          <h1
            className="text-4xl font-medium text-white tracking-widest"
            style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            {t('{projects-label}', 'Projects')}
          </h1>
        </div>
      </section>

      <PageWrapper>
        <main className="relative w-full bg-[#FFFFFF]">
          <section dir="ltr" className="relative">
            <div className="h-2 bg-white w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 relative">
              <div className="hidden md:block absolute left-1/2 top-0 w-2 h-full bg-white -translate-x-1/2 z-10" />

              {projects.map((project, index) => (
                <React.Fragment key={project.id}>
                  {project.isComingSoon ? (
                    <div className="relative h-[50vh] overflow-hidden group bg-gray-200">
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <h2
                            className="text-lg md:text-xl lg:text-2xl uppercase tracking-widest text-[#000000] font-bold"
                            style={{
                              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                            }}
                          >
                            {t('{coming-soon}', 'Coming soon...')}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={`/projects/${project.slug}`}
                      className="relative h-[50vh] overflow-hidden group"
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-700 ease-out"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: project.backgroundPosition || 'center',
                        }}
                      />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <h2
                            className="text-lg md:text-xl lg:text-2xl uppercase tracking-widest text-[#000000] font-bold"
                            style={{
                              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                            }}
                          >
                            {t(project.title).replace(' - 2020', '')}
                          </h2>
                          {project.date && (
                            <p
                              className="text-sm md:text-base lg:text-lg text-[#2D2D2D] mt-2 font-light"
                              style={{
                                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                              }}
                            >
                              {project.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  )}

                  {index < projects.length - 1 && (
                    <div className="h-2 bg-white w-full md:hidden" />
                  )}
                  {index % 2 === 1 && index < projects.length - 1 && (
                    <div
                      className="hidden md:block absolute left-0 w-full h-2 bg-white z-10"
                      style={{ top: `${((index + 1) / 2) * 50}vh` }}
                    />
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

export default ProjectsPage;
