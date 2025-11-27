import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import usePageTitle from "../hooks/userPageTitle";

const Contact = () => {
  usePageTitle('Contact Support')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    console.log("Message sent:", formData);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-indigo-900 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-indigo-200 text-lg max-w-2xl mx-auto"
        >
          Have questions about our products, orders, or just want to say hello?
          We'd love to hear from you.
        </motion.p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        {/* Left Column: Contact Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm">+880 1234 567 890</p>
              <p className="text-gray-500 text-xs mt-1">Mon-Fri, 9am-6pm</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">support@aaroshop.com</p>
              <p className="text-gray-500 text-xs mt-1">24/7 Support</p>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full shrink-0 flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Our Headquarters</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pirshaheb Bari, Narinda,
                <br />
                Dhaka 1100, Bangladesh.
              </p>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 bg-gray-200 rounded-2xl overflow-hidden relative group">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.0223752855995!2d90.41742307605041!3d23.71089499029044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900210667d1%3A0x6b83ec3f00b98aff!2sNarinda%20Peer%20Shaheb%20Bari!5e0!3m2!1sen!2sbd!4v1764237521456!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="filter grayscale group-hover:grayscale-0 transition duration-500"
            ></iframe>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MessageSquare className="text-indigo-600" /> Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Order #12345 Issue"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Send size={18} /> Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* FAQ Mini Section */}
      <section className="bg-white py-16 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              {
                q: "Do you ship internationally?",
                a: "Currently, we only ship within Bangladesh.",
              },
              {
                q: "What is your return policy?",
                a: "You can return items within 7 days of delivery if they are unworn.",
              },
              {
                q: "How can I track my order?",
                a: "Log in to your account and visit the 'My Orders' section in your profile.",
              },
              {
                q: "Can I change my order after placing it?",
                a: "Please contact us within 2 hours of placing your order.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
