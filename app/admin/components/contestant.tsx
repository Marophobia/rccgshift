'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import { Icontestants } from '@/app/types/contestants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartData = {
    maleCounts: number[];
    femaleCounts: number[];
    months: string[];
};

type Props = {
    contestants: Icontestants[];
};

const Contestants = (props: Props) => {
    const { contestants } = props;
    const [chartData, setChartData] = useState<ChartData>({
        maleCounts: [],
        femaleCounts: [],
        months: [],
    });

    // Helper function to process contestant data
    const processDataForChart = (contestants: Icontestants[]) => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const maleCounts = new Array(12).fill(0);
        const femaleCounts = new Array(12).fill(0);

        contestants.map((contestant) => {
            const registrationMonth = new Date(contestant.date).getMonth(); // Get the month index (0-11)
            if (contestant.gender === 'Male') {
                maleCounts[registrationMonth]++;
            } else if (contestant.gender === 'Female') {
                femaleCounts[registrationMonth]++;
            }
        });

        return { maleCounts, femaleCounts, months };
    };

    useEffect(() => {
        const processedData = processDataForChart(contestants);
        setChartData(processedData);
    }, [contestants]);

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: chartData.months,
        },
        legend: {
            position: 'top',
        },
        fill: {
            opacity: 1,
        },
        colors: ['#1E90FF', '#FF69B4'], // Colors for male and female
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${val} Contestants`;
                },
            },
        },
    };

    const series = [
        {
            name: 'Male',
            data: chartData.maleCounts,
        },
        {
            name: 'Female',
            data: chartData.femaleCounts,
        },
    ];
    return (
        <>
            <div className="col-span-full 2xl:col-span-8 card">
                <div className="flex-center-between">
                    <h6 className="card-title">Contestants Over Time</h6>
                </div>
                <Chart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />
            </div>
        </>
    );
};

export default Contestants;
