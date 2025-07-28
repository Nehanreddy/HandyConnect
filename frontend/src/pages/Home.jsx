import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  WrenchScrewdriverIcon,
  BoltIcon,
  WrenchIcon,
  PaintBrushIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TruckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import heroImage from '../assets/hero.png';
import ServiceBookingModal from '../components/ServiceBookingModal';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- get location to read navigation state
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Initialize AOS animation
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Check if we need to scroll to a section due to navigation (e.g., from Navbar)
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Slight delay allows section to be present/rendered in DOM
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      // Reset the state so it doesn't try to scroll again on reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const services = [
    { label: 'Plumber', description: 'Fix leaks and pipe issues', icon: <WrenchIcon className="h-8 w-8 text-cyan-400" /> },
    { label: 'Electrical', description: 'Safe and efficient fixes', icon: <BoltIcon className="h-8 w-8 text-yellow-400" /> },
    { label: 'Carpenter', description: 'Furniture & fittings', icon: <WrenchScrewdriverIcon className="h-8 w-8 text-orange-400" /> },
    { label: 'Painter', description: 'Interior & exterior painting', icon: <PaintBrushIcon className="h-8 w-8 text-green-400" /> },
    { label: 'Appliance Repair', description: 'Microwaves, fridges, more', icon: <Cog6ToothIcon className="h-8 w-8 text-purple-400" /> },
    
  ];

  const reviews = [
    {
      name: 'Ravi Kumar',
      comment: 'Quick and reliable! Got my plumbing fixed within an hour.',
      rating: 5,
    },
    {
      name: 'Anjali Mehra',
      comment: 'Excellent service, very professional and polite electrician.',
      rating: 4,
    },
    {
      name: 'Neha Sharma',
      comment: 'Affordable and hassle-free. Definitely recommend!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen text-gray-200 pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:py-24 min-h-[90vh]">
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6" data-aos="fade-right">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-cyan-400 leading-tight">
            Welcome to Handy Connect
          </h1>
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-300">
            Your Home. Our Experts. Hassle-Free Services, Anytime!
          </h2>
          <p className="text-lg lg:text-xl text-gray-400">
            One-stop solution for plumbing, painting, electrical, carpentry & more — all in one click.
          </p>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-lg shadow-lg"
          >
            Explore Services
          </button>
        </div>

        <div className="lg:w-1/2 w-full mt-12 lg:mt-0 flex justify-center" data-aos="fade-left">
          <img
            src={heroImage}
            alt="Handy Services"
            className="w-full max-w-[600px] object-contain rounded-xl shadow-2xl"
          />
        </div>
      </section>
<section id="services" className="py-20 px-6">
  <h2 className="text-4xl font-bold text-center text-cyan-400 mb-16" data-aos="fade-up">
    Choose Your Service
  </h2>
  <div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto justify-items-center"
  >
    {services.map(({ label, description, icon }, idx) => (
      <div
        key={label}
        data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
        className="bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition cursor-pointer w-full max-w-xs"
        onClick={() => {
          setSelectedService(label);
          setShowModal(true);
        }}
      >
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-cyan-300 mb-2">{label}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    ))}
  </div>
</section>


      {/* Review Section */}
      <section className="bg-gray-900 py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-cyan-400 mb-12" data-aos="fade-up">
          What Our Customers Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-md"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="font-bold text-xl text-cyan-400 mb-2">Handy Connect</h4>
            <p>Bringing expert home services to your doorstep.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl text-cyan-400 mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:underline text-gray-300">Services</a></li>
              <li><a href="#reviews" className="hover:underline text-gray-300">Reviews</a></li>
              <li><a href="/contact" className="hover:underline text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl text-cyan-400 mb-2">Contact</h4>
            <p>Email: support@handyconnect.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>
        <p className="text-center text-sm mt-10 text-gray-500">
          &copy; {new Date().getFullYear()} Handy Connect. All rights reserved.
        </p>
      </footer>

      {/* Booking Modal */}
      {showModal && selectedService && (
        <ServiceBookingModal
          serviceType={selectedService}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
