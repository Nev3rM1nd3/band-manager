import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-white">
        <h1 className="text-4xl font-bold">
          Band Manager
        </h1>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-500"
        >
          Logout
        </button>
      </main>
    </>
  )
}

export default HomePage