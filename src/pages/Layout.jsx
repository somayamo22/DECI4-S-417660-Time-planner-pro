import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function Layout({
  children,
  activePage,
  goTo,
  darkMode,
  setDarkMode,
  onAddTask,
  onFocusMode,
}) {

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Navbar
        activePage={activePage}
        goTo={goTo}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAddTask={onAddTask}
        onFocusMode={onFocusMode}
      />

      <main>
        {children}
      </main>

      <Footer />

    </div>
  );
}


export default Layout;