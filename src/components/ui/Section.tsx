import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'dark';
  fullWidth?: boolean;
}

const variantStyles: Record<NonNullable<SectionProps['variant']>, string> = {
  default: '',
  glass: 'glass rounded-2xl',
  dark: 'bg-slate-900/50',
};

/**
 * Sectionコンポーネント
 */
export function Section({
  variant = 'default',
  fullWidth = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'py-12 md:py-16 lg:py-20',
        variantStyles[variant],
        !fullWidth && 'mx-auto max-w-5xl px-6',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * Containerコンポーネント
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const containerSizes: Record<NonNullable<ContainerProps['size']>, string> = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'w-full',
};

export function Container({
  size = 'lg',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto px-6',
        containerSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
