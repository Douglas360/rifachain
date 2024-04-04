import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Steps from "./components/Steps";
import Support from "./components/Support";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero min-h-screen">
        <Header />
        <Hero />
      </div>
      <Steps />
      <Features />
      <Support />
      <FAQ />
      <Contact />
      <Footer />

      {/*---SCROLL-TO-TOP-BUTTON--- */}
      <ScrollToTopButton />
    </div>
  );
};

export default App;
