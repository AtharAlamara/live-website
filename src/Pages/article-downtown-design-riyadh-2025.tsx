import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import ArticleTemplate from '../Components/ArticleTemplate';
import PageWrapper from '../Components/PageWrapper';
import ScrollToTop from '../Components/ScrollToTop';
import { supabase } from '../lib/supabaseClient';

type TextMap = Record<string, string>;
type Locale = 'en' | 'ar';

const TABLE = 'ArticlePages';

function useLocale(): Locale {
  const { pathname } = useLocation();

  const read = React.useCallback<() => Locale>(() => {
    if (pathname.startsWith('/sa/')) return 'ar';

    const html = document.documentElement;
    const lang = html.getAttribute('lang')?.toLowerCase();
    const dir  = html.getAttribute('dir')?.toLowerCase();
    if (lang === 'ar' || dir === 'rtl') return 'ar';

    const body = document.body;
    const bdir = body?.getAttribute('dir')?.toLowerCase();
    if (bdir === 'rtl' || body?.classList.contains('rtl')) return 'ar';

    const hints = [
      localStorage.getItem('athar-locale'),
      localStorage.getItem('locale'),
      localStorage.getItem('i18nextLng'),
    ].filter(Boolean).map(v => String(v).toLowerCase());
    if (hints.some(v => v.startsWith('ar'))) return 'ar';

    return 'en';
  }, [pathname]);

  const [loc, setLoc] = React.useState<Locale>(read());

  React.useEffect(() => {
    setLoc(read());
    const html = document.documentElement;
    const onMut = () => setLoc(read());
    const mo1 = new MutationObserver(onMut);
    mo1.observe(html, { attributes: true, attributeFilter: ['lang','dir','class'] });
    const body = document.body;
    const mo2 = new MutationObserver(onMut);
    mo2.observe(body, { attributes: true, attributeFilter: ['dir','class'] });
    const onEvt = () => setLoc(read());
    window.addEventListener('athar:locale-changed', onEvt);
    const int = window.setInterval(() => { const cur = read(); if (cur !== loc) setLoc(read()); }, 500);
    return () => { 
      mo1.disconnect(); 
      mo2.disconnect(); 
      window.removeEventListener('athar:locale-changed', onEvt); 
      window.clearInterval(int); 
    };
  }, [read]);

  return loc;
}

