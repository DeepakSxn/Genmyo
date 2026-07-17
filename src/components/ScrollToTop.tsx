import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      let timerId: ReturnType<typeof setTimeout> | null = null;
      
      const checkAndScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 50) { // Try up to 1.5s (50 attempts * 30ms)
          attempts++;
          timerId = setTimeout(checkAndScroll, 30);
        }
      };

      checkAndScroll();

      return () => {
        if (timerId) clearTimeout(timerId);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
