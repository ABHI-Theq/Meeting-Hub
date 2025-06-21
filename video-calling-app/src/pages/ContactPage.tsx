import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, Star, Zap, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

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

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success('Message sent successfully! We\'ll get back to you soon.', {
      style: {
        background: '#10B981',
        color: 'white',
      },
    });

    // Reset form
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
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'support@meetinghub.com',
      description: 'Send us an email anytime',
      color: 'text-synthwave-pink'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: '24/7 support hotline',
      color: 'text-synthwave-cyan'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      content: '123 Tech Street, Silicon Valley, CA 94000',
      description: 'Our headquarters',
      color: 'text-synthwave-purple'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      content: 'Mon-Fri: 9AM-6PM PST',
      description: 'We\'re here to help',
      color: 'text-synthwave-blue'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast Response',
      description: 'Average response time under 2 hours',
      color: 'text-synthwave-cyan'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance',
      color: 'text-synthwave-pink'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Coverage',
      description: 'Support in 15+ languages',
      color: 'text-synthwave-purple'
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-synthwave-pink/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-synthwave-cyan/10 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-synthwave-purple/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-synthwave-pink via-synthwave-purple to-synthwave-cyan bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about Meeting Hub? Need technical support? Want to share feedback? 
            We're here to help you connect better in the digital frontier.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="card bg-base-100/30 backdrop-blur-lg border border-synthwave-pink/20 hover:border-synthwave-pink/50 transition-all duration-300 hover:scale-105">
              <div className="card-body text-center py-8">
                <div className={`${info.color} mb-4 flex justify-center`}>
                  {info.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{info.title}</h3>
                <p className={`${info.color} font-semibold mb-2`}>{info.content}</p>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="card bg-gradient-to-br from-base-100/20 to-base-100/5 backdrop-blur-lg border border-synthwave-pink/30">
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-8 h-8 text-synthwave-pink" />
                <h2 className="text-3xl font-bold text-white">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-base-200/50 border-2 border-base-content/20 focus:border-synthwave-pink focus:bg-base-100 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-synthwave-pink/20 placeholder:text-base-content/50"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-base-200/50 border-2 border-base-content/20 focus:border-synthwave-cyan focus:bg-base-100 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-synthwave-cyan/20 placeholder:text-base-content/50"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-base-200/50 border-2 border-base-content/20 focus:border-synthwave-purple focus:bg-base-100 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-synthwave-purple/20"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing & Pricing</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-base-200/50 border-2 border-base-content/20 focus:border-synthwave-pink focus:bg-base-100 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-synthwave-pink/20 placeholder:text-base-content/50"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-base-200/50 border-2 border-base-content/20 focus:border-synthwave-cyan focus:bg-base-100 rounded-xl py-3 px-4 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-synthwave-cyan/20 placeholder:text-base-content/50 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full bg-gradient-to-r from-synthwave-pink to-synthwave-purple hover:from-synthwave-pink-focus hover:to-synthwave-purple-focus text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-synthwave-pink/25 flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
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
          </div>

          {/* Support Features & FAQ */}
          <div className="space-y-8">
            {/* Support Features */}
            <div className="card bg-gradient-to-br from-base-100/20 to-base-100/5 backdrop-blur-lg border border-synthwave-cyan/30">
              <div className="card-body p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Support?</h3>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`${feature.color} mt-1`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
                        <p className="text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="card bg-gradient-to-br from-base-100/20 to-base-100/5 backdrop-blur-lg border border-synthwave-purple/30">
              <div className="card-body p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Answers</h3>
                <div className="space-y-4">
                  <div className="collapse collapse-plus bg-base-100/20 border border-synthwave-pink/20">
                    <input type="radio" name="faq-accordion" defaultChecked />
                    <div className="collapse-title text-white font-medium">
                      How do I create a meeting room?
                    </div>
                    <div className="collapse-content text-gray-300">
                      <p>Simply click "Create Meeting Room" on your dashboard. You'll get a unique room ID that you can share with participants.</p>
                    </div>
                  </div>

                  <div className="collapse collapse-plus bg-base-100/20 border border-synthwave-cyan/20">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-white font-medium">
                      Is Meeting Hub free to use?
                    </div>
                    <div className="collapse-content text-gray-300">
                      <p>Yes! Meeting Hub offers a free tier with unlimited meetings. Premium features are available for advanced users.</p>
                    </div>
                  </div>

                  <div className="collapse collapse-plus bg-base-100/20 border border-synthwave-purple/20">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-white font-medium">
                      What browsers are supported?
                    </div>
                    <div className="collapse-content text-gray-300">
                      <p>Meeting Hub works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Rating */}
            <div className="card bg-gradient-to-r from-synthwave-pink/10 via-synthwave-purple/10 to-synthwave-cyan/10 backdrop-blur-lg border border-synthwave-pink/30">
              <div className="card-body text-center py-8">
                <div className="flex justify-center items-center space-x-1 text-synthwave-cyan mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">4.9/5 Customer Rating</h3>
                <p className="text-gray-300">Based on 10,000+ reviews from satisfied users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;