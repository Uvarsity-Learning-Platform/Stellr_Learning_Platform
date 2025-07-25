import React, { useState, useEffect } from 'react';
import Header from '../components/landing/Header';
import MobileMenu from '../components/landing/MobileMenu';
import HeroSection from '../components/landing/HeroSection';
import WhatMakesUsDifferent from '../components/landing/WhatMakesUsDifferent';
import CoursesSection from '../components/landing/CoursesSection';
import CommunitySupport from '../components/landing/CommunitySupport';
import LearningToEarning from '../components/landing/LearningToEarning';
import Testimonials from '../components/landing/Testimonials';
import BecomeTutor from '../components/landing/BecomeTutor';
import Footer from '../components/landing/Footer';

const LandingPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [courses] = useState<unknown[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const coursePlaceholders = Array(6).fill(null).map((_, index) => ({ id: index + 1, isPlaceholder: true }));
  useEffect(() => { setTimeout(() => { setIsLoadingCourses(false); }, 1000); }, []);
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {isMobileMenuOpen && <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />}
      <HeroSection />
      <WhatMakesUsDifferent />
      <CoursesSection isLoadingCourses={isLoadingCourses} courses={courses} coursePlaceholders={coursePlaceholders} />
      <CommunitySupport />
      <LearningToEarning />
      <Testimonials />
      <BecomeTutor />
      <Footer />
    </div>
  );
};

export default LandingPage;