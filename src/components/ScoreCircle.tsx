import { motion } from "framer-motion";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function ScoreCircle({ score, size = "lg" }: ScoreCircleProps) {
  const sizes = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40"
  };

  const fontSize = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl"
  };

  return (
    <div className={`relative ${sizes[size]} group`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="absolute inset-0"
      >
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/20 transition-all duration-300 group-hover:text-muted/30"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${score * 2.83} ${283 - score * 2.83}`}
            className="text-primary transition-all duration-300 group-hover:text-primary/80"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1, type: "spring" }}
          />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute inset-0 flex items-center justify-center flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className={`${fontSize[size]} font-bold`}>{score}</span>
        <span className="text-sm text-muted-foreground">BITE Score</span>
      </motion.div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}