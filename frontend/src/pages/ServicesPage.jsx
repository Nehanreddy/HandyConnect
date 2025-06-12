import { useNavigate } from 'react-router-dom';
import plumberImg from '../assets/plumbing.jpeg';
import electricianImg from '../assets/electrical.jpeg';
import carpenterImg from '../assets/carpenter.jpeg';
import painterImg from '../assets/paint.jpeg';
import cleaningImg from '../assets/cleaning.png';
import acRepairImg from '../assets/ac-repair.png';

const services = [
  { label: 'Plumbing', img: plumberImg },
  { label: 'Electrical', img: electricianImg },
  { label: 'Carpentry', img: carpenterImg },
  { label: 'Painting', img: painterImg },
  { label: 'Cleaning', img: cleaningImg },
  { label: 'AC Repair', img: acRepairImg },
];

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-24 px-6">
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
    </div>
  );
};

export default ServicesPage;
