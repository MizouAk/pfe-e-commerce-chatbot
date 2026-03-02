// Home.jsx
import Hero from "../Composantes/Hero";
import Features from "../Composantes/Features";
import Collections from "../Composantes/Collections";
import Notch from "../Composantes/Notch";
import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Collections />
      <Notch />
      <Footer />
    </>
  );
}


export default Home;