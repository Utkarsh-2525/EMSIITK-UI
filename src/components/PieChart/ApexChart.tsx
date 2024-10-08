import React, { useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ThemeContext from "../../store/themeContext"; // Adjust the path as necessary

interface ApexChartProps {
    emp: number;
    int: number;
    task: number;
    pend: number;
}

const ApexChart: React.FC<ApexChartProps> = ({ emp, int, task, pend }) => {
    const { theme } = useContext(ThemeContext); // Use ThemeContext to get the current theme

    const series = [emp, int, task, pend];
    const options: ApexOptions = {
        chart: {
            type: "donut",
            background: theme === "dark" ? "#1e2529" : "#fff", // Set background based on theme
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
                expandOnClick: false,
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
            type: "gradient",
        },
        legend: {
            formatter: (val, opts) => {
                const value = opts.w.globals.series[opts.seriesIndex];
                return `${val} - ${value}`;
            },
        },
        tooltip: {
            enabled: false,
        },
        labels: ["Total Employees", "Total Interns", "Total Projects", "Pending Requests"],
        colors: ["#549ced", "#8e54e4", "#5ee865", "#FF7518"], // You might want to adjust colors for dark mode as well
        title: {
            text: "Summary Pie Chart",
            align: "center",
            style: {
                color: theme === "dark" ? "#ffffff" : "#1e2529", // Change title color based on theme
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <div style={{ backgroundColor: theme === "dark" ? "#1e2529" : "#ffffff", padding: "20px", borderRadius: "15px" }}>
            <ReactApexChart options={options} series={series} type="donut" width={500} />
        </div>
    );
};

export default ApexChart;
