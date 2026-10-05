import { NavLink, Route, Routes } from 'react-router-dom'

const sections = ['Activities', 'Teams', 'Leaderboard', 'Workouts']

function HomePage() {
  return (
    <section className="text-center py-5">
      <img
        src="/octofitapp-small.png"
        className="mb-4"
        width="96"
        height="96"
        alt="OctoFit Tracker"
      />
      <h1 className="display-5 fw-semibold">Welcome to OctoFit Tracker</h1>
      <p className="lead text-body-secondary mx-auto">
        Track your activity, team up, and build healthy habits together.
      </p>
      <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
        {sections.map((section) => (
          <NavLink
            className="btn btn-outline-primary"
            key={section}
            to={`/${section.toLowerCase()}`}
          >
            Explore {section}
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function SectionPage({ title }) {
  return (
    <section className="py-5">
      <h1 className="h2">{title}</h1>
      <p className="text-body-secondary">
        Your {title.toLowerCase()} will appear here.
      </p>
    </section>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-body-tertiary">
      <header className="bg-white border-bottom">
        <nav className="navbar navbar-expand-lg container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" width="36" height="36" alt="" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-3">
            {sections.map((section) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active fw-semibold' : ''}`
                }
                key={section}
                to={`/${section.toLowerCase()}`}
              >
                {section}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {sections.map((section) => (
            <Route
              element={<SectionPage title={section} />}
              key={section}
              path={`/${section.toLowerCase()}`}
            />
          ))}
          <Route path="*" element={<SectionPage title="Page not found" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
