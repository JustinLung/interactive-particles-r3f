import MetaTags from '@/components/features/MetaTags';
import { usePermissions } from '@/state/permissions';
import dynamic from 'next/dynamic';

const ErrorPage = dynamic(
  () => import('@/components/shared/ErrorPage').then(res => res.ErrorPage),
  {
    ssr: false,
  },
);

const ARContainer = dynamic(() => import('@/components/features/AR').then(res => res.ARContainer), {
  ssr: false,
});

interface PageProps {}

export default function Page(props: PageProps) {
  const hasPermission = usePermissions();
  return (
    <>
      <MetaTags pageTitle={'Homepage'} pageDescription={'This is the homepage'} currentUrl={'/'} />
      {hasPermission ? (
        <ARContainer />
      ) : (
        <ErrorPage
          statusCode={403}
          status="Geweigerd"
          reason="Je moet toegang tot de camera en microfoon geven om de AR te openen"
        />
      )}
    </>
  );
}
