import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const strengths = [
  {
    title: "Développement Web & Frontend / Backend",
    description:
      "Maîtrise des fondamentaux HTML, CSS et JavaScript, ainsi que des frameworks modernes comme React, avec une attention particulière portée au design, à l’ergonomie et à l’expérience utilisateur.",
  },
  {
    title: "Backend & APIs",
    description:
      "Conception d’architectures backend robustes avec Node.js, développement d’APIs performantes, sécurisées et maintenables, avec une intégration propre dans des environnements réels.",
  },
  {
    title: "Base de données",
    description:
      "Expérience sur MySQL pour la modélisation, la gestion et l’optimisation des données, avec une logique applicative pensée pour la fiabilité et la performance.",
  },
  {
    title: "Systèmes, DevOps & Déploiement",
    description:
      "Utilisation de Docker, Kubernetes, Nginx, Git, Linux et d’autres outils d’infrastructure pour industrialiser les déploiements, fiabiliser les environnements et automatiser les workflows.",
  },
  {
    title: "Polyvalence & montée en compétences",
    description:
      "Autodidacte, curieux et passionné par le développement, la programmation et l’écosystème tech dans son ensemble, avec une capacité à apprendre rapidement et à m’adapter à de nouveaux contextes techniques.",
  },
  {
    title: "Projets innovants",
    description:
      "Développement de solutions sur mesure, applications React, outils backend, bots, interfaces interactives et projets orientés production avec une vraie logique de résultat.",
  },
];

const stack = [
  "React",
  "Vite",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "MySQL",
  "Docker",
  "Kubernetes",
  "Nginx",
  "Git",
  "Linux",
  "TailwindCSS",
];

const ServiceCardContent = ({ title, icon }) => (
  <div className='rounded-[24px] border border-white/10 bg-[#0b1220]/95 px-6 sm:px-8 py-8 sm:py-10 min-h-[220px] sm:min-h-[260px] flex justify-center items-center flex-col text-center'>
    <div className='flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]'>
      <img
        src={icon}
        alt={title}
        className='w-10 h-10 sm:w-12 sm:h-12 object-contain select-none pointer-events-none'
        draggable='false'
      />
    </div>

    <h3 className='mt-5 sm:mt-6 text-white text-[18px] sm:text-[20px] font-bold leading-[26px] sm:leading-[28px]'>
      {title}
    </h3>

    <div className='mt-4 h-[1px] w-12 bg-gradient-to-r from-transparent via-violet-400 to-transparent' />
  </div>
);

const ServiceCard = ({ index, title, icon, isMobile }) => {
  if (isMobile) {
    return (
      <motion.div
        variants={fadeIn("up", "spring", index * 0.12, 0.65)}
        className='w-full sm:w-[250px]'
      >
        <div className='w-full rounded-[24px] bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 p-[1px]'>
          <ServiceCardContent title={title} icon={icon} />
        </div>
      </motion.div>
    );
  }

  return (
    <Tilt
      className='w-full sm:w-[250px]'
      options={{
        max: 10,
        scale: 1.01,
        speed: 300,
        glare: false,
        maxGlare: 0,
        perspective: 1000,
        reset: true,
      }}
    >
      <motion.div
        variants={fadeIn("up", "spring", index * 0.15, 0.75)}
        className='w-full rounded-[24px] bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 p-[1px] transform-gpu will-change-transform [backface-visibility:hidden] [transform-style:preserve-3d] isolate'
      >
        <ServiceCardContent title={title} icon={icon} />
      </motion.div>
    </Tilt>
  );
};

