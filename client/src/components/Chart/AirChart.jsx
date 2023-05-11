import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";
import useDetectUserDevice from "../../hooks/useDetectUserDevice";
import useDarkMode from "../../hooks/useDarkMode";

const AirChart = ({ list = [], timezone }) => {
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [isMobile] = useDetectUserDevice();
    const [colorTheme] = useDarkMode();

    useEffect(() => {
        let listData = [...list];

        if (isMobile) {
            listData = listData.filter((_, index) => index % 2 === 0);
        }
        const labels = listData?.map((item) =>
            moment.unix(item.dt).tz(timezone).format("HH:mm")
        );
        const pollutants = [...Object.keys(listData[0]?.components)];
        const datasets = pollutants?.map((pollutant) => ({
            label: `${pollutant}`,
            data: listData?.map((item) => item.components[pollutant]),
        }));

        const data = {
            labels,
            datasets,
        };
        setData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list, isMobile]);
    useEffect(() => {
        setOptions({
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
                mode: "index",
                intersect: false,
            },
            stacked: false,
            plugins: {
                legend: {
                    textTransform: "capitalize",
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        title: function (chart) {
                            return moment
                                .unix(list[chart[0].dataIndex].dt)
                                .tz(timezone)
                                .format("YYYY/MM/DD-HH:mm");
                        },
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
    }, [list, timezone, colorTheme]);
    useEffect(() => {
        console.log({ data });
    }, [data]);
    if (!data) return <></>;
    return (
        <>
            <Line options={options} data={data} height={360} width="100%" />
        </>
    );
};
export default AirChart;
