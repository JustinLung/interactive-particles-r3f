import MetaTags from '@/components/features/MetaTags';
import dynamic from 'next/dynamic';

const DynamicCanvas = dynamic(
  () => import('@/components/shared/Canvas/Canvas').then(res => res.DynamicCanvas),
  {
    ssr: false,
  },
);

interface PageProps {}

export default function Page(props: PageProps) {
  return (
    <>
      <MetaTags pageTitle={'Homepage'} pageDescription={'This is the homepage'} currentUrl={'/'} />
      <section
        className="wrapper"
        style={{
          height: 'var(--100svh)',
        }}
      >
        <DynamicCanvas />
      </section>
    </>
  );
}
