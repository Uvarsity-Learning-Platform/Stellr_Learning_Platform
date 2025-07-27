import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Target, Heart, Globe, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="src/assets/about-hero.png"
            alt="Analytics dashboard"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Where African Potential
              <br />
              Meets Global
              <br />
              Opportunity
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              We provide accessible, affordable, and practical learning opportunities for the 
              next generation of tech talent.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="src/assets/about-hero-1.png"
                alt="Diverse group of students"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">OUR MISSION</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
                Ensuring digital skills are accessible to all
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our mission is to equip African youth and professionals with the 
                critical digital skills they need to thrive in today's fast-driven 
                world.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We believe in the power of technology to transform lives, 
                communities, and economies. Through our comprehensive courses, 
                mentorship, and resources so that one is left behind.
              </p>
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Learning Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Global-Standard Learning.
                <br />
                African Access.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Uvarsity, our mission is to unlock Africa's potential through 
                high-quality, job-ready education designed for local 
                contexts and global opportunities.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We bridge the gap between ambition and achievement by providing 
                support and offering flexible tools - all built for our digital 
                environment and thriving learners.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join thousands of Africans who have gained most digital and 
                technical skills and job availability in Africa but have 
                companies - regardless of the financial backgrounds or 
                location.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img 
                    src="src/assets/about-hero-2.png" 
                    alt="Africa Map Placeholder" 
                    className="w-80 h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Green CTA Section */}
      <section className="bg-green-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-4">
            Skills Create Opportunity. Learning Makes It Happen.
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-4xl mx-auto">
            Whether you're aiming to land your dream career, start or scale a business, or leadership position, changing 
            your life has never been easier. Our comprehensive courses and portfolio tracks helping 
            across Africa and beyond.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisci velit earum consequatur expedita sunt 
                  necessitatibus odit et magni dolores eos qui ratione. Excepteur sint occaecat cupidatat non
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisci velit earum consequatur expedita sunt 
                  necessitatibus odit et magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                  quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisci velit earum consequatur expedita sunt 
                  necessitatibus odit et magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                  quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisci velit earum consequatur expedita sunt 
                  necessitatibus odit et magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
                  quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit earum 
                  consequatur expedita sunt necessitatibus odit et magni dolores eos qui ratione voluptatem sequi
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <img 
                src="src/assets/about-hero-3.png"
                alt="Woman working on laptop"
                className="rounded-lg shadow-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="src/assets/about-hero-4.png"
                  alt="Professional man"
                  className="rounded-lg shadow-lg"
                />
                <img 
                  src="src/assets/about-hero-5.png"
                  alt="Professional woman"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">Meet Our Instructors & Mentors</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">
              Highly skilled in Real Life
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from experienced professionals who bring practical real-world insights from top multinationals 
              and companies to power your path forward to the very top.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {[
              { name: 'Perpetua S', role: 'Instructor' },
              { name: 'Theresa', role: 'Instructor' },
              { name: 'Benjamin', role: 'Instructor' },
              { name: 'Perpetua', role: 'Instructor' },
              { name: 'Perpetua', role: 'Instructor' },
              { name: 'Theresa', role: 'Instructor' },
              { name: 'Michael', role: 'Instructor' },
              { name: 'Jessica', role: 'Instructor' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-purple-600 rounded-lg mb-4 mx-auto flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-gray-400 transition-colors">
              SEE ALL INSTRUCTORS →
            </button>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Join our global community and start learning today!
          </h2>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Register
          </button>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">OUR APPROACH</span>
              
              <div className="space-y-8 mt-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hybrid Learning Model</h3>
                  <p className="text-gray-600">
                    Learn online by offering self-care guidance, experiences, and flexible 
                    Learning opportunities on time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Real-World Project Learning</h3>
                  <p className="text-gray-600">
                    Apply what you learn through hands-on projects that mirror real-world challenges.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Built for African Learners</h3>
                  <p className="text-gray-600">
                    Courses are localized, curriculum optimized for local internet speeds and designed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Job-Ready Learning Pathways</h3>
                  <p className="text-gray-600">
                    Our courses align with in-demand jobs with support to launch your professional career.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Track Your Progress</h3>
                  <p className="text-gray-600">
                    Use your personalized dashboard to monitor your learning journey and track completion.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Designed for Love Data like Africa</h3>
                  <p className="text-gray-600">
                    All courses can be desktop, mobile compatible with efficient use.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional working"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;