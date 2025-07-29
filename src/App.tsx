import Faqs from "./sections/Faqs";
import Features from "./sections/Features";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Reviews from "./sections/Reviews";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <Faqs />
      <Footer />
    </>
  );
}

export default App;
