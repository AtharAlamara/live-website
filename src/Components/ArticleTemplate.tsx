// src/Components/ArticleTemplate.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import GlobalHeader from './GlobalHeader';
import SiteFooter from './SiteFooter';
import { Gallery4, Gallery4Props } from '@/components/ui/gallery4';

interface ArticleTemplateProps {
  title: string;
  imageUrl: string | null;
  content: React.ReactNode;
  relatedArticles?: Gallery4Props;
}

function ArticleTemplate({ title, imageUrl, content, relatedArticles }: ArticleTemplateProps) {
  const { pathname } = useLocation();
  const isAr = pathname.startsWith('/sa/');

  return (
    <>
      <GlobalHeader />

      <main className="pt-20 bg-[#FFFFFF]">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">

          {/* H1 */}
          <h1
            className="text-3xl md:text-4xl text-[#000000] mb-8 md:mb-12"
            style={{
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 400,
            }}
          >
            {title}
          </h1>

          {/* Hero Image */}
          {imageUrl && (
            <div className="mb-8 md:mb-12">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto rounded-sm"
              />
            </div>
          )}

          {/* CONTENT WRAPPER */}
          <div className="prose max-w-none">
            <div
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                color: '#000000',
                lineHeight: '1.75',
              }}
            >
              {/* ✅ Arabic typography rules (visual only) */}
              {isAr && (
                <style>{`
                  /* All paragraphs default to 200 in Arabic */
                  .athar-article-body p { font-weight: 200 !important; }

                  /* The very first paragraph (intro) = 400 in Arabic */
                  .athar-article-body p:first-of-type { font-weight: 400 !important; }

                  /* Subtitles (h2) = 400 in Arabic */
                  .athar-article-body h2 { font-weight: 400 !important; }

                  /* Ensure no inherited heavy weights sneak in */
                  .athar-article-body strong,
                  .athar-article-body b { font-weight: 400 !important; }
                `}</style>
              )}

              {/* ✅ Keep structure unchanged; apply a class we can target safely */}
              <div className="athar-article-body text-lg">
                {content}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED SECTION */}
        {relatedArticles && (
          <div className="pt-4 pb-4 px-4 md:px-8 border-t border-[#EAEAEA]">
            <Gallery4
              title={relatedArticles.title}
              description={relatedArticles.description}
              items={relatedArticles.items}
            />
          </div>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

export default ArticleTemplate;
