import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ComplexityChart = ({ analysis }) => {
    // Parse complexity string to get the power of n
    const getComplexityFunction = (complexityStr) => {
        if (!complexityStr) return (n) => n; // Default to linear if unknown

        const cleanStr = complexityStr.replace(/\s+/g, '').toLowerCase();

        if (cleanStr.includes('o(1)')) return (n) => 1;
        if (cleanStr.includes('logn')) return (n) => Math.log2(n);
        if (cleanStr.includes('nlogn')) return (n) => n * Math.log2(n);
        if (cleanStr.includes('n^2')) return (n) => n * n;
        if (cleanStr.includes('n^3')) return (n) => n * n * n;
        if (cleanStr.includes('2^n')) return (n) => Math.pow(2, n);
        if (cleanStr.includes('n')) return (n) => n; // Default O(n)

        return (n) => n;
    };

    const userFn = getComplexityFunction(analysis?.time_complexity);

    // Generate data points
    const generateData = () => {
        const data = [];
        const steps = [1, 5, 10, 15, 20]; // Reduced range for exponential growth visibility

        steps.forEach(n => {
            data.push({
                n: n,
                O1: 1,
                Ologn: Math.log2(n) || 0, // Handle n=0 case if it ever happens
                On: n,
                Onlogn: n * Math.log2(n) || 0,
                On2: n * n,
                user: userFn(n)
            });
        });
        return data;
    };

    const complexityData = generateData();

    const getUserDataKey = () => 'user';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Time Complexity Visualization</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={complexityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="n" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                            itemStyle={{ color: '#F3F4F6' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="O1" stroke="#10B981" name="O(1) - Constant" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="Ologn" stroke="#6366F1" name="O(log n) - Logarithmic" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="On" stroke="#3B82F6" name="O(n) - Linear" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="Onlogn" stroke="#8B5CF6" name="O(n log n) - Linearithmic" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="On2" stroke="#EF4444" name="O(n²) - Quadratic" dot={false} strokeWidth={2} />
                        {/* Highlight user's complexity */}
                        {analysis && (
                            <Line type="monotone" dataKey={getUserDataKey()} stroke="#F59E0B" name="Your Code" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Estimated Time Complexity: <span className="font-bold text-indigo-600 dark:text-indigo-400">{analysis ? analysis.time_complexity : 'Analyzing...'}</span></p>
                <p>Estimated Space Complexity: <span className="font-bold text-indigo-600 dark:text-indigo-400">{analysis ? analysis.space_complexity : 'Analyzing...'}</span></p>
            </div>
        </div>
    );
};

export default ComplexityChart;
