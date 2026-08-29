/* eslint-disable react/jsx-props-no-spreading */
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import CustomHead from '@src/components/dom/CustomHead';
import Link from 'next/link';
import ProjectArtwork from '@src/components/dom/ProjectArtwork';
import ProjectMedia from '@src/pages/projects/components/projectMedia/ProjectMedia';
import clsx from 'clsx';
import projects from '@src/constants/projects';
import { localizeProject } from '@src/utils/locale';
import styles from '@src/pages/projects/project.module.scss';

function Page({ id }) {
  const projectIndex = projects.findIndex((item) => item.id === id);
  const project = localizeProject(projects[projectIndex], 'en');
  const nextProject = localizeProject(projects[(projectIndex + 1) % projects.length], 'en');
  const hasEmbeddedDemo = project.id === 'geofield' || project.id === 'scene-survey';

  const seo = {
    title: `${project.title} | Zhao Qingzhuo, AI Product Manager`,
    description: project.summary,
    keywords: [project.title, 'Zhao Qingzhuo', 'AI Product Manager', ...project.tags],
    language: 'en',
  };

  return (
    <>
      <CustomHead {...seo} />
      <article className={styles.root}>
        <section className={clsx(styles.hero, 'layout-grid-inner')}>
          <Link className={styles.back} href="/en/#projects" scroll={false}>
            ← Back to selected projects
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
            <ButtonLink target href={project.liveLink} label={project.ctaLabel || 'TRY THE PRODUCT'} />
          </div>
        </section>

        <section className={clsx(styles.visual, 'layout-block-inner')}>
          <div className={styles.visualInner}>
            <ProjectArtwork project={project} sizes="94vw" alt={`${project.title} project material`} />
            <a href={project.liveLink} target="_blank" rel="noreferrer">
              {project.ctaLabel || 'Open the interactive version'} <b>↗</b>
            </a>
          </div>
        </section>

        <section className={clsx(styles.caseBody, 'layout-grid-inner')}>
          <div className={styles.caseLabel}>CASE STUDY / {project.title}</div>
          <div className={styles.problem}>
            <span>THE PROBLEM</span>
            <h2>{project.problem}</h2>
          </div>
          <div className={styles.role}>
            <span>MY ROLE</span>
            <p>{project.role}</p>
          </div>
          <div className={styles.approach}>
            <span>KEY PRODUCT DECISIONS</span>
            {project.approach.map((item, index) => (
              <article key={item}>
                <b>0{index + 1}</b>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className={styles.result}>
            <span>OUTCOME</span>
            <h3>{project.result}</h3>
            {project.liveLink && (
              <div>
                <ButtonLink target href={project.liveLink} label={project.ctaLabel || (hasEmbeddedDemo ? 'OPEN INTERACTIVE PROTOTYPE' : 'TRY THE LIVE PRODUCT')} />
              </div>
            )}
          </div>
        </section>

        <ProjectMedia project={project} language="en" />

        {hasEmbeddedDemo && (
          <section className={clsx(styles.demoSection, 'layout-block-inner')}>
            <div className={styles.demoHead}>
              <span>INTERACTIVE PROTOTYPE</span>
              <p>This is the working prototype from the project files. Try it in the frame below or open it in a separate tab.</p>
            </div>
            <iframe title={`${project.title} interactive prototype`} src={project.liveLink} loading="lazy" />
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
