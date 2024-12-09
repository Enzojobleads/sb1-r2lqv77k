// src/components/Comments.tsx

import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, ThumbsUp, Heart, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';

interface Comment {
  text: string;
  originalComment: string;
  tags: string[];
  likes: number;
  totalReactions: number;
  commentUrl: string;
}

interface CommentsProps {
  comments: Comment[];
}

function truncateText(text: string, maxLength: number = 150) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function Comments({ comments }: CommentsProps) {
  return (
    <Card className="w-full p-6">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-6 h-6" />
        <h3 className="text-2xl font-semibold">Commentaires</h3>
      </div>
      <ScrollArea className="h-[600px]">
        <div className="space-y-6 pr-4">
          {comments.map((comment, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg card-hover-effect">
                {comment.commentUrl && (
                  <a
                    href={comment.commentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors z-50"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}

                {/* Original Post */}
                {comment.originalComment && (
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-b relative">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-muted-foreground">Post original</div>
                      </div>
                      <p className="text-lg font-medium leading-relaxed pr-12">
                        {truncateText(comment.originalComment, 200)}
                      </p>
                    </motion.div>
                  </div>
                )}

                {/* Response */}
                <div className="p-6 space-y-4">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Réponse :</div>
                  <p className="text-base leading-relaxed">
                    {comment.text}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center space-x-6">
                    <motion.div 
                      className="flex items-center space-x-2 text-rose-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="font-semibold">{comment.totalReactions}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-2 text-blue-500"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ThumbsUp className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="font-semibold">{comment.likes}</span>
                    </motion.div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {comment.tags.map((tag, j) => (
                      <Tag key={j} type={tag} />
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
