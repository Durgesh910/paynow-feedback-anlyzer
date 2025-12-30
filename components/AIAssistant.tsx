
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Project } from '../types';

interface AIAssistantProps {
  projects: Project[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ projects }) => {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateSuggestion = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = projects.length > 0 
        ? `I have these projects: ${projects.map(p => `${p.name} (Owner: ${p.owner}, Status: ${p.status})`).join(', ')}. 
           Provide a short, motivating 2-sentence summary of team progress and one actionable tip to improve productivity.`
        : "I have no projects yet. Give me 3 creative team project ideas for a tech startup.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setSuggestion(response.text || "Unable to generate suggestion at this time.");
    } catch (error) {
      console.error("AI Error:", error);
      setSuggestion("Could not reach the AI. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800">Team Intel AI</h3>
        </div>
        <button
          onClick={generateSuggestion}
          disabled={loading}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : null}
          {projects.length > 0 ? "Analyze Progress" : "Get Project Ideas"}
        </button>
      </div>
      
      {suggestion && (
        <div className="text-gray-600 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="bg-white/60 p-4 rounded-lg border border-white/80 italic shadow-inner">
            "{suggestion}"
          </p>
        </div>
      )}

      {!suggestion && !loading && (
        <p className="text-gray-400 text-sm italic">
          Click the button for AI-driven insights on your team's workload.
        </p>
      )}
    </div>
  );
};

export default AIAssistant;
