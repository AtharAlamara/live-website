import React, { PropsWithChildren, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LocaleLink as Link } from '@/lib/LocaleLink';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabaseClient';
import PageWrapper from './PageWrapper';
import GlobalHeader from './GlobalHeader';
import SiteFooter from './SiteFooter';
import ScrollToTop from './ScrollToTop';

interface Project {
  hero_image: string;
  name: string;
  subtitle: string;
  category: string;
  status: string;
  description: string;
  seo_title: string;
  seo_desc: string;
}

interface Props {
  projectSlug: string;
  nextSlug: string;
  prevSlug: string;
  heroObjectPosition?: string;
  heroHeight?: string;
}

export default function ProjectTemplate({
  projectSlug,
  nextSlug,
  prevSlug,
  heroObjectPosition,
  heroHeight,
  children,
}: PropsWithChildren<Props>) {
  const path = useLocation().pathname;
  const isAr = path.startsWith('/sa/');
  const locale = isAr ? 'ar' : 'en';

  // ✅ Same as Careers/Studio/Services: Windows detection for optional EN thinning
  const isWindows =
    typeof navigator !== 'undefined' &&
    /win/i.test(navigator.platform || navigator.userAgent);

  // ✅ Only Windows + English
  const isWinEn = locale === 'en' && isWindows;

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    supabase
      .from<Project>('Projects')
      .select('*')
      .eq('slug', projectSlug)
      .eq('locale', locale)
      .single()
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setProject(data);
      });
  }, [projectSlug, locale]);

  if (!project) return <div>Loading…</div>;

  const nextLabel = locale === 'en' ? 'Next Project' : 'المشروع التالي';
  const prevLabel = locale === 'en' ? 'Previous Project' : 'المشروع السابق';

  const nextUrl = `${isAr ? '/sa' : ''}/projects/${nextSlug}`;
  const prevUrl = `${isAr ? '/sa' : ''}/projects/${prevSlug}`;

  const buttons = isAr
    ? [
        { url: nextUrl, label: nextLabel },
        { url: prevUrl, label: prevLabel },
      ]
    : [
        { url: prevUrl, label: prevLabel },
        { url: nextUrl, label: nextLabel },
      ];

  const force001VillaBidi = isAr && projectSlug === '/projects/001-villa';

  return (
    <PageWrapper>
      <Helmet>
        <title>{project.seo_title}</title>
        <meta name="description" content={project.seo_desc} />
      </Helmet>

      <ScrollToTop />
      <GlobalHeader />

      <main className="pt-20 bg-white">
        {/* Hero */}
        <div className="w-full relative -mt-20" style={{ height: heroHeight ?? '100vh' }}>
          <img
            src={project.hero_image}
            alt={project.name}
            className="w-full h-full object-cover"
            style={heroObjectPosition ? { objectPosition: heroObjectPosition } : undefined}
          />
        </div>

        <section className="max-w-4xl mx-auto px-4 py-16">
          {/* TOP TEXT BLOCK */}
          <div className="text-center mb-8">
            {/* ✅ H1 stays H1.
                - Arabic: 400 (unchanged)
                - English: match the "headline/h2" look (no bold) */}
            <h1
  className="text-xl"
  style={{
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: isAr ? 400 : 350, // ✅ English matches Careers headline feel
  }}
>
  <bdi
    dir={force001VillaBidi ? 'ltr' : undefined}
    style={force001VillaBidi ? { unicodeBidi: 'isolate' } : undefined}
  >
    {project.name}
  </bdi>
</h1>


            {/* ✅ Arabic: 200 (unchanged)
                ✅ English Safari: use same paragraph recipe */}
            <p
              className="text-lg font-thin mb-4 text-center"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                direction: 'ltr',
                unicodeBidi: 'isolate',
                display: 'inline-block',
                fontWeight: isAr ? 200 : undefined,
                opacity: isWinEn ? 0.65 : 1,
              }}
            >
              {project.subtitle}
            </p>

            <p
              className="text-lg font-thin"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: isAr ? 200 : undefined,
                opacity: isWinEn ? 0.65 : 1,
              }}
            >
              {project.category}
            </p>

            <p
              className="text-lg font-thin mb-8"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: isAr ? 200 : undefined,
                opacity: isWinEn ? 0.65 : 1,
              }}
            >
              {project.status}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="mx-auto mb-16 px-4 md:px-0 max-w-4xl">
            <p
              className="text-lg font-thin leading-relaxed text-center"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontWeight: isAr ? 200 : undefined,
                opacity: isWinEn ? 0.65 : 1,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* IMAGES — ONLY THIS PART FORCED TO LTR */}
          <div style={{ direction: 'ltr' }}>{children}</div>

          {/* BUTTONS — LEFT OUTSIDE LTR WRAPPER */}
          <div className={`mt-32 flex justify-center items-center gap-6 ${isAr ? 'flex-row-reverse' : ''}`}>
            {buttons.map((btn, i) => (
              <Link
                key={i}
                to={btn.url}
                className="inline-flex items-center gap-2 px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors duration-300 font-medium"
              >
                <span className="text-sm tracking-wide">{btn.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </PageWrapper>
  );
}
