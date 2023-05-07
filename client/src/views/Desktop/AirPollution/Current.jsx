import React, { useState } from "react";
import getStateOfAir from "../../../utils/getStateOfAir";
// import airPollutionGif from "../../../../assets/gif/air-pollution.gif";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
const Current = ({ current }) => {
    const [stateOfAir] = useState(() =>
        getStateOfAir(current?.list[0].main.aqi)
    );
    const renderIcon = () => {
        const Icon = stateOfAir.icon;
        return (
            <span>
                <Icon width="48px" height="48px" />
            </span>
        );
    };
    const [data] = useState(() => {
        const airData = current.list[0].components;
        const labels = Object.keys(airData);
        const datasets = [
            {
                label: "First dataset",
                data: labels.map((label) => airData[label]),
                borderWidth: 1,
            },
        ];
        return {
            labels,
            datasets,
        };
    });
    return (
        <div>
            <div className="between mb-3">
                <h1>Status: {stateOfAir?.status}</h1>
                <div>{renderIcon()}</div>
            </div>
            <div className="w-full mb-3">
                <div className="flex flex-wrap  border-t border-l">
                    <div className="ml-[calc(100%/9-1px)] w-[calc((100%/9)*8+1px)] px-3 border-r border-l ">
                        <div className="font-semibold capitalize text-center">
                            Pollutant concentration in ug/m3
                        </div>
                    </div>
                    {[
                        "Polutants",
                        ...Object.keys(current.list[0].components),
                    ].map((item, index) => (
                        <div
                            key={item}
                            className="w-[calc(100%/9)] px-3 border-b border-r border-t"
                        >
                            <div className="flex flex-col">
                                <div className="font-semibold capitalize border-b">
                                    {item}
                                </div>
                                <div>
                                    {index !== 0 &&
                                        current.list[0].components[item]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[300px] w-full">
                {/* <div
                    className="h-[300px] bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${airPollutionGif})` }}
                ></div> */}
                <>
                    <Bar
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                        }}
                        data={data}
                        height={300}
                        width="100%"
                    />
                </>
            </div>
        </div>
    );
};

export default Current;
