import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Work);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayPage, setDisplayPage] = useState<Page>(Page.Work);

  // Handle page transitions with a smoother delay
  const handleNavigate = (page: Page) => {
    if (page === currentPage) return;
    
    setIsTransitioning(true);
    
    // Wait for exit animation
    setTimeout(() => {
      setCurrentPage(page);
      setDisplayPage(page);
      
      // Allow DOM update then start entry animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 500); // Matches exit duration
  };

  const renderPage = () => {
    switch (displayPage) {
      case Page.Work: return <Work />;
      case Page.About: return <About />;
      case Page.Contact: return <Contact />;
      default: return <Work />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto relative bg-stone-50 overflow-hidden">
      <Navigation activePage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1 w-full px-4 md:px-0 mt-8 md:mt-12 mx-auto max-w-6xl">
        <div 
          className={`transform transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isTransitioning 
              ? 'opacity-0 translate-y-12 scale-95 blur-sm' 
              : 'opacity-100 translate-y-0 scale-100 blur-0'
          }`}
        >
          {renderPage()}
        </div>
      </main>

      <footer className="py-12 flex justify-center items-center text-[10px] uppercase tracking-[0.2em] text-stone-300 mt-auto">
        <span>© {new Date().getFullYear()} Finley Hudson</span>
      </footer>
    </div>
  );
};

export default App;