import { StrictMode, useState } from "react";
import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Skill = {
  label: string;
  className: string;
};

type OrbitIcon = {
  icon: string;
  label: string;
  tone: string;
  angle: string;
  duration: string;
};

type ExperienceTopic = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  imageLabel: string;
  imageEmoji: string;
  icon: string;
  tone: string;
  angle: string;
  counterAngle: string;
};

type Project = {
  title: string;
  description: string;
  icon: string;
  tone: string;
  tags: string[];
};

const skills: Skill[] = [
  { label: "SWE", className: "skill-purple" },
  { label: "AI / ML", className: "skill-pink" },
  { label: "Cognitive Science", className: "skill-yellow" },
  { label: "Creative Computing", className: "skill-blue" },
];

const orbitIcons: OrbitIcon[] = [
  { icon: "🍎", label: "Cognitive science", tone: "orbit-pink", angle: "8deg", duration: "34s" },
  { icon: "🍎", label: "AI projects", tone: "orbit-lilac", angle: "276deg", duration: "38s" },
  { icon: "🍎", label: "Code", tone: "orbit-violet", angle: "78deg", duration: "32s" },
  { icon: "🍎", label: "Developer tools", tone: "orbit-blue", angle: "226deg", duration: "36s" },
  { icon: "🍎", label: "Creative ideas", tone: "orbit-yellow", angle: "134deg", duration: "40s" },
];

const particles = Array.from({ length: 16 }, (_, index) => index);

const experienceTopics: ExperienceTopic[] = [
  {
    id: "search",
    title: "Search Systems",
    subtitle: "Information retrieval & ranking",
    body: "I like building systems that help people find the right information quickly, from ranking logic to thoughtful result experiences.",
    imageLabel: "Search systems placeholder",
    imageEmoji: "🔍",
    icon: "🔍",
    tone: "topic-pink",
    angle: "0deg",
    counterAngle: "0deg",
  },
  {
    id: "ai",
    title: "AI / Machine Learning",
    subtitle: "Models, agents & data pipelines",
    body: "I work across practical AI workflows: preparing data, designing model-powered features, and turning prototypes into useful tools.",
    imageLabel: "AI and machine learning placeholder",
    imageEmoji: "🧠",
    icon: "🧠",
    tone: "topic-rose",
    angle: "300deg",
    counterAngle: "-300deg",
  },
  {
    id: "research",
    title: "Research",
    subtitle: "Cognitive science & neurotech",
    body: "My cognitive science background keeps me curious about attention, learning, memory, and how technology can support human thinking.",
    imageLabel: "Research placeholder",
    imageEmoji: "🧪",
    icon: "🧪",
    tone: "topic-purple",
    angle: "180deg",
    counterAngle: "-180deg",
  },
  {
    id: "software",
    title: "Software Engineering",
    subtitle: "Full-stack development",
    body: "I enjoy shipping polished, reliable interfaces backed by clean data flows, accessible components, and maintainable TypeScript.",
    imageLabel: "Software engineering placeholder",
    imageEmoji: "💻",
    icon: "💻",
    tone: "topic-lilac",
    angle: "240deg",
    counterAngle: "-240deg",
  },
  {
    id: "leadership",
    title: "Leadership",
    subtitle: "Teamwork & mentorship",
    body: "I care about helping teams communicate clearly, support one another, and turn ambitious ideas into steady progress.",
    imageLabel: "Leadership placeholder",
    imageEmoji: "🤝",
    icon: "🤝",
    tone: "topic-yellow",
    angle: "120deg",
    counterAngle: "-120deg",
  },
  {
    id: "systems",
    title: "Technical Foundations",
    subtitle: "Algorithms, data & CS fundamentals",
    body: "Coursework and projects have strengthened my foundations in algorithms, data structures, databases, and system design.",
    imageLabel: "Technical foundations placeholder",
    imageEmoji: "⚙️",
    icon: "⚙️",
    tone: "topic-blue",
    angle: "60deg",
    counterAngle: "-60deg",
  },
];

const projects: Project[] = [
  {
    title: "Uber Search",
    description:
      "Rebuilt search relevance and ranking to improve rider and driver experiences.",
    icon: "🔍",
    tone: "project-purple",
    tags: ["Python", "Lucene", "A/B Testing"],
  },
  {
    title: "Clinical AI Claims Agent",
    description:
      "Built an AI agent that extracts, classifies, and summarizes medical claims.",
    icon: "🧠",
    tone: "project-pink",
    tags: ["LLM", "NLP", "FastAPI"],
  },
  {
    title: "EEG Sorting Hat",
    description:
      "Classifies cognitive states from EEG signals using deep learning.",
    icon: "〰️",
    tone: "project-blue",
    tags: ["PyTorch", "EEG", "DL"],
  },
  {
    title: "Amigos Route Optimization Platform",
    description: "Optimizes delivery routes to save time and miles.",
    icon: "📍",
    tone: "project-yellow",
    tags: ["React", "Python", "Maps API"],
  },
];

