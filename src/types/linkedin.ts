export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profilePicture: string;
  backgroundPicture?: string;
  summary?: string;
  positions: LinkedInPosition[];
  skills: LinkedInSkill[];
}

export interface LinkedInPosition {
  title: string;
  companyName: string;
  startDate: {
    month: number;
    year: number;
  };
  endDate?: {
    month: number;
    year: number;
  };
  description?: string;
  location?: string;
  current: boolean;
}

export interface LinkedInSkill {
  name: string;
  endorsementCount: number;
}

export interface LinkedInPost {
  id: string;
  text: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  media?: {
    type: 'image' | 'video' | 'document';
    url: string;
  }[];
}

export interface LinkedInComment {
  id: string;
  text: string;
  createdAt: string;
  authorId: string;
  authorName: string;
  authorPicture?: string;
  likes: number;
  postId: string;
}

// Types pour l'analyse
export interface BullshitAnalysis {
  biteScore: number;
  biteAnalysis: {
    haters: number;
    trolleur: number;
    lecheCul: number;
    bullshit: number;
  };
  skillAnalysis: {
    name: string;
    tag: SkillTag;
  }[];
  positionAnalysis: {
    title: string;
    tag: PositionTag;
  }[];
  postAnalysis: {
    id: string;
    tags: BiteTag[];
  }[];
  commentAnalysis: {
    id: string;
    tags: BiteTag[];
  }[];
}

export type BiteTag = 'haters' | 'trolleur' | 'lecheCul' | 'bullshit';
export type SkillTag = 'bullshit' | 'commeToutLeMonde' | 'inutile' | 'appreciable' | 'golden';
export type PositionTag = 
  | 'naPasFaitLongFeu' 
  | 'enliseEtPotentiellementEndette' 
  | 'planque' 
  | 'joueACandyCrushAuBureau';