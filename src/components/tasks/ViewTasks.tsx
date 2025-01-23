import type React from "react"
import { motion } from "framer-motion"
import "./ViewTasks.css"

interface Task {
  id: number
  title: string
  description: string
}

interface ViewTasksProps {
  tasks: Task[]
}

const ViewTasks: React.FC<ViewTasksProps> = ({ tasks }) => {
  return (
    <motion.div className="view-tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>All Tasks</h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available. Create a task to get started.</p>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              className="task-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

export default ViewTasks

