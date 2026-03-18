import { React } from "react";
import {BrowserRouter , Routes , Route} from  "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyOTP from "./pages/VerifyOTP";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import JobDetail from "./pages/JobDetail";
import UploadResume from "./pages/UploadResume";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/verify-otp" element={<VerifyOTP/>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/addjob" element={<ProtectedRoute><AddJob/></ProtectedRoute>} />
              <Route path="/jobdetail/:id" element={<ProtectedRoute><JobDetail/></ProtectedRoute>} />
              <Route path="/upload-resume" element={<ProtectedRoute><UploadResume/></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
