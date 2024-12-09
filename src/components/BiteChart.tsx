import { motion } from 'framer-motion';
import { TAG_CONFIG } from '@/lib/constants';

interface BiteChartProps {
  data: {
    haters: number;
    trolleur: number;
    lecheCul: number;
    bullshit: number;
  };
}

export function BiteChart({ data }: BiteChartProps) {
  const total = Object.values(data).reduce((acc, val) => acc + val, 0);
  let currentAngle = 0;

  const segments = Object.entries(data).map(([key, value]) => {
    const percentage = (value / total) * 100;
    const angle = (percentage / 100) * 360;
    const segment = {
      key,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: getColorForKey(key),
      value
    };
    currentAngle += angle;
    return segment;
  });

  function getColorForKey(key: string): string {
    const colors = {
      haters: '#ef4444',
      trolleur: '#8b5cf6',
      lecheCul: '#ec4899',
      bullshit: '#eab308'
    };
    return colors[key as keyof typeof colors] || '#94a3b8';
  }

  function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "L", x, y,
      "Z"
    ].join(" ");
  }

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center">
        {/* Chart */}
        <div className="w-32 h-32 mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-300 hover:scale-105">
            {segments.map((segment) => (
              <motion.path
                key={segment.key}
                d={describeArc(50, 50, 40, segment.startAngle, segment.endAngle)}
                fill={segment.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: segments.indexOf(segment) * 0.1 }}
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </svg>
        </div>

        {/* Légende compacte */}
        <div className="w-full grid grid-cols-1 gap-1.5">
          {segments.map((segment) => (
            <motion.div
              key={segment.key}
              className="flex items-center space-x-2 text-sm p-1.5 rounded-md transition-colors duration-300 hover:bg-muted cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: segments.indexOf(segment) * 0.1 }}
            >
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: segment.color }}
              />
              <span className="flex-shrink-0">
                {TAG_CONFIG[segment.key as keyof typeof TAG_CONFIG]?.emoji}
              </span>
              <span className="truncate capitalize">
                {segment.key}
              </span>
              <span className="flex-shrink-0 font-medium">
                {segment.percentage.toFixed(0)}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}