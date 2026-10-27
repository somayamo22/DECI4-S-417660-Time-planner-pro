function About() {
  const features = [
    {
      icon: "📋",
      title: "Smart Planning",
      text: "Organize your tasks and plan your day with ease.",
    },
    {
      icon: "🎯",
      title: "Focus Mode",
      text: "Stay focused on one task and avoid distractions.",
    },
    {
      icon: "📊",
      title: "Track Progress",
      text: "See your completed and pending tasks at a glance.",
    },
    {
      icon: "✨",
      title: "Simple & Beautiful",
      text: "A clean experience designed to make planning enjoyable.",
    },
  ];

  return (
    <section className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <div className="about-glow glow-one"></div>
        <div className="about-glow glow-two"></div>

        <div className="about-badge">
          ✨ ABOUT PLANNER-PRO
        </div>

        <h1>
          Plan smarter.
          <br />
          <span>Live better.</span>
        </h1>

        <p>
          Planner-Pro is a simple and powerful task planner
          designed to help you organize your day, stay focused,
          and turn your plans into real progress.
        </p>
      </div>

      {/* FEATURES */}
      <div className="about-section">

        <div className="about-section-title">
          <span className="eyebrow">
            WHY PLANNER-PRO?
          </span>

          <h2>
            Everything you need
            <br />
            <span>to stay organized.</span>
          </h2>
        </div>

        <div className="about-features">

          {features.map((feature, index) => (
            <div
              className="about-feature-card"
              key={feature.title}
              style={{
                animationDelay: `${index * 0.12}s`,
              }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.text}
              </p>

              <div className="feature-number">
                0{index + 1}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MISSION */}
      <div className="about-mission">

        <div className="mission-content">

          <span className="eyebrow">
            OUR MISSION
          </span>

          <h2>
            Small plans.
            <br />
            <span>Big results.</span>
          </h2>

          <p>
            We believe productivity shouldn't feel complicated.
            Planner-Pro gives you a simple space to plan your
            tasks, focus on what matters, and celebrate your progress.
          </p>

          <div className="mission-points">

            <div>
              <span>✓</span>
              <p>Plan your day easily</p>
            </div>

            <div>
              <span>✓</span>
              <p>Stay focused on your goals</p>
            </div>

            <div>
              <span>✓</span>
              <p>Track your progress</p>
            </div>

          </div>

        </div>

        <div className="mission-visual">

          <div className="mission-ring ring-one"></div>
          <div className="mission-ring ring-two"></div>
          <div className="mission-ring ring-three"></div>

          <div className="mission-center">
            <span>🎯</span>
            <strong>Focus</strong>
            <small>Plan • Do • Grow</small>
          </div>

        </div>

      </div>

      {/* FINAL CTA */}
      <div className="about-cta">

        <div>
          <span className="eyebrow">
            READY?
          </span>

          <h2>
            Make your next day
            <br />
            <span>your best one.</span>
          </h2>
        </div>

        <div className="cta-decoration">
          ✦
        </div>

      </div>

    </section>
  );
}

export default About;