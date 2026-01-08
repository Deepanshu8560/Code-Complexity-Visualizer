import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Zap, Code, BarChart, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden relative">

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[60%] w-[20%] h-[30%] bg-blue-500/10 rounded-full blur-[80px]"></div>
            </div>

            <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg">
                        <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        ComplexityVisualizer
                    </span>
                </div>
                <div>
                    <a href="https://github.com/yourusername/code-complexity-visualizer" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                        GitHub
                    </a>
                </div>
            </nav>

            <header className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm mb-8 backdrop-blur-sm">
                    <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                    Now supporting Python & JavaScript
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                    See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Invisible Costs</span> <br />
                    of Your Code
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                    Real-time Time &amp; Space complexity analysis. Visualize performance bottlenecks, get actionable optimization tips, and write faster code.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/visualizer" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ring-offset-gray-900">
                        Start Analyzing Now
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
                    </Link>
                    <Link to="/docs" className="px-8 py-4 text-lg font-medium text-gray-300 hover:text-white transition-colors">
                        View Documentation
                    </Link>
                </div>
            </header>

            {/* Feature Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                            <Activity className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-100">Big O Analysis</h3>
                        <p className="text-gray-400">
                            Instantly calculate Time and Space complexity (O(n), O(log n), etc.) for your functions as you type.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                            <Zap className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-100">AI Suggestions</h3>
                        <p className="text-gray-400">
                            Receive smart, context-aware optimization tips to refactor loops, recursion, and data structures.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 hover:bg-white/10">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                            <BarChart className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-100">Visual Metrics</h3>
                        <p className="text-gray-400">
                            Interactive charts break down loops, conditionals, and depth to help you visualize code structure.
                        </p>
                    </div>
                </div>
            </section>

            {/* Code Demo Preview */}
            <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                    <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-700">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="ml-4 text-xs text-gray-400 font-mono">demo.py</div>
                    </div>
                    <div className="p-8 font-mono text-sm sm:text-base grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-gray-300">
                            <span className="text-purple-400">def</span> <span className="text-blue-400">bubble_sort</span>(arr):<br />
                            &nbsp;&nbsp;n = <span className="text-yellow-400">len</span>(arr)<br />
                            &nbsp;&nbsp;<span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-yellow-400">range</span>(n):<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">for</span> j <span className="text-purple-400">in</span> <span className="text-yellow-400">range</span>(0, n-i-1):<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> arr[j] &gt; arr[j+1]:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+1] = arr[j+1], arr[j]
                        </div>
                        <div className="flex flex-col justify-center space-y-4 border-l border-gray-700 pl-8">
                            <div>
                                <div className="text-gray-500 text-xs uppercase mb-1">Time Complexity</div>
                                <div className="text-3xl font-bold text-red-400">O(n^2)</div>
                            </div>
                            <div>
                                <div className="text-gray-500 text-xs uppercase mb-1">Space Complexity</div>
                                <div className="text-3xl font-bold text-green-400">O(1)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="relative z-10 border-t border-gray-800 mt-12 py-8 text-center text-gray-500 text-sm">
                <p>&copy; 2026 Code Complexity Visualizer. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
