import React, { useRef, useEffect, useState } from 'react';
import { PROJECTS, CATEGORY_COVERS } from '../constants';
import { ProjectCategory } from '../types';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const CATEGORIES = Object.values(ProjectCategory).map(cat => ({
  id: cat,
  title: cat,
  image: CATEGORY_COVERS[cat]
}));

// Tripled list for seamless looping (Start, Middle, End)
const CAROUSEL_ITEMS = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

const Work: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Auto-scroll and Scaling Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const container = scrollContainerRef.current;
      
      // Exit if container or items don't exist
      if (!container || !itemRefs.current[0] || selectedCategory) return;

      // --- 1. CALCULATE DIMENSIONS ---
      // We calculate the exact width of a single item + its margins to know the exact width of "One Set"
      const firstItem = itemRefs.current[0];
      const style = window.getComputedStyle(firstItem);
      const itemWidth = firstItem.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      
      const singleSetWidth = itemWidth * CATEGORIES.length;
      
      // We also need the padding of the container to know where content actually starts visually
      const containerStyle = window.getComputedStyle(container);
      const paddingLeft = parseFloat(containerStyle.paddingLeft);

      // --- 2. INFINITE LOOP LOGIC ---
      // We loop between the start of Set 2 and the Start of Set 3.
      // Set 1 is "buffer" to the left. Set 3 is "buffer" to the right.
      // The "Active Zone" is perfectly in the middle (Set 2).
      const startOfSet2 = paddingLeft + singleSetWidth;
      const startOfSet3 = paddingLeft + (singleSetWidth * 2);

      // Initialize Position on first run
      if (!isInitialized) {
          container.scrollLeft = startOfSet2;
          setIsInitialized(true);
          // Don't animate this frame to allow snap
          animationFrameId = requestAnimationFrame(animate);
          return;
      }

      // Move
      if (!isHovered) {
        container.scrollLeft += 1.5; // Slightly faster for smoother feel
      }

      // Loop Reset
      // If we go past Set 2 (into Set 3), snap back to start of Set 2
      if (container.scrollLeft >= startOfSet3) {
        const overshoot = container.scrollLeft - startOfSet3;
        container.scrollLeft = startOfSet2 + overshoot;
      } 
      // If we go before Set 2 (into Set 1 - e.g. user drags left), snap forward to end of Set 2
      else if (container.scrollLeft < startOfSet2) {
        const undershoot = startOfSet2 - container.scrollLeft;
        container.scrollLeft = startOfSet3 - undershoot;
      }

      // --- 3. CENTER SCALING EFFECT ---
      const containerCenter = container.offsetWidth / 2;
      const containerRect = container.getBoundingClientRect();

      itemRefs.current.forEach((item) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        
        // Calculate center of item relative to the container's viewport
        const itemCenter = (itemRect.left - containerRect.left) + (itemRect.width / 2);
        const distance = Math.abs(containerCenter - itemCenter);
        
        // Normalize distance based on container width
        // Distance of 0 means item is in center. 
        // Distance of containerWidth/2 means item is at edge.
        const maxDistance = container.offsetWidth / 2;
        let normalized = distance / maxDistance;
        if (normalized > 1) normalized = 1;

        // Easing the normalization for a more curve-like effect
        // const ease = 1 - Math.pow(1 - normalized, 3); // Cubic ease out

        // Scale: Center = 1.1, Edges = 0.8
        const scale = 1.1 - (normalized * 0.3); 
        // Opacity: Center = 1, Edges = 0.4
        const opacity = 1 - (normalized * 0.6);
        // Blur: Center = 0, Edges = 4px
        const blur = normalized * 3;
        // Z-Index: Center items on top
        const zIndex = Math.round((1 - normalized) * 100);

        item.style.transform = `scale(${scale})`;
        item.style.opacity = `${opacity}`;
        item.style.filter = `blur(${blur}px)`;
        item.style.zIndex = `${zIndex}`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, selectedCategory, isInitialized]);

  const handleCategoryClick = (category: ProjectCategory) => {
    setIsTransitioning(true);
    setTimeout(() => {
        setSelectedCategory(category);
        setIsTransitioning(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
        setSelectedCategory(null);
        setIsTransitioning(false);
    }, 500);
  };

  const currentProjects = selectedCategory 
    ? PROJECTS.filter(p => p.category === selectedCategory) 
    : [];

  // Carousel View
  if (!selectedCategory && !isTransitioning) {
    return (
      <div className="w-full h-[75vh] flex items-center justify-center animate-fade-in relative overflow-hidden">
        {/* Carousel Container */}
        <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto overflow-y-hidden items-center no-scrollbar w-full h-full px-[50vw]"
            style={{ scrollBehavior: 'auto' }} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {CAROUSEL_ITEMS.map((item, index) => (
                <div 
                    key={`${item.id}-${index}`}
                    ref={(el) => { itemRefs.current[index] = el }}
                    onClick={() => handleCategoryClick(item.id)}
                    className="flex-shrink-0 w-[300px] md:w-[400px] lg:w-[450px] aspect-[3/4] mx-6 md:mx-10 cursor-pointer relative will-change-transform"
                >
                    {/* Inner Content Card */}
                    <div className="w-full h-full relative overflow-hidden bg-stone-200 shadow-2xl rounded-sm group">
                         <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover filter grayscale contrast-75 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                        />
                         <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-orange-900/10 transition-colors duration-500" />
                        
                        {/* 
                           Updated Padding: 
                           px-10 md:px-14 ensures text stays away from edges even when scaled up.
                           pb-16 md:pb-24 lifts the text higher up the card.
                        */}
                        <div className="absolute inset-0 flex flex-col justify-end px-10 pb-16 md:px-14 md:pb-24">
                             <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter drop-shadow-lg transition-transform duration-500">
                                {item.title}
                             </h2>
                             <div className="h-1 w-0 group-hover:w-24 bg-orange-500 mt-6 transition-all duration-500 ease-out" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    );
  }

  // Grid View (or transition state)
  return (
    <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Header with Back Button */}
      <div className="mb-12 flex items-center justify-between">
         <button 
            onClick={handleBack}
            className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-400 hover:text-orange-600 transition-colors"
         >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Categories</span>
         </button>
         
         <h2 className="text-2xl font-display font-bold text-stone-900">{selectedCategory}</h2>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
         {currentProjects.map((project, index) => (
            <div
                key={project.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
            >
                <div className="relative overflow-hidden aspect-[4/3] bg-stone-200 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 filter grayscale contrast-[0.9] group-hover:grayscale-0 group-hover:contrast-100"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                       <div className="transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 bg-orange-600/90 backdrop-blur-sm p-4 rounded-full shadow-lg">
                          <ArrowUpRight className="text-white w-6 h-6" />
                       </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-display font-medium group-hover:text-orange-600 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-md">{project.description}</p>
                    <div className="flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-widest text-stone-300">
                        <span>{project.year}</span>
                        {project.subType && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-orange-500" />
                                <span className="text-orange-600/70">{project.subType}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
         ))}
      </div>

      {currentProjects.length === 0 && (
          <div className="py-20 text-center text-stone-400">
              <p>No projects found in this category yet.</p>
          </div>
      )}
    </div>
  );
};

export default Work;