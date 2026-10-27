function Home({
  tasks,
  todayTasks,
  completedTasks,
  pendingTasks,
  progress,
  goTo,
  onAddTask,
  onFocusMode,
}) {
  const date = new Date();

  const todayText =
    date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <section className="home-page">

      <div className="hero">

        <div className="hero-content">

          <div className="eyebrow hero-eyebrow">
            {todayText.toUpperCase()}
          </div>

          <h1>
            Plan your day.
            <br />
            <span>
              Get things done.
            </span>
          </h1>

          <p>
            Organize your tasks,
            stay focused, and turn
            your plans into progress.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                goTo("tasks")
              }
              type="button"
            >
              Explore Tasks →
            </button>

            <button
              className="secondary-btn"
              onClick={onFocusMode}
              type="button"
            >
              🎯 Focus Mode
            </button>

          </div>

        </div>

        <div className="hero-visual">

          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="progress-circle">

            <span>
              Today's Tasks
            </span>

            <strong>
              {todayTasks.length}
            </strong>

            <small>
              Keep going ✨
            </small>

          </div>

          <div className="floating-card card-top">
            ✓ {completedTasks} completed
          </div>

          <div className="floating-card card-bottom">
            🎯 {pendingTasks} pending
          </div>

        </div>

      </div>

      <div className="section-heading">

        <div>

          <span className="eyebrow">
            YOUR DASHBOARD
          </span>

          <h2>
            Make today count.
          </h2>

        </div>

        <button
          className="secondary-btn"
          onClick={() =>
            goTo("tasks")
          }
          type="button"
        >
          View all tasks →
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          icon="📋"
          title="Total Tasks"
          value={tasks.length}
          text="Tasks in planner"
        />

        <StatCard
          icon="✅"
          title="Completed"
          value={completedTasks}
          text="Great progress!"
        />

        <StatCard
          icon="⏳"
          title="Pending"
          value={pendingTasks}
          text="Keep going"
        />

        <StatCard
          icon="🎯"
          title="Progress"
          value={`${progress}%`}
          text="Overall completion"
        />

      </div>

      <div className="focus-card">

        <div>

          <span className="eyebrow">
            TODAY'S FOCUS
          </span>

          <h2>
            {todayTasks.length === 0
              ? "Your day is wide open."
              : `You have ${todayTasks.length} task${
                  todayTasks.length > 1
                    ? "s"
                    : ""
                } today.`}
          </h2>

          <p>
            Focus on one thing at
            a time. Small steps
            create big results.
          </p>

        </div>

        <button
          className="focus-start-btn"
          onClick={onFocusMode}
          type="button"
        >
          <span>🎯</span>
          Start Focus
        </button>

      </div>

      <div className="quick-add-section">

        <button
          className="primary-btn"
          onClick={onAddTask}
          type="button"
        >
          + Create a New Task
        </button>

      </div>

    </section>
  );
}

function StatCard({
  icon,
  title,
  value,
  text,
}) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

        <small>
          {text}
        </small>

      </div>

    </div>
  );
}

export default Home;