const STORAGE_KEY = "planner-pro-tasks";

/* =========================
   GET TASKS
========================= */

export function getTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (!savedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(savedTasks);

    return Array.isArray(parsedTasks)
      ? parsedTasks
      : [];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

/* =========================
   SAVE TASKS
========================= */

export function saveTasks(tasks) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

/* =========================
   CREATE TASK
========================= */

export function createTask(taskData) {
  return {
    id:
      Date.now().toString() +
      Math.random().toString(36).slice(2),

    title: taskData.title || "",

    description:
      taskData.description || "",

    category:
      taskData.category || "Personal",

    startDate:
      taskData.startDate || "",

    startTime:
      taskData.startTime || "",

    endDate:
      taskData.endDate ||
      taskData.startDate ||
      "",

    endTime:
      taskData.endTime || "",

    completed: false,

    createdAt:
      new Date().toISOString(),
  };
}

/* =========================
   UPDATE TASK
========================= */

export function updateTask(task, taskData) {
  return {
    ...task,

    title:
      taskData.title !== undefined
        ? taskData.title
        : task.title,

    description:
      taskData.description !== undefined
        ? taskData.description
        : task.description,

    category:
      taskData.category !== undefined
        ? taskData.category
        : task.category,

    startDate:
      taskData.startDate !== undefined
        ? taskData.startDate
        : task.startDate,

    startTime:
      taskData.startTime !== undefined
        ? taskData.startTime
        : task.startTime,

    endDate:
      taskData.endDate !== undefined
        ? taskData.endDate
        : task.endDate,

    endTime:
      taskData.endTime !== undefined
        ? taskData.endTime
        : task.endTime,
  };
}

/* =========================
   DELETE TASK
========================= */

export function deleteTaskById(tasks, id) {
  return tasks.filter(
    (task) => task.id !== id
  );
}

/* =========================
   TOGGLE COMPLETED
========================= */

export function toggleTaskCompleted(tasks, id) {
  return tasks.map((task) =>
    task.id === id
      ? {
          ...task,
          completed: !task.completed,
        }
      : task
  );
}

/* =========================
   FORMAT DATE
========================= */

export function formatDate(dateString) {
  if (!dateString) {
    return "No date";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* =========================
   FORMAT TIME
========================= */

export function formatTime(timeString) {
  if (!timeString) {
    return "";
  }

  const [hours, minutes] =
    timeString.split(":");

  const date = new Date();

  date.setHours(
    Number(hours),
    Number(minutes),
    0,
    0
  );

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}


