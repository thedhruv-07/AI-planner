import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function Landing() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Study Smarter with
          <span className="text-blue-500"> AI Power</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
          Plan your study schedule, track progress, and let AI generate
          the perfect roadmap for your exams.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-blue-600/30"
          >
            🚀 Start Planning
          </button>
        </div>

      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;