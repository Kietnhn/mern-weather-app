import { useState } from "react";
import moment from "moment-timezone";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import getPointImage from "../../utils/getPointImage";
// import { SunIcon } from "../icons";
ChartJS.register(ArcElement, Tooltip, Legend);
function ChartSun({ className, weather, timezone }) {
    const [suntime] = useState({
        sunrise: moment.unix(weather.sunrise).tz(timezone).format("hh"),
        sunset: moment.unix(weather.sunset).tz(timezone).format("hh"),
    });
    const range = (start, end, step = 1) =>
        Array.from(
            { length: (end - start) / step + 1 },
            (_, index) => start + index * step
        );
    const toLine = (i) => Math.sin((i * Math.PI) / 50) * 12;
    const arrayNull = (n) => Array.from({ length: n }, () => null);
    const [data] = useState(() => {
        const labels = [
            ...Array.from({ length: 48 }, (_, index) =>
                index % 2 === 0
                    ? `${index / 2}`.length === 1
                        ? `0${index / 2}:00`
                        : `${index / 2}:00`
                    : ""
            ),
            "00:00",
        ];
        const { sunrise, sunset } = suntime;

        const data = [...Array(25).keys()].map((i) => toLine(i));

        const timeSunRise = [...range(+sunrise * 2, 24)].map((i) => toLine(i));
        const timeSunSet = [...range(+sunset * 2, 24)]
            .map((i) => toLine(i))
            .reverse()
            .slice(1);

        const current = moment.unix(weather.dt).tz(timezone).format("HH");
        let timeCurrent;
        if (+current > 12) {
            const after = 12 - (+current - 12);
            timeCurrent = [
                ...range(0, 24),
                ...range(after * 2, 23).reverse(),
            ].map((i) => toLine(i));
        } else {
            timeCurrent = [...range(0, +current * 2)].map((i) => toLine(i));
        }

        const datasets = [
            {
                label: "Current",
                lineTension: 0.3,
                fill: true,
                data: timeCurrent,
            },
            {
                label: "Sun time",
                lineTension: 0.3,
                data: [
                    ...arrayNull(+sunrise * 2),
                    ...timeSunRise,
                    ...timeSunSet,
                ],
            },
            {
                label: "Base line",
                lineTension: 0.3,
                data: [...data, ...data.reverse().slice(1), 0],
            },
        ];
        return {
            labels,
            datasets,
        };
    });
    const [options] = useState(() => {
        console.log({ suntime });
        const image = getPointImage({ weather, timezone });
        const current = moment.unix(weather.dt).tz(timezone).format("HH");
        let sunPoint = arrayNull(48);
        sunPoint[+current * 2] = image;
        return {
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    pointStyle: sunPoint,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    ticks: {
                        display: false,
                    },
                    suggestedMax: 14,
                },
            },
            plugins: {
                legend: {
                    textTransform: "capitalize",
                    position: "bottom",
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function (val, index) {
                                return index % 2 === 0
                                    ? this.getLabelForvalue(val)
                                    : "";
                            },
                        },
                    },
                },
            },
        };
    });
    return (
        <div className={`${className} relative`}>
            <div className="chart-sun">
                <Line options={options} data={data} height={320} width="100%" />
            </div>
        </div>
    );
}

export default ChartSun;
