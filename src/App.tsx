import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTask from "./components/tasks/Create/CreateTask";
import ViewTasks from "./components/tasks/View/ViewTasks";
import Footer from "../src/components/footer/Footer";
import "./App.css";
import Intro from "./components/intro/Intro";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error("Sign out error:", error.message);
    }
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleSignOut} />
        <div className="main-content">
          {user && <Sidebar username={user.displayName || user.email} onLogout={handleSignOut} />}
          <div className="content">
            <Routes>
              <Route path="/" element={user ? <Navigate to="/view-tasks" /> : <Intro />} />
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
  );
};

interface Task {
  id: string;
  title: string;
  description: string;
}

export default App;
