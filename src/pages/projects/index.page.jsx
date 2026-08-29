/* eslint-disable react/jsx-props-no-spreading */
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import ProjectArtwork from '@src/components/dom/ProjectArtwork';
import clsx from 'clsx';
import projects from '@src/constants/projects';
import styles from '@src/pages/projects/projects.module.scss';

const seo = {
  title: '项目｜赵庆卓 AI 产品经理作品集',
  description: '赵庆卓的产品项目：衣橱决策、空间数据、科研流程自动化与多模态参数化设计。',
  keywords: ['赵庆卓', 'AI 产品经理', '产品项目', '作品集'],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
      <section className={clsx(styles.root, 'layout-grid-inner')}>
        <div className={styles.eyebrow}>ALL PROJECTS / 2026</div>
        <h1>项目经历</h1>
        <p className={styles.intro}>4 个已完成项目，覆盖 AI 消费决策、空间数据工作流、科研自动化与参数化设计。</p>
        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span>{project.index}</span>
                <span>{project.type}</span>
                <span>{project.date}</span>
              </div>
              <Link href={project.link} scroll={false} className={styles.art}>
                <ProjectArtwork project={project} sizes="(max-width: 700px) 94vw, 46vw" alt={project.title} />
              </Link>
              <Link href={project.link} scroll={false}>
                <h2>{project.title}</h2>
              </Link>
              <p>{project.summary}</p>
              <strong>{project.outcome}</strong>
              <div className={styles.actions}>
                <a href={project.liveLink} target="_blank" rel="noreferrer">
                  {project.ctaLabel || '体验项目'} ↗
                </a>
                <Link href={project.link} scroll={false}>
                  查看案例 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Page;
