import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";

const AirChart = ({ list = [], timezone }) => {
    console.log("list", list);
    const [data, setData] = useState(null);
    const [options] = useState({
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
    });
    useEffect(() => {
        const labels = list?.map((item) =>
            moment.unix(item.dt).tz(timezone).format("HH:mm")
        );
        const pollutants = [...Object.keys(list[0]?.components)];
        const datasets = pollutants?.map((pollutant) => ({
            label: `${pollutant}`,
            data: list?.map((item) => item.components[pollutant]),
        }));

        const data = {
            labels,
            datasets,
        };
        setData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);
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
