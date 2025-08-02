import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../../../firebase';
import { toast } from 'sonner';
import { VelocityHeader } from '../VelocityHeader';
import { AddTodoForm } from '../AddTodoForm';
import { TodoCard, Todo } from '../TodoCard';
import { TodoStats } from '../TodoStats';
import { Button } from '../ui/button';
import { Filter, SortAsc } from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    console.log('Dashboard useEffect running');
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      console.log('fetchTodos called');
      const user = auth.currentUser;
      console.log('Current user:', user);
      
      if (!user) {
        console.log('No user found, setting loading to false');
        setLoading(false);
        return;
      }

      // Test Firebase connection first
      console.log('Testing Firebase connection...');
      try {
        const testQuery = query(collection(db, 'tasks'), where('userId', '==', user.uid));
        const testSnapshot = await getDocs(testQuery);
        console.log('Firebase connection test successful, found', testSnapshot.docs.length, 'documents');
      } catch (firebaseError) {
        console.error('Firebase connection test failed:', firebaseError);
        setError('Firebase connection failed. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      console.log('Executing Firebase query...');
      const querySnapshot = await getDocs(q);
      console.log('Query completed, processing results...');
      
      const todosData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || '',
          completed: data.completed || false,
          priority: data.priority || 'medium',
          category: data.category,
          createdAt: data.createdAt?.toDate() || new Date()
        };
      }) as Todo[];
      
      console.log('Todos processed:', todosData);
      setTodos(todosData);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load tasks');
      toast.error('Failed to load tasks');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const addTodo = async (todoData: Omit<Todo, 'id' | 'completed' | 'createdAt'>) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('User not authenticated');
        return;
      }

      const newTodo: Omit<Todo, 'id'> = {
        ...todoData,
        completed: false,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'tasks'), {
        ...newTodo,
        userId: user.uid
      });

      const todoWithId: Todo = {
        ...newTodo,
        id: docRef.id,
      };

      setTodos(prev => [todoWithId, ...prev]);
      toast.success('Task added successfully!', {
        description: 'Your new task has been added to Velocity.',
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Failed to add task');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      await updateDoc(doc(db, 'tasks', id), { completed: !todo.completed });
      
      setTodos(prev => prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      ));
      
      toast.success(
        todo.completed ? 'Task marked as pending' : 'Task completed!',
        {
          description: todo.completed 
            ? 'Task moved back to pending list.' 
            : 'Great job! Keep up the momentum.',
        }
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      toast.error('Failed to update task');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTodos(prev => prev.filter(todo => todo.id !== id));
      toast.success('Task deleted', {
        description: 'The task has been removed from your list.',
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
      toast.error('Failed to delete task');
    }
  };

  const filteredTodos = todos.filter(todo => {
    const statusMatch = filter === 'all' || 
      (filter === 'pending' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
      
    const priorityMatch = priorityFilter === 'all' || todo.priority === priorityFilter;
    
    return statusMatch && priorityMatch;
  });

  const todaysTodos = todos.filter(todo => 
    todo.createdAt.toDateString() === new Date().toDateString()
  );
  const completedToday = todaysTodos.filter(todo => todo.completed).length;

  console.log('Dashboard render - loading:', loading, 'error:', error, 'todos count:', todos.length);

  if (loading) {
    console.log('Rendering loading state');
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    console.log('Rendering error state');
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="velocity-glass rounded-xl p-8 text-center border border-border-elevated">
          <p className="text-text-muted text-lg">Error loading dashboard</p>
          <p className="text-text-muted text-sm mt-2">{error}</p>
          <Button 
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchTodos();
            }}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  console.log('Rendering main dashboard');
  
  // Fallback render to prevent blank screen
  try {
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <VelocityHeader 
            completedToday={completedToday}
            totalToday={todaysTodos.length}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <AddTodoForm onAdd={addTodo} />
              
              {/* Filters */}
              <div className="velocity-glass rounded-xl p-4 border border-border-elevated">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">Status:</span>
                    <div className="flex gap-2">
                      {['all', 'pending', 'completed'].map((status) => (
                        <Button
                          key={status}
                          variant={filter === status ? 'velocity' : 'ghost'}
                          size="sm"
                          onClick={() => setFilter(status as any)}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <SortAsc className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">Priority:</span>
                    <div className="flex gap-2">
                      {['all', 'high', 'medium', 'low'].map((priority) => (
                        <Button
                          key={priority}
                          variant={priorityFilter === priority ? 'velocity' : 'ghost'}
                          size="sm"
                          onClick={() => setPriorityFilter(priority as any)}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Todo List */}
              <div className="space-y-4">
                {filteredTodos.length === 0 ? (
                  <div className="velocity-glass rounded-xl p-8 text-center border border-border-elevated">
                    <p className="text-text-muted text-lg">No tasks found</p>
                    <p className="text-text-muted text-sm mt-2">
                      {filter === 'all' ? 'Add your first task to get started!' : `No ${filter} tasks match your filters.`}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map(todo => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <TodoStats todos={todos} />
              
              {/* Quick Actions */}
              <div className="velocity-glass rounded-xl p-6 border border-border-elevated">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setFilter('pending')}
                  >
                    View Pending Tasks ({todos.filter(t => !t.completed).length})
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setPriorityFilter('high')}
                  >
                    High Priority Tasks ({todos.filter(t => t.priority === 'high' && !t.completed).length})
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={async () => {
                      const completed = todos.filter(t => t.completed);
                      if (completed.length > 0) {
                        try {
                          await Promise.all(completed.map(todo => deleteDoc(doc(db, 'tasks', todo.id))));
                          setTodos(prev => prev.filter(t => !t.completed));
                          toast.success(`Cleared ${completed.length} completed tasks`);
                        } catch (error) {
                          console.error('Error clearing completed tasks:', error);
                          toast.error('Failed to clear completed tasks');
                        }
                      }
                    }}
                  >
                    Clear Completed ({todos.filter(t => t.completed).length})
                  </Button>
                </div>
              </div>
              
              {/* Categories */}
              <div className="velocity-glass rounded-xl p-6 border border-border-elevated">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Categories</h3>
                <div className="space-y-2">
                  {Array.from(new Set(todos.map(t => t.category).filter(Boolean))).map(category => {
                    const count = todos.filter(t => t.category === category && !t.completed).length;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-text-secondary text-sm">{category}</span>
                        <div className="badge-secondary">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering dashboard:', error);
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="velocity-glass rounded-xl p-8 text-center border border-border-elevated">
          <p className="text-text-muted text-lg">Something went wrong</p>
          <p className="text-text-muted text-sm mt-2">Please refresh the page and try again.</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Refresh Page
          </Button>
        </div>
      </div>
    );
  }
};

export default Dashboard; 