/* eslint-disable react/jsx-props-no-spreading */
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import CustomHead from '@src/components/dom/CustomHead';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import projects from '@src/constants/projects';
import styles from '@src/pages/projects/project.module.scss';

function Page({ id }) {
  const projectIndex = projects.findIndex((item) => item.id === id);
  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const hasEmbeddedDemo = project.id === 'geofield' || project.id === 'scene-survey';

  const seo = {
    title: `${project.title}｜赵庆卓 AI 产品经理作品集`,
    description: project.summary,
    keywords: [project.title, project.titleEn, '赵庆卓', 'AI 产品经理', ...project.tags],
  };

  return (
    <>
      <CustomHead {...seo} />
      <article className={styles.root}>
        <section className={clsx(styles.hero, 'layout-grid-inner')}>
          <Link className={styles.back} href="/#projects" scroll={false}>
            ← 返回项目总览
          </Link>
          <div className={styles.heroMeta}>
            <span>{project.index}</span>
            <span>{project.type}</span>
            <span>{project.date}</span>
          </div>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <strong className={styles.outcome}>{project.outcome}</strong>
          <div className={styles.heroAction}>
            <ButtonLink target href={project.liveLink} label="体验项目" />
          </div>
        </section>

        <section className={clsx(styles.visual, 'layout-block-inner')}>
          <div className={styles.visualInner}>
            <Image src={project.cover} fill sizes="94vw" alt={`${project.title}真实项目界面`} />
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              进入可交互版本 <b>↗</b>
            </a>
          </div>
        </section>

        <section className={clsx(styles.caseBody, 'layout-grid-inner')}>
          <div className={styles.caseLabel}>CASE STUDY / {project.titleEn}</div>
          <div className={styles.problem}>
            <span>问题</span>
            <h2>{project.problem}</h2>
          </div>
          <div className={styles.role}>
            <span>我的工作</span>
            <p>{project.role}</p>
          </div>
          <div className={styles.approach}>
            <span>关键产品判断</span>
            {project.approach.map((item, index) => (
              <article key={item}>
                <b>0{index + 1}</b>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className={styles.result}>
            <span>结果</span>
            <h3>{project.result}</h3>
            {project.liveLink && (
              <div>
                <ButtonLink target href={project.liveLink} label={hasEmbeddedDemo ? '打开可交互原型' : '体验线上产品'} />
              </div>
            )}
          </div>
        </section>

        {hasEmbeddedDemo && (
          <section className={clsx(styles.demoSection, 'layout-block-inner')}>
            <div className={styles.demoHead}>
              <span>INTERACTIVE PROTOTYPE</span>
              <p>这是项目文件夹中的真实可交互版本，可在窗口内体验，也可以单独打开。</p>
            </div>
            <iframe title={`${project.title} 可交互原型`} src={project.liveLink} loading="lazy" />
          </section>
        )}

        <Link href={nextProject.link} scroll={false} className={styles.nextProject}>
          <span>NEXT CASE / {nextProject.index}</span>
          <h2>{nextProject.title}</h2>
          <b>↗</b>
        </Link>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: projects.map((project) => ({ params: { id: project.id } })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  return { props: { id: params.id } };
}

export default Page;
