import { StrictMode, useEffect, useRef, useState } from "react";
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

type Award = {
  title: string;
  description: string;
  date: string;
  icon: string;
};

type Hobby = {
  id: string;
  title: string;
  description: string;
  info: string;
  icon: string;
  imageEmoji: string;
  imageLabel: string;
  x: string;
  y: string;
  size: string;
  delay: string;
  duration: string;
};

type BlogCategory = {
  id: string;
  label: string;
  icon: string;
};

type BlogArticle = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  icon: string;
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

const awards: Award[] = [
  {
    title: "UC Berkeley Honors Program",
    description: "Recognized for strong academic performance in Computer Science coursework.",
    date: "2026",
    icon: "🎓",
  },
  {
    title: "AI Research Fellowship",
    description: "Selected to explore applied machine learning for human-centered systems.",
    date: "2025",
    icon: "🧠",
  },
  {
    title: "Hackathon Finalist",
    description: "Built a polished product prototype under time pressure with a small team.",
    date: "2025",
    icon: "🏆",
  },
  {
    title: "Dean's List",
    description: "Earned recognition for consistent academic excellence across technical courses.",
    date: "2024",
    icon: "⭐",
  },
  {
    title: "Community Leadership Award",
    description: "Honored for mentoring peers and supporting collaborative student projects.",
    date: "2024",
    icon: "🤝",
  },
];

const hobbies: Hobby[] = [
  {
    id: "music",
    title: "Music",
    description: "I love using playlists as tiny mood boards for deep work and long walks.",
    info: "Current vibe: energetic songs that make debugging feel cinematic.",
    icon: "🎧",
    imageEmoji: "🎧",
    imageLabel: "Music placeholder",
    x: "14%",
    y: "41%",
    size: "54px",
    delay: "-1s",
    duration: "7.5s",
  },
  {
    id: "sleep",
    title: "Rest",
    description: "Good rest keeps my brain soft enough for hard problems.",
    info: "A reset nap can rescue an entire afternoon.",
    icon: "😴",
    imageEmoji: "🌙",
    imageLabel: "Rest placeholder",
    x: "36%",
    y: "24%",
    size: "62px",
    delay: "-4s",
    duration: "8.5s",
  },
  {
    id: "brain",
    title: "Cognitive Science",
    description: "I am endlessly curious about memory, attention, and how people learn.",
    info: "The best interfaces feel like they understand human limits.",
    icon: "🧠",
    imageEmoji: "🧠",
    imageLabel: "Cognitive science placeholder",
    x: "66%",
    y: "24%",
    size: "62px",
    delay: "-2.8s",
    duration: "8s",
  },
  {
    id: "lifting",
    title: "Strength Training",
    description: "Lifting gives me a satisfying way to practice patience and consistency.",
    info: "Small progress compounds beautifully when you keep showing up.",
    icon: "💪",
    imageEmoji: "💪",
    imageLabel: "Training placeholder",
    x: "25%",
    y: "35%",
    size: "58px",
    delay: "-5.2s",
    duration: "7.8s",
  },
  {
    id: "data",
    title: "Data Visualization",
    description: "I enjoy turning messy information into something people can actually read.",
    info: "A good chart is equal parts accuracy, empathy, and restraint.",
    icon: "📊",
    imageEmoji: "📊",
    imageLabel: "Data placeholder",
    x: "43%",
    y: "28%",
    size: "66px",
    delay: "-1.7s",
    duration: "8.2s",
  },
  {
    id: "flowers",
    title: "Flowers",
    description: "I love small visual details that make ordinary spaces feel considered.",
    info: "Sunflowers are basically optimism with petals.",
    icon: "🌻",
    imageEmoji: "🌻",
    imageLabel: "Flowers placeholder",
    x: "56%",
    y: "27%",
    size: "56px",
    delay: "-3.1s",
    duration: "7.2s",
  },
  {
    id: "weather",
    title: "Morning Walks",
    description: "A bright walk helps me sort through ideas before the day gets loud.",
    info: "The best ideas often arrive when I stop staring directly at them.",
    icon: "🌤️",
    imageEmoji: "🌤️",
    imageLabel: "Walks placeholder",
    x: "70%",
    y: "35%",
    size: "60px",
    delay: "-6s",
    duration: "9s",
  },
  {
    id: "robotics",
    title: "Creative Tech",
    description: "I like playful prototypes that blend code, interaction, and personality.",
    info: "A tiny delightful detail can make a tool feel alive.",
    icon: "🤖",
    imageEmoji: "🤖",
    imageLabel: "Creative tech placeholder",
    x: "94%",
    y: "45%",
    size: "48px",
    delay: "-2.2s",
    duration: "7.6s",
  },
  {
    id: "travel",
    title: "Exploring",
    description: "New places give me fresh patterns to notice and fresh snacks to try.",
    info: "I collect little observations more than souvenirs.",
    icon: "🧭",
    imageEmoji: "🧭",
    imageLabel: "Exploring placeholder",
    x: "86%",
    y: "31%",
    size: "58px",
    delay: "-4.8s",
    duration: "8.6s",
  },
  {
    id: "reading",
    title: "Reading",
    description: "Books are my favorite way to borrow another mind for a while.",
    info: "I bounce between science, essays, and stories with sharp characters.",
    icon: "📚",
    imageEmoji: "📚",
    imageLabel: "Reading placeholder",
    x: "8%",
    y: "45%",
    size: "42px",
    delay: "-3.7s",
    duration: "7.4s",
  },
  {
    id: "coffee",
    title: "Cafe Work",
    description: "A cozy cafe makes planning, writing, and prototyping feel easier.",
    info: "Background hum plus a good drink is a powerful little ritual.",
    icon: "☕",
    imageEmoji: "☕",
    imageLabel: "Cafe placeholder",
    x: "77%",
    y: "47%",
    size: "42px",
    delay: "-6.4s",
    duration: "8.8s",
  },
  {
    id: "graduation",
    title: "Learning",
    description: "I like collecting new skills and connecting them back to things I already know.",
    info: "The fun part is when two unrelated ideas suddenly shake hands.",
    icon: "🎓",
    imageEmoji: "🎓",
    imageLabel: "Learning placeholder",
    x: "10%",
    y: "50%",
    size: "44px",
    delay: "-2.5s",
    duration: "8.1s",
  },
];

