import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="fixed inset-x-0 bg-transparent sticky top-0 z-50 py-6">
      <div className="w-full flex justify-center">
        <div className="nav-box w-full max-w-4xl px-6 py-3 bg-white rounded shadow-sm">
          <div className="flex justify-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link px-6 py-2 font-medium ${isActive ? 'active' : ''}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/price-checker"
              className={({ isActive }) =>
                `nav-link px-6 py-2 font-medium ${isActive ? 'active' : ''}`
              }
            >
              Price Checker
            </NavLink>

            <NavLink
              to="/api-practice"
              className={({ isActive }) =>
                `nav-link px-6 py-2 font-medium ${isActive ? 'active' : ''}`
              }
            >
              API Practice
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
