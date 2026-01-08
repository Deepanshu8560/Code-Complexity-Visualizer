import React from 'react';
import { List } from 'lucide-react';

const CodeMetrics = ({ metrics }) => {
    if (!metrics) return null;

    const cards = [
        { label: 'Loops', value: metrics.loops, desc: 'For & While loops' },
        { label: 'Nested Loops', value: metrics.nested_loops, desc: 'Max depth' },
        { label: 'Recursive Calls', value: metrics.recursion, desc: 'Self-references' },
        { label: 'Array Ops', value: metrics.array_ops, desc: 'Heavy operations' },
        { label: 'Conditionals', value: metrics.conditionals, desc: 'If statements' },
        { label: 'Max Nesting', value: metrics.max_nesting, desc: 'Complexity depth' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Code Metrics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cards.map((card, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                            {card.value}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {card.label}
                        </div>
                        <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                            {card.desc}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodeMetrics;
