import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MetricBarChart = ({ metrics }) => {
    if (!metrics) return null;

    const data = [
        { name: 'Loops', value: metrics.loops, color: '#3B82F6' },
        { name: 'Array Ops', value: metrics.array_ops, color: '#10B981' },
        { name: 'Conditionals', value: metrics.conditionals, color: '#F59E0B' },
        { name: 'Recursion', value: metrics.recursion, color: '#EF4444' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Complexity Composition</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                        <XAxis type="number" stroke="#9CA3AF" hide />
                        <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MetricBarChart;
