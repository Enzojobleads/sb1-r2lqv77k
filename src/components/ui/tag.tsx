import { cn } from '@/lib/utils';
import { TAG_CONFIG } from '@/lib/constants';

interface TagProps {
  type: string;
  className?: string;
}

export function Tag({ type, className }: TagProps) {
  const normalizedType = type.toLowerCase();
  const config = TAG_CONFIG[normalizedType] || TAG_CONFIG.unclassified;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        config.color,
        config.hoverColor,
        className
      )}
    >
      <span className="mr-1">{config.emoji}</span>
      {type}
    </span>
  );
}