const randomBubbleDelay = () => 10000 + Math.round(Math.random() * 5000);

const blogCategories: BlogCategory[] = [
  { id: "lab", label: "Lab Rat Articles", icon: "🐀" },
  { id: "tech", label: "Technology, AI/ML", icon: "💻" },
  { id: "cogsci", label: "Cognitive Science", icon: "🧠" },
  { id: "neurotech", label: "Neurotech", icon: "💪" },
];

const blogArticles: BlogArticle[] = [
  {
    title: "What Makes Search Feel Helpful?",
    excerpt: "A short reflection on ranking, relevance, and the invisible UX behind good search.",
    category: "tech",
    date: "May 2026",
    readTime: "4 min read",
    icon: "🔍",
  },
  {
    title: "Tiny Experiments in Attention",
    excerpt: "Notes on focus, task switching, and why our tools should respect cognitive limits.",
    category: "cogsci",
    date: "Apr 2026",
    readTime: "5 min read",
    icon: "🧠",
  },
  {
    title: "Learning From Lab Notes",
    excerpt: "How research logs can become a surprisingly useful design and engineering habit.",
    category: "lab",
    date: "Mar 2026",
    readTime: "3 min read",
    icon: "🐀",
  },
  {
    title: "Building Agents That Explain Themselves",
    excerpt: "Why AI systems need visible reasoning, good defaults, and graceful uncertainty.",
    category: "tech",
    date: "Feb 2026",
    readTime: "6 min read",
    icon: "🤖",
  },
  {
    title: "A Gentle Intro to EEG Signals",
    excerpt: "A beginner-friendly walkthrough of noisy signals, features, and cognitive states.",
    category: "neurotech",
    date: "Jan 2026",
    readTime: "7 min read",
    icon: "〰️",
  },
  {
    title: "Interfaces for Human Memory",
    excerpt: "A few ideas for software that supports recall instead of assuming perfect memory.",
    category: "cogsci",
    date: "Dec 2025",
    readTime: "4 min read",
    icon: "💭",
  },
  {
    title: "What I Learned Prototyping Fast",
    excerpt: "Lessons from turning fuzzy ideas into demos without losing sight of users.",
    category: "lab",
    date: "Nov 2025",
    readTime: "5 min read",
    icon: "🧪",
  },
  {
    title: "Data Pipelines as Creative Constraints",
    excerpt: "A practical note on why clean data flow is a product design decision too.",
    category: "tech",
    date: "Oct 2025",
    readTime: "4 min read",
    icon: "📊",
  },
  {
    title: "Neurotech and Everyday Tools",
    excerpt: "Imagining lightweight systems that make brain-computer interaction feel approachable.",
    category: "neurotech",
    date: "Sep 2025",
    readTime: "6 min read",
    icon: "⚡",
  },
];

