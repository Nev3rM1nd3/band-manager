import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <section className="w-full max-w-md rounded-2xl bg-slate-900 p-8 shadow-xl">
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default AuthLayout