/* eslint-disable react/jsx-props-no-spreading */
import CustomHead from '@src/components/dom/CustomHead';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import projects from '@src/constants/projects';
import { localizeProject } from '@src/utils/locale';
import styles from '@src/pages/projects/projects.module.scss';

const seo = {
  title: 'Projects | Zhao Qingzhuo, AI Product Manager',
  description: 'Product case studies in AI-assisted decisions, spatial data workflows and research automation.',
  keywords: ['Zhao Qingzhuo', 'AI Product Manager', 'Product Case Studies', 'Portfolio'],
  language: 'en',
};

function Page() {
  const localizedProjects = projects.map((project) => localizeProject(project, 'en'));

  return (
    <>
      <CustomHead {...seo} />
      <section className={clsx(styles.root, 'layout-grid-inner')}>
        <div className={styles.eyebrow}>ALL PROJECTS / 2026</div>
        <h1>Selected Projects</h1>
        <p className={styles.intro}>Three completed projects spanning AI-assisted decisions, spatial data workflows and research automation.</p>
        <div className={styles.projectGrid}>
          {localizedProjects.map((project) => (
            <article key={project.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span>{project.index}</span>
                <span>{project.type}</span>
                <span>{project.date}</span>
              </div>
              <Link href={project.link} scroll={false} className={styles.art}>
                <Image src={project.cover} fill sizes="(max-width: 700px) 94vw, 46vw" alt={project.title} />
              </Link>
              <Link href={project.link} scroll={false}>
                <h2>{project.title}</h2>
              </Link>
              <p>{project.summary}</p>
              <strong>{project.outcome}</strong>
              <div className={styles.actions}>
                <a href={project.liveLink} target="_blank" rel="noreferrer">
                  Try the product ↗
                </a>
                <Link href={project.link} scroll={false}>
                  View case study →
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
