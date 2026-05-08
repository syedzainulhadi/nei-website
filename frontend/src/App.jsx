import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import ActivityDetail from "./pages/ActivityDetail";
import Staff from "./pages/Staff";
import ReachUs from "./pages/ReachUs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Achievements from "./pages/Achievements";
import Videos from "./pages/Videos";                  // NEW

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/"                element={<Home />} />
              <Route path="/about"           element={<About />} />
              <Route path="/library"         element={<Library />} />
              <Route path="/library/:id"     element={<ActivityDetail />} />
              <Route path="/staff"           element={<Staff />} />
              <Route path="/achievements"    element={<Achievements />} />
              <Route path="/videos"          element={<Videos />} />     {/* NEW */}
              <Route path="/reach-us"        element={<ReachUs />} />
              <Route path="/admin/login"     element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;