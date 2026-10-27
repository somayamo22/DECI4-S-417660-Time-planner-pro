import { useState } from "react";

function Navbar({
  activePage,
  goTo,
  darkMode,
  setDarkMode,
  onAddTask,
  onFocusMode,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (page) => {
    goTo(page);
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <button
          className="logo"
          onClick={() => navigate("home")}
          type="button"
        >
          <span className="logo-icon">✦</span>
          <span>
            Planner<span className="logo-accent">Pro</span>
          </span>
        </button>

        {/* Desktop Links */}
        <nav className="nav-links">
          <button
            className={activePage === "home" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("home")}
            type="button"
          >
            Home
          </button>

          <button
            className={activePage === "tasks" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("tasks")}
            type="button"
          >
            Tasks
          </button>

          <button
            className={activePage === "about" ? "nav-link active" : "nav-link"}
            onClick={() => navigate("about")}
            type="button"
          >
            About
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <button
            className="nav-focus-btn"
            onClick={onFocusMode}
            type="button"
          >
            🎯
          </button>

          <button
            className="theme-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            type="button"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className="nav-add-btn"
            onClick={onAddTask}
            type="button"
          >
            + Add Task
          </button>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className={`hamburger ${menuOpen ? "hamburger-active" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-nav-menu">

          <button
            className={activePage === "home" ? "mobile-link active" : "mobile-link"}
            onClick={() => navigate("home")}
            type="button"
          >
            🏠 Home
          </button>

          <button
            className={activePage === "tasks" ? "mobile-link active" : "mobile-link"}
            onClick={() => navigate("tasks")}
            type="button"
          >
            📋 Tasks
          </button>

          <button
            className={activePage === "about" ? "mobile-link active" : "mobile-link"}
            onClick={() => navigate("about")}
            type="button"
          >
            ℹ️ About
          </button>

          <div className="mobile-menu-line"></div>

          <button
            className="mobile-link"
            onClick={() => {
              onFocusMode();
              setMenuOpen(false);
            }}
            type="button"
          >
            🎯 Focus Mode
          </button>

          <button
            className="mobile-link"
            onClick={() => setDarkMode((prev) => !prev)}
            type="button"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          <button
            className="mobile-add"
            onClick={() => {
              onAddTask();
              setMenuOpen(false);
            }}
            type="button"
          >
            + Add Task
          </button>

        </div>
      )}
    </header>
  );
}

export default Navbar;