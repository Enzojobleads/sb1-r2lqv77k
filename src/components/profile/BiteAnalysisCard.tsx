import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { BiteChart } from '@/components/BiteChart';

interface BiteAnalysisCardProps {
  data: {
    haters: number;
    trolleur: number;
    lecheCul: number;
    bullshit: number;
  };
}

export function BiteAnalysisCard({ data }: BiteAnalysisCardProps) {
  return (
    <Card className="p-6 h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col"
      >
        <h3 className="text-xl font-semibold mb-4">Répartition BITE</h3>
        <div className="flex-1 flex items-center justify-center">
          <BiteChart data={data} />
        </div>
      </motion.div>
    </Card>
  );
}