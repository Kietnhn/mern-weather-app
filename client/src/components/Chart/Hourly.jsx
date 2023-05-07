import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";
import useDarkMode from "../../hooks/useDarkMode";
// import setTempByTime from "../../utils/setTempByTime";
import LoadingComponent from "../LoadingComponent";
const Hourly = ({ weathers = [] }) => {
    const {
        weatherState: {
            dataChart,
            isLoading,
            historyWeather,
            weatherData: { timezone },
        },
    } = useContext(WeatherContext);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [colorTheme] = useDarkMode();

    useEffect(() => {
        const labels = weathers.map((weather) =>
            moment.unix(weather.dt).tz(timezone).format("HH:mm")
        );
        // if (!historyWeather) {
        // } else {
        //     labels = historyWeather.hourly.time.map(
        //         (item) => item.split("T")[1]
        //     );
        // }

        // historyWeather
        const historyDatasets = [];
        const currentTime = +moment
            .unix(weathers[0].dt)
            .tz(timezone)
            .format("HH");
        Object.keys(historyWeather).forEach((key) => {
            if (historyWeather[key]) {
                const weatherMatchCurrent = historyWeather[key].filter(
                    (weather) =>
                        +moment.unix(weather.dt).tz(timezone).format("HH") >=
                        currentTime
                );

                historyDatasets.push({
                    fill: true,
                    label: key.replace("history", "last ").split("_").join(" "),
                    data: weatherMatchCurrent.map(
                        (weather) => weather[dataChart]
                    ),
                });
            }
        });

        const datasets = [
            {
                fill: true,
                label: timezone,
                data: weathers.map((weather) => weather[dataChart]),
            },
            ...historyDatasets,
        ];

        // is only lastf week
        // if (historyWeather) {
        //     datasets.unshift({
        //         fill: true,
        //         label: "Last week",
        //         data: historyWeather.hourly[dataChart],
        //     });
        // }
        if (datasets.length > 1) {
            datasets[0].label = "Current";
        }
        setData({ datasets, labels });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataChart, historyWeather]);

    useEffect(() => {
        setOptions({
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false,
            },
            plugins: {
                legend: {
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
    if (!data) return <></>;
    return (
        <>
            {isLoading ? (
                <>
                    <LoadingComponent className="w-full h-[360px] relative" />
                </>
            ) : (
                <Line options={options} data={data} height={360} width="100%" />
            )}
        </>
    );
};
// if (typeof weather[dataChart] === "object") {
//     return weather[dataChart][
//         setTempByTime(
//             moment
//                 .unix(weather.dt)
//                 .tz(timezone)
//                 .format("HH")
//         )
//     ];
// }
// if (
//     ["moonrise", "moonset", "sunrise", "sunset"].includes(
//         dataChart
//     )
// ) {
//     return moment
//         .unix(weather[dataChart])
//         .tz(timezone)
//         .format("HH");
// }
export default Hourly;
