import React from 'react';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import heroImg from '../assets/hero_about.png';
import missionImg from '../assets/group_of_students.jpg';
import africaImg from '../assets/africa.png';
import story1Img from '../assets/image_placeholder 5.png';
import story2Img from '../assets/image_placeholder 6.png';
import story3Img from '../assets/image_placeholder 8.png';
import story4Img from '../assets/hero2.png';
import aboutImg from '../assets/image_placeholder 1.png';
import instructor1 from '../assets/instructor1.png';
import instructor2 from '../assets/instructor2.png';
import instructor3 from '../assets/instructor3.png';
import instructor4 from '../assets/instructor4.png';
import instructor5 from '../assets/instructor5.png';
import instructor6 from '../assets/instructor6.png';
import instructor7 from '../assets/instructor7.png';
import instructor8 from '../assets/instructor8.png';

const AboutPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
<section className="relative min-h-[420px] flex items-center bg-black">
  <img
    src={heroImg} // Replace with your actual image path
    alt="Charts and analytics"
    className="absolute inset-0 w-full h-full object-cover opacity-70"
  />
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
      Where African Potential<br />Meets Global Opportunity
    </h1>
    <p className="text-lg md:text-xl text-white/90 mb-2 max-w-2xl">
      We provide accessible, affordable, and practical learning for Africa's next generation of tech talent.
    </p>
  </div>
</section>

{/* Mission Section */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <img
      src={missionImg}
      alt="Group of students"
      className="rounded-lg shadow-lg w-full object-cover"
    />
    <div>
      <span className="uppercase text-xs text-gray-500 font-semibold tracking-widest mb-2 block">
        Our Mission
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Ensuring digital skills are accessible to all
      </h2>
      <p className="text-gray-700 mb-4">
        Our mission is to equip 1 million Ghanaian youth with the critical digital skills they need to thrive in today's tech-driven world.
      </p>
      <p className="text-gray-600 mb-6">
        We believe in the power of technology to transform lives — and we're committed to delivering hands-on training, mentorship, and resources so that no one is left behind.
      </p>
      <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
        Join Our Mission
      </button>
    </div>
  </div>
</section>

     {/* Global-Standard Learning Section */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Global-Standard Learning.<br />African Access.
      </h2>
      <p className="text-gray-700">
        At Uvarsity, our mission is to unlock Africa’s potential through high-quality, job-ready education designed for local realities. We offer learners across the continent affordable access to industry-aligned courses, mentorship, community support, and online-friendly tools — all built for low-data environments and flexible learning.<br /><br />
        Our commitment is simple: to make global-level digital and design education not just available in Africa, but truly accessible — regardless of background, bandwidth, or location.
      </p>
    </div>
    <img
      src={africaImg} // Replace with your actual image path
      alt="Africa map"
      className="rounded-lg shadow-lg w-full max-w-md mx-auto"
    />
  </div>
</section>

{/* Skills Opportunity Banner */}
<section className="bg-[#01F99E] py-10">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
      Skills Create Opportunity. Learning Makes It Happen.
    </h2>
    <p className="text-base md:text-lg text-black">
      Whether you’re starting from scratch, growing your team, or ready to share your expertise — Uvarsity gives you the tools to succeed. Our mission is to make learning accessible, practical, and life-changing across Africa and beyond.
    </p>
  </div>
</section>

     {/* Our Story Section */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        Our Story
      </h2>
      <p className="text-gray-700">
        "Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisi non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisi non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisi non. Ornare nisl.Lorem ipsum dolor sit amet consectetur. Aliquam vitae vulputate vitae id mauris odio pharetra nisi non. Ornare nisl."
      </p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <img
        src={story1Img}
        alt="Story 1"
        className="rounded-lg object-cover w-full h-32 md:h-36"
      />
      <img
        src={story2Img}
        alt="Story 2"
        className="rounded-lg object-cover w-full h-32 md:h-36"
      />
      <img
        src={story3Img}
        alt="Story 3"
        className="rounded-lg object-cover w-full h-32 md:h-36"
      />
      <img
        src={story4Img}
        alt="Story 4"
        className="rounded-lg object-cover w-full h-32 md:h-36"
      />
    </div>
  </div>
</section>
{/* Instructors & Mentors Section */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <span className="uppercase text-xs text-primary-600 font-semibold tracking-widest mb-2 block">
      Meet Our Instructors & Mentors
    </span>
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
      Highly skilled in Real Life
    </h2>
    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
      Learn from experienced professionals who guide you with real-world insights, practical feedback, and local industry knowledge — every step of the way.
    </p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
      {[
          instructor1,
    instructor2,
    instructor3,
    instructor4,
    instructor5,
    instructor6,
    instructor7,
    instructor8
      ].map((img, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-[#8B2CF5] rounded-t-lg rounded-b-none w-32 h-32 flex items-center justify-center mb-2">
            <img
              src={img}
              alt={`Instructor ${idx + 1}`}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <div className="bg-[#8B2CF5] rounded-b-lg w-32 py-2">
            <p className="text-white font-semibold text-sm">Person</p>
            <p className="text-purple-200 text-xs">Role</p>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-4 px-6 py-2 border border-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
      SEE ALL INSTRUCTORS &rarr;
    </button>
  </div>
</section>
{/* Our Approach Section */}
<section className="bg-white py-16">
  <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
    {/* Approach Features */}
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        Our Approach
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Feature 1 */}
        <div className="flex items-start">
          <div className="w-[8px] h-[88px] bg-[#01F99E] mr-4 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Hybrid Learning Model</h3>
            <p className="text-gray-600 text-sm">
              Learn online or offline with live sessions, downloads, and self-paced study — your choice, your pace.
            </p>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="flex items-start">
          <div className="w-[8px] h-[88px] bg-[#01F99E] mr-4 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Job-Ready Learning Pathways</h3>
            <p className="text-gray-600 text-sm">
              Complete a course track and get matched to internships or jobs — with support to build your portfolio.
            </p>
          </div>
        </div>
        {/* Feature 3 */}
        <div className="flex items-start">
          <div className="w-[8px] h-[88px] bg-[#01F99E] mr-4 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Real-World Project Learning</h3>
            <p className="text-gray-600 text-sm">
              Apply what you learn through hands-on projects that prepare you for real industry tasks.
            </p>
          </div>
        </div>
        {/* Feature 4 */}
        <div className="flex items-start">
      <div className="w-[8px] h-[88px] bg-[#01F99E] mr-4 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Track Your Progress</h3>
            <p className="text-gray-600 text-sm">
              Use your personalized dashboard to monitor skills, certificates, and course completion.
            </p>
          </div>
        </div>
        {/* Feature 5 */}
        <div className="flex items-start">
         <div className="w-[8px] h-[88px] bg-[#01F99E] mr-4 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Built for African Learners</h3>
            <p className="text-gray-600 text-sm">
              Content is localized and relevant to African learning contexts.
            </p>
          </div>
        </div>
        {/* Feature 6 */}
        <div className="flex items-start">
          <div className="w-[8px] h-[88px] bg-[#01F99E] mr-4 flex-shrink-0"></div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Designed for Low Data Use</h3>
            <p className="text-gray-600 text-sm">
              Access low-bandwidth videos, downloadable lessons, and sync progress offline.
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Approach Image */}
    <div className="flex justify-center items-stretch">
  <img
    src={aboutImg}
    alt="Student at desk"
    className="w-[448px] h-full rounded-[16px] object-cover shadow-lg"
  />
</div>
  </div>
</section>
<Footer/>
    </div>
  );
};

export default AboutPage;