import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("finley@example.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto pb-20 px-4 md:px-0 text-center">
      <div className="space-y-16 animate-fade-in-up">
        
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-light tracking-tight">
            Let's talk.
          </h1>
          <p className="text-stone-500 text-lg font-light">Available for freelance opportunities and collaborations.</p>
        </div>

        <div className="relative group cursor-pointer inline-block" onClick={handleCopyEmail} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="absolute -inset-4 bg-orange-50 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
          <div className="relative flex items-center gap-4 text-2xl md:text-3xl font-display text-stone-900 group-hover:text-orange-900 transition-colors">
            <span>finley@example.com</span>
            <div className="w-6 h-6 relative overflow-hidden">
               <div className={`absolute inset-0 transition-transform duration-300 ${copied ? 'translate-y-0' : 'translate-y-full'}`}>
                 <Check size={24} className="text-orange-600" />
               </div>
               <div className={`absolute inset-0 transition-transform duration-300 ${copied ? '-translate-y-full' : 'translate-y-0'}`}>
                 <Copy size={24} className="text-stone-300 group-hover:text-orange-500 transition-colors" />
               </div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-0 w-full h-px bg-stone-200 group-hover:bg-orange-500 transition-colors duration-500" />
        </div>

        <div className="bg-white p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-stone-100 rounded-sm text-left">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="group relative z-0 w-full mb-6">
                <input 
                  type="text" 
                  name="name" 
                  className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer transition-colors" 
                  placeholder=" " 
                  required 
                />
                <label className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Your Name
                </label>
              </div>
              <div className="group relative z-0 w-full mb-6">
                <input 
                  type="email" 
                  name="email" 
                  className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer transition-colors" 
                  placeholder=" " 
                  required 
                />
                <label className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email Address
                </label>
              </div>
              <div className="group relative z-0 w-full mb-6">
                <textarea 
                  name="message" 
                  rows={4} 
                  className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b border-stone-200 appearance-none focus:outline-none focus:ring-0 focus:border-orange-600 peer resize-none transition-colors" 
                  placeholder=" " 
                  required 
                ></textarea>
                <label className="peer-focus:font-medium absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Project Details
                </label>
              </div>
            </div>

            <button className="group w-full py-4 bg-stone-900 text-white rounded-sm flex items-center justify-center gap-3 hover:bg-orange-600 transition-all duration-300 hover:gap-6">
              <span className="uppercase tracking-widest text-xs font-bold">Send Message</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="flex justify-center gap-12 pt-8">
            <a href="#" className="text-stone-400 hover:text-orange-600 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">Instagram</a>
            <a href="#" className="text-stone-400 hover:text-orange-600 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">LinkedIn</a>
            <a href="#" className="text-stone-400 hover:text-orange-600 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">Behance</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;