// components/ServiceBookingModal.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const ServiceBookingModal = ({ serviceType, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    problem: '',
    urgency: 'Normal',
    location: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  const handleSubmit = () => {
    console.log('Booking Data:', formData);
    alert('Service request submitted!');
    onClose();
  };

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
         <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="mb-4">
                  <Dialog.Title className="text-xl font-semibold">
                    Request Service
                  </Dialog.Title>
                  <div className="flex gap-2 mt-3 justify-center">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          n <= step
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                </div>

                {step === 1 && (
                  <>
                    <label className="block font-semibold mb-1">Service Type</label>
                    <select
                      disabled
                      className="w-full border px-4 py-2 rounded mb-4 bg-gray-100 text-gray-600"
                      value={serviceType}
                    >
                      <option>{serviceType}</option>
                    </select>

                    <label className="block font-semibold mb-1">Describe the problem</label>
                    <textarea
                      name="problem"
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded mb-4"
                      placeholder="Please describe what needs to be done..."
                    />

                    <label className="block font-semibold mb-1">Urgency</label>
                    <select
                      name="urgency"
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded mb-4"
                    >
                      <option>Normal (within a week)</option>
                      <option>Urgent (1-2 days)</option>
                      <option>Emergency (today)</option>
                    </select>
                  </>
                )}

                {step === 2 && (
                  <>
                    <label className="block font-semibold mb-1">Service Location</label>
                    <input
                      name="location"
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded mb-4"
                      placeholder="Enter your address or area"
                    />

                    <label className="block font-semibold mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded mb-4"
                    />

                    <label className="block font-semibold mb-1">Preferred Time</label>
                    <select
                      name="time"
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded mb-4"
                    >
                      <option>Select time</option>
                      <option>Morning (9am - 12pm)</option>
                      <option>Afternoon (12pm - 4pm)</option>
                      <option>Evening (4pm - 7pm)</option>
                    </select>
                  </>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <p><strong>Service:</strong> {serviceType}</p>
                    <p><strong>Problem:</strong> {formData.problem}</p>
                    <p><strong>Urgency:</strong> {formData.urgency}</p>
                    <p><strong>Location:</strong> {formData.location}</p>
                    <p><strong>Date:</strong> {formData.date}</p>
                    <p><strong>Time:</strong> {formData.time}</p>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {step > 1 ? (
                    <button
                      onClick={handleBack}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                  {step < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ServiceBookingModal;
