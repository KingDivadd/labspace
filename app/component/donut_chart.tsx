'use client';
import React, { useRef, useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

export const DoughnutChartOne: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartDimensions, setChartDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        const resizeHandler = () => {
            const parentWidth = (chartRef.current?.parentNode as HTMLElement)?.clientWidth || 0;
            const parentHeight = (chartRef.current?.parentNode as HTMLElement)?.clientHeight || 0;
            setChartDimensions({ width: parentWidth, height: parentHeight });
        };

        window.addEventListener("resize", resizeHandler);

        // Call resizeHandler once to set initial size
        resizeHandler();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <div style={{ height: '225px', width: '225px', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Doughnut
                data={{
                    labels: [
                        'Other Services',
                        'Suspension Inspection and replacement',
                    ],
                    datasets: [{
                        data: [10, 35, 20, 35],
                        backgroundColor: [
                            '#0097A7',
                            '#0097A7',
                            '#FFFFFF',
                            '#0097A7',
                        ],
                        borderWidth: 0, // Remove the border
                        hoverOffset: 4
                    }]
                }}
                options={{
                    maintainAspectRatio: false, // Set to false to prevent maintaining aspect ratio
                    cutout: '90%', // Adjust this value to reduce the hole in the middle
                    rotation: Math.PI / 2, // Adjust rotation to start at 3 o'clock (90 degrees)
                    plugins: {
                        legend: {
                            display: false, // Hide the legend
                        },
                    },
                }}
                width={chartDimensions.width}
                height={chartDimensions.height}
            />
        </div>
    );
};
