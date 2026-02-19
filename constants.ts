import { Project, ProjectCategory, GraphicDesignType } from './types';

/**
 * =============================================================================
 *  PORTFOLIO CONTENT CONFIGURATION
 * =============================================================================
 * 
 *  This file is the central place to manage your website's content.
 *  Follow the comments below to update images, text, and projects.
 * 
 *  TIPS:
 *  - Image URLs can be from the web or local paths (e.g., '/images/my-photo.jpg')
 *    if you put files in a 'public' folder.
 *  - Keep descriptions concise for better design balance.
 */

// =============================================================================
// 1. PROFILE & AI CONTEXT
// =============================================================================

export const RESUME_CONTEXT = `
Name: Finley Hudson
Role: Multidisciplinary Designer & Frontend Developer
Experience: 5 years in Digital Design, 3 years in React Development.
Skills: Figma, Adobe Suite, React, Tailwind, TypeScript, Social Media Strategy, Brand Identity.
Style: Minimalist, Functional, Typography-driven.
Contact: finley@example.com, +1 (555) 010-9999
`;

// =============================================================================
// 2. CAROUSEL COVER IMAGES
// =============================================================================
// These images appear on the main scrolling wheel for each category.

export const CATEGORY_COVERS = {
  [ProjectCategory.UXUI]: 'https://picsum.photos/800/800?random=101',         // Image for UX/UI
  [ProjectCategory.SocialMedia]: 'https://picsum.photos/800/1000?random=102',  // Image for Social Media
  [ProjectCategory.GraphicDesign]: 'https://picsum.photos/800/600?random=103', // Image for Graphic Design
  [ProjectCategory.Photography]: 'https://picsum.photos/800/600?random=104',   // Image for Photography
};

// =============================================================================
// 3. PROJECT LIST
// =============================================================================
// Add, remove, or edit your projects here.

export const PROJECTS: Project[] = [
  // --- UX/UI PROJECTS ---
  {
    id: 'ux-1',
    title: 'FinTech Dashboard',
    category: ProjectCategory.UXUI,
    description: 'A comprehensive dashboard for a modern banking platform focusing on data visualization and user accessibility.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    year: '2023'
  },
  {
    id: 'ux-2',
    title: 'EcoStore Mobile App',
    category: ProjectCategory.UXUI,
    description: 'Sustainable shopping experience designed for iOS and Android with a focus on seamless checkout.',
    imageUrl: 'https://picsum.photos/800/800?random=2',
    year: '2023'
  },

  // --- SOCIAL MEDIA PROJECTS ---
  {
    id: 'social-1',
    title: 'Summer Campaign',
    category: ProjectCategory.SocialMedia,
    description: 'Instagram and TikTok content strategy for a leading beverage brand, resulting in 20% engagement increase.',
    imageUrl: 'https://picsum.photos/800/1000?random=3',
    year: '2024'
  },
  {
    id: 'social-2',
    title: 'Influencer Kit',
    category: ProjectCategory.SocialMedia,
    description: 'Physical and digital unboxing experience design for influencer marketing campaigns.',
    imageUrl: 'https://picsum.photos/800/800?random=7',
    year: '2023'
  },

  // --- GRAPHIC DESIGN PROJECTS ---
  {
    id: 'graphic-1',
    title: 'Tech Summit Identity',
    category: ProjectCategory.GraphicDesign,
    subType: GraphicDesignType.Logo,
    description: 'Complete brand identity including logo, typography, and color palette for a global tech conference.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    year: '2022'
  },
  {
    id: 'graphic-2',
    title: 'Annual Sustainability Report',
    category: ProjectCategory.GraphicDesign,
    subType: GraphicDesignType.Booklet,
    description: 'Print and digital layout design for a 50-page corporate responsibility report.',
    imageUrl: 'https://picsum.photos/800/1200?random=5',
    year: '2023'
  },
  {
    id: 'graphic-3',
    title: 'Algorithm Research Paper',
    category: ProjectCategory.GraphicDesign,
    subType: GraphicDesignType.TechnicalPaper,
    description: 'Typesetting and diagram design for a complex computer science research paper.',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    year: '2024'
  },
  
  // --- PHOTOGRAPHY PROJECTS ---
  {
    id: 'photo-1',
    title: 'Urban Perspectives',
    category: ProjectCategory.Photography,
    description: 'A series exploring architecture in modern cities.',
    imageUrl: 'https://picsum.photos/800/600?random=8',
    year: '2023'
  },
  {
    id: 'photo-2',
    title: 'Neon Nights',
    category: ProjectCategory.Photography,
    description: 'Night photography capturing the vibrant life of Tokyo.',
    imageUrl: 'https://picsum.photos/800/600?random=9',
    year: '2022'
  },
  {
    id: 'photo-3',
    title: 'Silent Peaks',
    category: ProjectCategory.Photography,
    description: 'Landscape photography from the Swiss Alps.',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    year: '2024'
  }
];
