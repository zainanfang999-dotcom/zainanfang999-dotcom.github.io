import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@src/pages/components/about/styles/about.module.scss';

function About() {
  return (
    <section id="about" className={styles.root}>
      <div className={clsx(styles.heading, 'layout-grid-inner')}>
        <div className={styles.sectionNo}>01 / ABOUT</div>
        <AppearTitle>
          <h1>个人信息与能力</h1>
        </AppearTitle>
      </div>
      <div className={clsx(styles.container, 'layout-grid-inner')}>
        <div className={styles.profile}>
          <span>赵庆卓 / AI 产品经理</span>
          <h2>建筑学硕士，聚焦 AI 产品、用户研究与工作流工具。</h2>
          <div className={styles.buttonContainer}>
            <ButtonLink href="mailto:zai_nanfang@163.com" label="联系我 / CONTACT" />
          </div>
        </div>
        <div className={styles.education}>
          <span>教育背景</span>
          <p>东南大学 · 建筑学硕士</p>
          <p>重庆大学 · 建筑学学士</p>
        </div>
        <div className={styles.skills}>
          <span>核心技能</span>
          <div>
            {['用户研究与需求拆解', '产品流程与信息架构', 'AI 原型与提示词设计', 'GIS 与数据可视化', '工作流自动化', '交互原型开发'].map((skill) => (
              <b key={skill}>{skill}</b>
            ))}
          </div>
        </div>
        <div className={styles.personalWorks}>
          <div className={styles.worksHeading}>
            <span>个人创作 / PERSONAL WORKS</span>
            <small>以下均为赵庆卓本人原创绘画与建筑设计作品，非网络图片。</small>
          </div>
          <div className={styles.worksGrid}>
            <figure>
              <Image src="/art/garden-scroll.jpg" fill sizes="(max-width: 700px) 94vw, 28vw" alt="赵庆卓原创江南园林绘画长卷" />
              <figcaption>绘画 · 江南园林长卷</figcaption>
            </figure>
            <figure>
              <Image src="/art/memory-box.jpg" fill sizes="(max-width: 700px) 47vw, 15vw" alt="赵庆卓原创工业遗产建筑设计作品" />
              <figcaption>建筑 · 工业遗产更新</figcaption>
            </figure>
            <figure>
              <Image src="/art/garden-axon.jpg" fill sizes="(max-width: 700px) 47vw, 15vw" alt="赵庆卓原创园林建筑设计作品" />
              <figcaption>建筑 · 园林空间设计</figcaption>
            </figure>
          </div>
        </div>
        <div className={styles.evidence}>
          <article>
            <strong>10 小时 → 5 分钟</strong>
            <p>GeoField 单次空间数据整理流程</p>
          </article>
          <article>
            <strong>30 分钟 → 1 分钟</strong>
            <p>场景实验问卷单份配置流程</p>
          </article>
          <article>
            <strong>3 个项目</strong>
            <p>本作品集中可查看的已完成项目</p>
          </article>
        </div>
        <div className={styles.watercolorGallery}>
          <div className={styles.watercolorHeading}>
            <span>水彩创作 / WATERCOLOR STUDIES</span>
            <small>以下作品均为赵庆卓本人原创水彩作品，非网络图片。</small>
          </div>
          <div className={styles.watercolorStrip}>
            {[
              '/watercolor/watercolor-01.webp',
              '/watercolor/watercolor-02.webp',
              '/watercolor/watercolor-03.webp',
              '/watercolor/watercolor-04.webp',
              '/watercolor/watercolor-05.webp',
              '/watercolor/watercolor-06.webp',
            ].map((src, index) => (
              <figure key={src}>
                <Image src={src} fill sizes="(max-width: 700px) 58vw, 18vw" alt={`赵庆卓原创水彩作品 ${index + 1}`} />
                <span>0{index + 1}</span>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
