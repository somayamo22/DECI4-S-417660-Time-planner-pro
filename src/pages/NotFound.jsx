function NotFound({ goHome }) {
  return (
    <section className="not-found-page">

      <div className="not-found-card">

        <div className="not-found-icon">
          🧭
        </div>

        <span className="eyebrow">
          ERROR 404
        </span>

        <h1>
          Page not found
        </h1>

        <p>
          Sorry, the page you're
          looking for doesn't exist.
        </p>

        <button
          className="primary-btn"
          onClick={goHome}
          type="button"
        >
          ← Back to Home
        </button>

      </div>

    </section>
  );
}

export default NotFound;