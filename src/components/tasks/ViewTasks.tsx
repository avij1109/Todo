import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./ViewTasks.css";

interface Task {
  id: string;
  title: string;
  description: string;
}

const ViewTasks: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tasks.length) {
      const fetchTasks = async () => {
        try {
          const tasksRef = collection(db, "tasks");
          const q = query(tasksRef, orderBy("createdAt", "desc"));
          const snapshot = await getDocs(q);
          const fetchedTasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Task[];
          console.log("Fetched tasks:", fetchedTasks);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };

      fetchTasks();
    } else {
      setLoading(false);
    }
  }, [tasks]);

  if (loading) {
    return <p>Loading tasks...</p>;
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
                <span className="task-label">Task:</span>
                <span className="task-content">{task.title}</span>
              </div>
              <div className="task-row">
                <span className="task-label">Description:</span>
                <span className="task-content">{task.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
