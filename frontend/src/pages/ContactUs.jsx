import React from 'react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200 pt-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-cyan-400 mb-10 text-center" data-aos="fade-down">
          Contact Us
        </h1>

        <p className="text-lg leading-relaxed text-gray-300 mb-12 text-center" data-aos="fade-up" data-aos-delay="100">
          Have questions or need support? We’re here to help.
        </p>

        <div
          className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 space-y-8 max-w-md mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div>
            <p className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <span role="img" aria-label="email">📧</span> Email
            </p>
            <p className="text-gray-300 mt-1">support@handyconnect.com</p>
          </div>

          <div>
            <p className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <span role="img" aria-label="phone">📞</span> Phone
            </p>
            <p className="text-gray-300 mt-1">+91 98765 43210</p>
          </div>

          <div>
            <p className="text-cyan-400 text-lg font-semibold flex items-center gap-2">
              <span role="img" aria-label="address">📍</span> Address
            </p>
            <p className="text-gray-300 mt-1">123, Service Lane, Your City, India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
