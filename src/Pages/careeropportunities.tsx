import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { LocaleLink as Link } from '@/lib/LocaleLink';
import GlobalHeader from '../Components/GlobalHeader';
import SiteFooter from '../Components/SiteFooter';
import PageWrapper from '../Components/PageWrapper';
import ScrollToTop from '../Components/ScrollToTop';
import { supabase } from '../lib/supabaseClient';

function CareerOpportunities() {
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const introTextRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const mobileHeadlineRef = useRef<HTMLDivElement | null>(null);
  const welcomeRef = useRef<HTMLDivElement | null>(null);

  // locale from path
  const { pathname } = useLocation();
  const locale = pathname.startsWith('/sa/') ? 'ar' : 'en';

  // translations from Supabase (CareersPage)
  const [texts, setTexts] = useState<Record<string, string>>({});
  useEffect(() => {
    let cancelled = false;
    supabase
      .from('CareersPage')
      .select('name,texts')
      .eq('locale', locale)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('CareersPage fetch error:', error);
          setTexts({});
          return;
        }
        const map: Record<string, string> = {};
        (data || []).forEach((row: any) => { map[row.name] = row.texts; });
        setTexts(map);
      });
    return () => { cancelled = true; };
  }, [locale]);

  // simple resolver for "{key}" placeholders (kept for parity with other pages)
  const t = (maybeKey: string, fallback?: string) => {
    const m = typeof maybeKey === 'string' ? maybeKey.match(/^\{(.+)\}$/) : null;
    if (m) return texts[m[1]] ?? (fallback ?? maybeKey);
    return texts[maybeKey] ?? fallback ?? maybeKey ?? '';
  };

  // State for "Other" position
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Validate all required fields are filled
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const cvFile = formData.get('cv') as File;
    const terms = formData.get('terms') as string;

    // Check if all required fields are filled
    if (!firstName || !lastName || !email || !phone || !position || !cvFile || cvFile.size === 0 || !terms) {
      alert(locale === 'ar'
        ? 'يرجى ملء جميع الحقول المطلوبة وتحميل السيرة الذاتية'
        : 'Please fill in all required fields and upload your CV');
      setIsSubmitting(false);
      return;
    }

    // If "Other" position is selected, validate that otherPosition is filled
    if (position === t('position-other', 'Other')) {
      const otherPosition = formData.get('otherPosition') as string;
      if (!otherPosition || otherPosition.trim() === '') {
        alert(locale === 'ar'
          ? 'يرجى تحديد المنصب المطلوب'
          : 'Please specify the position');
        setIsSubmitting(false);
        return;
      }
    }

    // Validate file type
    const allowedExtensions = ['.doc', '.docx', '.pdf'];
    const fileName = cvFile.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
      alert(locale === 'ar'
        ? 'يرجى تحميل ملف بصيغة .doc أو .docx أو .pdf'
        : 'Please upload a file in .doc, .docx, or .pdf format');
      setIsSubmitting(false);
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (cvFile.size > maxSize) {
      alert(locale === 'ar'
        ? 'حجم الملف يجب أن يكون أقل من 5 ميجابايت'
        : 'File size must be less than 5MB');
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch('https://hook.eu2.make.com/1q5j6mbvfr9zy7mwe8zkmo6obe8geg53', {
        method: 'POST',
        body: formData,
      });

      window.location.href = locale === 'ar' ? '/sa/' : '/';
    } catch (error) {
      console.error('Form submission error:', error);
      alert(locale === 'ar'
        ? 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى'
        : 'There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation observer
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.2 });
    [headlineRef, introTextRef, formRef, mobileHeadlineRef, welcomeRef]
      .forEach(ref => ref.current && observer.observe(ref.current));
    return () => observer.disconnect();
  }, []);

  const inputStyle = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[#000000]";

  return (
    <>
      <Helmet>
        <title>{t('seo-careers-title', 'Athar Architecture | Careers & Opportunities')}</title>
        <meta name="description" content={t('seo-careers-description', 'Careers & Opportunities | Athar Alamara, Riyadh')} />
        <meta name="keywords" content={t('seo-careers-keywords', 'careers, jobs, architecture, interior design, Riyadh')} />
        <meta property="og:title" content={t('seo-careers-og-title', 'Athar Architecture | Careers & Opportunities')} />
        <meta property="og:description" content={t('seo-careers-og-description', 'Careers & Opportunities | Athar Alamara, Riyadh')} />
        <meta property="og:image" content={t('seo-careers-og-image', '/Athar Final.png')} />
        <meta property="og:type" content={t('seo-careers-og-type', 'website')} />
        <meta property="og:url" content={t('seo-careers-og-url', 'https://atharalamara.sa/careers')} />
        <meta name="twitter:card" content={t('seo-careers-twitter-card', 'summary_large_image')} />
        <meta name="twitter:title" content={t('seo-careers-twitter-title', 'Athar Architecture | Careers & Opportunities')} />
        <meta name="twitter:description" content={t('seo-careers-twitter-description', 'Careers & Opportunities | Athar Alamara, Riyadh')} />
        <meta name="twitter:image" content={t('seo-careers-twitter-image', '/Athar Final.png')} />
      </Helmet>
      <Helmet>
        <title>{t('seo-careers-title', 'Athar Architecture | Careers & Opportunities')}</title>
        <meta name="description" content={t('seo-careers-description', 'Careers & Opportunities | Athar Alamara, Riyadh')} />
        <meta name="keywords" content={t('seo-careers-keywords', 'careers, jobs, architecture, interior design, Riyadh')} />
      </Helmet>

      <ScrollToTop />
      <GlobalHeader />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Desktop video */}
        <div className="hidden md:block absolute inset-0">
          <iframe
            src="https://customer-3a18rxl1od32bsw3.cloudflarestream.com/e7bd70335dedf8aada8f7a660b856b36/iframe?autoplay=1&muted=1&loop=1"
            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Athar Careers Video"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Desktop title — moves right for Arabic */}
<div
  className={`hidden md:block absolute bottom-6 z-10 ${
    locale === 'ar' ? 'right-10 text-right' : 'left-10 text-left'
  }`}
>
  <h1
    className="text-4xl font-medium text-white tracking-widest"
    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
  >
    {t('careers-label', 'Careers')}
  </h1>
</div>


        {/* Mobile video */}
        <div className="block md:hidden absolute inset-0">
          <iframe
            src="https://customer-3a18rxl1od32bsw3.cloudflarestream.com/e7bd70335dedf8aada8f7a660b856b36/iframe?autoplay=1&muted=1&loop=1"
            className="absolute top-1/2 left-1/2 w-[350vw] h-[350vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Athar Careers Video Mobile"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Mobile title — moves right for Arabic */}
