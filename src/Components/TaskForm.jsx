import {
  useEffect,
  useState,
} from "react";

function getToday() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

function getEmptyForm() {
  return {
    title: "",
    description: "",
    category: "Personal",
    startDate: getToday(),
    startTime: "09:00",
    endDate: getToday(),
    endTime: "10:00",
  };
}

function TaskForm({
  initialData,
  onSave,
  onCancel,
}) {
  const [form, setForm] =
    useState(getEmptyForm());

  useEffect(() => {
    if (initialData) {
      setForm({
        title:
          initialData.title || "",

        description:
          initialData.description ||
          "",

        category:
          initialData.category ||
          "Personal",

        startDate:
          initialData.startDate ||
          getToday(),

        startTime:
          initialData.startTime ||
          "09:00",

        endDate:
          initialData.endDate ||
          initialData.startDate ||
          getToday(),

        endTime:
          initialData.endTime ||
          "10:00",
      });
    } else {
      setForm(getEmptyForm());
    }
  }, [initialData]);

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description:
        form.description.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
    >

      <div className="form-group">

        <label htmlFor="title">
          Task Name *
        </label>

        <input
          id="title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Study Mathematics"
          required
          autoFocus
        />

      </div>

      <div className="form-group">

        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={
            form.description
          }
          onChange={handleChange}
          placeholder="What do you need to do?"
          rows="3"
        />

      </div>

      <div className="form-group">

        <label htmlFor="category">
          Category
        </label>

        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >

          <option value="Personal">
            Personal
          </option>

          <option value="Work">
            Work
          </option>

          <option value="Study">
            Study
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </div>

      <div className="date-grid">

        <div className="form-group">

          <label htmlFor="startDate">
            📅 Start Date *
          </label>

          <input
            id="startDate"
            type="date"
            name="startDate"
            value={
              form.startDate
            }
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label htmlFor="startTime">
            ⏰ Start Time *
          </label>

          <input
            id="startTime"
            type="time"
            name="startTime"
            value={
              form.startTime
            }
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label htmlFor="endDate">
            📅 End Date *
          </label>

          <input
            id="endDate"
            type="date"
            name="endDate"
            value={
              form.endDate
            }
            min={
              form.startDate
            }
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label htmlFor="endTime">
            ⏰ End Time *
          </label>

          <input
            id="endTime"
            type="time"
            name="endTime"
            value={
              form.endTime
            }
            onChange={handleChange}
            required
          />

        </div>

      </div>

      <div className="picker-note">
        💡 Choose your date and
        time from the calendar
        and clock.
      </div>

      <div className="modal-actions">

        <button
          type="button"
          className="secondary-btn"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="primary-btn"
        >
          {initialData
            ? "Save Changes"
            : "✨ Create Task"}
        </button>

      </div>

    </form>
  );
}

export default TaskForm;