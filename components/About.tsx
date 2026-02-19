import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto pb-20 px-4 md:px-0 text-center">
      <div className="space-y-12 animate-fade-in-up">
        
        <div className="relative w-48 h-64 md:w-64 md:h-80 mx-auto bg-stone-200 overflow-hidden shadow-lg rotate-3 hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group">
          <img 
            src="https://picsum.photos/800/1200?grayscale" 
            alt="Portrait" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-colors duration-500" />
        </div>

        <div className="space-y-8">
          <h1 className="text-3xl md:text-5xl font-display font-light leading-tight">
            Designing with purpose,<br/>clarity, and precision.
          </h1>
          
          <div className="space-y-6 text-stone-600 font-light leading-relaxed max-w-2xl mx-auto text-lg">
            <p>
              I am <span className="font-normal text-stone-900 border-b border-orange-200">Finley Hudson</span>, a multidisciplinary designer based in New York. I specialize in bridging the gap between functional utility and visual storytelling.
            </p>
            <p>
              My work is rooted in minimalism—not as an aesthetic choice, but as a method of communication. I believe that by removing the non-essential, we amplify what truly matters.
            </p>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-stone-200/60 max-w-xl mx-auto">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Services</h4>
              <ul className="space-y-2 text-stone-500 font-light">
                <li>User Interface Design</li>
                <li>Experience Strategy</li>
                <li>Brand Identity</li>
                <li>Art Direction</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Recognition</h4>
              <ul className="space-y-2 text-stone-500 font-light">
                <li>Awwwards SOTD</li>
                <li>Behance Featured</li>
                <li>Type Directors Club</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;