const HOME_ASSETS = [
  '/garden-landscape-hero.webp',
  '/art/garden-scroll-web.webp',
  '/art/memory-box-web.webp',
  '/art/garden-axon-web.webp',
  '/project-wardrobe.png',
  '/project-geofield.png',
  '/project-survey.png',
  '/projects/cubist-fountain/cover-poster.webp',
  '/projects/cubist-fountain/cover-assembly.webp',
  '/projects/cubist-fountain/workflow-assembly.webp',
  '/projects/cubist-fountain/workflow-rotation.webp',
  '/projects/cubist-fountain/prototype.webp',
  '/watercolor/watercolor-01.webp',
  '/watercolor/watercolor-02.webp',
  '/watercolor/watercolor-03.webp',
  '/watercolor/watercolor-04.webp',
  '/watercolor/watercolor-05.webp',
  '/watercolor/watercolor-06.webp',
];

const PROJECT_ASSETS = ['/project-wardrobe.png', '/project-geofield.png', '/project-survey.png', '/projects/cubist-fountain/cover-poster.webp', '/projects/cubist-fountain/cover-assembly.webp'];

const CUBIST_ASSETS = [...PROJECT_ASSETS, '/projects/cubist-fountain/workflow-assembly.webp', '/projects/cubist-fountain/workflow-rotation.webp', '/projects/cubist-fountain/prototype.webp'];

export function getPreloadAssets(pathname) {
  if (pathname === '/' || pathname === '/en') return HOME_ASSETS;
  if (pathname?.endsWith('/projects/cubist-fountain')) return CUBIST_ASSETS;
  if (pathname?.startsWith('/projects') || pathname?.startsWith('/en/projects')) return PROJECT_ASSETS;
  return [];
}

export default HOME_ASSETS;