export default function Article4() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const [texts, setTexts] = React.useState<TextMap>({});
  const [enTexts, setEnTexts] = React.useState<TextMap>({});

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select('name,texts,locale')
        .eq('locale', locale);

      if (!cancelled) {
        if (error) {
          console.error('[Article4] fetch error:', error);
          setTexts({});
        } else {
          const map: TextMap = {};
          (data || []).forEach((row: any) => {
            const k = String(row?.name ?? '').trim();
            const v = String(row?.texts ?? '').trim();
            if (k) map[k] = v;
          });
          setTexts(map);
        }
      }

      if (locale !== 'en') {
        const { data: enData, error: enErr } = await supabase
          .from(TABLE)
          .select('name,texts,locale')
          .eq('locale', 'en');
        if (!cancelled) {
          if (enErr) {
            console.error('[Article4] fetch EN error:', enErr);
            setEnTexts({});
          } else {
            const mapEn: TextMap = {};
            (enData || []).forEach((row: any) => {
              const k = String(row?.name ?? '').trim();
              const v = String(row?.texts ?? '').trim();
              if (k) mapEn[k] = v;
            });
            setEnTexts(mapEn);
          }
        }
      } else {
        if (!cancelled) setEnTexts({});
      }
    })();

    return () => { cancelled = true; };
  }, [locale]);

  const t = (k: string, fb = '') => {
    const cur = texts[k];
    if (cur != null && cur !== '') return cur;
    const en = enTexts[k];
    if (en != null && en !== '') return en;
    return fb;
  };

  const base = 'article-downtown-design-riyadh-2025';

  const Title = t(`${base}-title`, "Downtown Design Riyadh 2025: Showcasing Saudi's Creative Pulse");
  const Intro = t(
    `${base}-intro`,
    "Design in Saudi Arabia is entering a new phase..."
  );

  const S1   = t(`${base}-s1`, 'A Cultural Moment in JAX District');
  const S1P1 = t(`${base}-s1p1`, 'From 20 to 23 May 2025...');
  const S1P2 = t(`${base}-s1p2`, "This will be Saudi Arabia's first...");

  const S2   = t(`${base}-s2`, "More Than a Fair. It's a Conversation.");
  const S2P1 = t(`${base}-s2p1`, 'Downtown Design Riyadh is not about trends...');
  const S2P2 = t(`${base}-s2p2`, 'For many, it will be the first time...');

  const S3   = t(`${base}-s3`, 'Design That Reflects a Shift in Taste');
  const S3P1 = t(`${base}-s3p1`, 'More homeowners in Riyadh are asking...');
  const S3P2 = t(`${base}-s3p2`, 'From product design to interiors...');

  const seoTitle = t(`${base}-seo-title`, Title);
  const seoDesc  = t(`${base}-seo-description`, Intro);

  React.useEffect(() => {
    if (!isAr) return;
    const root = document.querySelector('.athar-rtl-article');
    if (!root) return;
    const h1 = root.querySelector('main .max-w-4xl > h1') as HTMLElement | null;
    if (h1) {
      h1.style.direction = 'rtl';
      h1.style.textAlign = 'right';
    }
  }, [isAr, Title]);

  const relatedArticles = [
    {
      id: 'Article1',
      title: t('article-verified-leed-associates-title', 'Leading the Green Revolution...'),
      href: '/news/article-verified-leed-associates',
      image: 'https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtTyLJr6Fg0SOit9Ckny3R7jfb2vIrc8xQPopW',
    },
    {
      id: 'Article2',
      title: t('article-minimal-elegance-riyadh-title', 'Minimalist Elegance...'),
      href: '/news/article-minimal-elegance-riyadh',
      image: 'https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtAl10ozBqyzTtgxecSQfIm72pFYkLWlJ63Rd9',
    },
    {
      id: 'Article3',
      title: t('article-intergrating-pool-in-landscape-title', 'Water as a Design Element...'),
      href: '/news/article-intergrating-pool-in-landscape',
      image: 'https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtFckTfdxORdr4iUQqXJuntjb6e1yHS7xlGVwT',
    },
    {
      id: 'Article5',
      title: t('article-al-balad-renaissance-in-jeddah-title', "Al-Balad's Renaissance..."),
      href: '/news/article-al-balad-renaissance-in-jeddah',
      image: 'https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtNKLqdj66dDplvfPWVh50xKR1sN7e9cUjYSBX',
    },
    {
      id: 'Article6',
      title: t('article-red-sea-global-leed-achievements-title', 'Red Sea Global...'),
      href: '/news/article-red-sea-global-leed-achievements',
      image: 'https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtxd2Q76HjegRM3wv9DYo1fsrmQpyJFN4hBGnc',
    },
    {
      id: 'Article7',
      title: t('article-new-murabba-tranformation-title', 'New Murabba...'),
      href: '/news/article-new-murabba-tranformation',
      image: 'https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtl9519zj8py3SQgmqvbGXIfLdhR4r9PauEo0O',
    },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
      </Helmet>

      <ScrollToTop />

      <div className={isAr ? 'athar-rtl-article' : undefined}>

        <ArticleTemplate
          title={Title}
          imageUrl="https://2sdiz6bji6.ufs.sh/f/A7G6PIBqyzTtq3mEMKz5afN5SMmPvhKDoJIycb2GWukwr4nT"
          content={
            <>
              <p>{Intro}</p>

              <div className="h-6" />

              <div className="space-y-6">

                {/* SECTION 1 */}
                <h2
                  className="text-2xl text-[#2D2D2D]"
                  style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Work Sans', sans-serif",
                    fontWeight: isAr ? 400 : 600,
                  }}
                >
                  {S1}
                </h2>
                <p>{S1P1}</p>
                <p>{S1P2}</p>

                {/* SECTION 2 */}
                <h2
                  className="text-2xl text-[#2D2D2D]"
                  style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Work Sans', sans-serif",
                    fontWeight: isAr ? 400 : 600,
                  }}
                >
                  {S2}
                </h2>
                <p>{S2P1}</p>
                <p>{S2P2}</p>

                {/* SECTION 3 */}
                <h2
                  className="text-2xl text-[#2D2D2D]"
                  style={{
                    fontFamily: isAr ? "'Tajawal', sans-serif" : "'Work Sans', sans-serif",
                    fontWeight: isAr ? 400 : 600,
                  }}
                >
                  {S3}
                </h2>
                <p>{S3P1}</p>
                <p>{S3P2}</p>

              </div>
            </>
          }
          relatedArticles={{
            title: isAr ? 'من مذكّراتنا' : 'More from our Journal',
            description: isAr
              ? 'اكتشف مقالات ورؤى إضافية من أثر العمارة.'
              : 'Explore additional insights and stories from Athar Architecture.',
            items: relatedArticles,
          }}
        />
      </div>
    </PageWrapper>
  );
}
