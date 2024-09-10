// ApexChart.tsx
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import the type for options from apexcharts

interface ApexChartProps {}

interface ApexChartState {
    series: number[];
    options: ApexOptions; // Use the correct ApexOptions type
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
    constructor(props: ApexChartProps) {
        super(props);

        this.state = {
            series: [213, 87, 257, 45], // Data for the series
            options: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        return `${val} - ${opts.w.globals.series[opts.seriesIndex]}`;
                    },
                },
                labels: ['Total Employees', 'Total Interns', 'Total Projects', 'Pending Requests'],
                colors: ['#549ced', '#8e54e4', '#5ee865', '#FF7518'],
                title: {
                    text: 'Summary Pie Chart',
                    align: "center"
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                            legend: {
                                position: 'bottom',
                            },
                        },
                    },
                ],
            },
        };
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="donut"
                        width={500}
                    />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChart;
