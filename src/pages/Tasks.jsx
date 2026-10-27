import TaskList from "../Components/TaskList";

function Tasks({
  tasks,
  allTasks,
  activeFilter,
  setActiveFilter,
  search,
  setSearch,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onAddTask,
  onFocusTask,
}) {
  const filters = [
    "All",
    "Personal",
    "Work",
    "Study",
    "Other",
  ];

  return (
    <section className="tasks-page">

      <div className="page-header">

        <div>

          <span className="eyebrow">
            TASK MANAGEMENT
          </span>

          <h1>
            Your Tasks
          </h1>

          <p>
            Organize everything and
            stay on top of your day.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={onAddTask}
          type="button"
        >
          + Add New Task
        </button>

      </div>

      <div className="task-toolbar">

        <div className="search-box">

          <span>
            🔎
          </span>

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>

        <div className="filter-buttons">

          {filters.map((filter) => (
            <button
              key={filter}
              className={
                activeFilter === filter
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() =>
                setActiveFilter(
                  filter
                )
              }
              type="button"
            >
              {filter}
            </button>
          ))}

        </div>

      </div>

      <div className="task-summary">

        <span>
          Showing{" "}
          <strong>
            {tasks.length}
          </strong>{" "}
          of{" "}
          <strong>
            {allTasks.length}
          </strong>{" "}
          tasks
        </span>

        <span>
          Completed:{" "}
          <strong>
            {
              allTasks.filter(
                (task) =>
                  task.completed
              ).length
            }
          </strong>
        </span>

      </div>

      <TaskList
        tasks={tasks}
        onToggleTask={
          onToggleTask
        }
        onDeleteTask={
          onDeleteTask
        }
        onEditTask={
          onEditTask
        }
        onFocusTask={
          onFocusTask
        }
      />

    </section>
  );
}

export default Tasks;