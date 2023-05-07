import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import useDarkMode from "../../hooks/useDarkMode";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const RadarChart = ({ datas = [], labels = [] }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [colorTheme] = useDarkMode();

    useEffect(() => {
        setData(() => {
            const results = datas.map((object) => ({
                name: Object.keys(object).map(
                    (key) => key[0].toUpperCase() + key.slice(1).toLowerCase()
                ),
                value: Object.keys(object).map((key) => object[key]),
            }));
            return {
                datasets: results.map((rs, index) => ({
                    data: rs.value,
                    label: labels[index],
                    borderWidth: 1,
                })),
                labels: results[0].name,
            };
        });
    }, [datas, labels]);
    useEffect(() => {
        setOptions({
            plugins: {
                legend: {
                    textTransform: "capitalize",
                    position: "bottom",
                },
            },
            scales: {
                r: {
                    grid: {
                        color: colorTheme === "light" ? "#e2e2e2" : "#dddddd",
                    },
                },
            },
        });
    }, [colorTheme]);
    if (!data) return <></>;
    return (
        <div className="w-full h-full">
            <Radar data={data} height={360} width={360} options={options} />
        </div>
    );
};
export default RadarChart;
