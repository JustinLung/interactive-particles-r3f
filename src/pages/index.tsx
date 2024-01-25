import MetaTags from '@/components/features/MetaTags';

interface PageProps {}

export default function Page(props: PageProps) {
  return (
    <>
      <MetaTags pageTitle={'Homepage'} pageDescription={'This is the homepage'} currentUrl={'/'} />
      <section className="wrapper">
        <h1>Welcome to NextCalibur</h1>
        <p>This is Merlin&apos;s React Stack.</p>

        <h2>Commands</h2>
        <p>Run `yarn component [name]` to create a component</p>
      </section>
    </>
  );
}
