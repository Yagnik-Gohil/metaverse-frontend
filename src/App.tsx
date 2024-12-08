import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import VerifyOtp from "./pages/VerifyOtp";
import Profile from "./pages/Profile";
import CreateSpace from "./pages/CreateSpace";

function App() {
  const location = useLocation();

  const publicRoutes = ["/login", "/signup", "/verify-otp"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 select-none">
      <Toaster position="top-right" reverseOrder={false} />

      {!isPublicRoute && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/create-space" element={<CreateSpace />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
