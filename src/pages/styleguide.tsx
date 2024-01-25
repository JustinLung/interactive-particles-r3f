import MetaTags from '@/components/features/MetaTags';
import Button from '@/components/shared/Button/Button';

interface PageProps {}

function Page(props: PageProps) {
  return (
    <>
      <MetaTags pageTitle={'Homepage'} pageDescription={'This is the homepage'} currentUrl={'/'} />

      <div
        className="wrapper"
        style={{
          display: 'contents',
        }}>
        <div
          style={{
            gridColumn: '1/-1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
          <Button>filled</Button>
          <Button className="outline">outline</Button>
          <Button href="/styleguide">Link filled</Button>
          <Button className="underline" href="/styleguide">
            Link outline
          </Button>

          <h1>h1</h1>
          <h2>h2</h2>
          <h3>h3</h3>
          <h4>h4</h4>
          <h5>h5</h5>
          <h6>h6</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio eos assumenda
            voluptates sint saepe rem quo quos ea nihil id alias omnis eligendi, et exercitationem
            voluptatem quod ex nobis magnam.
          </p>
          <p>test</p>
        </div>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
};

export default Page;
