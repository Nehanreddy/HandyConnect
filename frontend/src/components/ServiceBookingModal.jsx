import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { X, Home, User } from 'lucide-react';

const mockUser = {
  name: 'John Doe',
  phone: '1234567890',
  email: 'john@example.com',
  address: '123 Main St',
  city: 'New York'
};

const cities = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte'
];

const ServiceBookingModal = ({ serviceType, onClose }) => {
  const [step, setStep] = useState(1);
  const [bookingFor, setBookingFor] = useState('self');
  const [formData, setFormData] = useState({
    problem: '',
    urgency: 'Normal',
    location: mockUser.address,
    city: mockUser.city,
    otherName: '',
    otherPhone: '',
    otherAddress: '',
    otherCity: '',
    date: '',
    time: '',
    name: mockUser.name,
    phone: mockUser.phone,
    email: mockUser.email
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    const serviceLocation = bookingFor === 'self'
      ? { address: formData.location, city: formData.city }
      : { address: formData.otherAddress, city: formData.otherCity };

    console.log('Booking Data:', {
      ...formData,
      bookingFor,
      serviceLocation
    });

    alert(`Service request submitted for ${formData.name}!`);
    onClose();
  };

  const stepTitles = ['Service Details', 'Booking For', 'Schedule', 'Contact Info'];

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-gray-900">Request Service</Dialog.Title>
                    <p className="text-gray-500 mt-1 text-sm">{stepTitles[step - 1]}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Step Progress */}
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex items-center flex-1">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                        step >= n ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {n}
                      </div>
                      {n < 4 && <div className={`flex-1 h-1 mx-2 rounded-full ${step > n ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gray-200'}`} />}
                    </div>
                  ))}
                </div>

                {/* Form Steps */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {step === 1 && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Service Type</label>
                        <input
                          type="text"
                          disabled
                          value={serviceType}
                          className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-600 border border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Describe the problem</label>
                        <textarea
                          name="problem"
                          value={formData.problem}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Describe the issue in detail..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Urgency</label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                          required
                        >
                          <option>Normal</option>
                          <option>Urgent</option>
                          <option>Emergency</option>
                        </select>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Who is this booking for?
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'self', label: 'For Myself', icon: Home },
                          { value: 'other', label: 'For Someone Else', icon: User }
                        ].map(({ value, label, icon: Icon }) => (
                          <label key={value} className="cursor-pointer">
                            <input
                              type="radio"
                              name="bookingFor"
                              value={value}
                              checked={bookingFor === value}
                              onChange={(e) => setBookingFor(e.target.value)}
                              className="sr-only"
                            />
                            <div className={`p-4 rounded-xl border-2 text-center ${
                              bookingFor === value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <Icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                              <div className="font-medium text-gray-900">{label}</div>
                              <div className="text-xs text-gray-600">
                                {value === 'self' ? 'At my address' : 'Different address'}
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      {bookingFor === 'self' ? (
                        <div className="bg-blue-50 p-4 rounded-xl mt-4">
                          <div className="font-medium text-blue-900 mb-1">Service Location</div>
                          <p className="text-blue-800">{mockUser.address}</p>
                          <p className="text-blue-700 text-sm">{mockUser.city}</p>
                        </div>
                      ) : (
                        <div className="space-y-4 mt-4">
                          <input
                            name="otherName"
                            value={formData.otherName}
                            onChange={handleChange}
                            placeholder="Contact person name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                            required
                          />
                          <input
                            name="otherPhone"
                            value={formData.otherPhone}
                            onChange={handleChange}
                            placeholder="Phone number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                            required
                          />
                          <input
                            name="otherAddress"
                            value={formData.otherAddress}
                            onChange={handleChange}
                            placeholder="Service address"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                            required
                          />
                          <select
                            name="otherCity"
                            value={formData.otherCity}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                            required
                          >
                            <option value="">Select city</option>
                            {cities.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <label className="block text-sm font-medium mb-2">Preferred Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        required
                      />
                      <label className="block text-sm font-medium mb-2 mt-4">Preferred Time Slot</label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        required
                      >
                        <option value="">Select</option>
                        <option value="morning">Morning (8AM–12PM)</option>
                        <option value="afternoon">Afternoon (12PM–5PM)</option>
                        <option value="evening">Evening (5PM–8PM)</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        required
                      />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        required
                      />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        required
                      />
                    </>
                  )}

                  {/* Footer Buttons */}
                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-2.5 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50"
                      >
                        Back
                      </button>
                    )}
                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="ml-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-lg"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="ml-auto px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transform hover:scale-105 shadow-lg"
                      >
                        Submit Request
                      </button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ServiceBookingModal;
