import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import CreateTask from "./components/tasks/CreateTask"
import ViewTasks from "./components/tasks/ViewTasks"
import Footer from "../src/components/footer/Footer"
import "./App.css"

const App = () => {
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      setUser(null)
    } catch (error: any) {
      console.error("Sign out error:", error.message)
    }
  }

  const addTask = (task: any) => {
    setTasks([...tasks, task])
  }

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleSignOut} />

        <div className="main-content">
          {user && <Sidebar username={user.displayName || user.email} onLogout={handleSignOut} />}

          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/create-task"
                element={user ? <CreateTask onAddTask={addTask} /> : <Navigate to="/login" />}
              />
              <Route path="/view-tasks" element={user ? <ViewTasks tasks={tasks} /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App

