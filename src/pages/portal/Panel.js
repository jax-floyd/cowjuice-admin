// src/components/CodeGeneratorPanel.jsx
import React, { useState, useEffect } from 'react';
import generateBetaAccessCode from '../../functions/utils/generateBetaAccessCode';

const STORAGE_KEY = 'betaAccessEntries';

const Panel = () => {
  const [username, setUsername] = useState('');
  const [entries, setEntries]   = useState([]);

  // Load saved entries once on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setEntries(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to parse saved entries:', e);
      }
    }
  }, []);

  // Persist entries any time they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleGenerate = () => {
    const clean = username.trim().toLowerCase();
    if (!clean) return;

    const code = generateBetaAccessCode(clean);
    const newEntry = {
      username: clean,
      code,
      created: new Date().toLocaleString(),
    };

    setEntries((prev) => [...prev, newEntry]);
    setUsername('');
  };

  return (
    <div className="inset-0 flex items-start justify-center min-h-screen p-6 bg-white">
      <div className="w-full max-w-3xl space-y-6">
        {/* Input + Button */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="TikTok username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 border-[0.5px] border-black px-3 py-2 text-xs font-mono rounded-sm focus:outline-none"
          />
          <button
            onClick={handleGenerate}
            className="bg-black text-white px-4 py-2 text-xs font-mono rounded-sm hover:bg-neutral-700"
          >
            Generate
          </button>
        </div>

        {/* Generated Codes Sheet */}
        <div className="overflow-x-auto border-[0.5px] border-black">
          <table className="min-w-full text-xs font-mono">
            <thead className="bg-neutral-100">
              <tr>
                <th className="p-2 text-left">#</th>
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-left">Code</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-2 text-left">Profile</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e, i) => (
                <tr
                  key={i}
                  className={`animate-flip-down ${
                    i < entries.length - 1 ? 'border-b-[0.5px] border-black/60' : ''
                  }`}
                >
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">@{e.username}</td>
                  <td className="p-2 font-bold">{e.code}</td>
                  <td className="p-2 whitespace-nowrap">{e.created}</td>
                  <td className="p-2">
                    <a
                      href={`https://www.tiktok.com/@${e.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cowjuice-gold uppercase font-bold border-[0.5px] border-cowjuice-gold rounded-sm px-4 hover:bg-cowjuice-gold hover:text-white text-xs transition-colors duration-300"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center opacity-60">
                    No codes generated yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Panel;