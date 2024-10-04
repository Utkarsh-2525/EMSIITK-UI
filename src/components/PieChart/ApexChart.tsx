import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ApexChartProps {
    emp: number;
    int: number;
    task: number;
    pend: number;
}

interface ApexChartState {
    series: number[];
    options: ApexOptions;
}

class ApexChart extends React.Component<ApexChartProps, ApexChartState> {
    constructor(props: ApexChartProps) {
        super(props);

        this.state = {
            series: [props.emp, props.int, props.task, props.pend], // Initial data for the series
            options: {
                chart: {
                    width: 380,
                    type: 'donut',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270,
                        expandOnClick: false, // Prevent slice from expanding on click
                        donut: {
                            labels: {
                                show: true,
                            },
                        },
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
                        // Ensure opts.w.globals.series and opts.seriesIndex exist
                        if (
                            opts.w &&
                            opts.w.globals &&
                            opts.w.globals.series &&
                            opts.w.globals.series[opts.seriesIndex] !== undefined
                        ) {
                            const value = opts.w.globals.series[opts.seriesIndex];
                            return `${val} - ${value}`;
                        } else {
                            return `${val} - No data`; // Provide fallback if undefined
                        }
                    },
                },
                tooltip: {
                    enabled: false, // Disable tooltips on hover
                },
                labels: ['Total Employees', 'Total Interns', 'Total Projects', 'Pending Requests'],
                colors: ['#549ced', '#8e54e4', '#5ee865', '#FF7518'],
                title: {
                    text: 'Summary Pie Chart',
                    align: "center",
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

    componentDidUpdate(prevProps: ApexChartProps) {
        if (
            prevProps.emp !== this.props.emp ||
            prevProps.int !== this.props.int ||
            prevProps.task !== this.props.task ||
            prevProps.pend !== this.props.pend
        ) {
            // Update the series data when props change
            this.setState({
                series: [this.props.emp, this.props.int, this.props.task, this.props.pend],
            });
        }
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
            </div>
        );
    }
}

export default ApexChart;
