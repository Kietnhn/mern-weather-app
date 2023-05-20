import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";
import useDarkMode from "../../hooks/useDarkMode";
// import setTempByTime from "../../utils/setTempByTime";
import LoadingComponent from "../Loading/LoadingComponent";
import setTempByTime from "../../utils/setTempByTime";
import { unitInfoData } from "../../routes/viewInfoData";
const Weekly = ({ weathers = [] }) => {
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
            moment.unix(weather.dt).tz(timezone).format("DD/MM")
        );

        const datasets = [
            {
                fill: true,
                label: timezone,
                data: weathers.map((weather) => {
                    if (typeof weather[dataChart] === "object") {
                        return weather[dataChart][
                            setTempByTime(
                                moment
                                    .unix(weather.dt)
                                    .tz(timezone)
                                    .format("HH")
                            )
                        ];
                    }
                    return weather[dataChart];
                }),
            },
        ];

        labels[0] = "Today";
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
                    display: false,
                    textTransform: "capitalize",
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: (context) =>
                            `${context.parsed.y} ${unitInfoData[dataChart]}`,
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
    }, [colorTheme, dataChart]);
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

export default Weekly;
