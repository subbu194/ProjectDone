// Since this is a one-page website (SPA) and all navigation is handled via anchor links (hashes),
// we should scroll to the correct section or to the top only when the hash changes.
// The default ScrollToTop logic for pathname doesn't work as expected in this scenario.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to the element with that id
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Otherwise, scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash, pathname]);

  return null;
}