import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./CreateTask.css";

const CreateTask: React.FC<{ onAddTask: (task: Task) => void }> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTask = {
        title,
        description,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "tasks"), newTask);
      onAddTask({ id: docRef.id, ...newTask });
      setTitle("");
      setDescription("");
      alert("Task created successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="create-task"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="task-form-card">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Task Title:</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Task Description:</label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="create-task-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

interface Task {
  id: string;
  title: string;
  description: string;
}

export default CreateTask;
