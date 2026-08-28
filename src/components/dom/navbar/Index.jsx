import ButtonLink from '@src/components/animationComponents/buttonLink/Index';
import Link from 'next/link';
import MenuButton from '@src/components/dom/navbar/components/MenuButton';
import MenuLinks from '@src/components/dom/navbar/components/MenuLinks';
import clsx from 'clsx';
import styles from '@src/components/dom/navbar/styles/index.module.scss';
import { useCallback } from 'react';
import useIsMobile from '@src/hooks/useIsMobile';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { getLanguagePath, isEnglishPath } from '@src/utils/locale';

function Navbar() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [lenis] = useStore(useShallow((state) => [state.lenis]));
  const isEnglish = isEnglishPath(router.asPath);
  const homeHref = isEnglish ? '/en' : '/';
  const languageHref = getLanguagePath(router.asPath, isEnglish ? 'zh' : 'en');

  const scrollToPosition = useCallback(
    (position, duration = 1.5) => {
      if (lenis) {
        lenis.scrollTo(position, {
          duration,
          force: true,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          onComplete: () => {
            lenis.start();
          },
        });
      }
    },
    [lenis],
  );

  const goToTop = useCallback(() => {
    if (router.pathname === '/' || router.pathname === '/en') {
      scrollToPosition(0);
    }
  }, [router.pathname, scrollToPosition]);

  return (
    <>
      <MenuLinks />

      <header className={styles.root} role="banner">
        <div className={styles.innerHeader}>
          <Link onClick={goToTop} aria-label="Go home" scroll={false} href={homeHref}>
            <h4 className={clsx('bold', 'h4')}>ZQZ</h4>
          </Link>

          <div className={styles.rightContainer}>
            {!isMobile && <ButtonLink href="mailto:zai_nanfang@163.com" label={isEnglish ? 'CONTACT' : '联系我 / CONTACT'} />}
            <Link className={styles.languageSwitch} aria-label={isEnglish ? '切换至中文版' : 'Switch to English'} scroll={false} href={languageHref}>
              {isEnglish ? '中' : 'EN'}
            </Link>
            <MenuButton />
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
