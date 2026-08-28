import AppearTitle from '@src/components/animationComponents/appearTitle/Index';
import Link from 'next/link';
import LinkText from '@src/components/animationComponents/linkText/Index';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import footerLinks from '@src/components/dom/navbar/constants/footerLinks';
import gsap from 'gsap';
import menuLinksZh, { menuLinksEn } from '@src/components/dom/navbar/constants/menuLinks';
import styles from '@src/components/dom/styles/footer.module.scss';
import useIsMobile from '@src/hooks/useIsMobile';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { useWindowSize } from '@darkroom.engineering/hamo';
import { useRouter } from 'next/router';
import { isEnglishPath } from '@src/utils/locale';

const GoTop = dynamic(() => import('@src/components/dom/GoTop'), {
  ssr: false,
});

function Footer() {
  const isMobile = useIsMobile();
  const footerRef = useRef();
  const [isLoading] = useStore(useShallow((state) => [state.isLoading]));
  const windowSize = useWindowSize();
  const router = useRouter();
  const isEnglish = isEnglishPath(router.asPath);
  const menuLinks = isEnglish ? menuLinksEn : menuLinksZh;

  useIsomorphicLayoutEffect(() => {
    if (!isLoading) {
      gsap.set(footerRef.current, { height: 'auto' });
      const sections = document.querySelectorAll('#mainContainer section');
      const lastSection = sections[sections.length - 2];
      if (lastSection && footerRef.current.offsetHeight <= windowSize.height) {
        gsap.set(footerRef.current, { yPercent: -50, height: '100.5svh' });
        const uncover = gsap.timeline({ paused: true }).to(footerRef.current, { yPercent: 0, ease: 'none' });
        ScrollTrigger.create({
          id: 'footerTrigger',
          trigger: lastSection,
          start: 'bottom bottom',
          end: '+=100%',
          animation: uncover,
          scrub: true,
          scroller: document?.querySelector('main'),
        });
      }
    }
    return () => ScrollTrigger.getById('footerTrigger')?.kill();
  }, [isLoading, windowSize.height]);

  return (
    <section ref={footerRef} className={clsx(styles.root, 'layout-grid-inner')} role="contentinfo">
      <div style={{ gridColumn: isMobile ? '1 / 3' : '1 / 5' }} className={styles.linksContainer}>
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6')}>{isEnglish ? 'NAVIGATION' : '导航'}</h6>
          {menuLinks.slice(0, -1).map((link) => (
            <div key={link.title} className={styles.linkTextContainer}>
              <LinkText className={styles.linkText} title={link.title} href={link.href}>
                <span className="footer">{link.title}</span>
              </LinkText>
            </div>
          ))}
        </AppearTitle>
      </div>
      <div style={{ gridColumn: isMobile ? '3 / 7' : '5 / 9' }} className={styles.linksContainer}>
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6')}>{isEnglish ? 'LINKS' : '链接'}</h6>
          {footerLinks.map((link) => (
            <div key={link.title} className={styles.linkTextContainer}>
              <LinkText target className={styles.linkText} title={link.title} href={link.href}>
                <span className="footer">{link.title}</span>
              </LinkText>
            </div>
          ))}
        </AppearTitle>
      </div>
      <div className={styles.emailContaineer}>
        <AppearTitle isFooter>
          <h4 className={clsx(styles.workWithMe, 'h4')}>{isEnglish ? 'LET’S KEEP IN TOUCH:' : '保持联系：'}</h4>
          <div className={styles.link}>
            <Link aria-label="发送邮件" href="mailto:zai_nanfang@163.com">
              <h4 className={clsx(styles.email, 'h4')}>zai_nanfang@163.com</h4>
            </Link>
          </div>
        </AppearTitle>
      </div>
      <div className={styles.middleContainer} style={{ gridColumn: '1 / 9' }}>
        <AppearTitle isFooter>
          <div className="p-x">Nanjing, China</div>
          <div className={clsx('p-x', styles.middleText)}>AI Product Manager · Portfolio 2026</div>
        </AppearTitle>
      </div>
      <div className={styles.middleContainer} style={{ gridColumn: '9 / 13' }}>
        <AppearTitle isFooter>
          <div className="p-x">Open to opportunities</div>
          <div className={clsx('p-x', styles.middleText)}>{isEnglish ? 'Product / AI Products / User Research' : '产品 / AI 产品 / 用户研究'}</div>
        </AppearTitle>
      </div>
      <div
        className={styles.middleContainer}
        style={{
          gridColumn: '13 / 17',
          textAlign: isMobile ? 'left' : 'right',
        }}
      >
        <AppearTitle isFooter>
          <div className="p-x">© 2026 · {isEnglish ? 'Zhao Qingzhuo' : '赵庆卓'}</div>
          <div className={clsx('p-x', styles.middleText)}>Original framework: Evangelos Giatsidis</div>
        </AppearTitle>
      </div>
      <div className={styles.giats}>
        <span>ZQZ</span>
      </div>
      <div className={styles.goToTop}>
        <GoTop />
      </div>
    </section>
  );
}

export default Footer;
