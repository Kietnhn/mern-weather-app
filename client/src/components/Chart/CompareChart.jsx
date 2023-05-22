import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../contexts/WeatherContext";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import moment from "moment-timezone";
import useDarkMode from "../../hooks/useDarkMode";
import setTempByTime from "../../utils/setTempByTime";
import Alert from "../Alert";
import convertCelsiusToFahrenheit from "../../utils/convertCelsiusToFahrenheit";
import { SettingsContext } from "../../contexts/SettingsContext";
import { unitInfoData } from "../../routes/viewInfoData";

const CompareChart = ({ weatherType = "hourlyWeather", isAlert = false }) => {
    // weatherType is "hourlyWeather" or "weeklyWeather"
    const {
        weatherState: {
            dataChart,
            compare,
            isLoading,

            weatherData: { timezone },
        },
    } = useContext(WeatherContext);
    const {
        settingsState: { units },
    } = useContext(SettingsContext);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(null);
    const [colorTheme] = useDarkMode();
    useEffect(() => {
        console.log({ compare });
        const lengths = compare.map((i) => i[weatherType]?.length);
        const loggestCompare = compare[lengths.indexOf(Math.max(...lengths))];
        const labels = loggestCompare[weatherType].map((weather) =>
            moment
                .unix(weather.dt)
                .tz(timezone)
                .format(`${weatherType !== "hourlyWeather" ? "ddd" : "HH:mm"}`)
        );

        if (weatherType !== "hourlyWeather") {
            labels[0] = "Today";
        }

        let datasets = compare.map((weather) => {
            return {
                fill: true,
                label: weather.timezone,
                data: weather[weatherType].map((weather) => {
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
                    if (
                        ["moonrise", "moonset", "sunrise", "sunset"].includes(
                            dataChart
                        )
                    ) {
                        return moment
                            .unix(weather[dataChart])
                            .tz(timezone)
                            .format("HH");
                    }
                    return weather[dataChart];
                }),
            };
        });
        console.log("before", datasets);
        if (["temp", "feels_like"].includes(dataChart)) {
            datasets = datasets.map((dataset) => ({
                ...dataset,
                data: dataset.data.map((temp) => {
                    return +convertCelsiusToFahrenheit(
                        temp,
                        units !== "metric"
                    );
                }),
            }));
        }

        setData({ datasets, labels });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [compare, dataChart, weatherType, units]);

    useEffect(() => {
        setOptions({
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    textTransform: "capitalize",
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: (context) =>
                            `${context.parsed.y} ${unitInfoData[dataChart]}`,
                    },
                },
                title: {
                    display: false,
                    position: "top",
                    text: "Comparing chart",
                    font: {
                        size: 24,
                        weight: "bold",
                        lineHeight: 1.2,
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
    if (!data || !compare) return <></>;
    return (
        <>
            {isLoading ? (
                <>
                    <div className="w-full h-[360px] lg:h-[360px] md:h-[280px] relative">
                        <div className="h-20 w-20 mr-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 after:block after:content-[''] after:w-[64px] after:h-[64px] after:m-2 after:rounded-full after:border-[6px] after:border-[#000_transparent_#000_transparent] after:animate-spin"></div>
                    </div>
                </>
            ) : (
                <Line
                    options={options}
                    data={isAlert ? {} : data}
                    height="100%"
                    width="100%"
                />
            )}
            {isAlert && <Alert />}
        </>
    );
};
export default CompareChart;
