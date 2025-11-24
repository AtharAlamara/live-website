"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LocaleLink as Link } from "@/lib/LocaleLink";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description?: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
  /** Optional override for the CTA text. If not provided, we auto-detect locale. */
  readMoreLabel?: string;
}

/** Keep as-is (empty demo data by default). Real items are passed via props. */
const data: Gallery4Item[] = [];

const Gallery4 = ({
  title = "More from our Journal",
  description = "Explore additional insights and stories from Athar Architecture.",
  items = data,
  readMoreLabel,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Locale only affects strings, NEVER layout.
  const { pathname } = useLocation();
  const isAr =
    pathname.startsWith("/sa/") ||
    document.documentElement.getAttribute("lang")?.toLowerCase() === "ar";

  const ctaLabel = readMoreLabel ?? (isAr ? "اقرأ المزيد" : "Read more");

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section className="py-8">
      <div className="container mx-auto">
        {/* HEADER — ALWAYS CENTERED (desktop + mobile).
           We force LTR direction on the button row to keep arrow order unchanged in Arabic. */}
        <div className="mb-8 md:mb-14 lg:mb-16 flex flex-col items-center">
          <h2
            className="text-2xl md:text-3xl text-[#000000] text-center"
            style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 400 }}
          >
            {title}
          </h2>
          <p
            className="mt-2 max-w-2xl text-base text-[#000000] text-center"
            style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 300 }}
          >
            {description}
          </p>

          {/* Nav buttons locked to center; LTR so icons keep their visual order in Arabic */}
          <div className="mt-6 flex items-center justify-center gap-2" dir="ltr" lang="en">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label={isAr ? "السابق" : "Previous"}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label={isAr ? "التالي" : "Next"}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* CAROUSEL — force LTR so “next” goes right for all locales */}
      <div className="w-full" dir="ltr" lang="en">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <Link to={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 h-full bg-[linear-gradient(hsl(var(--primary)/0),hsl(var(--primary)/0.4),hsl(var(--primary)/0.8)_100%)] mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                          {item.description}
                        </div>
                      )}
                      <div className="flex items-center text-sm">
                        {ctaLabel}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`${isAr ? "اذهب إلى الشريحة" : "Go to slide"} ${
                index + 1
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
