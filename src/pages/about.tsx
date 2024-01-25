import MetaTags from '@/components/features/MetaTags';

export default function About() {
  return (
    <>
      <MetaTags
        pageTitle={'About'}
        pageDescription={'This is the about page'}
        currentUrl={'/about'}
      />
      <section className="wrapper">
        <h1>About page</h1>
      </section>
    </>
  );
}
