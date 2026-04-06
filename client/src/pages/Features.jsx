import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Features = () => {
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

      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Powerful Features Built for You
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Everything you need to succeed in your studies with AI-powered insights
        </p>
      </section>

      {/* FEATURES GRID */}
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

      {/* CTA SECTION */}
      <section className="py-16 text-center px-6 mb-20">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Study Journey?
        </h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/signup"
            className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-lg font-semibold shadow-lg shadow-blue-600/30 transition"
          >
            Get Started 🚀
          </Link>
          <Link
            to="/login"
            className="px-10 py-4 border border-white/20 rounded-xl text-lg hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
