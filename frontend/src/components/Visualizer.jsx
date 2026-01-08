import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import ComplexityChart from './ComplexityChart';
import CodeMetrics from './CodeMetrics';
import MetricBarChart from './MetricBarChart';
import { Activity, Code, Settings, Zap, Clock, Database, AlertCircle, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Visualizer() {
    const [code, setCode] = useState('def foo(n):\n    for i in range(n):\n        for j in range(n):\n            print(i, j)');
    const [language, setLanguage] = useState('python');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [suggestion, setSuggestion] = useState(null);
    const [optimizing, setOptimizing] = useState(false);

    const handleAnalyze = async () => {
        setLoading(true);
        setError(null);
        setAnalysis(null); // Reset analysis on new request
        try {
            const response = await fetch('http://127.0.0.1:8000/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, language }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            if (data.error) {
                setError(data.error);
                setAnalysis(null);
            } else {
                setAnalysis(data);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to connect to backend. Ensure it is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleAiSuggestion = async () => {
        setOptimizing(true);
        setSuggestion(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/optimize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code, language }),
            });

            if (!response.ok) {
                throw new Error('Optimization failed');
            }

            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                setSuggestion(data.suggestion);
            }
        } catch (err) {
            console.error(err);
            alert('Failed to get suggestions. Ensure backend is running.');
        } finally {
            setOptimizing(false);
        }
    };

    const suggestionRef = React.useRef(null);

    useEffect(() => {
        if (suggestion && suggestionRef.current) {
            suggestionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [suggestion]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans selection:bg-indigo-500 selection:text-white pb-12">
            {/* Header */}
            <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <Link to="/" className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-gray-500" />
                            </Link>
                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-md">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                                ComplexityVisualizer
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                            >
                                <option value="python">Python</option>
                                <option value="javascript">JavaScript</option>
                            </select>
                        </div>
                    </div>

                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Source Code - Moved to Top */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                            <Code className="w-5 h-5 text-indigo-500" />
                            <span>Source Code</span>
                        </h2>
                    </div>
                    <CodeEditor code={code} setCode={setCode} language={language} />

                    <div className="flex justify-end">
                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !code.trim()}
                            className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Analyzing...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-4 h-4" />
                                    <span>Analyze Code</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Progress Bars - Only show if analysis exists */}
                    {analysis && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time Complexity</span>
                                </div>
                                <div className="flex items-end justify-between mb-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {analysis ? analysis.time_complexity : '-'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className={`h-2.5 rounded-full ${analysis?.time_complexity.includes('n^') ? 'bg-red-500' : analysis?.time_complexity.includes('n') ? 'bg-yellow-500' : 'bg-green-500'}`}
                                        style={{ width: analysis?.time_complexity.includes('n^2') ? '80%' : analysis?.time_complexity === 'O(n)' ? '40%' : '10%' }}
                                    ></div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Database className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Space Complexity</span>
                                </div>
                                <div className="flex items-end justify-between mb-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {analysis ? analysis.space_complexity : '-'}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                    <div
                                        className="bg-green-500 h-2.5 rounded-full"
                                        style={{ width: analysis?.space_complexity.includes('n') ? '40%' : '10%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Grid: Visualizations & Optimization Suggestions - Only show if analysis exists */}
                {analysis && (
                    <div className="space-y-8">

                        {/* Left Column: Visualization */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                                <Activity className="w-5 h-5 text-purple-500" />
                                <span>Visualizations</span>
                            </h2>

                            {/* Visualizations Stacked */}
                            <div className="space-y-6">
                                <ComplexityChart analysis={analysis} />

                                {/* Code Metrics Grid */}
                                <div>
                                    <CodeMetrics metrics={analysis?.metrics} />
                                </div>

                                <MetricBarChart metrics={analysis?.metrics} />
                            </div>
                        </div>

                        {/* Right Column: Optimization Suggestions */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                                Optimization Suggestions
                            </h3>

                            {loading ? (
                                <div className="animate-pulse space-y-3">
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                </div>
                            ) : error ? (
                                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    {error}
                                </div>
                            ) : analysis && analysis.suggestions && analysis.suggestions.length > 0 ? (
                                <div className="space-y-4">
                                    {analysis.suggestions.map((s, i) => (
                                        <div key={i} className="flex items-start p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700/50">
                                            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{s}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-start p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-700/50 mt-4">
                                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                                            <strong>Tip:</strong> Focus on the suggestions with the highest impact first. Reducing nested loops and optimizing recursive calls typically provide the most significant performance improvements.
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                                    Code looks optimized! No major issues detected.
                                </div>
                            )}
                        </div>

                        {/* AI Suggestion Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleAiSuggestion}
                                disabled={optimizing || !code.trim()}
                                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {optimizing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                        <span>Generating Suggestions...</span>
                                    </>
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5 text-yellow-200" />
                                        <span>AI Suggestion</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* AI Suggestion Result */}
                        {suggestion && (
                            <div ref={suggestionRef} className="mt-8 bg-gray-900 text-gray-100 rounded-xl p-6 shadow-2xl border border-gray-700">
                                <h3 className="text-xl font-bold mb-4 flex items-center text-teal-400">
                                    <Zap className="w-6 h-6 mr-2" />
                                    AI Refactored Code & Explanation
                                </h3>
                                <div className="prose prose-invert max-w-none whitespace-pre-wrap font-mono text-sm bg-gray-950 p-4 rounded-lg overflow-x-auto">
                                    {suggestion}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Visualizer;
