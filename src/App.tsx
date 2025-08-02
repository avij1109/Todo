import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Toaster } from "sonner";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTask from "./components/tasks/Create/CreateTask";
import ViewTasks from "./components/tasks/View/ViewTasks";
import Footer from "./components/footer/Footer";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";

// Import images
import velocityHero from './assets/velocity-hero.webp';
import appPreview from './assets/app-preview.webp';
import featureIcon1 from './assets/feature-icon-1.webp';
import featureIcon2 from './assets/feature-icon-2.webp';
import featureIcon3 from './assets/feature-icon-3.webp';

// SVG Icons
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

// Button Component
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}: {
  children: React.ReactNode;
  variant?: "default" | "velocity" | "outline" | "ghost";
  size?: "default" | "lg" | "icon";
  className?: string;
  [key: string]: any;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-surface-elevated text-text-primary border border-border hover:bg-surface",
    velocity: "bg-gradient-primary text-white shadow-medium hover:shadow-strong hover:scale-105",
    outline: "border border-border text-text-primary hover:bg-surface-elevated",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
  };
  
  const sizes = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge Component
const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </span>
);

// Card Component
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`velocity-glass rounded-xl p-6 ${className}`}>
    {children}
  </div>
);

// Full Landing Page Component - Exact from Lovable AI
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Navigation */}
      <nav className="velocity-glass border-b border-border-elevated sticky top-0 z-50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">Velocity</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-text-secondary hover:text-text-primary velocity-transition">
                Features
              </a>
              <a href="#how-it-works" className="text-text-secondary hover:text-text-primary velocity-transition">
                How it Works
              </a>
              <a href="#testimonials" className="text-text-secondary hover:text-text-primary velocity-transition">
                Testimonials
              </a>
            </div>
            
            <div className="flex items-center gap-3">
              <a href="/login">
                <Button variant="ghost">Login</Button>
              </a>
              <a href="/signup">
                <Button variant="velocity">
                  Sign Up
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${velocityHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <Badge className="bg-velocity-purple/20 text-velocity-purple border-velocity-purple/30">
              ⚡ Move forward with purpose
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight">
              Todo Apps, But
              <span className="text-velocity-purple ml-2"> Faster</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Velocity transforms how you manage tasks. Beautiful design meets powerful functionality 
              to help you achieve more in less time.
            </p>
            
            <div className="flex items-center justify-center">
              <a href="/signup">
                <Button variant="velocity" size="lg" className="text-lg px-8">
                  Launch Velocity
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-text-muted text-sm mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-status-success" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-velocity-blue" />
                <span>Loved by 10k+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-velocity-green" />
                <span>Boost productivity 3x</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl transform scale-75" />
              <div className="relative velocity-glass rounded-2xl p-4 border border-border-elevated shadow-strong">
                <img 
                  src={appPreview} 
                  alt="Velocity App Preview" 
                  className="w-full rounded-xl shadow-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Built for Speed & Simplicity
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Every feature designed to help you move faster and accomplish more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="velocity-glass border-border-elevated p-8 text-center velocity-hover velocity-transition">
              <div className="mb-6">
                <img src={featureIcon1} alt="Smart Organization" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Smart Organization</h3>
              <p className="text-text-secondary leading-relaxed">
                Intelligent priority system and categories that adapt to your workflow.
              </p>
            </Card>
            
            <Card className="velocity-glass border-border-elevated p-8 text-center velocity-hover velocity-transition">
              <div className="mb-6">
                <img src={featureIcon2} alt="Beautiful Interface" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Beautiful Interface</h3>
              <p className="text-text-secondary leading-relaxed">
                Stunning glass morphism design that makes task management enjoyable.
              </p>
            </Card>
            
            <Card className="velocity-glass border-border-elevated p-8 text-center velocity-hover velocity-transition">
              <div className="mb-6">
                <img src={featureIcon3} alt="Lightning Fast" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Lightning Fast</h3>
              <p className="text-text-secondary leading-relaxed">
                Smooth animations and instant responses keep you in the flow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Get Started in Seconds
            </h2>
            <p className="text-xl text-text-secondary">
              Three simple steps to transform your productivity
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Add Your Tasks</h3>
                <p className="text-text-secondary">
                  Simply type what needs to be done and set the priority level.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-secondary flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Stay Organized</h3>
                <p className="text-text-secondary">
                  Use categories and filters to keep everything perfectly organized.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary">Track Progress</h3>
                <p className="text-text-secondary">
                  Watch your productivity soar with real-time statistics and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="velocity-glass rounded-2xl p-12 border border-border-elevated shadow-strong relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-primary opacity-10" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl font-bold text-text-primary">
                  Ready to Move with Velocity?
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  Join thousands of productive people who have transformed their workflow with Velocity.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/signup">
                    <Button variant="velocity" size="lg" className="text-lg px-8">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Using Velocity
                    </Button>
                  </a>
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border-elevated">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-text-primary">Velocity</span>
              </div>
              
              <div className="flex items-center gap-6">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="border-t border-border-elevated mt-8 pt-8 text-center">
              <p className="text-text-muted">
                © 2024 Velocity. Built with ❤️ for productive people.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("App: Setting up auth listener");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("App: Auth state changed", user ? "User logged in" : "No user");
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      // The auth state change will automatically redirect to home
    } catch (error: any) {
      console.error("Sign out error:", error.message);
    }
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  // Show loading spinner while checking auth state
  if (loading) {
    console.log("App: Showing loading spinner");
    return (
      <div className="app-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  console.log("App: Rendering with user:", user ? "authenticated" : "not authenticated");

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth routes - show login/signup regardless of auth state */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes - redirect to login if not authenticated */}
          <Route path="/dashboard" element={
            user ? (
              <>
                <Header user={user} onLogout={handleSignOut} />
                <div className="dashboard-layout">
                  <div className="main-content-area">
                    <Dashboard />
                  </div>
                  <div className="sidebar-area">
                    <Sidebar username={user.displayName || user.email} onLogout={handleSignOut} />
                  </div>
                </div>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          <Route path="/create-task" element={
            user ? (
              <>
                <Header user={user} onLogout={handleSignOut} />
                <div className="dashboard-layout">
                  <div className="main-content-area">
                    <CreateTask onAddTask={addTask} />
                  </div>
                  <div className="sidebar-area">
                    <Sidebar username={user.displayName || user.email} onLogout={handleSignOut} />
                  </div>
                </div>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          <Route path="/view-tasks" element={
            user ? (
              <>
                <Header user={user} onLogout={handleSignOut} />
                <div className="dashboard-layout">
                  <div className="main-content-area">
                    <ViewTasks />
                  </div>
                  <div className="sidebar-area">
                    <Sidebar username={user.displayName || user.email} onLogout={handleSignOut} />
                  </div>
                </div>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          <Route path="/calendar" element={
            user ? (
              <>
                <Header user={user} onLogout={handleSignOut} />
                <div className="dashboard-layout">
                  <div className="main-content-area">
                    <div>Calendar Component</div>
                  </div>
                  <div className="sidebar-area">
                    <Sidebar username={user.displayName || user.email} onLogout={handleSignOut} />
                  </div>
                </div>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

interface Task {
  id: string;
  title: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
  category?: string;
  completed?: boolean;
  createdAt?: any;
  userId?: string;
}

export default App;
