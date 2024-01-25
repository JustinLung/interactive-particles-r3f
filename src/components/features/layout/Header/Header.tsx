import { Link } from '@/components/shared/Link/Link';
import Image from 'next/image';
import styles from './Header.module.css';

const links = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'About',
    href: '/about',
  },
];

export function Header() {
  return (
    <header className={styles['header'] + ' wrapper'}>
      <Link href="/">
        <Image src="/images/logo.png" alt="Logo" className="logo" width={100} height={100} />
      </Link>
      <nav className={styles['navigation']}>
        <ul>
          {links.map(link => {
            return (
              <li key={link.title}>
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
