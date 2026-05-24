import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Skill = {
  label: string;
  className: string;
};

type OrbitIcon = {
  icon: string;
  label: string;
  className: string;
};

const skills: Skill[] = [
  { label: "SWE", className: "skill-purple" },
  { label: "AI / ML", className: "skill-pink" },
  { label: "Cognitive Science", className: "skill-yellow" },
  { label: "Creative Computing", className: "skill-blue" },
];

const orbitIcons: OrbitIcon[] = [
  { icon: "🍎", label: "Cognitive science", className: "orbit-top" },
  { icon: "🍎", label: "AI projects", className: "orbit-left" },
  { icon: "🍎", label: "Code", className: "orbit-right" },
  { icon: "🍎", label: "Developer tools", className: "orbit-bottom-left" },
  { icon: "🍎", label: "Creative ideas", className: "orbit-bottom-right" },
];

function App() {
  return (
    <main className="hero-shell">
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
            <div className={`orbit-icon ${item.className}`} key={item.label}>
              <span aria-hidden="true">{item.icon}</span>
              <span className="sr-only">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
