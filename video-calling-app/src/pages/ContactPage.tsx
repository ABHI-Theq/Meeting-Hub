import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, Star, Zap, Shield } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("Message sent successfully! We'll get back to you soon.");

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />, title: 'Email Us', content: 'support@meetinghub.com', description: 'Send us an email anytime', color: 'from-purple-400 to-pink-400'
    },
    {
      icon: <Phone className="w-6 h-6" />, title: 'Call Us', content: '+1 (555) 123-4567', description: '24/7 support hotline', color: 'from-blue-400 to-cyan-400'
    },
    {
      icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', content: '123 Tech Street, Silicon Valley, CA 94000', description: 'Our headquarters', color: 'from-indigo-400 to-purple-400'
    },
    {
      icon: <Clock className="w-6 h-6" />, title: 'Business Hours', content: 'Mon-Fri: 9AM-6PM PST', description: "We're here to help", color: 'from-teal-400 to-blue-400'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-white" />, title: 'Lightning Fast Response', description: 'Average response time under 2 hours', color: 'from-yellow-400 to-orange-400'
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />, title: '24/7 Support', description: 'Round-the-clock assistance', color: 'from-green-400 to-teal-400'
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />, title: 'Global Coverage', description: 'Support in 15+ languages', color: 'from-purple-400 to-pink-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#2d1b5c] to-[#4d3b7a] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 bg-purple-500 blur-[40px] animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 bg-blue-500 blur-[40px] animate-float-reverse"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full opacity-15 bg-pink-500 blur-[30px] animate-float"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent">Get In Touch</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">Have questions about Meeting Hub? Need technical support? Want to share feedback? We're here to help you connect better in the digital frontier.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="rounded-2xl p-6 text-center bg-white/5 backdrop-blur border border-white/10 shadow-md hover:bg-white/10 hover:border-white/20 transition">
              <div className={`bg-gradient-to-r ${info.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-white`}>{info.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{info.title}</h3>
              <p className="text-white/90 font-semibold mb-2">{info.content}</p>
              <p className="text-white/60 text-sm">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Your full name" className="w-full rounded-xl py-3 px-4 text-white font-medium placeholder:text-white/50 bg-white/5 backdrop-blur border border-white/10 focus:bg-white/10 focus:border-purple-500 focus:shadow-lg outline-none transition" />
                </div>
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="your@email.com" className="w-full rounded-xl py-3 px-4 text-white font-medium placeholder:text-white/50 bg-white/5 backdrop-blur border border-white/10 focus:bg-white/10 focus:border-purple-500 focus:shadow-lg outline-none transition" />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full rounded-xl py-3 px-4 text-white font-medium bg-white/5 backdrop-blur border border-white/10 focus:bg-white/10 focus:border-purple-500 focus:shadow-lg outline-none transition">
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Pricing</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Subject *</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="Brief description of your inquiry" className="w-full rounded-xl py-3 px-4 text-white font-medium placeholder:text-white/50 bg-white/5 backdrop-blur border border-white/10 focus:bg-white/10 focus:border-purple-500 focus:shadow-lg outline-none transition" />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={6} placeholder="Tell us more about your inquiry..." className="w-full rounded-xl py-3 px-4 text-white font-medium placeholder:text-white/50 bg-white/5 backdrop-blur border border-white/10 focus:bg-white/10 focus:border-purple-500 focus:shadow-lg outline-none resize-none transition"></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="group w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed transition hover:shadow-lg">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 shadow-md">
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Support?</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`bg-gradient-to-r ${feature.color} p-2 rounded-xl`}>{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                      <p className="text-white/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 shadow-md">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Answers</h3>
              <div className="space-y-4">
                {['How do I create a meeting room?', 'Is Meeting Hub free to use?', 'What browsers are supported?'].map((q, i) => (
                  <details key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 group">
                    <summary className="text-white font-medium cursor-pointer list-none flex items-center justify-between">
                      {q}<span className="text-white/60 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="text-white/70 mt-3 pt-3 border-t border-white/20">
                      {i === 0 && 'Simply click "Create Meeting Room" on your dashboard. You\'ll get a unique room ID that you can share with participants.'}
                      {i === 1 && 'Yes! Meeting Hub offers a free tier with unlimited meetings. Premium features are available for advanced users.'}
                      {i === 2 && 'Meeting Hub works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.'}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-3xl p-8 border border-white/10 shadow-md text-center">
              <div className="flex justify-center items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">4.9/5 Customer Rating</h3>
              <p className="text-white/70">Based on 10,000+ reviews from satisfied users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;