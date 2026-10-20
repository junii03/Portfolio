// Preview shown for a project: the real screenshot when we have one, otherwise a
// generated typographic card so every row on the Works list can still preview.
const ProjectPreview = ({ project, className = '', imgClassName = '', eager = false }) => {
    if (project.image) {
        const [w, h] = project.imageSize ?? [1600, 900];
        return (
            <img
                src={project.image}
                alt={`${project.name} screenshot`}
                width={w}
                height={h}
                className={`${className} ${imgClassName}`}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
            />
        );
    }
    const accent = project.accent ?? '#cfa355';
    return (
        <div
            role="img"
            aria-label={`${project.name} — ${project.frameworks.join(', ')}`}
            className={`${className} relative flex aspect-video flex-col justify-between overflow-hidden bg-black p-8 text-white md:p-12`}
            style={{
                backgroundImage: `radial-gradient(120% 120% at 100% 0%, ${accent}66 0%, transparent 55%), radial-gradient(90% 90% at 0% 100%, ${accent}33 0%, transparent 60%)`,
            }}
        >
            <p className="text-xs uppercase tracking-[0.35em] text-white/60 md:text-sm">{project.kind}</p>
            <div>
                <p className="text-4xl leading-none uppercase md:text-6xl">{project.name}</p>
                <p className="mt-4 text-xs tracking-[0.2em] uppercase md:text-sm" style={{ color: accent }}>
                    {project.frameworks.join(' · ')}
                </p>
            </div>
        </div>
    );
};

export default ProjectPreview;
