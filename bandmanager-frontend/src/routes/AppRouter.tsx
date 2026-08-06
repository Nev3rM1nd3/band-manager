import { Route, Routes } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRouter