import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ScoreCircle } from '@/components/ScoreCircle';

interface ScoreCardProps {
  score: number;
}

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <Card className="p-6 h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col items-center justify-center"
      >
        <h3 className="text-xl font-semibold mb-6">Score Global</h3>
        <ScoreCircle score={score} size="lg" />
      </motion.div>
    </Card>
  );
}