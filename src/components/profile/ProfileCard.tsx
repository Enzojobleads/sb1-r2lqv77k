import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  name: string;
  image: string;
  profileUrl?: string;
}

export function ProfileCard({ name, image, profileUrl }: ProfileCardProps) {
  return (
    <Card className="p-6 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center space-y-4"
      >
        <div className="relative group">
          <img 
            src={image} 
            alt={name}
            className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/20 transition-all duration-300 group-hover:ring-primary"
          />
          {profileUrl && (
            <ExternalLink 
              className="absolute bottom-0 right-0 w-6 h-6 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg text-muted-foreground">Analyse BITE</span>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Card>
  );
}