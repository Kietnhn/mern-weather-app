// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import moment from "moment-timezone";

const Minutely = ({ minutelies, timezone }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [colorTheme] = useDarkMode();
    useEffect(() => {
        if (!minutelies) return;

        const labels = minutelies.map((minutely) =>
            moment.unix(minutely.dt).tz(timezone).format("HH:mm")
        );

        const datasets = [
            {
                label: "Precipitation",
                data: minutelies.map((minutely) => minutely?.precipitation),
            },
        ];
        setData({
            labels,
            datasets,
        });
    }, [minutelies, timezone]);
    useEffect(() => {
        setOptions({
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    textTransform: "capitalize",
                    position: "bottom",
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
    return (
        <>
            {data ? (
                <div className="max-h-full min-h-[220px] w-full">
                    <Line
                        options={options}
                        data={data}
                        width="100%"
                        height="100%"
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};
export default Minutely;
