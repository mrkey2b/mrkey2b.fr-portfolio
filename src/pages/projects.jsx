import { Link } from "react-router-dom";
import { Navbar } from "../components";
import { projects } from "../constants";

const ProjectsPage = () => {
    return (
        <div className='relative min-h-screen overflow-hidden bg-primary text-white'>
            <Navbar />

            {/* Background global full page */}
            <div className='absolute inset-0 -z-0'>
                <div className='absolute inset-0 bg-primary' />
                <div className='absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat opacity-40' />

                {/* Dégradés / glow */}
                <div className='absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-purple-700/20 blur-3xl' />
                <div className='absolute top-[20%] right-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-600/20 blur-3xl' />
                <div className='absolute bottom-[-100px] left-[10%] h-[280px] w-[280px] rounded-full bg-indigo-600/20 blur-3xl' />
                <div className='absolute bottom-[15%] right-[5%] h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-3xl' />

                {/* Overlay sombre pour garder la lisibilité */}
                <div className='absolute inset-0 bg-black/30' />
            </div>

            {/* Contenu */}
            <div className='relative z-10 pt-28'>
                <section className='mx-auto max-w-7xl px-6 py-12'>
                    <div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
                        <div>

                            <h1 className='mt-6 text-4xl font-black md:text-6xl'>
                                Mes <span className='text-violet-400'>Projects</span>
                            </h1>

                            <p className='mt-4 max-w-3xl text-[16px] leading-[28px] text-secondary'>
                                Une sélection de projets conçus, développés et déployés, avec
                                preview dynamique, stack technique et accès direct aux démos et repositories.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='mx-auto max-w-7xl px-6 pb-20'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3'>
                        {projects.map((project) => (
                            <article
                                key={project.id}
                                className='group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07]'
                            >
                                <div className='relative aspect-[16/10] overflow-hidden'>
                                    {project.previewVideo ? (
                                        <video
                                            src={project.previewVideo}
                                            poster={project.image}
                                            className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    ) : (
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                                        />
                                    )}

                                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80' />

                                    <div className='absolute bottom-4 left-4 right-4 flex flex-wrap gap-3 opacity-0 translate-y-4 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                                        {project.live_link && (
                                            <a
                                                href={project.live_link}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]'
                                            >
                                                Voir le site
                                            </a>
                                        )}

                                        {project.source_code_link && (
                                            <a
                                                href={project.source_code_link}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-black/40'
                                            >
                                                Code source
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className='p-5'>
                                    <div className='flex items-start justify-between gap-4'>
                                        <h2 className='text-[22px] font-bold'>{project.name}</h2>

                                        {project.status && (
                                            <span className='rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300'>
                                                {project.status}
                                            </span>
                                        )}
                                    </div>

                                    <p className='mt-3 text-[14px] leading-[24px] text-secondary'>
                                        {project.description}
                                    </p>

                                    <div className='mt-4 flex flex-wrap gap-2'>
                                        {project.tags?.map((tag) => (
                                            <span
                                                key={tag.name}
                                                className={`rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[12px] ${tag.color}`}
                                            >
                                                #{tag.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className='mt-5 flex flex-wrap gap-2'>
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-lg bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10'
                                            >
                                                GitHub
                                            </a>
                                        )}

                                        {project.gitlab && (
                                            <a
                                                href={project.gitlab}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-lg bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10'
                                            >
                                                GitLab
                                            </a>
                                        )}

                                        {project.gitea && (
                                            <a
                                                href={project.gitea}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-lg bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10'
                                            >
                                                Gitea
                                            </a>
                                        )}

                                        {project.nexus && (
                                            <a
                                                href={project.nexus}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='rounded-lg bg-white/5 px-3 py-2 text-xs transition hover:bg-white/10'
                                            >
                                                Nexus
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectsPage;