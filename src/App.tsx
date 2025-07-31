import DragContainer from "./components/DragContainer";
import Faqs from "./sections/Faqs";
import Features from "./sections/Features";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Reviews from "./sections/Reviews";

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Reviews />
      <Faqs />
      <Footer />
      <DragContainer />
    </div>
  );
}

export default App;
