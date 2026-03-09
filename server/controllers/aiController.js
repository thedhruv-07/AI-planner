import Groq from "groq-sdk";
import Task from "../models/Task.js";

export const generatePlan = async (req, res) => {
  try {
    const { topic } = req.body;

    // ✅ Create Groq client INSIDE function
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "GROQ_API_KEY is missing in environment variables",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `Create a 5 day beginner study plan for ${topic}. 
Return ONLY JSON like:
[
 { "day": 1, "task": "Learn basics" },
 { "day": 2, "task": "Practice problems" }
]`,
        },
      ],
    });

    const aiText = completion.choices[0].message.content;

    let tasks;

    try {
      tasks = JSON.parse(aiText);
    } catch (err) {
      console.log("JSON PARSE ERROR:", aiText);
      return res.status(500).json({
        error: "AI returned invalid format",
        raw: aiText,
      });
    }

    const savedTasks = [];

    for (let t of tasks) {
      const newTask = new Task({
        title: `Day ${t.day}: ${t.task}`,
        completed: false,
        user: req.user.id,
      });

      await newTask.save();
      savedTasks.push(newTask);
    }

    res.json({
      message: "AI plan generated",
      tasks: savedTasks,
    });

  } catch (error) {
    console.log("AI ERROR:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
};