<div
  className={`block md:hidden absolute bottom-6 z-10 ${
    locale === 'ar' ? 'right-4 text-right' : 'left-4 text-left'
  }`}
>
  <h1
    className="text-4xl font-medium text-white tracking-widest"
    style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
  >
    {t('careers-label', 'Careers')}
  </h1>
</div>

      </section>

      <PageWrapper>
        <main className="relative z-10 bg-[#FFFFFF]">
          {/* Anim styles */}
          <style>
            {`
              .animate-element { opacity: 0; transition: all 1.2s ease-out; }
              .headline-animation { transform: translateY(-30px); }
              .slide-left { transform: translateX(-40px); }
              .slide-right { transform: translateX(40px); }
              .slide-up { transform: translateY(40px); }
              .visible { opacity: 1; transform: translate(0, 0); }
              .delay-500 { transition-delay: 0.5s; }
              .delay-1000 { transition-delay: 1s; }
            `}
          </style>

          {/* Content */}
          <div className="px-6 md:px-12 pt-20 pb-20">
            <div className="max-w-2xl mx-auto">

              {/* Welcome */}
              <section ref={welcomeRef} className="animate-element slide-up">
                <h2 className="text-xl mb-2 font-light" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  {t('welcome-headline', 'Welcome to our careers and opportunities page.')}
                </h2>
                <p className="text-lg leading-relaxed font-thin text-[#000000]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  {t('welcome-body', "We're excited to learn more about you and how you can contribute to our team. To get started, please submit your CV using the form below. This is your chance to showcase your skills, experience, and achievements that make you the perfect fit for our team. Fill in the form below and we will get back to you as soon as possible.")}
                </p>
              </section>

              <div className="pt-20" />

              {/* Form */}
              <section>
                <div ref={formRef} className="animate-element slide-up">
                  <h2 className="text-xl mb-2 font-light" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                    {t('form-headline', 'Submit your CV')}
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm text-[#000000] mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                          {t('first-name-label', 'First Name *')}
                        </label>
                        <input type="text" id="firstName" name="firstName" required className={inputStyle} />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm text-[#000000] mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                          {t('last-name-label', 'Last Name *')}
                        </label>
                        <input type="text" id="lastName" name="lastName" required className={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm text-[#000000] mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                        {t('email-label', 'Email *')}
                      </label>
                      <input type="email" id="email" name="email" required className={inputStyle} />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm text-[#000000] mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                        {t('phone-label', 'Phone Number *')}
                      </label>
                      <input type="tel" id="phone" name="phone" required className={inputStyle} />
                    </div>

                    <div>
                      <label className="block text-sm text-[#000000] mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                        {t('position-label', 'Position *')}
                      </label>
                      <div className="space-y-2">
                        {[
                          { key: 'position-architect', value: 'Architect' },
                          { key: 'position-interior', value: 'Interior Designer' },
                          { key: 'position-3d', value: '3D Visualizer' },
                          { key: 'position-trainee', value: 'Trainee' },
                          { key: 'position-other', value: 'Other' },
                        ].map(({ key, value }) => (
                          <div key={key} className="flex items-center">
                            <input
                              type="radio"
                              id={key}
                              name="position"
                              value={t(key, value)}
                              required
                              onChange={(e) => setSelectedPosition(e.target.value)}
                              className="mr-2"
                            />
                            <label htmlFor={key} className="text-sm text-[#000000]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                              {t(key, value)}
                            </label>
                          </div>
                        ))}
                      </div>

                      {selectedPosition === t('position-other', 'Other') && (
                        <div className="mt-2">
                          <input
                            type="text"
                            name="otherPosition"
                            placeholder={t('position-other-placeholder', 'If Other, please specify')}
                            maxLength={50}
                            required
                            className={inputStyle}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cv" className="block text-sm text-[#000000] mb-2" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial', sans-serif", fontWeight: 200 }}>
                        {t('upload-label', 'Upload CV (.doc, .docx, .pdf - Max 5MB) *')}
                      </label>
                      <input type="file" id="cv" name="cv" accept=".doc,.docx,.pdf" required className={inputStyle} />
                    </div>

                    <div className="flex items-start">
                      <input type="checkbox" id="terms" name="terms" required className="mt-1 mr-2" />
                      <label htmlFor="terms" className="text-sm text-[#000000]" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}>
                        {t('terms-ack', 'I acknowledge that I have read and understand the ')}
                        <Link to="/terms" className="underline hover:text-[#292827]">{t('terms-label', 'Terms')}</Link>
                        {' '}{t('and-label', 'and')}{' '}
                        <Link to="/privacy" className="underline hover:text-[#292827]">{t('privacy-label', 'Privacy Notice')}</Link>.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-[#000000] text-white rounded-lg hover:bg-[#292827] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 200 }}
                    >
                      {isSubmitting ? t('submitting-label', 'Submitting...') : t('submit-label', 'Submit CV')}
                    </button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </main>

        <SiteFooter />
      </PageWrapper>
    </>
  );
}

export default CareerOpportunities;
