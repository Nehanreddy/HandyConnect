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
  StarIcon,
} from '@heroicons/react/24/outline';

import heroImage from '../assets/hero2.png'; // your current image
import ServiceBookingModal from '../components/ServiceBookingModal';

import electricianImg from '../assets/electrician.jpg';
import plumberImg from '../assets/plumber.jpg';
import carpenterImg from '../assets/carpenter.jpg';
import painterImg from '../assets/paint.jpg';
import applianceRepairImg from '../assets/appliancerepair.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Modal display
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Typing animation state for "Handy Connect"
  const titles = ['Handy Connect'];
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex] = useState(0);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scrollTo state navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Typing effect logic for "Handy Connect"
  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentTitle) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
      } else {
        setTypedText(prev =>
          isDeleting
            ? prev.slice(0, -1)
            : currentTitle.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentIndex, titles]);

  // Authentication check example
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const services = [
    {
      label: 'Plumber',
      description: 'Fix leaks and pipe issues',
      icon: <WrenchIcon className="h-8 w-8 text-pink-400" />,
      img: plumberImg,
    },
    {
      label: 'Electrician',
      description: 'Safe and efficient fixes',
      icon: <BoltIcon className="h-8 w-8 text-yellow-400" />,
      img: electricianImg,
    },
    {
      label: 'Carpenter',
      description: 'Furniture & fittings',
      icon: <WrenchScrewdriverIcon className="h-8 w-8 text-orange-400" />,
      img: carpenterImg,
    },
    {
      label: 'Painter',
      description: 'Interior & exterior painting',
      icon: <PaintBrushIcon className="h-8 w-8 text-green-400" />,
      img: painterImg,
    },
    {
      label: 'Appliance Repair',
      description: 'Microwaves, fridges, more',
      icon: <Cog6ToothIcon className="h-8 w-8 text-purple-400" />,
      img: applianceRepairImg,
    },
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
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black text-gray-200 pt-20">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-10 px-4 py-12 lg:py-20 min-h-[80vh] max-w-7xl mx-auto">
        {/* TEXT */}
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-5 flex flex-col justify-center" data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-white bg-clip-text text-transparent">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-[#f4f3f3] via-white to-[#4F3F3D] bg-clip-text text-transparent font-extrabold">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold bg-gradient-to-r from-white via-[#f9cfdc] to-white bg-clip-text text-transparent">
            Your Home. Our Experts. Hassle-Free Services, Anytime.
          </h2>
          <p className="text-sm md:text-lg max-w-md mx-auto lg:mx-0 bg-gradient-to-r from-white to-[#4F3F3D] bg-clip-text text-transparent">
            A one-stop platform to book trusted plumbing, painting, electrical, carpentry, and appliance repair professionals instantly.
          </p>
          <button
  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
  className="mt-6 inline-flex items-center gap-1 px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-shadow shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 text-sm font-medium whitespace-nowrap w-fit"
  aria-label="Explore our services"
>
  Explore Services <span className="text-base">→</span>
</button>


        </div>
        {/* IMAGE */}
        <div className="lg:w-1/2 w-full flex justify-center items-center lg:items-center" data-aos="fade-left">
          <div className="relative w-full flex justify-center">
            <img
              src={heroImage}
              alt="Professional handyman at work with modern tools"
              className="w-full max-w-[600px] md:max-w-[650px] lg:max-w-[700px] xl:max-w-[750px] object-contain rounded-2xl shadow-2xl"
              style={{
                minHeight: '350px',
                maxHeight: '480px',
                background: '#28282b',
                objectFit: 'cover',
              }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
        <h2
          className="text-4xl font-bold text-center text-pink-400 mb-12 tracking-wide"
          data-aos="fade-up"
        >
          Choose Your Service
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {services.map(({ label, description, icon, img }, idx) => (
            <div
              key={label}
              data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
              className="bg-gray-900 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-transform cursor-pointer flex flex-col items-center"
              onClick={() => {
                if (isLoggedIn) {
                  setSelectedService(label);
                  setShowModal(true);
                } else {
                  navigate('/login');
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (isLoggedIn) {
                    setSelectedService(label);
                    setShowModal(true);
                  } else {
                    navigate('/login');
                  }
                }
              }}
              aria-label={`Select ${label} service`}
            >
              {img && (
                <img
                  src={img}
                  alt={`${label} illustration`}
                  className="w-full max-w-[140px] h-[90px] object-cover rounded-lg mb-4 shadow-md"
                  style={{ background: '#111' }}
                  loading="lazy"
                />
              )}
              <div className="mb-5">{icon}</div>
              <h3 className="text-lg font-semibold text-pink-400 mb-1">{label}</h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="bg-gray-900 py-16 px-6 max-w-7xl mx-auto rounded-2xl shadow-lg">
        <h2
          className="text-4xl font-bold text-center text-pink-400 mb-10 tracking-wide"
          data-aos="fade-up"
        >
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-lg select-none">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <div className="flex" aria-label={`Rating: ${review.rating} stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic text-sm">“{review.comment}”</p>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 px-6 mt-16 max-w-7xl mx-auto rounded-t-xl shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="font-bold text-xl text-pink-400 mb-2">Handy Connect</h4>
            <p>Bringing trusted home services right to your doorstep.</p>
          </div>
          <nav aria-label="Quick links">
            <h4 className="font-bold text-xl text-pink-400 mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:underline text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded">
                  Services
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:underline text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded">
                  Reviews
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 rounded">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <address>
            <h4 className="font-bold text-xl text-pink-400 mb-2">Contact</h4>
            <p>
              Email:{' '}
              <a href="mailto:support@handyconnect.com" className="text-gray-300 hover:underline">
                support@handyconnect.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+919876543210" className="text-gray-300 hover:underline">
                +91 9876543210
              </a>
            </p>
          </address>
        </div>
        <p className="text-center text-sm mt-10 text-gray-600 select-none">
          &copy; {new Date().getFullYear()} Handy Connect. All rights reserved.
        </p>
      </footer>

      {/* Booking Modal */}
      {showModal && selectedService && (
        <ServiceBookingModal serviceType={selectedService} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default HomePage;
