import plumberImg from '../assets/plumbing.jpeg';
import painterImg from '../assets/paint.jpeg';
import carpenterImg from '../assets/carpenter.jpeg';
import electricianImg from '../assets/electrical.jpeg';

const Home = () => {
  return (
    <div className="bg-gray-50 pt-20 px-4 sm:px-6 md:px-10">
      {/* Hero Section */}
      <section className="text-center max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Home Services at Your Fingertips
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
          Book expert plumbers, electricians, painters, and carpenters from your neighborhood – quick, transparent, and hassle-free.
        </p>
        <a
          href="#services"
          className="inline-block bg-blue-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Book a Service Now
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="mt-12 sm:mt-16 max-w-5xl mx-auto text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">About Us</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Handy Connect is your all-in-one solution for home maintenance. Whether you need a plumber for a leak, a painter for a refresh,
          an electrician for wiring, or a carpenter for custom furniture – we connect you with trusted local experts. 
          <br /><br />
          With over <strong>12 million customers</strong> and a <strong>4.8★ average rating</strong>, we’re committed to quality, convenience, and customer happiness.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="mt-14 sm:mt-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 px-2 sm:px-0">
          {/* Left: Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: 'Plumbing',
                img: plumberImg,
                desc: 'Leaking faucets or pipe bursts? Get fast and reliable plumbing help at your doorstep.'
              },
              {
                title: 'Painting',
                img: painterImg,
                desc: 'Give your home a fresh look with professional painting – interior, exterior, or accents.'
              },
              {
                title: 'Carpentry',
                img: carpenterImg,
                desc: 'Custom furniture, doors, and wooden repairs by expert local carpenters.'
              },
              {
                title: 'Electrical',
                img: electricianImg,
                desc: 'Certified electricians for installations, rewiring, appliance setup, and more.'
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border shadow-sm p-4 sm:p-5 text-center hover:shadow-md transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-36 sm:h-40 w-full object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-bold text-gray-700 mb-1">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* Right: Large visuals */}
          <div className="grid grid-cols-2 gap-4">
            {[plumberImg, painterImg, carpenterImg, electricianImg].map((img, idx) => (
              <img
                key={idx}
                src={img}
                className="w-full h-40 sm:h-48 object-cover rounded-xl"
                alt="Service Preview"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="flex flex-wrap justify-center gap-10 text-center text-gray-700 mt-14 sm:mt-20">
        <div>
          <p className="text-yellow-500 font-bold text-2xl sm:text-3xl">4.8⭐</p>
          <p className="text-sm sm:text-base">Service Rating</p>
        </div>
        <div>
          <p className="text-blue-600 font-bold text-2xl sm:text-3xl">12M+</p>
          <p className="text-sm sm:text-base">Happy Customers</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t py-5 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Handy Connect. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
