'use client'

import styles from '@/styles/style-body.module.css';
import { XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, AreaChart, Area } from 'recharts';

export function ChartCard({ data }: {
    data: {}[]
}) {
    return (
        <div id='3' className={styles.chart}>
            <ResponsiveContainer width="100%" height="90%" style={{
                transform: 'translate(-24px, 10px)'
            }}>
                <AreaChart
                    data={data}
                    margin={{
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="executedTasks" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="totalTasks" stackId="1" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div >
    )
}