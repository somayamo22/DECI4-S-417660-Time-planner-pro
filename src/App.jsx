import {
  useEffect,
  useState,
} from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TaskForm from "./Components/TaskForm";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import {
  getTasks,
  saveTasks,
  createTask,
  updateTask,
  deleteTaskById,
  toggleTaskCompleted,
} from "./utils/Task";

function App() {
  /* =========================
     TASKS
  ========================= */

  const [tasks, setTasks] = useState(() =>
    getTasks()
  );

  /* =========================
     DARK MODE
  ========================= */

  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem(
        "planner-pro-theme"
      ) === "dark"
  );

  /* =========================
     PAGE
  ========================= */

  function getPageFromPath() {
    const path =
      window.location.pathname;

    if (path === "/") {
      return "home";
    }

    if (path === "/tasks") {
      return "tasks";
    }

    if (path === "/about") {
      return "about";
    }

    return "404";
  }

  const [activePage, setActivePage] =
    useState(getPageFromPath);

  /* =========================
     SEARCH + FILTER
  ========================= */

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  /* =========================
     TASK FORM
  ========================= */

  const [showTaskForm, setShowTaskForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  /* =========================
     NOTIFICATION
  ========================= */

  const [notification, setNotification] =
    useState(null);

  /* =========================
     FOCUS MODE
  ========================= */

  const [focusMode, setFocusMode] =
    useState(false);

  const [focusTask, setFocusTask] =
    useState(null);

  const [focusDuration, setFocusDuration] =
    useState(25);

  /* =========================
     SAVE TASKS
  ========================= */

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  /* =========================
     SAVE THEME
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "planner-pro-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  /* =========================
     NOTIFICATION
  ========================= */

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification]);

  function showNotification(
    message,
    type = "success"
  ) {
    setNotification({
      message,
      type,
    });
  }

  /* =========================
     NAVIGATION
  ========================= */

  function goTo(page) {
    const paths = {
      home: "/",
      tasks: "/tasks",
      about: "/about",
    };

    const path = paths[page];

    if (!path) {
      return;
    }

    window.history.pushState(
      {},
      "",
      path
    );

    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================
     BACK / FORWARD
  ========================= */

  useEffect(() => {
    function handlePopState() {
      setActivePage(
        getPageFromPath()
      );
    }

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /* =========================
     ADD TASK
  ========================= */

  function handleAddTask() {
    setEditingTask(null);
    setShowTaskForm(true);
  }

  /* =========================
     EDIT TASK
  ========================= */

  function handleEditTask(task) {
    setEditingTask(task);
    setShowTaskForm(true);
  }

  /* =========================
     CLOSE FORM
  ========================= */

  function handleCloseTaskForm() {
    setShowTaskForm(false);
    setEditingTask(null);
  }

  /* =========================
     SAVE TASK
  ========================= */

  function handleSaveTask(taskData) {
    if (!taskData.title?.trim()) {
      showNotification(
        "Please enter a task title.",
        "error"
      );

      return;
    }

    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? updateTask(
                task,
                taskData
              )
            : task
        )
      );

      showNotification(
        "Task updated successfully ✨"
      );
    } else {
      const newTask =
        createTask(taskData);

      setTasks((previousTasks) => [
        newTask,
        ...previousTasks,
      ]);

      showNotification(
        "New task created successfully 🎉"
      );
    }

    handleCloseTaskForm();
  }

  /* =========================
     DELETE
  ========================= */

  function handleDeleteTask(id) {
    setTasks((previousTasks) =>
      deleteTaskById(
        previousTasks,
        id
      )
    );

    if (
      focusTask &&
      focusTask.id === id
    ) {
      setFocusTask(null);
      setFocusMode(false);
    }

    showNotification(
      "Task deleted.",
      "delete"
    );
  }

  /* =========================
     TOGGLE
  ========================= */

  function handleToggleTask(id) {
    const currentTask =
      tasks.find(
        (task) => task.id === id
      );

    setTasks((previousTasks) =>
      toggleTaskCompleted(
        previousTasks,
        id
      )
    );

    if (currentTask) {
      if (currentTask.completed) {
        showNotification(
          "Task marked as pending."
        );
      } else {
        showNotification(
          "Task completed! Great job 🎉"
        );
      }
    }
  }

  /* =========================
     FOCUS MODE
  ========================= */

  function handleStartFocus(task = null) {
    setFocusTask(task);
    setFocusMode(true);
  }

  function handleCloseFocus() {
    setFocusMode(false);
    setFocusTask(null);
  }

  function handleCompleteFocusTask() {
    if (!focusTask) {
      return;
    }

    if (!focusTask.completed) {
      handleToggleTask(
        focusTask.id
      );
    }

    setFocusMode(false);
    setFocusTask(null);
  }

  /* =========================
     TODAY
  ========================= */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayTasks =
    tasks.filter(
      (task) =>
        task.startDate === today
    );

  /* =========================
     STATISTICS
  ========================= */

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  /* =========================
     FILTER
  ========================= */

  const filteredTasks =
    tasks.filter((task) => {
      const categoryMatch =
        activeFilter === "All" ||
        task.category ===
          activeFilter;

      const searchText =
        search
          .toLowerCase()
          .trim();

      const searchMatch =
        !searchText ||
        task.title
          ?.toLowerCase()
          .includes(searchText) ||
        task.description
          ?.toLowerCase()
          .includes(searchText);

      return (
        categoryMatch &&
        searchMatch
      );
    });

  /* =========================
     APP
  ========================= */

  return (
    <div
      className={
        darkMode
          ? "app dark"
          : "app"
      }
    >

      <div className="background-effects">
        <div className="background-orb orb-one" />
        <div className="background-orb orb-two" />
        <div className="background-orb orb-three" />
      </div>

      <Navbar
        activePage={activePage}
        goTo={goTo}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAddTask={handleAddTask}
        onFocusMode={() =>
          handleStartFocus(null)
        }
      />

      <main>

        {activePage === "home" && (
          <Home
            tasks={tasks}
            todayTasks={todayTasks}
            completedTasks={
              completedTasks
            }
            pendingTasks={
              pendingTasks
            }
            progress={progress}
            goTo={goTo}
            onAddTask={
              handleAddTask
            }
            onFocusMode={() =>
              handleStartFocus(null)
            }
          />
        )}

        {activePage === "tasks" && (
          <Tasks
            tasks={filteredTasks}
            allTasks={tasks}
            activeFilter={
              activeFilter
            }
            setActiveFilter={
              setActiveFilter
            }
            search={search}
            setSearch={setSearch}
            onToggleTask={
              handleToggleTask
            }
            onDeleteTask={
              handleDeleteTask
            }
            onEditTask={
              handleEditTask
            }
            onAddTask={
              handleAddTask
            }
            onFocusTask={
              handleStartFocus
            }
          />
        )}

        {activePage === "about" && (
          <About />
        )}

        {activePage === "404" && (
          <NotFound
            goHome={() =>
              goTo("home")
            }
          />
        )}

      </main>

      <Footer />

      {/* NOTIFICATION */}

      {notification && (
        <div
          className={`notification ${notification.type}`}
        >
          <span>
            {notification.type ===
            "error"
              ? "⚠️"
              : notification.type ===
                "delete"
              ? "🗑️"
              : "✓"}
          </span>

          <p>
            {notification.message}
          </p>
        </div>
      )}

      {/* TASK FORM */}

      {showTaskForm && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              handleCloseTaskForm();
            }
          }}
        >
          <div
            className="modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="close-btn"
              onClick={
                handleCloseTaskForm
              }
              type="button"
            >
              ×
            </button>

            <div className="modal-header">
              <span className="eyebrow">
                {editingTask
                  ? "EDIT TASK"
                  : "NEW TASK"}
              </span>

              <h2>
                {editingTask
                  ? "Update your task"
                  : "Create a new task"}
              </h2>
            </div>

            <TaskForm
              initialData={
                editingTask
              }
              onSave={
                handleSaveTask
              }
              onCancel={
                handleCloseTaskForm
              }
            />

          </div>
        </div>
      )}

      {/* FOCUS MODE */}

      {focusMode && (
        <FocusMode
          task={focusTask}
          duration={focusDuration}
          setDuration={
            setFocusDuration
          }
          onClose={
            handleCloseFocus
          }
          onComplete={
            handleCompleteFocusTask
          }
        />
      )}

    </div>
  );
}

