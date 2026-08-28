/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Projects from '@src/pages/components/projects/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: '赵庆卓｜AI 产品经理作品集',
  description: '赵庆卓的 AI 产品经理作品集，关注真实工作流、用户决策与可信的人机协作。',
  keywords: ['赵庆卓', 'AI 产品经理', '产品经理', 'Portfolio', 'AI Product Manager', '用户研究', '产品设计'],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <Home />
      <About />
      <Projects />
    </>
  );
}

export default Page;
