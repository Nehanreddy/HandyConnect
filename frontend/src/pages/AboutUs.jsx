import React from 'react';

const AboutUs = () => {
  return (
    // Outer container fills viewport and has the dark gradient background
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      {/* Inner container constrains the content width and adds padding */}
      <div className="pt-24 px-6 max-w-4xl mx-auto space-y-12">
        <h1
          className="text-5xl font-extrabold text-cyan-400 mb-8 text-center"
          data-aos="fade-down"
        >
          About Handy Connect
        </h1>

        <section data-aos="fade-up" data-aos-delay="100" className="space-y-4">
          <p className="text-lg leading-relaxed text-gray-300">
            At <span className="font-semibold text-cyan-400">Handy Connect</span>, we pride ourselves on being
            the premier platform for on-demand home services. Our goal is to bridge the gap between
            homeowners and highly skilled, vetted professionals in plumbing, electrical work,
            carpentry, painting, and beyond.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            We understand that household maintenance can be a hassle — finding quality service providers can
            be time-consuming and stressful. That's why our platform simplifies the process: within just a few clicks,
            you can book trustworthy experts who deliver timely and reliable service.
          </p>

          <p className="text-lg leading-relaxed text-gray-300">
            Transparency, trust, and innovation are at the core of our values. Every professional on our platform
            undergoes a rigorous verification process to ensure you receive the best service possible. Through
            continuous technology-driven improvements, Handy Connect offers convenience and peace of mind,
            empowering thousands of customers to maintain beautiful and functional homes.
          </p>
        </section>

        {/* Vision Section */}
        <section data-aos="fade-up" data-aos-delay="200" className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            To become the most trusted and innovative home services platform, revolutionizing how homeowners
            connect with reliable professionals, making home maintenance effortless and accessible to all.
          </p>
        </section>

        {/* Mission Section */}
        <section data-aos="fade-up" data-aos-delay="300" className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            To transform the way people access home services by delivering quick, reliable, and professional
            solutions that enhance everyday living.
          </p>
        </section>

        {/* What We Provide Section */}
        <section data-aos="fade-up" data-aos-delay="400" className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">What We Provide</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Access to a wide range of trusted home service professionals including plumbers, electricians, carpenters, painters, and appliance repair experts.</li>
            <li>Simple and user-friendly booking platform available anytime, anywhere.</li>
            <li>Verified and background-checked professionals for your safety and peace of mind.</li>
            <li>Transparent pricing with no hidden charges.</li>
            <li>Reliable and timely service guaranteed.</li>
          </ul>
        </section>

        {/* Why Handy Connect Section */}
        <section data-aos="fade-up" data-aos-delay="500" className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">Why Handy Connect?</h2>
          <p className="text-gray-300 leading-relaxed">
            Because we put your convenience and trust first. With an easy-to-use platform, vetted professionals, transparent pricing,
            and fast bookings, Handy Connect is your go-to solution for all home maintenance and repair needs.
            Join thousands of satisfied customers who have made seamless home service booking a reality.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