const StrengthCard = ({ index, title, description }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.12, 0.7)}
    className='rounded-[22px] border border-white/10 bg-white/5 md:backdrop-blur-lg p-5 sm:p-6 transition duration-300 hover:border-violet-400/30 hover:bg-white/[0.07]'
  >
    <div className='mb-4 flex items-center gap-3'>
      <div className='h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(167,139,250,0.8)]' />
      <h3 className='text-white text-[17px] sm:text-[18px] font-semibold'>
        {title}
      </h3>
    </div>

    <p className='text-secondary text-[14px] sm:text-[15px] leading-[26px] sm:leading-[28px]'>
      {description}
    </p>
  </motion.div>
);

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()} className='text-center'>
        <p className={styles.sectionSubText}>Présentation</p>
        <h2 className={styles.sectionHeadText}>À propos</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='relative mt-10 overflow-hidden rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#0b1220]/85 md:bg-[#0b1220]/75 p-5 sm:p-8 md:p-10 md:backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]'
      >
        <div className='absolute -top-20 -left-16 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-violet-500/20 blur-3xl' />
        <div className='absolute bottom-0 right-0 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-cyan-500/10 blur-3xl' />

        <div className='relative z-10 grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr]'>
          <div>
            <div className='inline-flex max-w-full flex-wrap items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-violet-300'>
              Développeur Web • React • Node.js • Autodidacte
            </div>

            <h3 className='mt-5 sm:mt-6 text-white text-[24px] sm:text-[28px] md:text-[36px] font-black leading-[1.2]'>
              Développeur autodidacte, passionné par la programmation, le web et les technologies modernes.
            </h3>

            <p className='mt-5 sm:mt-6 max-w-3xl text-secondary text-[15px] sm:text-[16px] leading-[28px] sm:leading-[30px]'>
              Bienvenue sur mon portfolio interactif. Je suis un développeur polyvalent
              et autodidacte, toujours à la recherche de nouveaux défis pour concevoir
              des solutions techniques innovantes, fiables et efficaces. Mon expertise
              couvre aussi bien le frontend que le backend, ce qui me permet d’intervenir
              sur des projets complets, de l’interface utilisateur jusqu’à la mise en
              production.
            </p>

            <p className='mt-4 max-w-3xl text-secondary text-[15px] sm:text-[16px] leading-[28px] sm:leading-[30px]'>
              Le développement et la programmation occupent une place centrale dans mon
              quotidien. J’aime comprendre les systèmes, construire des applications
              utiles, optimiser les performances et faire évoluer mes compétences à
              travers de nouvelles technos, de nouveaux outils et des problématiques
              concrètes.
            </p>

            <p className='mt-4 max-w-3xl text-secondary text-[15px] sm:text-[16px] leading-[28px] sm:leading-[30px]'>
              J’utilise régulièrement des technologies comme React, Node.js, MySQL,
              Docker, Kubernetes, Nginx, Git, Linux, TailwindCSS et bien d’autres,
              selon les besoins du projet. Mon objectif est de livrer des solutions
              maintenables, modernes et adaptées à un contexte réel de développement
              et de déploiement.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4'>
            <div className='rounded-[22px] border border-white/10 bg-white/5 p-5 sm:p-6 md:backdrop-blur-xl'>
              <p className='text-[12px] sm:text-[13px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-violet-300'>
                Stack & environnement
              </p>

              <div className='mt-4 flex flex-wrap gap-2'>
                {stack.map((item) => (
                  <span
                    key={item}
                    className='rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[12px] sm:text-[13px] text-white/90'
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className='rounded-[22px] border border-white/10 bg-gradient-to-br from-violet-500/10 via-white/5 to-cyan-500/10 p-5 sm:p-6 md:backdrop-blur-xl'>
              <p className='text-[12px] sm:text-[13px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-cyan-300'>
                Vision
              </p>

              <p className='mt-4 text-secondary text-[14px] sm:text-[15px] leading-[26px] sm:leading-[28px]'>
                Construire des applications modernes, performantes et bien structurées,
                avec une vraie cohérence entre design, logique métier, architecture
                technique et déploiement.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className='mt-14 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {strengths.map((item, index) => (
          <StrengthCard
            key={item.title}
            index={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>

      <div className='mt-20 flex flex-wrap gap-6 sm:gap-8 md:gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard
            key={service.title}
            index={index}
            isMobile={isMobile}
            {...service}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");