import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import ProtectedRoute from "./components/ProtectedRoute";

function Landing() {

  const navigate = useNavigate();

  const features = [
    {
      title: "AI Roadmaps",
      desc: "Generate structured study plans instantly using AI."
    },
    {
      title: "Track Progress",
      desc: "Monitor completed tasks and visualize your growth."
    },
    {
      title: "Stay Organized",
      desc: "Manage tasks efficiently with smart filters and tracking."
    },
    {
      title: "Analytics & Insights",
      desc: "Get detailed insights into your study patterns and performance metrics."
    }
  ];

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

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, i) => (
          <div
            key={i}
            className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition duration-300"
          >
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 text-lg">{feature.desc}</p>
          </div>
        ))}
      </section>

    </div>
  );
}

function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Features Page */}
      <Route path="/features" element={<Features />} />

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