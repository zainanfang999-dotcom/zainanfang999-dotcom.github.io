import AppearByWords from '@src/components/animationComponents/appearByWords/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import projects from '@src/constants/projects';
import styles from '@src/pages/components/projects/styles/projects.module.scss';

function Projects() {
  return (
    <>
      <section id="projects" className={clsx(styles.titleContainer, 'layout-grid-inner')}>
        <div className={styles.sectionNo}>02 / SELECTED WORK</div>
        <h1 className={styles.title}>
          <AppearByWords>项目经历</AppearByWords>
        </h1>
        <p>3 个已完成项目，包含产品定义、用户研究、工作流设计与可交互原型。</p>
      </section>
      <section className={clsx(styles.root, 'layout-block-inner')}>
        <div className={styles.innerContainer}>
          {projects.map((project) => (
            <article id={project.id} key={project.id} className={styles.card}>
              <div className={clsx(styles.container, 'layout-grid-inner')}>
                <div className={styles.projectDetails}>
                  <div className={styles.meta}>
                    <span>{project.index}</span>
                    <span>{project.type}</span>
                    <span>{project.date}</span>
                  </div>
                  <Link href={project.link} scroll={false}>
                    <h2>{project.title}</h2>
                  </Link>
                  <p>{project.summary}</p>
                  <strong>{project.outcome}</strong>
                  <div className={styles.tags}>
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className={styles.primaryAction}>
                      体验项目 <b>↗</b>
                    </a>
                    <Link href={project.link} scroll={false} className={styles.secondaryAction}>
                      查看案例 →
                    </Link>
                  </div>
                </div>
                <Link aria-label={project.title} href={project.link} scroll={false} className={styles.cover}>
                  <Image src={project.cover} fill sizes="(max-width: 700px) 94vw, 58vw" alt={project.title} />
                  <span>OPEN CASE ↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <ButtonLink href="/projects" label="全部项目 / ALL PROJECTS" />
        </div>
      </section>
    </>
  );
}

export default Projects;
