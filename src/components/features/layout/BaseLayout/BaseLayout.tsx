import { ReactNode } from 'react';
import styles from './BaseLayout.module.css';

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout(props: BaseLayoutProps) {
  return (
    <>
      <main className={styles['main']}>{props.children}</main>
    </>
  );
}
