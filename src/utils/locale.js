export const isEnglishPath = (path = '') => path === '/en' || path.startsWith('/en/');

export const getLanguagePath = (path = '/', targetLanguage = 'en') => {
  const [pathAndQuery, hash = ''] = path.split('#');
  const [pathname = '/', query = ''] = pathAndQuery.split('?');
  let nextPath;

  if (targetLanguage === 'en') {
    if (isEnglishPath(pathname)) {
      nextPath = pathname;
    } else {
      nextPath = pathname === '/' ? '/en' : `/en${pathname}`;
    }
  } else {
    nextPath = isEnglishPath(pathname) ? pathname.replace(/^\/en(?=\/|$)/, '') || '/' : pathname;
  }

  return `${nextPath}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
};

export const localizeProject = (project, language = 'zh') => {
  if (language !== 'en') return project;

  return {
    ...project,
    title: project.titleEn,
    type: project.typeEn,
    link: project.linkEn,
    summary: project.summaryEn,
    outcome: project.outcomeEn,
    role: project.roleEn,
    problem: project.problemEn,
    approach: project.approachEn,
    result: project.resultEn,
    tags: project.tagsEn,
    ctaLabel: project.ctaLabelEn || project.ctaLabel,
    media: project.media?.map((item) => ({ ...item, title: item.titleEn, description: item.descriptionEn })),
  };
};
