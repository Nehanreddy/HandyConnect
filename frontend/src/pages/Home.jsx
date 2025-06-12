import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.png';
import plumberImg from '../assets/plumbing.jpeg';
import electricianImg from '../assets/electrical.jpeg';
import carpenterImg from '../assets/carpenter.jpeg';
import painterImg from '../assets/paint.jpeg';
import cleaningImg from '../assets/cleaning.png';  // New
import acRepairImg from '../assets/ac-repair.png';  // New

const HomePage = () => {
  const navigate = useNavigate();

  const services = [
    { label: 'Plumbing', img: plumberImg },
    { label: 'Electrical', img: electricianImg },
    { label: 'Carpentry', img: carpenterImg },
    { label: 'Painting', img: painterImg },
    { label: 'Cleaning', img: cleaningImg },
    { label: 'AC Repair', img: acRepairImg },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between bg-gray-50 px-8 py-16 lg:py-24 min-h-screen">
        <div className="lg:w-1/2 w-full lg:pl-12 flex flex-col justify-center text-center lg:text-left space-y-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            Welcome to <span className="text-blue-600">Handy Connect</span>
          </h1>
          <h2 className="text-2xl lg:text-3xl font-medium text-gray-700">
            Your Home. Our Experts. Hassle-Free Services, Anytime!
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            One-stop solution for plumbing, painting, electrical, carpentry & more — all in one click.
          </p>
          <div>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-lg shadow-md"
            >
              Explore Services
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:w-1/2 w-full mt-12 lg:mt-0 flex justify-center items-center">
          <img
            src={heroImage}
            alt="Handy Services"
            className="w-full max-w-[500px] object-contain rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white min-h-[90vh]">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-16">
          Choose Your Service
        </h2>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {services.map(({ label, img }) => (
            <div
              key={label}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/services/${label.toLowerCase().replace(' ', '-')}`)}
            >
              <img src={img} alt={label} className="h-52 w-full object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-blue-700 mb-2">{label}</h3>
                <p className="text-md text-gray-600">
                  Trusted {label.toLowerCase()} professionals near you.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-6 text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Handy Connect. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
