export const config = {
  rapidApi: {
    host: import.meta.env.VITE_RAPID_API_HOST,
    endpoints: {
      profile: '/profile',
      posts: '/posts',
      comments: '/comments'
    }
  },
  openai: {
    host: import.meta.env.VITE_OPENAI_API_HOST,
    endpoint: '/analyze'
  }
} as const;