/* ==================================================
   FOCUS MODE
================================================== */

function FocusMode({
  task,
  duration,
  setDuration,
  onClose,
  onComplete,
}) {
  const [seconds, setSeconds] =
    useState(duration * 60);

  const [running, setRunning] =
    useState(false);

  useEffect(() => {
    if (!running) {
      setSeconds(
        duration * 60
      );
    }
  }, [duration, running]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const interval =
      setInterval(() => {
        setSeconds((previous) => {
          if (previous <= 1) {
            setRunning(false);
            return 0;
          }

          return previous - 1;
        });
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [running]);

  const minutes =
    Math.floor(seconds / 60);

  const remainingSeconds =
    seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(
      2,
      "0"
    )}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;

  function resetTimer() {
    setRunning(false);
    setSeconds(
      duration * 60
    );
  }

  function changeDuration(event) {
    const value = Number(
      event.target.value
    );

    if (
      Number.isFinite(value) &&
      value >= 1 &&
      value <= 180
    ) {
      setRunning(false);
      setDuration(value);
      setSeconds(value * 60);
    }
  }

  return (
    <div className="focus-overlay">

      <div className="focus-background-orb" />

      <div className="focus-panel">

        <button
          className="focus-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <div className="focus-label">
          🎯 FOCUS MODE
        </div>

        {task ? (
          <>
            <div className="focus-status">
              {task.category}
            </div>

            <h1>
              {task.title}
            </h1>

            <p>
              {task.description ||
                "Stay focused and finish your task."}
            </p>
          </>
        ) : (
          <>
            <div className="focus-status">
              DEEP WORK
            </div>

            <h1>
              Focus on what matters.
            </h1>

            <p>
              Choose your focus time
              and work without
              distractions.
            </p>
          </>
        )}

        <div className="focus-duration">

          <label>
            Focus duration
          </label>

          <div className="duration-control">

            <input
              type="number"
              min="1"
              max="180"
              value={duration}
              onChange={
                changeDuration
              }
              disabled={running}
            />

            <span>
              minutes
            </span>

          </div>

        </div>

        <div className="focus-timer">
          {formattedTime}
        </div>

        <div className="focus-controls">

          <button
            className="secondary-btn"
            onClick={resetTimer}
            type="button"
          >
            ↻ Reset
          </button>

          <button
            className="focus-main-btn"
            onClick={() =>
              setRunning(
                (previous) =>
                  !previous
              )
            }
            type="button"
          >
            {running
              ? "Ⅱ Pause"
              : "▶ Start"}
          </button>

        </div>

        {task && (
          <button
            className="complete-focus-btn"
            onClick={
              onComplete
            }
            type="button"
          >
            ✓ Mark Task Complete
          </button>
        )}

        <div className="focus-tip">
          💡 Tip: Put your phone
          away, close unnecessary
          tabs, and focus on one
          thing.
        </div>

      </div>
    </div>
  );
}

export default App;