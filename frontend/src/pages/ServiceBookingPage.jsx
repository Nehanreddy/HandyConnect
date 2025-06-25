import { useParams } from 'react-router-dom';
import { useState } from 'react';
import API from '../services/api';

const ServiceBookingPage = () => {
  const { serviceName } = useParams();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    address: '',
    issue: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await API.post('/bookings', {
        service: serviceName,
        ...form
      });

      console.log('✅ Booking submitted:', response.data);
      alert('✅ Service booked successfully!');
      setForm({ name: '', contact: '', address: '', issue: '' });
    } catch (error) {
      console.error('❌ Booking failed:', error.response?.data || error.message);
      alert('❌ Failed to book service. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-blue-50 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-700 capitalize">
          Book {serviceName} Service
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Service Address"
          value={form.address}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <textarea
          name="issue"
          placeholder="Describe your problem"
          value={form.issue}
          onChange={handleChange}
          rows={4}
          className="w-full mb-6 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {submitting ? 'Booking...' : 'Book Service'}
        </button>
      </form>
    </div>
  );
};

export default ServiceBookingPage;
