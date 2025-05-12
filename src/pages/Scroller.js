import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* ---------- Universal helper component to ensure react router dom navs scroll to top as do href navs ---------- */
const Scroller = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default Scroller;