import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ArticleTemplate from './ArticleTemplate';

type RelatedItem = {
  id: string;
  href: string;
  image: string;
  titleKey: string;
  fallbackTitle: string;
};

interface ArticlesFromDBProps {
  slug: string;
  heroUrl: string | null;
  related: {
    titleKey?: string;
    fallbackTitle?: string;
    descriptionKey?: string;
    fallbackDescription?: string;
    items: RelatedItem[];
  };
  fallback?: {
    title?: string;
    intro?: string;
    sub1Title?: string; sub1P1?: string; sub1P2?: string;
    sub2Title?: string; sub2P1?: string; sub2P2?: string;
    sub3Title?: string; sub3P1?: string; sub3P2?: string;
  };
  tableName?: string;
}

type TextMap = Record<string, string>;

export default function ArticlesFromDB({
  slug,
  heroUrl,
  related,
  fallback,
  tableName = 'NewsArticles',
}: ArticlesFromDBProps) {

  // Locale detection
  const { pathname } = useLocation();
  const isAr = pathname.startsWith('/sa/');
  const locale = isAr ? 'ar' : 'en';

  const [texts, setTexts] = React.useState<TextMap>({});
  const [loading, setLoading] = React.useState(true);

  const firstOf = (keys: string[], fb?: string) => {
    for (const k of keys) {
      const v = texts[k];
      if (typeof v === 'string' && v.length) return v;
    }
    return fb ?? '';
  };

  const k = (field: string) => `article:${slug}:${field}`;

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from(tableName)
        .select('name,texts,locale')
        .eq('locale', locale);

      if (cancelled) return;

      if (error) {
        console.error(`[ArticlesFromDB] fetch error:`, error);
        setTexts({});
        setLoading(false);
        return;
      }

      const map: TextMap = {};
      (data || []).forEach((row: any) => {
        const key = String(row?.name ?? '').trim();
        const val = String(row?.texts ?? '').trim();
        if (!key) return;

        if (key.startsWith(`article:${slug}:`) || key.startsWith('related:') || key.startsWith('seo:')) {
          map[key] = val;
        }
      });

      setTexts(map);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [locale, slug, tableName]);


  // Resolve fields
  const title   = firstOf([k('title')], fallback?.title);
  const intro   = firstOf([k('intro')], fallback?.intro);

  const sub1T   = firstOf([k('sub1-title')], fallback?.sub1Title);
  const sub1P1  = firstOf([k('sub1-p1')], fallback?.sub1P1);
  const sub1P2  = firstOf([k('sub1-p2')], fallback?.sub1P2);

  const sub2T   = firstOf([k('sub2-title')], fallback?.sub2Title);
  const sub2P1  = firstOf([k('sub2-p1')], fallback?.sub2P1);
  const sub2P2  = firstOf([k('sub2-p2')], fallback?.sub2P2);

  const sub3T   = firstOf([k('sub3-title')], fallback?.sub3Title);
  const sub3P1  = firstOf([k('sub3-p1')], fallback?.sub3P1);
  const sub3P2  = firstOf([k('sub3-p2')], fallback?.sub3P2);

  // Related header
  const relTitle = related.titleKey
    ? firstOf([related.titleKey], related.fallbackTitle || (isAr ? 'من مجلتنا' : 'More from our Journal'))
    : (related.fallbackTitle || (isAr ? 'من مجلتنا' : 'More from our Journal'));

  const relDesc = related.descriptionKey
    ? firstOf([related.descriptionKey], related.fallbackDescription || (isAr ? 'اكتشف مقالات إضافية' : 'Explore additional insights and stories from Athar Architecture.'))
    : (related.fallbackDescription || (isAr ? 'اكتشف مقالات إضافية' : 'Explore additional insights and stories from Athar Architecture.'));

  const relatedItems = (related.items || []).map(item => ({
    ...item,
    title: firstOf([item.titleKey], item.fallbackTitle),
  }));

  // SEO
  const seoTitle = title || (isAr ? 'الأخبار | أثر العمارة' : 'News | Athar Architecture');
  const seoDesc  = intro || '';

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        {seoDesc && <meta name="description" content={seoDesc} />}
      </Helmet>

      <ArticleTemplate
        title={title || ''}
        imageUrl={heroUrl}
        content={
          <>
            {intro && <p>{intro}</p>}

            <div className="h-6" />

            {/* -------- SECTION 1 -------- */}
            {(sub1T || sub1P1 || sub1P2) && (
              <div className="space-y-6">
                {sub1T && (
                  <h2
                    className="text-2xl text-[#2D2D2D]"
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: isAr ? 700 : 600   // <<<<<< CHANGE APPLIED HERE
                    }}
                  >
                    {sub1T}
                  </h2>
                )}
                {sub1P1 && <p>{sub1P1}</p>}
                {sub1P2 && <p>{sub1P2}</p>}
              </div>
            )}

            {/* -------- SECTION 2 -------- */}
            {(sub2T || sub2P1 || sub2P2) && (
              <div className="space-y-6 mt-8">
                {sub2T && (
                  <h2
                    className="text-2xl text-[#2D2D2D]"
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: isAr ? 700 : 600   // <<<<<< CHANGE APPLIED HERE
                    }}
                  >
                    {sub2T}
                  </h2>
                )}
                {sub2P1 && <p>{sub2P1}</p>}
                {sub2P2 && <p>{sub2P2}</p>}
              </div>
            )}

            {/* -------- SECTION 3 -------- */}
            {(sub3T || sub3P1 || sub3P2) && (
              <div className="space-y-6 mt-8">
                {sub3T && (
                  <h2
                    className="text-2xl text-[#2D2D2D]"
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontWeight: isAr ? 700 : 600   // <<<<<< CHANGE APPLIED HERE
                    }}
                  >
                    {sub3T}
                  </h2>
                )}
                {sub3P1 && <p>{sub3P1}</p>}
                {sub3P2 && <p>{sub3P2}</p>}
              </div>
            )}
          </>
        }
        relatedArticles={{
          title: relTitle,
          description: relDesc,
          items: relatedItems,
        }}
      />
    </>
  );
}
