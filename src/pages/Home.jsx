import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import ProductGrid from "../components/products/ProductGrid";
import ReviewForm from "../components/ReviewForm";
import Testimonials from "../components/Testimonial";


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <ProductGrid/>
      <Testimonials/>
      <ReviewForm/>
      <Footer/>
    </div>
  );
};

export default Home;
