import { useState, useEffect } from "react";
import API from "../api/axios";;
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= USER =================
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    localStorage.removeItem("user");
  }

  // ================= STATE =================
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [filter, setFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= DARK MODE =================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ================= PROTECT ROUTE =================
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch Tasks Error:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= ADD TASK =================
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await API.post("/tasks", { title });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  // ================= DELETE =================
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // ================= TOGGLE =================
  const toggleComplete = async (id) => {
    try {
      const res = await API.put(`/tasks/${id}`);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // ================= EDIT =================
  const editTask = async (id) => {
    const newTitle = prompt("Enter new title");
    if (!newTitle) return;

    try {
      await API.put(`/tasks/edit/${id}`, { title: newTitle });
      fetchTasks();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  // ================= AI GENERATE =================
  const generatePlan = async () => {
    if (!topic.trim()) return;

    try {
      setLoading(true);

      const res = await API.post("/ai/generate", { topic });

      console.log("SUCCESS:", res.data);

      fetchTasks();
      setTopic("");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
      console.log("ERROR DATA:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ================= PROGRESS =================
  const completed = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? (completed / tasks.length) * 100
    : 0;

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
        ? tasks.filter((t) => t.completed)
        : tasks.filter((t) => !t.completed);

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 p-6 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

        <h2 className="text-2xl font-bold text-purple-600 mb-10">
          AI Planner
        </h2>

        <nav className="space-y-6 text-gray-600 dark:text-gray-400 font-medium">
          <div className="hover:text-purple-600 cursor-pointer">Dashboard</div>
          <div className="hover:text-purple-600 cursor-pointer">Tasks</div>
          <div className="hover:text-purple-600 cursor-pointer">AI Planner</div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10 flex justify-center">
        <div className="w-full max-w-5xl">

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-2xl"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>

              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome,{" "}
                <span className="text-purple-500">{user?.name}</span> 👋
              </h1>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800"
              >
                {darkMode ? "🌞" : "🌙"}
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 rounded-xl text-white"
              >
                Logout
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Total Tasks", value: tasks.length },
              { label: "Completed", value: completed },
              { label: "Progress", value: `${Math.round(progress)}%` },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border dark:border-gray-800"
              >
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {card.label}
                </p>
                <h3 className="text-3xl font-bold mt-2">
                  {card.value}
                </h3>
              </div>
            ))}
          </div>

          {/* ADD TASK */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-5 py-3 rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-800 focus:ring-2 focus:ring-purple-600 outline-none"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* FILTER */}
          <div className="flex gap-8 mb-8 text-sm font-medium">
            {["all", "completed", "pending"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`capitalize pb-2 border-b-2 transition ${filter === f
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-purple-600"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* TASK LIST */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:shadow-lg transition"
              >
                <div
                  onClick={() => toggleComplete(task._id)}
                  className={`cursor-pointer text-base sm:text-lg font-medium ${task.completed ? "line-through text-gray-400" : ""
                    }`}
                >
                  {task.title}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => editTask(task._id)}
                    className="px-4 py-1.5 bg-yellow-400 rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI SECTION */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">
              🤖 AI Study Planner
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Generate plan for DSA, React..."
                className="flex-1 px-5 py-3 rounded-xl bg-white text-black"
              />
              <button
                onClick={generatePlan}
                disabled={loading}
                className="px-6 py-3 bg-black text-white rounded-xl hover:opacity-90"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;