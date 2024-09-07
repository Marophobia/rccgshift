'use client';
import CountUp from 'react-countup';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type Props = {
    name: String;
    count: number;
    synmbol?: string;
};

const StatsComp = (props: Props) => {
    const { name, count, synmbol } = props;
    const revenueOptions: ApexOptions = {
        series: [
            {
                name: 'Revenue',
                data: [5, 30, 10, 25, 11, 30, 15, 28, 33],
            },
        ],
        chart: {
            type: 'area', // Make sure this is one of the allowed types
            height: 70,
            zoom: {
                enabled: false,
            },
            sparkline: {
                enabled: true,
            },
            events: {
                mounted: (chart) => {
                    chart.windowResizeHandler();
                },
            },
        },
        tooltip: {
            enabled: true,
            x: {
                show: false,
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    },
                },
            },
            marker: {
                show: false,
            },
        },
        colors: ['#795DED'],
        stroke: {
            width: 1.2,
            curve: 'smooth',
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.5,
                opacityTo: 0.2,
                stops: [0, 60],
            },
        },
    };
    return (
        <>
            <div className="col-span-full sm:col-span-6 p-[10px_16px] dk-border-one rounded-xl h-full">
                <div className="flex-center-between">
                    <h6 className="leading-none text-gray-500 dark:text-white font-semibold">
                        {name}
                    </h6>
                    <div className="leading-none shrink-0 text-xs text-gray-900 dark:text-dark-text dk-border-one rounded-full px-2 py-1">
                        All Time
                    </div>
                </div>
                <div className="pt-3 bg-card-pattern dark:bg-card-pattern-dark bg-no-repeat bg-100% flex gap-4 mt-3">
                    <div className="pb-8 shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="card-title">
                                {synmbol}
                                <CountUp
                                    className="counter-value"
                                    end={count}
                                    suffix="+"
                                    redraw={true}
                                    enableScrollSpy={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grow self-center pb-3">
                        <Chart
                            options={revenueOptions}
                            series={revenueOptions.series}
                            type="area"
                            height={70}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatsComp;
