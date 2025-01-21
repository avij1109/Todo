import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface CreateTaskProps {
  onAddTask: (task: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      description,
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="create-task">
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
          <button type="submit" className="create-task-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
