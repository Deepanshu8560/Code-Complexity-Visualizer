import React from 'react';

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <div className="w-full h-96 border rounded-lg overflow-hidden shadow-lg bg-gray-900 border-gray-700">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <span className="text-gray-300 font-medium text-sm">Input Code ({language})</span>
        <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <textarea
        className="w-full h-full p-4 bg-gray-900 text-gray-100 font-mono text-sm focus:outline-none resize-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={`Paste your ${language} code here...`}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;
