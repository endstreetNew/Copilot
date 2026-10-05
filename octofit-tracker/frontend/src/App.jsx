import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { title: 'Activities', path: '/activities' },
  { title: 'Leaderboard', path: '/leaderboard' },
  { title: 'Teams', path: '/teams' },
  { title: 'Users', path: '/users' },
  { title: 'Workouts', path: '/workouts' },
]

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
        {sections.map(({ title, path }) => (
          <NavLink
            className="btn btn-outline-primary"
            key={path}
            to={path}
          >
            Explore {title}
          </NavLink>
        ))}
      </div>
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
            {sections.map(({ title, path }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active fw-semibold' : ''}`
                }
                key={path}
                to={path}
              >
                {title}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<h1 className="h2 py-5">Page not found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