function App() {
  const [activeTopicId, setActiveTopicId] = useState(experienceTopics[0].id);
  const [activeHobbyId, setActiveHobbyId] = useState(hobbies[0].id);
  const [poppedHobbies, setPoppedHobbies] = useState<Set<string>>(new Set());
  const [activeBlogCategory, setActiveBlogCategory] = useState("all");
  const [visibleBlogCount, setVisibleBlogCount] = useState(6);
  const hobbyTimers = useRef<Record<string, number>>({});
  const activeTopic =
    experienceTopics.find((topic) => topic.id === activeTopicId) ?? experienceTopics[0];
  const activeHobby = hobbies.find((hobby) => hobby.id === activeHobbyId) ?? hobbies[0];
  const filteredBlogArticles =
    activeBlogCategory === "all"
      ? blogArticles
      : blogArticles.filter((article) => article.category === activeBlogCategory);
  const visibleBlogArticles = filteredBlogArticles.slice(0, visibleBlogCount);
  const canLoadMoreBlogs = visibleBlogCount < filteredBlogArticles.length;

  useEffect(() => {
    return () => {
      Object.values(hobbyTimers.current).forEach(window.clearTimeout);
    };
  }, []);

  const popHobby = (hobbyId: string) => {
    setActiveHobbyId(hobbyId);
    setPoppedHobbies((current) => {
      const next = new Set(current);
      next.add(hobbyId);
      return next;
    });

    window.clearTimeout(hobbyTimers.current[hobbyId]);
    hobbyTimers.current[hobbyId] = window.setTimeout(() => {
      setPoppedHobbies((current) => {
        const next = new Set(current);
        next.delete(hobbyId);
        return next;
      });
      delete hobbyTimers.current[hobbyId];
    }, randomBubbleDelay());
  };

  const chooseBlogCategory = (categoryId: string) => {
    setActiveBlogCategory(categoryId);
    setVisibleBlogCount(6);
  };

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

      <section id="awards" className="awards-section" aria-labelledby="awards-title">
        <div className="awards-heading">
          <h2 id="awards-title">Selected Awards & Achievements</h2>
          <p>
            I am a junior at University of California, Berkeley studying Computer
            Science (Honors) and Cognitive Science.
          </p>
        </div>

        <ol className="awards-timeline">
          {awards.map((award) => (
            <li className="award-item" key={`${award.title}-${award.date}`}>
              <article className="award-card">
                <span className="award-icon" aria-hidden="true">
                  {award.icon}
                </span>
                <div>
                  <time>{award.date}</time>
                  <h3>{award.title}</h3>
                  <p>{award.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section id="hobbies" className="hobbies-section" aria-labelledby="hobbies-title">
        <div className="hobbies-heading">
          <h2 id="hobbies-title">My Hobbies</h2>
          <p>
            A few small joys that keep me curious, rested, and creatively charged.
          </p>
        </div>

        <div className="hobby-bubble-field" aria-label="Interactive hobby bubbles">
          {hobbies.map((hobby) => {
            const isPopped = poppedHobbies.has(hobby.id);

            return (
              <button
                className={`hobby-bubble ${isPopped ? "is-popped" : ""}`}
                disabled={isPopped}
                key={hobby.id}
                onClick={() => popHobby(hobby.id)}
                style={
                  {
                    "--bubble-x": hobby.x,
                    "--bubble-y": hobby.y,
                    "--bubble-size": hobby.size,
                    "--bubble-delay": hobby.delay,
                    "--bubble-duration": hobby.duration,
                  } as CSSProperties
                }
                type="button"
                aria-label={`Pop ${hobby.title} bubble`}
              >
                <span aria-hidden="true">{hobby.icon}</span>
              </button>
            );
          })}
        </div>

        <div className="hobby-feature" aria-live="polite">
          <div className="hobby-photo-placeholder">
            <span aria-hidden="true">{activeHobby.imageEmoji}</span>
            <small>{activeHobby.imageLabel}</small>
          </div>
          <article className="hobby-info">
            <time>Now showing</time>
            <h3>{activeHobby.title}</h3>
            <p>{activeHobby.description}</p>
            <small>{activeHobby.info}</small>
          </article>
        </div>
      </section>

      <section id="blog" className="blog-section" aria-labelledby="blog-title">
        <div className="blog-heading">
          <h2 id="blog-title">My Blog</h2>
          <p>
            I am a junior at University of California, Berkeley studying Computer
            Science (Honors) and Cognitive Science.
          </p>
        </div>

        <div className="blog-filters" aria-label="Blog categories">
          <button
            className={activeBlogCategory === "all" ? "is-active" : ""}
            onClick={() => chooseBlogCategory("all")}
            type="button"
          >
            <span aria-hidden="true">✨</span>
            All Articles
          </button>
          {blogCategories.map((category) => (
            <button
              className={activeBlogCategory === category.id ? "is-active" : ""}
              key={category.id}
              onClick={() => chooseBlogCategory(category.id)}
              type="button"
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {visibleBlogArticles.map((article) => {
            const category = blogCategories.find((item) => item.id === article.category);

            return (
              <article className="blog-card" key={`${article.title}-${article.date}`}>
                <div className="blog-card-image" aria-hidden="true">
                  <span>{article.icon}</span>
                  <small>Article placeholder</small>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{category?.label ?? "Article"}</span>
                    <time>{article.date}</time>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="read-time">{article.readTime}</span>
                </div>
              </article>
            );
          })}
        </div>

        {canLoadMoreBlogs ? (
          <button
            className="blog-load-more"
            onClick={() => setVisibleBlogCount((count) => count + 3)}
            type="button"
          >
            Load More
          </button>
        ) : (
          <p className="blog-end-note">You are all caught up.</p>
        )}
      </section>

      <footer className="site-footer" aria-labelledby="footer-title">
        <div className="footer-portrait" aria-hidden="true">
          <span>👋</span>
          <small>Image placeholder</small>
          <div className="footer-heart">💗</div>
        </div>

        <div className="footer-content">
          <div className="footer-heading">
            <h2 id="footer-title">Let's Chat! 👋</h2>
            <p>I'm always excited to connect and collaborate!</p>
          </div>

          <div className="footer-cards">
            <article className="contact-card">
              <div className="contact-icon" aria-hidden="true">
                ✉️
              </div>
              <div>
                <h3>Email</h3>
                <p>nataliia.kulieshova@berkeley.edu</p>
                <a href="mailto:nataliia.kulieshova@berkeley.edu">Send me an email</a>
              </div>
            </article>

            <article className="social-card">
              <h3>Find me online</h3>
              <div className="social-links">
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  in
                </a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
                  🐙
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter">
                  🐦
                </a>
                <a href="https://www.notion.so/" target="_blank" rel="noreferrer" aria-label="Notion">
                  N
                </a>
              </div>
            </article>
          </div>

          <p className="footer-credit">© 2026 Nataliia Kulieshova. Built with 💜 in Berkeley.</p>
        </div>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
