
import React from 'react';
import { Project, ProjectStatus } from '../types';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: ProjectStatus) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onDelete, onUpdateStatus }) => {
  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.DONE:
        return 'bg-green-100 text-green-700 border-green-200';
      case ProjectStatus.IN_PROGRESS:
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 hidden md:table-header-group">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100 block md:table-row-group">
          {projects.length === 0 ? (
            <tr className="block md:table-row">
              <td colSpan={4} className="px-6 py-12 text-center text-gray-400 block md:table-cell">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>No projects tracked yet. Start by adding one above.</span>
                </div>
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors block md:table-row p-4 md:p-0 border-b md:border-none">
                {/* Project Name & Date */}
                <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold md:font-medium text-gray-900">{project.name}</span>
                    <span className="text-xs text-gray-400 md:mt-0.5">Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </td>

                {/* Owner & Status (Grouped for mobile) */}
                <td className="px-0 md:px-6 py-2 md:py-4 block md:table-cell">
                  <div className="flex items-center justify-between md:justify-start">
                    <div className="flex items-center">
                      <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] md:text-xs font-bold mr-2 md:mr-3">
                        {project.owner.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-gray-600">{project.owner}</span>
                    </div>
                    {/* Status Badge - Only shown here on mobile */}
                    <span className={`md:hidden px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </td>

                {/* Status (Desktop only) */}
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(project.status)}`}>
                    {project.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-0 md:px-6 py-3 md:py-4 block md:table-cell text-left md:text-right">
                  <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t border-gray-50 md:border-none">
                    <div className="flex-1 md:flex-none">
                      <label className="md:hidden block text-[10px] font-bold text-gray-400 uppercase mb-1">Update Status</label>
                      <select
                        value={project.status}
                        onChange={(e) => onUpdateStatus(project.id, e.target.value as ProjectStatus)}
                        className="w-full md:w-auto text-sm border-gray-200 rounded-lg px-3 py-2 md:py-1 focus:ring-orange-500 text-gray-600 bg-white cursor-pointer shadow-sm md:shadow-none"
                      >
                        {Object.values(ProjectStatus).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => onDelete(project.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 md:p-1 bg-red-50 md:bg-transparent rounded-lg"
                      title="Delete Project"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
