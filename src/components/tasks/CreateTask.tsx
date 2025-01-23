import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import "./CreateTask.css"

interface Task {
  id: number
  title: string
  description: string
}

interface CreateTaskProps {
  onAddTask: (task: Task) => void
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      title,
      description,
    }
    onAddTask(newTask)
    setTitle("")
    setDescription("")
  }

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
          >
            Create Task
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default CreateTask

