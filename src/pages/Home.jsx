import React, { useState, useEffect } from 'react';
import sampleVideo from '../assets/video-1.mp4';
import { ChevronDown, ShoppingBag, Search, User, Heart, Menu, X, Star, ArrowRight, Shield, Truck, Clock, ArrowLeft, ArrowRight as RightArrow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CountUp from '../utils/CountUp';
import TiltedCard from '../utils/TiltedCard';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate=useNavigate();
  const featuredProducts = [
    {
      id: 1,
      image1: "https://cdn.shopify.com/s/files/1/0156/6146/files/GeoSeamlessT-ShirtBlackCharcoalGreyA5A2D-BBF9-1838_A-Edit_42ac3599-544f-4ffe-ba22-06a37987225b_1920x.jpg?v=1754992733",
      image2: "https://cdn.shopify.com/s/files/1/0156/6146/files/GeoSeamlessT-ShirtBlack-CharcoalGreyA5A2D-BBF9-0032-Edit_e785c9ac-7b01-4509-aeb8-66341a6764e1_1920x.jpg?v=1754992733",
    },
    {
      id: 1,
      image1: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-BorgStatementJacketGSBlackGSGraphiteGreyGSOatWhiteB4B5Z_BDB9_1562_V1_1920x.jpg?v=1759505053",
      image2: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-BorgStatementJacketGSBlackGSGraphiteGreyGSOatWhiteB4B5Z_BDB9_1548_V1_1920x.jpg?v=1759505053",
    },
    {
      id: 1,
      image1: "https://cdn.shopify.com/s/files/1/0156/6146/products/A1A2T-UBCYArrivalSlimTankNavy.D1_ZH_ZH_87c78d47-7c22-4cd7-a24e-694e1e0f55b3_1920x.jpg?v=1652263236",
      image2: "https://cdn.shopify.com/s/files/1/0156/6146/products/A1A2T-UBCYArrivalSlimTankNavy.C_ZH_ZH_c9d296cb-6449-4007-8ce6-84cf6bb1cf19_1920x.jpg?v=1652263236",
    },{
      id: 1,
      image1: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-GymsharkxAnalisSeamlessLSCropTopB4B4LGSMidnightBlueGSLatsBlueB4B4L_UCXG_0930_1920x.jpg?v=1757511772",
      image2: "https://cdn.shopify.com/s/files/1/0156/6146/files/images-GymsharkxAnalisSeamlessLSCropTopB4B4LGSMidnightBlueGSLatsBlueB4B4L_UCXG_0951_1920x.jpg?v=1757511772",
    }
  ];

  const categories = [
    { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300", items: "128 products" },
    { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300", items: "256 products" },
    { name: "Home & Living", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300", items: "89 products" },
    { name: "Accessories", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300", items: "167 products" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Premium Member",
      text: "The quality and service exceeded my expectations. Fast shipping and exceptional products!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
    },
    {
      name: "Michael Chen",
      role: "Loyal Customer",
      text: "Outstanding customer service and the products are even better in person. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    },
    {
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      text: "The attention to detail in every product is remarkable. Will definitely shop here again.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
          

      {/* Hero Section with Video */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          src={sampleVideo}
          autoPlay
          loop
          muted
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Elevate Your Style
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Discover premium quality products crafted with attention to detail and timeless design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center"
            onClick={()=>navigate('/products/men')}
            >
              Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
            </button>
           
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <ChevronDown className="h-6 w-6 text-white animate-bounce" />
        </div>
      </section>


       {/* counter*/}
      <section className="py-30 bg-white">
            <div className="max-w-6xl mx-auto px-6 ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                
                {/* Customers Count */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-gray-200 hover:bg-white/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                    <User className="h-6 w-6 text-gray-800" />
                    <span className="text-3xl font-extrabold text-gray-900"><CountUp
                        from={0}
                        to={2500}
                        separator=","
                        direction="up"
                        duration={2}
                        className="count-up-text"
                        />K+
                    </span>
                    </div>
                    <p className="text-gray-700 text-sm font-semibold tracking-wide uppercase">
                    Fit Customers
                    </p>
                </div>

                {/* Products Count */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-gray-200 hover:bg-white/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                    <ShoppingBag className="h-6 w-6 text-gray-800" />
                    <span className="text-3xl font-extrabold text-gray-900"><CountUp
                        from={0}
                        to={5000}
                        separator=","
                        direction="up"
                        duration={2}
                        className="count-up-text"
                        />+
                    </span>
                    </div>
                    <p className="text-gray-700 text-sm font-semibold tracking-wide uppercase">
                    Activewear Styles
                    </p>
                </div>

                {/* Orders Count */}
                <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 text-center border border-gray-200 hover:bg-white/80 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                    <ShoppingBag className="h-6 w-6 text-gray-800" />
                    <span className="text-3xl font-extrabold text-gray-900"><CountUp
                        from={0}
                        to={10000}
                        separator=","
                        direction="up"
                        duration={2}
                        className="count-up-text"
                        /> +
                    </span>
                    </div>
                    <p className="text-gray-700 text-sm font-semibold tracking-wide uppercase">
                    Orders Delivered
                    </p>
                </div>

                </div>
            </div>
        </section>


     

      {/* Featured Products */}
      <section className="p-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated selection of our most popular and premium items
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden bg-gray-100 mb-4 shadow-xl">
                  <img
                    src={product.image1}                    
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-0"
                  />
                {product.image2 && (
                <img
                    src={product.image2}
                    className="absolute inset-0 w-ful h-full object-cover transition-transform duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />
                )}                  
                </div>
              </div>

               
  
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="border border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>


       {/* Features Section */}
      <section className="py-16 white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Truck className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $100</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Clock className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer support team</p>
            </div>
          </div>
        </div>
      </section>


      {/* Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find exactly what you're looking for</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl cursor-pointer">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.items}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-2xl p-8 text-center">
                      <div className="flex justify-center mb-6">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full"
                        />
                      </div>
                      <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
            >
              <RightArrow className="h-5 w-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers and new product launches
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">LUXE</h3>
              <p className="text-gray-400">
                Premium ecommerce experience with curated products and exceptional service.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                {['All Products', 'New Arrivals', 'Best Sellers', 'Sale'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                {['About Us', 'Contact', 'Careers', 'Press'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                {['FAQ', 'Shipping', 'Returns', 'Privacy Policy'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;