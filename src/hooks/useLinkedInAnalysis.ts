// src/hooks/useLinkedInAnalysis.ts

import { ApiService } from '@/lib/api';
import { callOpenAIAssistant } from '@/services/openai';

export function useLinkedInAnalysis() {
  const analyzeProfile = async (url: string) => {
    try {
      // Récupération des données LinkedIn
      const [profileData, postsData, commentsData] = await Promise.all([
        ApiService.getLinkedInProfile(url),
        ApiService.getLinkedInPosts(url),
        ApiService.getLinkedInComments(url)
      ]);

      // S'assurer que ce sont des tableaux
      const posts = Array.isArray(postsData) ? postsData.slice(0, 5) : [];
      const comments = Array.isArray(commentsData) ? commentsData.slice(0, 5) : [];

      // Préparation des posts pour l'assistant 1
      const postsForAssistant = {
        posts: posts.map((post, index) => ({
          id: String(index),
          value: post.text
        }))
      };

      // Appel à l’assistant pour les posts (1er assistant)
      const assistantResponseForPosts = await callOpenAIAssistant(
        JSON.stringify(postsForAssistant),
        import.meta.env.VITE_OPENAI_API_KEY,
        "asst_QDgvd6B1rahwAI1OujY11wDX" // ID du premier assistant
      );

      let assistantPostsResult;
      try {
        assistantPostsResult = JSON.parse(assistantResponseForPosts);
      } catch (e) {
        assistantPostsResult = { posts: [] };
      }

      // Préparation des commentaires pour l’assistant 2
      const commentsForAssistant = {
        comments: comments.map((comment, index) => ({
          id: String(index),
          value: comment.text
        }))
      };

      // Appel à l’assistant pour les commentaires (2ème assistant)
      const assistantResponseForComments = await callOpenAIAssistant(
        JSON.stringify(commentsForAssistant),
        import.meta.env.VITE_OPENAI_API_KEY,
        "asst_rwMt7SaqLxbBTjU3XdXfNceL" // Remplacer par l'ID du second assistant
      );

      let assistantCommentsResult;
      try {
        assistantCommentsResult = JSON.parse(assistantResponseForComments);
      } catch (e) {
        assistantCommentsResult = { comments: [] };
      }

      // Formatage des posts avec les tags du 1er assistant
      const formattedPosts = posts.map((post, index) => ({
        text: post.text,
        tags: [assistantPostsResult.posts?.find((p: any) => p.id === String(index))?.tag || 'Unknown'],
        likes: post.likes,
        comments: post.comments,
        shares: post.shares,
        createdAt: post.createdAt,
        postUrl: post.postUrl
      }));

      // Formatage des commentaires avec les tags du 2ème assistant
      const formattedComments = comments.map((comment, index) => {
        const commentTagInfo = assistantCommentsResult.comments?.find((c: any) => c.id === String(index));
        const commentTag = commentTagInfo ? commentTagInfo.tag : 'Unknown';

        return {
          text: comment.text,
          originalComment: comment.originalComment,
          likes: comment.likes,
          totalReactions: comment.totalReactions,
          tags: [commentTag],
          commentUrl: comment.commentUrl
        };
      });

      // Préparation des skills
      const formattedSkills = Array.isArray(profileData.skills) 
        ? profileData.skills.slice(0, 10).map((skill: any) => ({ name: skill.name })) // Limite à 10 compétences
        : [];

      // Préparation des données pour l'assistant des compétences
      const skillsForAssistant = {
        skills: formattedSkills.map((skill, index) => ({
          id: String(index),
          value: skill.name
        }))
      };

      // Appel à l'assistant pour analyser les compétences
      const assistantResponseForSkills = await callOpenAIAssistant(
        JSON.stringify(skillsForAssistant),
        import.meta.env.VITE_OPENAI_API_KEY,
        "asst_wkTGIDVQvhvFAtwqY62qnY2X" // Remplacez par l'ID de votre assistant dédié aux skills
      );

      let assistantSkillsResult;
      try {
        assistantSkillsResult = JSON.parse(assistantResponseForSkills);
      } catch (e) {
        assistantSkillsResult = { skills: [] };
      }

      // Mise à jour de formattedSkills avec les tags récupérés
      const finalFormattedSkills = formattedSkills.map((skill, index) => {
        const skillTagInfo = assistantSkillsResult.skills?.find((s: any) => s.id === String(index));
        const skillTag = skillTagInfo ? skillTagInfo.tag.trim() : 'Unknown';

        return {
          ...skill,
          tag: skillTag
        };
      });

      // Formatage des positions
      const formattedPositions = Array.isArray(profileData.position)
        ? profileData.position.map((pos: any) => ({
            title: pos.title,
            duration: `${pos.start.year} - ${pos.end.year || 'Present'}`
          }))
        : [];

      // Log des compétences formatées
      console.log('Final Formatted Skills:', finalFormattedSkills);

      return {
        name: `${profileData.firstName} ${profileData.lastName}`,
        image: profileData.profilePicture,
        profileUrl: `https://linkedin.com/in/${profileData.username}`,
        posts: formattedPosts,
        comments: formattedComments,
        skills: finalFormattedSkills, // Utiliser finalFormattedSkills pour inclure les tags
        positions: formattedPositions,
        biteAnalysis: { haters: 25, trolleur: 25, lecheCul: 25, bullshit: 25 }
      };
    } catch (error) {
      console.error('Error analyzing profile:', error);
      throw error;
    }
  };

  return { analyzeProfile };
}
