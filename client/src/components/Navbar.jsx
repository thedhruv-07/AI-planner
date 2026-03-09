import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-white/5 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            <span className="text-blue-500">AI</span> Planner
          </h1>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-gray-300 hover:text-white transition">
              Login
            </Link>

            <Link
              to="/signup"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/30 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-28 px-6 text-center relative">

        {/* Glow Background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-3xl rounded-full -z-10"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Study Smarter with{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Power
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Plan your study schedule, track progress, and let AI generate
          personalized roadmaps to master your exams efficiently.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <Link
            to="/signup"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold shadow-lg shadow-blue-600/30 transition"
          >
            🚀 Start Planning
          </Link>

          <Link
            to="/login"
            className="px-8 py-4 border border-white/20 rounded-xl text-lg hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {[
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
          }
        ].map((feature, i) => (
          <div
            key={i}
            className="p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition"
          >
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}

      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Boost Your Productivity?
        </h2>

        <Link
          to="/signup"
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold shadow-xl shadow-purple-600/30 hover:scale-105 transition"
        >
          Join Now 🚀
        </Link>
      </section>

    </div>
  );
};

export default Home;