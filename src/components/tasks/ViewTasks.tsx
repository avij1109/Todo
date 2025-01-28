import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string; // The formatted date string for display
  userId: string;
}

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser) {
        setLoading(false); // Avoid indefinite loading
        return;
      }

      try {
        const tasksRef = collection(db, "tasks");
        const q = query(
          tasksRef,
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const fetchedTasks = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "Untitled",
            description: data.description || "No description",
            // Convert ISO string to formatted date string
            createdAt: data.createdAt
              ? new Date(data.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "Unknown",
            userId: data.userId,
          } as Task;
        });

        setTasks(fetchedTasks);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred.";
        console.error("Error fetching tasks:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentUser]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="view-tasks">
      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available. Create a new task!</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div className="task-row">
                <p className="task-title">{task.title}</p>
              </div>
              <div className="task-row">
                <p className="task-description">{task.description}</p>
              </div>
              <div className="task-row">
                <small>Created At: {task.createdAt}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
