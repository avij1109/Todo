import React from 'react';
import './ViewTasks.css'
interface Task {
  id: number;
  title: string;
  description: string;
}

interface ViewTasksProps {
  tasks: Task[];
}

const ViewTasks: React.FC<ViewTasksProps> = ({ tasks }) => {
  return (
    <div className="view-tasks">
      <h2>All Tasks</h2>
      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available. Create a task to get started.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewTasks;
