
import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectTable from './components/ProjectTable';
import AIAssistant from './components/AIAssistant';
import { Project, ProjectStatus } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('team-projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved projects");
      }
    }
  }, []);

  // Sync to local storage on change
  useEffect(() => {
    localStorage.setItem('team-projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (p: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...p,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateStatus = (id: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const stats = {
    total: projects.length,
    done: projects.filter(p => p.status === ProjectStatus.DONE).length,
    inProgress: projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length,
    pending: projects.filter(p => p.status === ProjectStatus.NOT_STARTED).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-[#808000] py-10 px-4 sm:px-6 lg:px-8 mb-10 shadow-lg border-b border-black/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-amber-50">Team Project Tracker</h1>
            <p className="mt-2 text-lg text-amber-100/90 font-medium max-w-2xl">
              Coordinate your workflow and boost team transparency with streamlined status tracking.
            </p>
          </div>
          <div className="flex gap-4">
             <div className="bg-black/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 shadow-sm transition-transform hover:scale-105">
                <span className="text-[10px] font-bold text-amber-200/70 uppercase tracking-widest block mb-1">Total Projects</span>
                <span className="text-3xl font-black text-amber-50">{stats.total}</span>
             </div>
             <div className="bg-black/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 shadow-sm transition-transform hover:scale-105">
                <span className="text-[10px] font-bold text-amber-200/70 uppercase tracking-widest block mb-1">Completed</span>
                <span className="text-3xl font-black text-amber-50">{stats.done}</span>
             </div>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ProjectForm onAdd={addProject} />
            <ProjectTable 
              projects={projects} 
              onDelete={deleteProject} 
              onUpdateStatus={updateStatus} 
            />
          </div>
          
          <aside className="lg:col-span-1">
             <div className="sticky top-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
                  <h3 className="text-sm font-bold text-gray-800 uppercase mb-4 tracking-wider">Project Health</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-gray-500">Done</span>
                        <span className="text-gray-900">{stats.done} / {stats.total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-green-500 h-full transition-all duration-1000" 
                          style={{ width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-gray-500">In Progress</span>
                        <span className="text-gray-900">{stats.inProgress} / {stats.total}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full transition-all duration-1000" 
                          style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <AIAssistant projects={projects} />
             </div>
          </aside>
        </div>
      </main>

      <footer className="mt-20 py-8 border-t border-gray-200 text-center text-gray-400 text-sm max-w-6xl mx-auto">
        <p>&copy; {new Date().getFullYear()} Team Project Tracker. Built for high-performance teams.</p>
      </footer>
    </div>
  );
};

export default App;
