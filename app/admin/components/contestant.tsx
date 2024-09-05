"use client"
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartData = {
    maleCounts: number[];
    femaleCounts: number[];
    months: string[];
};

const Contestants = () => {
    const [chartData, setChartData] = useState<ChartData>({ maleCounts: [], femaleCounts: [], months: [] });

    const generateDummyData = () => {
        const genders = ["Male", "Female"];
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const data = [];

        for (let i = 0; i < 100; i++) {
            const gender = genders[Math.floor(Math.random() * genders.length)];
            const month = months[Math.floor(Math.random() * months.length)];

            data.push({
                gender,
                registrationDate: month,
            });
        }

        return data;
    };

    const processDataForChart = (data: any) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const maleCounts = new Array(12).fill(0);
        const femaleCounts = new Array(12).fill(0);

        data.forEach(({ gender, registrationDate }) => {
            const monthIndex = months.indexOf(registrationDate);

            if (gender === "Male") {
                maleCounts[monthIndex]++;
            } else if (gender === "Female") {
                femaleCounts[monthIndex]++;
            }
        });

        return { maleCounts, femaleCounts, months };
    };


    useEffect(() => {
        const data = generateDummyData();
        const processedData = processDataForChart(data);
        setChartData(processedData);
    }, []);

    const options: ApexOptions = {
        chart: {
            type: "bar",
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
            position: "top",
        },
        fill: {
            opacity: 1,
        },
        colors: ["#1E90FF", "#FF69B4"], // Colors for male and female
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
            name: "Male",
            data: chartData.maleCounts,
        },
        {
            name: "Female",
            data: chartData.femaleCounts,
        },
    ];

    return (
        <>
            <div className="col-span-full 2xl:col-span-8 card">
                <div className="flex-center-between">
                    <h6 className="card-title">Contestants Over Time</h6>
                </div>
                <Chart options={options} series={series} type="bar" height={350} />
            </div>
        </>
    );
};

export default Contestants;
