import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./ViewTasks.css";
import trash from "../../../assets/trash.png";

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId:string;
}

const ViewTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Tooltip State
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });

  // Function to Show Tooltip
  const showTooltip = (e: React.MouseEvent) => {
    setTooltip({ visible: true, x: e.clientX, y: e.clientY });
  };

  // Function to Hide Tooltip
  const hideTooltip = () => {
    setTooltip({ visible: false, x: 0, y: 0 });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser) {
        setLoading(false);
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
          let formattedDate = "Unknown";

          if (data.createdAt && data.createdAt.seconds) {
            formattedDate = new Date(
              data.createdAt.seconds * 1000
            ).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            });
          }

          return {
            id: doc.id,
            title: data.title || "Untitled",
            description: data.description || "No description",
            createdAt: formattedDate,
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

  /**
   * Handles the deletion of a task.
   * @param taskId The ID of the task to delete.
   */
  const handleDelete = async (taskId: string) => {
    // Hide the tooltip when the button is clicked
    hideTooltip();
    try {
      // Get a reference to the specific task document in Firestore
      const taskDocRef = doc(db, "tasks", taskId);
      // Delete the document
      await deleteDoc(taskDocRef);
      // Update the local state to remove the deleted task from the UI
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      console.error("Error deleting task:", errorMessage);
      setError("Failed to delete task. Please try again.");
    }
  };

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
              <div className="task-content">
                <p className="task-title">{task.title}</p>
                <p className="task-description">{task.description}</p>
                <button
                  className="delete"
                  onClick={() => handleDelete(task.id)} // Added onClick handler
                  onMouseEnter={showTooltip}
                  onMouseMove={showTooltip}
                  onMouseLeave={hideTooltip}
                >
                  <img src={trash} alt="Delete" className="trash" />
                </button>
              </div>
              <small className="task-date">{task.createdAt}</small>
            </div>
          ))}
        </div>
      )}

      {/* Tooltip UI */}
      {tooltip.visible && (
        <div
          className="tooltip show"
          style={{
            position: "fixed",
            top: `${tooltip.y + 10}px`,
            left: `${tooltip.x + 10}px`,
          }}
        >
          Delete Task
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
