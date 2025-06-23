import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const services = [
    { label: 'Plumbing', description: 'Fix leaks and pipe issues', icon: <WrenchIcon className="h-8 w-8 text-blue-600" /> },
    { label: 'Electrical', description: 'Safe and efficient fixes', icon: <BoltIcon className="h-8 w-8 text-yellow-500" /> },
    { label: 'Carpentry', description: 'Furniture & fittings', icon: <WrenchScrewdriverIcon className="h-8 w-8 text-orange-500" /> },
    { label: 'Painting', description: 'Interior & exterior painting', icon: <PaintBrushIcon className="h-8 w-8 text-green-600" /> },
    { label: 'Appliance Repair', description: 'Microwaves, fridges, more', icon: <Cog6ToothIcon className="h-8 w-8 text-purple-600" /> },
    { label: 'Handyman', description: 'All-around fixes & installs', icon: <SparklesIcon className="h-8 w-8 text-pink-500" /> },
    { label: 'Verified Pros', description: 'Trusted professionals', icon: <ShieldCheckIcon className="h-8 w-8 text-emerald-600" /> },
    { label: 'Quick Delivery', description: 'Fast and on-time service', icon: <TruckIcon className="h-8 w-8 text-indigo-600" /> },
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
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:py-24 bg-gray-50 min-h-[90vh]">
        <div className="lg:w-1/2 w-full text-center lg:text-left space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            Welcome to Handy Connect
          </h1>
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-700">
            Your Home. Our Experts. Hassle-Free Services, Anytime!
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            One-stop solution for plumbing, painting, electrical, carpentry & more — all in one click.
          </p>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg shadow-md"
          >
            Explore Services
          </button>
        </div>

        <div className="lg:w-1/2 w-full mt-12 lg:mt-0 flex justify-center">
          <img
            src={heroImage}
            alt="Handy Services"
            className="w-full max-w-[600px] object-contain rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">Choose Your Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {services.map(({ label, description, icon }) => (
            <div
              key={label}
              className="bg-gray-50 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => {
                setSelectedService(label);
                setShowModal(true);
              }}
            >
              <div className="flex justify-center mb-4">{icon}</div>
              <h3 className="text-xl font-bold text-blue-700 mb-2">{label}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Review Section */}
      <section className="bg-blue-50 py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">What Our Customers Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-900 font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h4 className="font-bold text-xl mb-2">Handy Connect</h4>
            <p>Bringing expert home services to your doorstep.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="#reviews" className="hover:underline">Reviews</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2">Contact</h4>
            <p>Email: support@handyconnect.com</p>
            <p>Phone: +91 9876543210</p>
          </div>
        </div>
        <p className="text-center text-sm mt-10 text-gray-400">
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