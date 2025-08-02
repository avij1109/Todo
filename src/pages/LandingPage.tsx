import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

// Simple SVG icons to replace lucide-react
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 7H22V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
              <Link to="/login">
                <button className="btn-ghost">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-primary">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-gradient-primary" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="badge-primary">
              ⚡ Move forward with purpose
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight">
              Todo Apps, But
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Faster</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Velocity transforms how you manage tasks. Beautiful design meets powerful functionality 
              to help you achieve more in less time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <button className="btn-primary-large">
                  Launch Velocity
                  <Zap className="w-5 h-5 ml-2" />
                </button>
              </Link>
              <button className="btn-secondary-large">
                <Star className="w-5 h-5 mr-2" />
                See Demo
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-text-muted text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-status-success" />
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-velocity-blue" />
                Loved by 10k+ users
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-velocity-green" />
                Boost productivity 3x
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
            <div className="velocity-glass border-border-elevated p-8 text-center velocity-hover velocity-transition">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Smart Organization</h3>
              <p className="text-text-secondary leading-relaxed">
                Intelligent priority system and categories that adapt to your workflow.
              </p>
            </div>
            
            <div className="velocity-glass border-border-elevated p-8 text-center velocity-hover velocity-transition">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Beautiful Interface</h3>
              <p className="text-text-secondary leading-relaxed">
                Stunning glass morphism design that makes task management enjoyable.
              </p>
            </div>
            
            <div className="velocity-glass border-border-elevated p-8 text-center velocity-hover velocity-transition">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">Lightning Fast</h3>
              <p className="text-text-secondary leading-relaxed">
                Smooth animations and instant responses keep you in the flow.
              </p>
            </div>
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

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Loved by Productive People
            </h2>
            <p className="text-xl text-text-secondary">
              See what our users are saying about Velocity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="velocity-glass border-border-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-semibold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">John Doe</h4>
                  <p className="text-text-muted text-sm">Product Manager</p>
                </div>
              </div>
              <p className="text-text-secondary">
                "Velocity completely changed how I manage my daily tasks. The interface is beautiful and the animations make it a joy to use."
              </p>
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-velocity-orange fill-current" />
                ))}
              </div>
            </div>
            
            <div className="velocity-glass border-border-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center">
                  <span className="text-white font-semibold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Sarah Miller</h4>
                  <p className="text-text-muted text-sm">UX Designer</p>
                </div>
              </div>
              <p className="text-text-secondary">
                "Finally, a todo app that doesn't feel like work. The priority system helps me focus on what matters most."
              </p>
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-velocity-orange fill-current" />
                ))}
              </div>
            </div>
            
            <div className="velocity-glass border-border-elevated p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-semibold">MJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Mike Johnson</h4>
                  <p className="text-text-muted text-sm">Entrepreneur</p>
                </div>
              </div>
              <p className="text-text-secondary">
                "I've tried dozens of productivity apps. Velocity is the first one that actually made me more productive."
              </p>
              <div className="flex items-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-velocity-orange fill-current" />
                ))}
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
                  <Link to="/signup">
                    <button className="btn-primary-large">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Start Using Velocity
                    </button>
                  </Link>
                  <button className="btn-secondary-large">
                    <Github className="w-5 h-5 mr-2" />
                    View on GitHub
                  </button>
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
                <button className="btn-ghost-icon">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="btn-ghost-icon">
                  <Github className="w-5 h-5" />
                </button>
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

export default LandingPage; 