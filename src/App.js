import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/Dashboard/MyProfile'
import Settings from "./components/core/Dashboard/Settings"
import VerifyUsers from './components/core/Dashboard/VerifyUsers'
import AddDonorDetails from './components/core/Dashboard/DonorUsers/AddDonor'
import EditDonorDetails from './components/core/Dashboard/DonorUsers/EditDonor'
import AddRecepientDetails from './components/core/Dashboard/RecepientUsers/AddRecepient'
import EditRecepientDetails from './components/core/Dashboard/RecepientUsers/EditRecepient'
import ViewDonorDetails from './components/core/Dashboard/RecepientUsers/ViewDonorDetails'
import ViewRecepientDetails from './components/core/Dashboard/DonorUsers/ViewRecepientDetails'
import ViewDonations from './components/core/Dashboard/DonorUsers/EditDonor/ViewDonations'
import ViewRequests from './components/core/Dashboard/RecepientUsers/EditRecepient/ViewRequests'
import About from "./pages/About"
import Contact from "./pages/Contact"
import './App.css'
import { ACCOUNT_TYPE } from './utils/constants';

function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className='w-screen min-h-screen flex flex-col font-inter bg-gradient-to-r from-brown-5 to-white'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        {/* Open Route - For Only Non-Logged In User */}
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <About />
          }
        />
        <Route path="contact" element={<Contact />} />

        {/* Private Route - For Logged In User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />

          {
            user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <>
                <Route path="dashboard/verify-users" element={<VerifyUsers />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.DONOR && (
              <>
                <Route path="dashboard/update-donation" element={<AddDonorDetails />} />
                <Route path="dashboard/recepients" element={<ViewRecepientDetails />} />
                <Route path="dashboard/edit-donor-details/:donorId" element={<EditDonorDetails />} />
                <Route path="dashboard/edit-donor-details" element={<ViewDonations />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.RECEPIENT && (
              <>
                <Route path="dashboard/donors" element={<ViewDonorDetails />} />
                <Route path="dashboard/update-receiving" element={<AddRecepientDetails />} />
                <Route path="dashboard/edit-recepient-details/:recepientId" element={<EditRecepientDetails />} />
                <Route path="dashboard/edit-recepient-details" element={<ViewRequests />} />
              </>
            )
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App