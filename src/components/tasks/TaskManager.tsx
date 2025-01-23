import type React from "react"
import { useState, useEffect } from "react"
import CreateTask from "./CreateTask"
import ViewTasks from "./ViewTasks"

interface Task {
  id: number
  title: string
  description: string
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = localStorage.getItem("tasks")
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }

  return (
    <div className="task-manager">
      <CreateTask onAddTask={addTask} />
      <ViewTasks tasks={tasks} />
    </div>
  )
}

export default TaskManager

