import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import { WhyChooseUs } from '../components/layout/WhyChooseUs';
import { CTASection } from '../components/layout/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}