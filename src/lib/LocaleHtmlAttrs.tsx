import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function LocaleHtmlAttrs() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAr = pathname === "/sa" || pathname.startsWith("/sa/");
    const html = document.documentElement;

    // Language
    html.setAttribute("lang", isAr ? "ar" : "en");

    // ✅ Global direction (RTL/LTR)
    html.setAttribute("dir", isAr ? "rtl" : "ltr");

    // Language-specific class toggles
    html.classList.toggle("lang-ar", isAr);
    html.classList.toggle("lang-en", !isAr);

    // Notify any listeners of locale changes
    window.dispatchEvent(
      new CustomEvent("athar:locale-changed", {
        detail: { locale: isAr ? "ar" : "en" },
      })
    );
  }, [pathname]);

  return null;
}