function App() {
  const [activeTopicId, setActiveTopicId] = useState(experienceTopics[0].id);
  const activeTopic =
    experienceTopics.find((topic) => topic.id === activeTopicId) ?? experienceTopics[0];

  return (
    <main className="portfolio-page">
      <div className="hero-shell">
        <div className="particle-field" aria-hidden="true">
          {particles.map((particle) => (
            <span key={particle} />
          ))}
        </div>

        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Nataliia Kulieshova home">
            NK
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#blog">Blog</a>
            <a className="chat-button" href="mailto:hello@example.com">
              Let's Chat!
            </a>
          </div>
        </nav>

        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              Hi there, <span aria-hidden="true">👋</span>
            </p>
            <h1 id="hero-title">I'm Nataliia Kulieshova!</h1>
            <p className="study-line">
              I'm a junior at <strong>UC Berkeley</strong> studying Computer Science and
              Cognitive Science.
            </p>
            <p className="intro">
              I love building impactful software, exploring AI/ML, understanding how the
              mind works, and creating experiences that make a difference.
            </p>
            <div className="skills" aria-label="Areas of interest">
              {skills.map((skill) => (
                <span className={`skill ${skill.className}`} key={skill.label}>
                  {skill.label}
                </span>
              ))}
            </div>
          </div>

          <div className="portrait-stage" aria-label="Portrait placeholder and interests">
            <div className="orbit-ring" aria-hidden="true" />
            <div className="portrait-frame">
              <div className="portrait-placeholder">
                <span className="placeholder-emoji" aria-hidden="true">
                  🍎
                </span>
                <span className="placeholder-text">Image placeholder</span>
              </div>
            </div>
            {orbitIcons.map((item) => (
              <div
                className="orbit-track"
                key={item.label}
                style={
                  {
                    "--orbit-angle": item.angle,
                    "--orbit-duration": item.duration,
                  } as CSSProperties
                }
              >
                <div className={`orbit-icon ${item.tone}`}>
                  <span aria-hidden="true">{item.icon}</span>
                </div>
                <span className="sr-only">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="experience" className="experience-section" aria-labelledby="experience-title">
        <div className="experience-copy">
          <div className="section-icon" aria-hidden="true">
            🎓
          </div>
          <h2 id="experience-title">Education & Technical Experience</h2>
          <p>
            I combine strong foundations in CS and Cognitive Science with hands-on
            experience through internships, research, and engineering projects that solve
            real problems.
          </p>
        </div>

        <div className="experience-orbit" aria-label="Interactive experience topics">
          <div className="experience-ring" aria-hidden="true" />
          <div className="experience-portrait" aria-live="polite">
            <span className="experience-placeholder-emoji" aria-hidden="true">
              {activeTopic.imageEmoji}
            </span>
            <span>{activeTopic.imageLabel}</span>
          </div>

          {experienceTopics.map((topic) => (
            <button
              className={`topic-bubble ${topic.tone} ${topic.id === activeTopicId ? "is-active" : ""}`}
              key={topic.id}
              onClick={() => setActiveTopicId(topic.id)}
              style={
                {
                  "--topic-angle": topic.angle,
                  "--topic-counter-angle": topic.counterAngle,
                } as CSSProperties
              }
              type="button"
              aria-pressed={topic.id === activeTopicId}
              aria-label={`Show ${topic.title}`}
            >
              <span aria-hidden="true">{topic.icon}</span>
            </button>
          ))}
        </div>

        <aside className="experience-details" aria-live="polite">
          <ul className="topic-list">
            {experienceTopics.slice(0, 5).map((topic) => (
              <li className={topic.id === activeTopicId ? "is-active" : ""} key={topic.id}>
                <button type="button" onClick={() => setActiveTopicId(topic.id)}>
                  <span className="topic-dot" aria-hidden="true" />
                  <span>
                    <strong>{topic.title}</strong>
                    <small>{topic.subtitle}</small>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="active-topic-panel">
            <span className="active-topic-icon" aria-hidden="true">
              {activeTopic.icon}
            </span>
            <div>
              <h3>{activeTopic.title}</h3>
              <p>{activeTopic.body}</p>
            </div>
          </div>
        </aside>
      </section>

      <section id="projects" className="projects-section" aria-labelledby="projects-title">
        <div className="projects-heading">
          <h2 id="projects-title">
            <span aria-hidden="true">⭐</span>
            Projects
          </h2>
          <p>A few projects I'm proud of.</p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className={`project-icon ${project.tone}`} aria-hidden="true">
                {project.icon}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <a className="github-button" href="https://github.com/" target="_blank" rel="noreferrer">
          <span>View more on GitHub</span>
          <span aria-hidden="true">🐙</span>
        </a>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
