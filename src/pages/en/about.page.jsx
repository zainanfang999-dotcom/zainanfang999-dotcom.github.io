/* eslint-disable react/jsx-props-no-spreading */
import About from '@src/pages/components/about/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'About | Zhao Qingzhuo, AI Product Manager',
  description: 'An AI product manager with an architecture background, focused on real workflows, user decisions and trustworthy human–AI collaboration.',
  keywords: ['Zhao Qingzhuo', 'AI Product Manager', 'Architecture', 'Product Design', 'User Research'],
  language: 'en',
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <About language="en" />
    </>
  );
}

export default Page;
