/* eslint-disable react/jsx-props-no-spreading */
import About from '@src/pages/components/about/Index';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: '关于我｜赵庆卓 AI 产品经理',
  description: '建筑学背景的 AI 产品经理，关注真实工作流、用户决策与可信的人机协作。',
  keywords: ['赵庆卓', 'AI 产品经理', '建筑学', '产品设计'],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <About />
    </>
  );
}

export default Page;
