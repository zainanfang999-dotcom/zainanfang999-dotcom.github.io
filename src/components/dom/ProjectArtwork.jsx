import Image from 'next/image';

function ProjectArtwork({ project, alt, sizes, priority = false }) {
  const imageStyle = { objectFit: project.coverFit || 'cover' };

  return (
    <>
      <Image priority={priority} src={project.cover} fill sizes={sizes} alt={alt} style={imageStyle} />
      {project.coverMotion && <Image priority={priority} unoptimized src={project.coverMotion} fill sizes={sizes} alt="" aria-hidden="true" style={imageStyle} />}
    </>
  );
}

export default ProjectArtwork;
