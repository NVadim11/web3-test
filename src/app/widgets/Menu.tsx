import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '@routes/routes'

export function Menu() {
  const location = useLocation()
  const isTransactionActive = location.pathname === '/' || location.pathname === '/send'

  return (
    <nav className="border-r border-purple-500/30 w-48 p-4 h-full hidden md:block">
      <ul className="space-y-2">
        <li>
          <NavLink
            to={ROUTES.SEND}
            className={`block text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
              isTransactionActive
                ? 'text-white bg-purple-600/50'
                : 'text-gray-300 hover:text-white hover:bg-purple-500/30'
            }`}
          >
            Send Tokens
          </NavLink>
        </li>
        <li>
          <NavLink
            to={ROUTES.HISTORY}
            className={({ isActive }) =>
              `block text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-white bg-purple-600/50'
                  : 'text-gray-300 hover:text-white hover:bg-purple-500/30'
              }`
            }
          >
            Transaction History
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
