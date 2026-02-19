export enum ProjectCategory {
  UXUI = 'UX/UI',
  SocialMedia = 'Social Media',
  GraphicDesign = 'Graphic Design',
  Photography = 'Photography'
}

export enum GraphicDesignType {
  Logo = 'Logo',
  Booklet = 'Booklet',
  TechnicalPaper = 'Technical Paper',
  Poster = 'Poster',
  Other = 'Other'
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  subType?: GraphicDesignType; // Only for Graphic Design
  description: string;
  imageUrl: string;
  year: string;
}

export enum Page {
  Work = 'work',
  About = 'about',
  Contact = 'contact'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}