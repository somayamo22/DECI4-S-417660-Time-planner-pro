function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h3>
            Planner<span>-Pro</span>
          </h3>

          <p>
            Plan your day. Stay focused. Get things done.
          </p>
        </div>

        <div className="footer-author">
          Designed & Developed by
          <strong>Somaya Mohammed ✨</strong>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Planner-Pro
          </span>

          <span>
            Made with 💜 & code
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;