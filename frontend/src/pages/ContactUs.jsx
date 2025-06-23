const ContactUs = () => {
  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Contact Us</h1>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Have questions or need support? We’re here to help.
      </p>

      <div className="bg-white border rounded-lg shadow p-6 space-y-4">
        <div>
          <p className="text-gray-600 font-semibold">📧 Email</p>
          <p className="text-gray-800">support@handyconnect.com</p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">📞 Phone</p>
          <p className="text-gray-800">+91 98765 43210</p>
        </div>

        <div>
          <p className="text-gray-600 font-semibold">📍 Address</p>
          <p className="text-gray-800">
            123, Service Lane, Your City, India
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;