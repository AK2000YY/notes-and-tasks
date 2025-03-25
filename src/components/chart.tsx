'use client'

import styles from '@/styles/style-body.module.css';
import { XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, AreaChart, Area } from 'recharts';

const data = [
    { day: 1, tasks: 4, apply: 2 },
    { day: 2, tasks: 5, apply: 3 },
    { day: 3, tasks: 2, apply: 2 },
    { day: 4, tasks: 8, apply: 7 },
    { day: 5, tasks: 15, apply: 10 },
    { day: 6, tasks: 6, apply: 5 },
    { day: 7, tasks: 10, apply: 7 }
]

export function Chart() {
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
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="apply" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="tasks" stackId="1" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div >
    )
}