// GoldPoint Digital — App router
import { useState, useEffect } from "react";
import { Nav, Footer } from "./components.jsx";
import HomePage from "./pages/home.jsx";
import ServicesPage from "./pages/services.jsx";
import SolutionsPage from "./pages/solutions.jsx";
import IndustriesPage from "./pages/industries.jsx";
import AboutPage from "./pages/about.jsx";
import InsightsPage from "./pages/insights.jsx";
import CareersPage from "./pages/careers.jsx";
import ContactPage from "./pages/contact.jsx";
import { PrivacyPage, TermsPage, SecurityPage } from "./pages/legal.jsx";

function App() {
  const initial = (typeof location !== "undefined" && location.hash.replace(/^#\//, "")) || "home";
  const [page, setPage] = useState(initial || "home");

  useEffect(() => {
    const onHash = () => setPage(location.hash.replace(/^#\//, "") || "home");
    window.addEventListener("hashchange", onHash);
    window.addEventListener("gpnav", (e) => navigate(e.detail));
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (id) => {
    setPage(id);
    history.pushState(null, "", "#/" + id);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  };

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

export default App;
