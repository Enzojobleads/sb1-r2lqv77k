import { ScrollArea } from '@/components/ui/scroll-area';
import { Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { Posts } from '@/components/Posts';
import { Comments } from '@/components/Comments';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import { ProfileCard } from './profile/ProfileCard';
import { BiteAnalysisCard } from './profile/BiteAnalysisCard';
import { ScoreCard } from './profile/ScoreCard';

export function ProfileAnalysis({ data }: any) {
  return (
    <div className="space-y-8 max-w-[1920px] mx-auto">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProfileCard 
          name={data.name}
          image={data.image}
          profileUrl={data.profileUrl}
        />
        <BiteAnalysisCard data={data.biteAnalysis} />
        <ScoreCard score={data.biteScore || 50} />
      </div>

      {/* Posts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Posts posts={data.posts} />
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Comments comments={data.comments} />
      </motion.div>

      {/* Skills & Positions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Skills */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6" />
                <h3 className="text-2xl font-semibold">Compétences</h3>
              </div>
              <div className="grid gap-4">
                {data.skills?.map((skill: any, i: number) => (
                  <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      {skill.tag && <Tag type={skill.tag} />}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Positions */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-6 h-6" />
                <h3 className="text-2xl font-semibold">Positions</h3>
              </div>
              <div className="grid gap-4">
                {data.positions?.map((position: any, i: number) => (
                  <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <div className="font-medium">{position.title}</div>
                      <div className="text-sm text-muted-foreground">{position.duration}</div>
                      {position.tag && <Tag type={position.tag} />}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}