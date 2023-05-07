import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiDoughnut = ({ name, percen, onClick, message = "",className="" }) => {
    return (
        <div className={className}>
            <div className="center">
                <button className="button capitalize" onClick={onClick}>
                    {name}
                </button>
            </div>
            <div className="relative px-4 my-4">
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h2>{percen}%</h2>
                </div>
                <Doughnut
                    data={{
                        labels: [],
                        datasets: [
                            {
                                data: [`${percen}`, `${100 - percen}`],
                                borderWidth: 1,
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.2)",
                                    "rgba(255,255,255,.4)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(240, 240, 237,1)",
                                ],
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: true,
                        cutout: "75%",
                    }}
                />
            </div>
            <h3 className="font-semibold capitalize text-center">{message}</h3>
        </div>
    );
};
export default SemiDoughnut;
