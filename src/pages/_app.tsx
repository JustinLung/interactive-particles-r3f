import { BaseLayout } from '@/components/features/layout/BaseLayout/BaseLayout';
import '@/styles/all.css';
import { useLenis } from '@/utils/useLenis';
import { useVhFix } from '@/utils/useVhFix';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

const DesignHelper = dynamic(
  () => import('@/components/features/DesignHelper').then(res => res.DesignHelper),
  {
    ssr: false,
  },
);

export default function App({ Component, pageProps }: AppProps) {
  useLenis();
  useVhFix();

  return (
    <>
      {/* {process.env.NODE_ENV !== 'production' ? <DesignHelper /> : null} */}
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </>
  );
}
