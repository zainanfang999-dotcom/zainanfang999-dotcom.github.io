import clsx from 'clsx';
import styles from '@src/components/dom/styles/preFooter.module.scss';
import { useRouter } from 'next/router';
import { isEnglishPath } from '@src/utils/locale';

function PreFooter() {
  const router = useRouter();
  const isEnglish = isEnglishPath(router.asPath);

  return (
    <section id="contact" className={clsx(styles.root, 'layout-block-inner')}>
      <div className={styles.label}>CONTACT / 2026</div>
      <h2>{isEnglish ? 'Zhao Qingzhuo' : '赵庆卓'}</h2>
      <p>{isEnglish ? 'AI Product Manager · M.Arch, Southeast University · Nanjing' : 'AI 产品经理 · 东南大学建筑学硕士 · 南京'}</p>
      <a href="mailto:zai_nanfang@163.com">
        zai_nanfang@163.com <b>↗</b>
      </a>
    </section>
  );
}

export default PreFooter;
