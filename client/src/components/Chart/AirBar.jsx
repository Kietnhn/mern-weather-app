import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useDarkMode from "../../hooks/useDarkMode";
const AirBar = ({ datas }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [colorTheme] = useDarkMode();
    useEffect(() => {
        setData(() => {
            const airData = datas[0].components;
            const labels = Object.keys(airData);
            const datasets = [
                {
                    label: "Current",
                    data: labels.map((label) => airData[label]),
                    borderWidth: 1,
                },
            ];
            return {
                labels,
                datasets,
            };
        });
    }, [datas]);
    useEffect(() => {
        setOptions({
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.parsed.y} μg/m3`,
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        color: `${
                            colorTheme === "light" ? "#e2e2e2" : "#dddddd"
                        }`,
                    },
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: `${
                            colorTheme === "light" ? "#e2e2e2" : "#dddddd"
                        }`,
                    },
                },
            },
        });
    }, [colorTheme]);
    if (!datas) return <></>;
    return (
        <div className="h-[300px] w-full">
            {data && (
                <>
                    <Bar
                        options={options}
                        data={data}
                        height={300}
                        width="100%"
                    />
                </>
            )}
        </div>
    );
};

export default AirBar;
