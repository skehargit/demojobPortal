import { useState } from "react";
import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { About, Auth, Companies, CompaniesProfile, FindJob, JobDetails, UploadJobs, UserProfile} from "./pages/index";
import { useSelector } from "react-redux";
import Dashboard from "./pages/DashBoard";
import Contact from "./pages/Contact";
import ApplicationTracking from "./pages/ApplicationTracking";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ApplicationStatus from "./pages/ApplicationStatus";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/user-auth' state={{ from: location }} replace />
  );
}
function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className='bg-[#ffffff] font-[Poppins] tracking-tighter '>
      <div className="fixe w-full z-[1000]  bg-white">
      <Navbar />
      <hr />
      </div>
      
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Navigate to='/find-jobs' replace={true} />}
          />
          <Route path='/find-jobs' element={<FindJob />} />
          <Route path='/companies' element={<Companies />} />
          <Route
            path={
              user?.user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />} 
          />
          <Route path={"/company-profile"} element={<CompaniesProfile />} />
          <Route path={"/company-profile/:id"} element={<CompaniesProfile />} />
          <Route path={"/company-profile/job-detail/:id"} element={<CompaniesProfile />} />
          <Route path={"/upload-job"} element={<UploadJobs />} />
          <Route path={"/job-detail/:id"} element={<JobDetails />} />
          <Route path={'/applicationstatus'} element={<ApplicationStatus/>}></Route>
          
        </Route>
        <Route path='/about-us' element={<About />} />
        <Route path='/user-auth' element={<Auth/>} />
        <Route path='/contact-us' element={<Contact/>} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/application-tracking" element={<ApplicationTracking />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />



      </Routes>
      {user && <Footer />}
    </main>
  );
}
export default App;
