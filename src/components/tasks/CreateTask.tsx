import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./CreateTask.css";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string | Timestamp; // To accommodate Firestore Timestamps
  userId: string;
}

const CreateTask: React.FC<{ onAddTask: (task: Task) => void }> = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      alert("You must be logged in to create a task.");
      setLoading(false);
      return;
    }

    

    try {
      const newTask = {
        title,
        description,
        createdAt: Timestamp.fromDate(new Date()), // Firestore Timestamp
        userId: currentUser.uid,
      };

      const docRef = await addDoc(collection(db, "tasks"), newTask);
      onAddTask({ id: docRef.id, ...newTask });
      setTitle("");
      setDescription("");
      alert("Task created successfully!");
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : "An unknown error occurred.";
      console.error("Error adding task:", errorMessage);
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
            <label htmlFor="task-title">Task Title:</label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-label="Task Title"
            />
          </div>
          <div className="input-group">
            <label htmlFor="task-description">Task Description:</label>
            <textarea
              id="task-description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              aria-label="Task Description"
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

export default CreateTask;
