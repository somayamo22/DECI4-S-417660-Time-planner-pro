import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onFocusTask,
}) {
  if (!tasks.length) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          📋
        </div>

        <h3>
          No tasks found
        </h3>

        <p>
          Try changing your search
          or create a new task.
        </p>

      </div>
    );
  }

  return (
    <div className="task-list">

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
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
      ))}

    </div>
  );
}

export default TaskList;