import clsx from 'clsx';
import styles from '@src/components/dom/styles/preFooter.module.scss';

function PreFooter() {
  return (
    <section id="contact" className={clsx(styles.root, 'layout-block-inner')}>
      <div className={styles.label}>CONTACT / 2026</div>
      <h2>赵庆卓</h2>
      <p>AI 产品经理 · 东南大学建筑学硕士 · 南京</p>
      <a href="mailto:zai_nanfang@163.com">
        zai_nanfang@163.com <b>↗</b>
      </a>
    </section>
  );
}

export default PreFooter;
