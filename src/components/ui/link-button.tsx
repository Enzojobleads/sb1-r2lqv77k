// src/components/ui/link-button.tsx

import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface LinkButtonProps {
  href: string;
  className?: string;
}

export function LinkButton({ href, className = '' }: LinkButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ExternalLink className="w-4 h-4" />
    </motion.a>
  );
}
