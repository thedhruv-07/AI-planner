import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-planner-4xv2.onrender.com/api",
});

export default API;