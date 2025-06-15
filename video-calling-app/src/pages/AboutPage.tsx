import React from 'react';
import { Zap, Shield, Users, Globe, Star, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Performance',
      description: 'Ultra-low latency with cutting-edge WebRTC technology',
      color: 'text-synthwave-cyan'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Military-Grade Security',
      description: 'End-to-end encryption protects your conversations',
      color: 'text-synthwave-pink'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Unlimited Participants',
      description: 'Scale from 1-on-1 to massive conferences seamlessly',
      color: 'text-synthwave-purple'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Infrastructure',
      description: 'Servers worldwide ensure optimal connection quality',
      color: 'text-synthwave-blue'
    }
  ];

  const stats = [
    { number: '10M+', label: 'Active Users', color: 'text-synthwave-pink' },
    { number: '99.9%', label: 'Uptime', color: 'text-synthwave-cyan' },
    { number: '150+', label: 'Countries', color: 'text-synthwave-purple' },
    { number: '5★', label: 'Rating', color: 'text-synthwave-blue' }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-synthwave-pink via-synthwave-purple to-synthwave-cyan bg-clip-text text-transparent">
            About SynthWave Meet
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing video conferencing by combining retro-futuristic aesthetics with 
            cutting-edge technology. Our platform brings people together in the digital frontier 
            with style, security, and unmatched performance.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="card bg-base-100/30 backdrop-blur-lg border border-synthwave-pink/20 hover:border-synthwave-pink/50 transition-all duration-300 hover:scale-105">
                <div className="card-body py-6">
                  <h3 className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.number}
                  </h3>
                  <p className="text-gray-300 text-sm md:text-base">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Why Choose SynthWave Meet?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="card bg-gradient-to-br from-base-100/20 to-base-100/5 backdrop-blur-lg border border-synthwave-pink/20 hover:border-synthwave-pink/50 transition-all duration-300 hover:scale-105">
                <div className="card-body">
                  <div className={`${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title text-white text-xl mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="card bg-gradient-to-r from-synthwave-pink/10 via-synthwave-purple/10 to-synthwave-cyan/10 backdrop-blur-lg border border-synthwave-pink/30 max-w-4xl mx-auto mb-16">
          <div className="card-body text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-synthwave-pink mb-6" />
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              To create meaningful connections in the digital age by providing a video conferencing 
              platform that doesn't just work—it inspires. We believe communication should be 
              beautiful, secure, and accessible to everyone, everywhere.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Built by Visionaries
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Our team of passionate developers, designers, and engineers work tirelessly to push 
            the boundaries of what's possible in video communication. We're not just building 
            software—we're crafting the future of human connection.
          </p>
          
          <div className="flex justify-center items-center space-x-2 text-synthwave-cyan">
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <Star className="w-5 h-5 fill-current" />
            <span className="ml-2 text-gray-300">Rated 5/5 by our community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;