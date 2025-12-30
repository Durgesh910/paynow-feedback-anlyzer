
import React, { useState } from 'react';
import { ProjectStatus, Project } from '../types';

interface ProjectFormProps {
  onAdd: (project: Omit<Project, 'id' | 'createdAt'>) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.NOT_STARTED);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) return;

    onAdd({ name, owner, status });
    setName('');
    setOwner('');
    setStatus(ProjectStatus.NOT_STARTED);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Project Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q4 Marketing Campaign"
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Owner</label>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="e.g. Sarah Johnson"
            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer"
            >
              {Object.values(ProjectStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md shadow-orange-200"
        >
          + Add Project
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
