import SplitType from 'split-type';
import clsx from 'clsx';
import gsap from 'gsap';
import styles from '@src/components/dom/styles/loader.module.scss';
import { useIsomorphicLayoutEffect } from '@src/hooks/useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@src/store';
import { getPreloadAssets } from '@src/constants/preloadAssets';

const MINIMUM_LOADER_TIME = 3000;
const LOADER_TIMEOUT = 20000;

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new window.Image();
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;

      if (typeof image.decode === 'function') {
        image
          .decode()
          .catch(() => undefined)
          .finally(resolve);
      } else {
        resolve();
      }
    };

    image.onload = finish;
    image.onerror = resolve;
    image.src = src;

    if (image.complete) finish();
  });
}

async function prepareExperience(pathname, onProgress) {
  const assets = getPreloadAssets(pathname);
  const tasks = assets.map((src) => () => preloadImage(src));

  if (document.fonts?.ready) {
    tasks.push(() => document.fonts.ready.catch(() => undefined));
  }

  let completed = 0;
  let acceptProgress = true;
  const trackedTasks = tasks.map((task) =>
    task().finally(() => {
      completed += 1;
      if (acceptProgress) onProgress(Math.round((completed / tasks.length) * 96));
    }),
  );

  let timeoutId;
  await Promise.race([
    Promise.allSettled(trackedTasks),
    new Promise((resolve) => {
      timeoutId = window.setTimeout(resolve, LOADER_TIMEOUT);
    }),
  ]);
  acceptProgress = false;
  window.clearTimeout(timeoutId);

  await new Promise((resolve) => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function Loader() {
  const [lenis, introOut, setIntroOut, setIsLoading, setIsAbout] = useStore(useShallow((state) => [state.lenis, state.introOut, state.setIntroOut, state.setIsLoading, state.setIsAbout]));

  const progressRef = useRef(null);
  const fullNameRef = useRef(null);
  const shortNameRef = useRef(null);
  const root = useRef(null);
  const hasStarted = useRef(false);
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    let ctx;
    if (!introOut && lenis && !hasStarted.current) {
      hasStarted.current = true;
      setIsAbout(router.pathname === '/about' || router.pathname === '/en/about');

      ctx = gsap.context(() => {
        const startedAt = window.performance.now();
        const updateProgress = (progress) => {
          if (progressRef.current) progressRef.current.textContent = `${progress}%`;
        };

        const playIntro = () => {
          gsap.set('header', {
            autoAlpha: 0,
            ease: 'power2.inOut',
          });

          const splitted = new SplitType(fullNameRef.current, {
            types: 'lines',
            tagName: 'span',
          });
          splitted.lines.forEach((line) => {
            gsap.to(line, {
              ease: 'power4.inOut',
              top: '-12vw',
              duration: 0.65,
            });
          });
          gsap.to(shortNameRef.current, {
            opacity: 1,
          });
          const splittedShort = new SplitType(shortNameRef.current, {
            types: 'lines',
            tagName: 'span',
          });
          splittedShort.lines.forEach((line) => {
            gsap.to(line, {
              ease: 'power4.inOut',
              top: '0px',
              duration: 0.65,
            });
          });

          const splittedProgress = new SplitType(progressRef.current, {
            types: 'lines',
            tagName: 'span',
          });
          splittedProgress.lines.forEach((line) => {
            gsap.to(line, {
              ease: 'power4.inOut',
              top: '-12vw',
              duration: 0.65,
            });
          });
          lenis.scrollTo(0, { force: true });
          gsap.set(document?.getElementById('layout'), {
            height: '90%',
          });

          gsap.set('main', {
            x: '100%',
            scale: 0.9,
            opacity: 1,
            border: '2px solid #f0f4f1',
            borderRadius: '1.3888888889vw',
          });

          gsap.to(root.current, {
            scale: 0.9,
            ease: 'power2.inOut',
            delay: 0.2,
            duration: 0.4,
            borderRadius: '1.3888888889vw',
          });
          gsap.to(root.current, {
            ease: 'power2.inOut',
            delay: 0.65,
            duration: 0.5,
            x: '-100%',
          });

          gsap.to('main', {
            ease: 'power2.inOut',
            delay: 0.65,
            duration: 0.5,
            x: '0px',
          });
          gsap.to('main', {
            ease: 'power2.inOut',
            delay: 1.15,
            duration: 0.4,
            scale: 1,
            borderRadius: 0,
          });
          gsap.to(document?.getElementById('layout'), {
            ease: 'power2.inOut',
            delay: 1.15,
            duration: 0.4,
            height: '100%',
          });
          gsap.to('header', {
            delay: 1.2,
            duration: 0.35,
            ease: 'power2.inOut',
            autoAlpha: 1,
          });
          gsap.to('main', {
            ease: 'power2.inOut',
            delay: 1.55,
            height: 'auto',
            border: 'none',
            pointerEvents: 'auto',
            onComplete: () => {
              setIntroOut(true);
              setIsLoading(false);
              lenis.start();
            },
          });
        };

        prepareExperience(router.pathname, updateProgress).then(() => {
          const elapsed = window.performance.now() - startedAt;
          window.setTimeout(
            () => {
              updateProgress(100);
              window.setTimeout(playIntro, 180);
            },
            Math.max(0, MINIMUM_LOADER_TIME - elapsed),
          );
        });
      });
    } else if (ctx) {
      ctx.kill();
    }

    return () => {
      if (ctx) {
        ctx.kill();
      }
    };
  }, [lenis, introOut]);

  return (
    <div id="loader" ref={root} className={clsx(styles.root, 'layout-block-inner')}>
      <div className={styles.innerContainer}>
        <div className={styles.fullNameContainer}>
          <h2 ref={fullNameRef} className={clsx(styles.fullName, 'h2')}>
            {introOut ? 'Loading' : 'Zhao Qingzhuo'}
          </h2>
        </div>

        {!introOut && (
          <div className={styles.shortNameContainer}>
            <h2 ref={shortNameRef} className={clsx(styles.shortName, 'h2')}>
              AI Product Manager
            </h2>
          </div>
        )}

        {!introOut && (
          <div className={styles.progressContainer}>
            <h1 ref={progressRef} className={clsx(styles.progress, 'h1')}>
              0%
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loader;
