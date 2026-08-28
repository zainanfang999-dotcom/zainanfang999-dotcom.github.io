/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Projects from '@src/pages/components/projects/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Zhao Qingzhuo | AI Product Manager Portfolio',
  description: 'Portfolio of Zhao Qingzhuo, an AI product manager working across user research, decision tools and workflow automation.',
  keywords: ['Zhao Qingzhuo', 'AI Product Manager', 'Product Manager', 'Portfolio', 'User Research', 'Product Design'],
  language: 'en',
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home language="en" />
      <About language="en" />
      <Projects language="en" />
    </>
  );
}

export default Page;
