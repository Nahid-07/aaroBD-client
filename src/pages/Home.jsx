import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import ProductGrid from "../components/products/ProductGrid";
import Testimonials from "../components/Testimonial";
import usePageTitle from "../hooks/userPageTitle";


const Home = () => {
  usePageTitle("Home - Best Streetwear Collection"); 
  return (
    <div>
      <HeroSection/>
      <ProductGrid/>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default Home;
