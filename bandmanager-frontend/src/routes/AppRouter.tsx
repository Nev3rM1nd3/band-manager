import { Route, Routes } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'
import BandsPage from '../pages/BandsPage'
import CreateBandPage from '../pages/CreateBandPage'
import BandDetailsPage from '../pages/BandDetailsPage'
import AppLayout from '../layouts/AppLayout'
import CreateBandMemberPage from '../pages/CreateBandMemberPage'
import EditBandMemberPage from '../pages/EditBandMemberPage'
import EditBandPage from '../pages/EditBandPage'
import CreateSongPage from '../pages/CreateSongPage'
import EditSongPage from "../pages/EditSongPage";
import CreateRehearsalPage from "../pages/CreateRehearsalPage";
import EditRehearsalPage from "../pages/EditRehearsalPage";
import AddRehearsalSongPage from "../pages/AddRehearsalSongPage";
import EditRehearsalSongPage from "../pages/EditRehearsalSongPage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/bands" element={<BandsPage />} />
            <Route path="/bands/new" element={<CreateBandPage />} />
            <Route path="/bands/:bandId" element={<BandDetailsPage />} />
            <Route path="/bands/:bandId/members/new" element={<CreateBandMemberPage />}/>
            <Route path="/bands/:bandId/members/:memberId/edit" element={<EditBandMemberPage />}/>
            <Route path="/bands/:bandId/edit" element={<EditBandPage />}/>
            <Route path="/bands/:bandId/songs/new" element={<CreateSongPage />}/>
            <Route path="/bands/:bandId/songs/:songId/edit" element={<EditSongPage />}/>
            <Route path="/bands/:bandId/rehearsals/new" element={<CreateRehearsalPage />}/>
            <Route path="/bands/:bandId/rehearsals/:rehearsalId/edit" element={<EditRehearsalPage />}/>
            <Route path="/bands/:bandId/rehearsals/:rehearsalId/songs/new" element={<AddRehearsalSongPage />}/>
            <Route path="/bands/:bandId/rehearsal-songs/:rehearsalSongId/edit" element={<EditRehearsalSongPage />}/>
          </Route>
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