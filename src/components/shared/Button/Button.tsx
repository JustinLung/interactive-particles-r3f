import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './Button.module.css';
import { Arrow } from '@/components/icons';

interface ButtonInterface {
  children: ReactNode;
  href?: string | null;
  className: string;
  icon?: boolean;
}

export default function Button(props: ButtonInterface) {
  const { className, children, href, icon, ...rest } = props;
  return href ? (
    <Link
      href={href}
      target={href?.includes('http') ? '_blank' : undefined}
      rel={href?.includes('http') ? 'noopener noreferrer' : undefined}
      className={`${className}`}
      {...rest}>
      {children}
      {icon ? <Arrow /> : undefined}
    </Link>
  ) : (
    <button {...rest} className={`${className}`}>
      {children}
      {icon ? <Arrow /> : undefined}
    </button>
  );
}
