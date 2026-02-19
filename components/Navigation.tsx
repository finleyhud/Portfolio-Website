import React from 'react';
import { Page } from '../types';

interface NavigationProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="w-full flex flex-col items-center py-12 px-6 select-none space-y-8 animate-fade-in z-50 relative">
      <div 
        className="text-3xl md:text-4xl font-display font-bold tracking-tight cursor-pointer hover:text-orange-600 transition-colors duration-300"
        onClick={() => onNavigate(Page.Work)}
      >
        FINLEY HUDSON
      </div>

      <div className="flex gap-12 md:gap-16">
        {Object.values(Page).map((page) => (
          <button
            key={page}
            onClick={() => onNavigate(page)}
            className={`text-sm uppercase tracking-[0.2em] transition-all duration-500 relative group py-2 ${
              activePage === page ? 'text-stone-900' : 'text-stone-400 hover:text-orange-600'
            }`}
          >
            {page}
            <span 
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transform transition-all duration-500 ${
                activePage === page ? 'bg-orange-600 opacity-100 scale-100' : 'bg-stone-900 opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-75'
              }`} 
            />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;