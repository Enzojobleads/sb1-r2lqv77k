import { config } from './config';
import type { 
  LinkedInProfile, 
  LinkedInPost, 
  LinkedInComment 
} from '@/types/linkedin';

interface ApiOptions {
  endpoint: string;
  method?: 'GET' | 'POST';
  params?: Record<string, string>;
  body?: any;
}

export class ApiService {
  private static async fetchWithProxy(options: ApiOptions) {
    const { endpoint, method = 'GET', params, body } = options;
    
    try {
      const url = new URL(`https://${import.meta.env.VITE_RAPID_API_HOST}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
          'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST,
        },
        ...(method === 'POST' && body ? { body: JSON.stringify(body) } : {}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private static extractUsernameFromUrl(url: string): string {
    const matches = url.match(/linkedin\.com\/in\/([^/]+)/);
    return matches ? matches[1] : '';
  }

  static async getLinkedInProfile(profileUrl: string): Promise<LinkedInProfile> {
    return this.fetchWithProxy({
      endpoint: '/get-profile-data-by-url',
      params: { url: profileUrl }
    });
  }

  static async getLinkedInPosts(profileUrl: string): Promise<LinkedInPost[]> {
    const username = this.extractUsernameFromUrl(profileUrl);
    if (!username) {
      throw new Error('Invalid LinkedIn URL');
    }

    const response = await this.fetchWithProxy({
      endpoint: '/get-profile-posts',
      params: { username }
    });

    // Ajout de postUrl si l'API le renvoie
    return response.data.slice(0, 10).map((post: any) => ({
      id: post.urn,
      text: post.text,
      createdAt: post.postedDate,
      likes: post.likeCount,
      comments: post.commentsCount,
      shares: post.repostsCount,
      postUrl: post.postUrl // Assurez-vous que l'API renvoie bien ce champ
    }));
  }

  static async getLinkedInComments(profileUrl: string): Promise<LinkedInComment[]> {
    const username = this.extractUsernameFromUrl(profileUrl);
    if (!username) {
      throw new Error('Invalid LinkedIn URL');
    }

    const response = await this.fetchWithProxy({
      endpoint: '/get-profile-comments',
      params: { username }
    });

    // Ajout de commentUrl si l'API le renvoie
    return response.data.map((item: any) => ({
      id: item.urn,
      text: item.highlightedComments[0] || '',
      originalComment: item.text,
      createdAt: item.commentedDate,
      likes: item.likeCount,
      totalReactions: item.totalReactionCount,
      commentUrl: item.commentUrl // Assurez-vous que l'API renvoie bien ce champ
    }));
  }
}
