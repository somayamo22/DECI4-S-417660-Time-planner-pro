import {
  formatDate,
  formatTime,
} from "../utils/Task";

function TaskCard({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onFocusTask,
}) {
  return (
    <article
      className={
        task.completed
          ? "task-card completed"
          : "task-card"
      }
    >

      <div className="task-card-top">

        <button
          className={
            task.completed
              ? "task-check checked"
              : "task-check"
          }
          onClick={() =>
            onToggleTask(task.id)
          }
          type="button"
          aria-label="Toggle task"
        >
          {task.completed
            ? "✓"
            : ""}
        </button>

        <div className="task-main">

          <div className="task-title-row">

            <h3>
              {task.title}
            </h3>

            <span
              className={`category-badge category-${task.category.toLowerCase()}`}
            >
              {task.category}
            </span>

          </div>

          {task.description && (
            <p>
              {task.description}
            </p>
          )}

        </div>

      </div>

      <div className="task-meta">

        <span>
          📅 {formatDate(task.startDate)}
        </span>

        {task.startTime && (
          <span>
            ⏰ {formatTime(task.startTime)}
          </span>
        )}

        {task.endDate && (
          <span>
            → {formatDate(task.endDate)}
          </span>
        )}

        {task.endTime && (
          <span>
            ⏱ {formatTime(task.endTime)}
          </span>
        )}

      </div>

      <div className="task-actions">

        {!task.completed && (
          <button
            className="small-btn focus-task-btn"
            onClick={() =>
              onFocusTask(task)
            }
            type="button"
          >
            🎯 Focus
          </button>
        )}

        <button
          className="small-btn edit-btn"
          onClick={() =>
            onEditTask(task)
          }
          type="button"
        >
          ✏️ Edit
        </button>

        <button
          className="small-btn delete-btn"
          onClick={() =>
            onDeleteTask(task.id)
          }
          type="button"
        >
          🗑️ Delete
        </button>

      </div>

    </article>
  );
}

export default TaskCard;