import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!window.gtag) return;

    // Send a page_view on every route change
    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
}
