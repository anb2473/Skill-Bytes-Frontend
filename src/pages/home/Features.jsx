import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Features.css';

// Icons for languages
import { FaPython, FaJs, FaJava } from 'react-icons/fa';
import { SiCplusplus, SiTypescript, SiGo, SiRuby, SiSwift, SiKotlin, SiRust } from 'react-icons/si';

const features = [
  {
    title: "Daily Challenges",
    description: "With AI editors, many junior devs are forgetting how to program. With Daily Challenges, Skill Bytes helps you maintain and improve your programming skills through daily exercises that test your knowledge of data structures and algorithms. Compete on the daily leaderboard to see how you rank against other developers.",
    icon: "🏆",
    color: "#6366f1",
    status: "live now",
    media: { type: 'video', src: '/daily-challenge.mp4' }
  },
  {
    title: "Skill Issues",
    description: "Skill Bytes allows developers to easily review each other's projects. Browse projects with 'Skill Issues' tags and provide constructive feedback to help fellow developers grow. It's a great way to learn from real-world code and contribute to the community.",
    icon: "🔍",
    color: "#8b5cf6",
    status: "coming soon"
  },
  {
    title: "Structured Learning",
    description: "Whether you're a beginner or looking to master advanced topics, Skill Bytes offers structured learning paths. Focus on specific subjects that interest you, from basic programming concepts to complex system design patterns.",
    icon: "📚",
    color: "#ec4899",
    status: "coming soon"
  },
  {
    title: "Byte Clubs",
    description: "Join or create Byte Clubs to connect with like-minded developers. Collaborate on projects, participate in coding challenges, and grow your network in specialized programming communities.",
    icon: "👥",
    color: "#10b981",
    status: "coming soon"
  },
  {
    title: "Free DNS Hosting",
    description: "Showcase your projects with a professional touch. Skill Bytes offers free subdomains for your portfolio and project websites, making it easy to share your work with the world.",
    icon: "🌐",
    color: "#3b82f6",
    status: "coming soon"
  }
];

const languages = [
  { name: "Python", icon: <FaPython />, color: "#3776AB", status: "coming soon" },
  { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E", status: "live now" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", status: "coming soon" },
  { name: "Java", icon: <FaJava />, color: "#007396", status: "coming soon" },
  { name: "C++", icon: <SiCplusplus />, color: "#00599C", status: "coming soon" },
  { name: "Rust", icon: <SiRust />, color: "#000000", status: "coming soon" },
  { name: "Go", icon: <SiGo />, color: "#00ADD8", status: "coming soon" },
  { name: "Ruby", icon: <SiRuby />, color: "#CC342D", status: "coming soon" },
  { name: "Swift", icon: <SiSwift />, color: "#F05138", status: "coming soon" },
  { name: "Kotlin", icon: <SiKotlin />, color: "#7F52FF", status: "coming soon" }
];

const learningTopics = [
  { name: "Data Structures", icon: "🧱", color: "#F59E0B" },
  { name: "Algorithms", icon: "⚡", color: "#10B981" },
  { name: "Web Development", icon: "🌐", color: "#3B82F6" },
  { name: "Mobile Apps", icon: "📱", color: "#8B5CF6" },
  { name: "Machine Learning", icon: "🧠", color: "#EC4899" },
  { name: "DevOps", icon: "🔧", color: "#F43F5E" },
  { name: "Game Dev", icon: "🎮", color: "#8B5CF6" },
  { name: "Blockchain", icon: "⛓️", color: "#000000" }
];

const FeatureCard = ({ title, description, icon, color, status, media, index }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: index * 0.1 }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className={`feature ${index % 2 !== 0 ? 'reverse' : ''}`}
    >
      <div className="feature-content">
        <div className="feature-icon" style={{ backgroundColor: `${color}20`, color: color }}>
          <span style={{ fontSize: '2rem' }}>{icon}</span>
        </div>
        <div className="feature-title-row">
          <h2>{title}</h2>
          {status && (
            <span className={`status-badge ${status === 'live now' ? 'status-live' : 'status-soon'}`}>
              {status}
            </span>
          )}
        </div>
        <p>{description}</p>
      </div>
      <div className="feature-image">
        <div className="mockup-window">
          <div className={`mockup-content ${media && media.type === 'video' ? 'mockup-content-media' : ''}`}>
            {media && media.type === 'video' && media.src ? (
              <video
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', borderRadius: '8px' }}
              />
            ) : (
              <div className="code-snippet">
                <div className="code-line" style={{ width: '80%' }}></div>
                <div className="code-line" style={{ width: '90%' }}></div>
                <div className="code-line" style={{ width: '70%' }}></div>
                <div className="code-line" style={{ width: '85%' }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LanguageCard = ({ language }) => (
  <motion.div 
    className="language-card"
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="language-icon" style={{ color: language.color }}>
      {language.icon}
    </div>
    <h3>{language.name}</h3>
    {language.status && (
      <div className="language-badge-container">
        <span className={`status-badge ${language.status === 'live now' ? 'status-live' : 'status-soon'}`}>
          {language.status}
        </span>
      </div>
    )}
  </motion.div>
);

const LearningTopic = ({ topic }) => (
  <motion.div 
    className="topic-card"
    whileHover={{ y: -5, scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="topic-icon" style={{ backgroundColor: `${topic.color}20`, color: topic.color }}>
      {topic.icon}
    </div>
    <h4>{topic.name}</h4>
  </motion.div>
);

const Features = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      });
    }
  }, [isInView, controls]);

  return (
    <section className="features-section" id="features">
      <div className="container">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>

      <div className="languages-section" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="section-title"
        >
          Supported Languages
        </motion.h2>
        <motion.div 
          className="language-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          {languages.map((language) => (
            <LanguageCard key={language.name} language={language} />
          ))}
        </motion.div>
      </div>

      <div className="learning-section">
        <h2 className="section-title">Explore Learning Paths</h2>
        <div className="topics-grid">
          {learningTopics.map((topic) => (
            <LearningTopic key={topic.name} topic={topic} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
