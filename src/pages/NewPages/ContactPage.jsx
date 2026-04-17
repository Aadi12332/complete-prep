import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    setForm({ name: '', email: '', title: '', message: '' });
  };

  return (
    <>
      <div className="mainMaxWidth">
        <Header />

        <div className="px-3 md:px-6 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Contact Us 📩
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions, feedback, or need help? We’d love to hear from you. Fill out the form below and our team will get back to you soon.
              </p>
            </div>

           <div className="grid md:grid-cols-2 gap-10">
  <div className="space-y-6">
    <div className="border border-gray-300 rounded-lg p-4 flex gap-4 items-start">
      <img
        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
        className="w-10 h-10"
      />
      <div>
        <h3 className="text-xl font-semibold mb-1">Address</h3>
        <p className="text-gray-600 text-sm">
          India <br />
          Available for remote communication and support worldwide.
        </p>
      </div>
    </div>

    <div className="border border-gray-300 rounded-lg p-4 flex gap-4 items-start">
      <img
        src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
        className="w-10 h-10"
      />
      <div>
        <h3 className="text-xl font-semibold mb-1">Email</h3>
        <p className="text-gray-600 text-sm">
          support@semprep.com <br />
          Reach out for queries, feedback, or support anytime.
        </p>
      </div>
    </div>

    <div className="border border-gray-300 rounded-lg p-4 flex gap-4 items-start">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1827/1827279.png"
        className="w-10 h-10"
      />
      <div>
        <h3 className="text-xl font-semibold mb-1">Response Time</h3>
        <p className="text-gray-600 text-sm">
          We usually respond within 24 hours. Our team ensures quick and helpful support.
        </p>
      </div>
    </div>
  </div>

  <form
    onSubmit={handleSubmit}
    className="border rounded-lg p-6 space-y-4"
  >
    <div>
      <input
        type="text"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
          setErrors((prev) => ({ ...prev, name: "" }));
        }}
        className="w-full border rounded-lg px-3 py-2 outline-none"
      />
      {errors.name && (
        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
      )}
    </div>

    <div>
      <input
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        className="w-full border rounded-lg px-3 py-2 outline-none"
      />
      {errors.email && (
        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
      )}
    </div>

    <div>
      <input
        type="text"
        placeholder="Subject / Title"
        value={form.title}
        onChange={(e) => {
          setForm({ ...form, title: e.target.value });
          setErrors((prev) => ({ ...prev, title: "" }));
        }}
        className="w-full border rounded-lg px-3 py-2 outline-none"
      />
      {errors.title && (
        <p className="text-xs text-red-500 mt-1">{errors.title}</p>
      )}
    </div>

    <div>
      <textarea
        rows={4}
        placeholder="Your Message"
        value={form.message}
        onChange={(e) => {
          setForm({ ...form, message: e.target.value });
          setErrors((prev) => ({ ...prev, message: "" }));
        }}
        className="w-full border rounded-lg px-3 py-2 outline-none"
      />
      {errors.message && (
        <p className="text-xs text-red-500 mt-1">{errors.message}</p>
      )}
    </div>

    <button
      type="submit"
      className="w-full py-3 bg-black text-white rounded-lg font-medium hover:opacity-90"
    >
      Submit
    </button>
  </form>
</div>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl text-center w-[300px]">
            <h3 className="text-lg font-semibold mb-2">
              Submitted Successfully 🎉
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Thank you for reaching out. We’ll get back to you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ContactPage;