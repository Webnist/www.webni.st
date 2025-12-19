import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type TagVariant = 'default' | 'primary' | 'secondary' | 'glass' | 'outline';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  children: ReactNode;
}

const variantStyles: Record<TagVariant, string> = {
  default: 'bg-slate-700 text-slate-200',
  primary: 'bg-orange-400/20 text-orange-300 border border-orange-400/30',
  secondary: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  glass: 'glass text-slate-200',
  outline: 'border border-slate-500 text-slate-300 bg-transparent',
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

/**
 * Tagコンポーネント
 */
export function Tag({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        'transition-colors duration-200',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

