import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, ThumbsUp, Share2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';

interface Post {
  text: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  postUrl?: string;
}

interface PostsProps {
  posts: Post[];
}

export function Posts({ posts }: PostsProps) {
  return (
    <Card className="w-full p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageSquare className="w-6 h-6" />
        <h3 className="text-2xl font-semibold">Posts</h3>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-4">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Card className="h-full p-6 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col h-full">
                  <p className="flex-1 mb-4 line-clamp-4">{post.text}</p>
                  
                  <div className="space-y-4">
                    {/* Metrics */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, j) => (
                        <Tag key={j} type={tag} />
                      ))}
                    </div>
                  </div>

                  {/* Link to LinkedIn */}
                  {post.postUrl && (
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}