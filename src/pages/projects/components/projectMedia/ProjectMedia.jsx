import Image from 'next/image';
import clsx from 'clsx';
import styles from '@src/pages/projects/components/projectMedia/projectMedia.module.scss';

function ProjectMedia({ project, language = 'zh' }) {
  if (!project.media?.length) return null;

  const isEnglish = language === 'en';
  const stages = isEnglish ? ['Visual reasoning', 'Design grammar', 'GhPython generation', 'AI rendering', 'Physical prototype'] : ['视觉推理', '设计语法', 'GhPython 生成', 'AI 渲染', '实体原型'];

  return (
    <section className={clsx(styles.root, 'layout-block-inner')}>
      <header className={styles.heading}>
        <div>
          <span>PROCESS &amp; EVIDENCE</span>
          <h2>{isEnglish ? 'From a visual reference to a buildable object' : '从视觉参考到可制作的实体'}</h2>
        </div>
        <p>
          {isEnglish
            ? 'A course-design project developed into a reusable multimodal AI workflow. Zhao Qingzhuo participated throughout the research, prompt iteration, parametric modelling and physical prototyping.'
            : '由课程设计转化而来的多模态 AI 工作流。赵庆卓全程参与研究、提示词迭代、参数化建模与实体原型制作。'}
        </p>
      </header>

      <div className={styles.stages}>
        {stages.map((stage, index) => (
          <div key={stage}>
            <b>0{index + 1}</b>
            <span>{stage}</span>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {project.media.map((item, index) => (
          <figure key={item.src} className={clsx(index === 2 && styles.prototype)}>
            <div className={styles.frame}>
              <Image unoptimized={item.animated} src={item.src} fill sizes={index === 2 ? '(max-width: 700px) 94vw, 45vw' : '(max-width: 700px) 94vw, 42vw'} alt={item.title} />
            </div>
            <figcaption>
              <b>0{index + 1}</b>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <footer className={styles.source}>
        <span>{isEnglish ? 'SOURCE MATERIAL' : '素材来源'}</span>
        <p>{isEnglish ? 'The process media and method descriptions above come from the collaborative project repository.' : '以上过程素材与方法说明均来自合作项目的公开仓库。'}</p>
        <a href={project.liveLink} target="_blank" rel="noreferrer">
          {isEnglish ? 'VIEW GITHUB REPOSITORY' : '查看 GITHUB 项目仓库'} <b>↗</b>
        </a>
      </footer>
    </section>
  );
}

export default ProjectMedia;
