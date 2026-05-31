// GoldPoint Digital — App router
import React, { useState, useEffect } from "react";
import { Nav, Footer } from "./components.jsx";
import HomePage from "./pages/Home.jsx";
import ServicesPage from "./pages/Services.jsx";
import SolutionsPage from "./pages/Solutions.jsx";
import IndustriesPage from "./pages/Industries.jsx";
import AboutPage from "./pages/About.jsx";
import InsightsPage from "./pages/Insights.jsx";
import CareersPage from "./pages/Careers.jsx";
import ContactPage from "./pages/Contact.jsx";
import { PrivacyPage, TermsPage, SecurityPage } from "./pages/Legal.jsx";

export default function App() {
  const initial = (typeof location !== "undefined" && location.hash.replace(/^#\//, "")) || "home";
  const [page, setPage] = useState(initial || "home");

  const navigate = (id) => {
    setPage(id);
    history.pushState(null, "", "#/" + id);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    const onHash = () => setPage(location.hash.replace(/^#\//, "") || "home");
    const onGpNav = (e) => navigate(e.detail);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("gpnav", onGpNav);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("gpnav", onGpNav);
    };
  }, []);

  let view;
  switch (page) {
    case "services":     view = <ServicesPage onNavigate={navigate} />; break;
    case "solutions":    view = <SolutionsPage onNavigate={navigate} />; break;
    case "industries":   view = <IndustriesPage onNavigate={navigate} />; break;
    case "about":        view = <AboutPage onNavigate={navigate} />; break;
    case "insights":     view = <InsightsPage onNavigate={navigate} />; break;
    case "careers":      view = <CareersPage onNavigate={navigate} />; break;
    case "contact":      view = <ContactPage onNavigate={navigate} />; break;
    case "privacy":      view = <PrivacyPage onNavigate={navigate} />; break;
    case "terms":        view = <TermsPage onNavigate={navigate} />; break;
    case "security":     view = <SecurityPage onNavigate={navigate} />; break;
    case "home":
    default:             view = <HomePage onNavigate={navigate} />;
  }

  return (
    <>
      <Nav active={page} onNavigate={navigate} />
      <main style={{ paddingTop: 0 }}>{view}</main>
      <Footer onNavigate={navigate} />
    </>
  );
}
