import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, Server, Code, Zap, Terminal } from 'lucide-react';

const Documentation = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white">

            {/* Header */}
            <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <Book className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            Documentation
                        </h1>
                    </div>
                    <Link to="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

                {/* Introduction */}
                <section>
                    <h2 className="text-4xl font-extrabold mb-6">Introduction</h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        The <strong>Code Complexity Visualizer</strong> is a powerful tool designed to help developers understand the performance implications of their code in real-time. By combining static analysis with AI-powered insights, it provides a comprehensive view of time and space complexity.
                    </p>
                </section>

                {/* Features */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center">
                        <Zap className="w-8 h-8 text-yellow-400 mr-3" />
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition-colors">
                            <h3 className="text-xl font-bold mb-3 text-indigo-400">Real-Time Visualization</h3>
                            <p className="text-gray-400">Dynamic graphs that plot your code's complexity (O(n), O(log n), etc.) against standard curves.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
                            <h3 className="text-xl font-bold mb-3 text-purple-400">AI Optimization</h3>
                            <p className="text-gray-400">Powered by Groq AI (Llama 3.1) to provide instant, actionable refactoring suggestions.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-colors">
                            <h3 className="text-xl font-bold mb-3 text-green-400">Deep Metrics</h3>
                            <p className="text-gray-400">Detailed breakdown of loops, recursion depth, conditionals, and array operations.</p>
                        </div>
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                            <h3 className="text-xl font-bold mb-3 text-blue-400">Multi-Language</h3>
                            <p className="text-gray-400">Support for both Python and JavaScript analysis.</p>
                        </div>
                    </div>
                </section>

                {/* Tech Stack */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center">
                        <Server className="w-8 h-8 text-blue-400 mr-3" />
                        Tech Stack
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div className="w-24 font-bold text-gray-300">Frontend</div>
                            <div className="text-gray-400">React, Vite, Tailwind CSS, Recharts, Lucide React</div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div className="w-24 font-bold text-gray-300">Backend</div>
                            <div className="text-gray-400">FastAPI (Python), Uvicorn</div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-800/30 rounded-lg border border-gray-700">
                            <div className="w-24 font-bold text-gray-300">AI Engine</div>
                            <div className="text-gray-400">Groq API (Llama 3.1 Model)</div>
                        </div>
                    </div>
                </section>

                {/* Usage Guide */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center">
                        <Terminal className="w-8 h-8 text-green-400 mr-3" />
                        How to Use
                    </h2>
                    <div className="space-y-6">
                        <div className="relative pl-8 border-l-2 border-gray-700">
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                            <h3 className="text-xl font-bold mb-2">1. Paste Your Code</h3>
                            <p className="text-gray-400">Navigate to the Visualizer and paste your Python or JavaScript code into the editor.</p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-gray-700">
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                            <h3 className="text-xl font-bold mb-2">2. Analyze</h3>
                            <p className="text-gray-400">Click the "Analyze Code" button. The system will calculate complexity metrics and render the graph.</p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-gray-700">
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
                            <h3 className="text-xl font-bold mb-2">3. Optimize with AI</h3>
                            <p className="text-gray-400">Click the "AI Suggestion" button to get an optimized version of your code with explanation.</p>
                        </div>
                    </div>
                </section>

            </main>

            <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
                <p>&copy; 2026 Code Complexity Visualizer. Documentation.</p>
            </footer>
        </div>
    );
};

export default Documentation;
