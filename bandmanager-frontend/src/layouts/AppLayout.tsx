import { Link, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const AppLayout = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              to="/bands"
              className="text-xl font-bold"
            >
              Band Manager
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                to="/bands"
                className="text-sm text-slate-300 hover:text-white"
              >
                My Bands
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
              >
                Logout
              </button>
            </nav>
          </div>
        </header>

        <Outlet />
      </div>
    </>
  )
}

export default AppLayout