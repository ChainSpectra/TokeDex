import React, { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';

// Lazy load heavy sections
const FeaturesSection = lazy(() => import('./components/sections/FeaturesSection'));
const ArchitectureSection = lazy(() => import('./components/sections/ArchitectureSection'));
const PartnersSection = lazy(() => import('./components/sections/PartnersSection'));
const TokenomicsSection = lazy(() => import('./components/sections/TokenomicsSection'));
const RoadmapSection = lazy(() => import('./components/sections/RoadmapSection'));
const CTASection = lazy(() => import('./components/sections/CTASection'));

function App() {
  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        <HeroSection />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        }>
          <FeaturesSection />
          <ArchitectureSection />
          <PartnersSection />
          <TokenomicsSection />
          <RoadmapSection />
          <CTASection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
