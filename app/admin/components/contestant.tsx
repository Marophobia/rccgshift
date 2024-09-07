'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import { Icontestants } from '@/app/types/contestants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartData = {
    maleCounts: number[];
    femaleCounts: number[];
    dates: string[];
};

type Props = {
    contestants: Icontestants[];
};

const Contestants = (props: Props) => {
    const { contestants } = props;
    const [chartData, setChartData] = useState<ChartData>({
        maleCounts: [],
        femaleCounts: [],
        dates: [],
    });

    // Helper function to filter data for the last two months and process it by day/week
    const processDataForChart = (contestants: Icontestants[]) => {
        const maleCounts: number[] = [];
        const femaleCounts: number[] = [];
        const dateLabels: string[] = [];

        const today = new Date();
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(today.getMonth() - 2);

        // Filter contestants registered in the last two months
        const recentContestants = contestants.filter((contestant) => {
            const registrationDate = new Date(contestant.date);
            return registrationDate >= twoMonthsAgo;
        });

        // Process data day by day (or week by week)
        recentContestants.forEach((contestant) => {
            const registrationDate = new Date(contestant.date);
            const dateLabel = registrationDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
            });

            // Check if this date is already in the dateLabels array
            const dateIndex = dateLabels.indexOf(dateLabel);

            if (dateIndex === -1) {
                // New date, add to the dateLabels array
                dateLabels.push(dateLabel);
                maleCounts.push(contestant.gender === 'Male' ? 1 : 0);
                femaleCounts.push(contestant.gender === 'Female' ? 1 : 0);
            } else {
                // Existing date, increment the respective count
                if (contestant.gender === 'Male') {
                    maleCounts[dateIndex]++;
                } else if (contestant.gender === 'Female') {
                    femaleCounts[dateIndex]++;
                }
            }
        });

        return { maleCounts, femaleCounts, dates: dateLabels };
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
            categories: chartData.dates,
            title: {
                text: 'Registration Date',
            },
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
