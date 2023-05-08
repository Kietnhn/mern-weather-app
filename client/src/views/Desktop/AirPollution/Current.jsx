import React, { useState } from "react";
import getStateOfAir from "../../../utils/getStateOfAir";
import AirBar from "../../../components/Chart/AirBar";
// import airPollutionGif from "../../../../assets/gif/air-pollution.gif";
// eslint-disable-next-line no-unused-vars

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

    return (
        <div>
            <div className="between mb-3">
                <h1 className="text-xl font-semibold mb-4">
                    Status: {stateOfAir?.status}
                </h1>
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
                            className="w-[calc(100%/9)] border-b border-r border-t"
                        >
                            <div className="flex flex-col">
                                <div className="font-semibold capitalize border-b px-3">
                                    {item}
                                </div>
                                <div className="px-3">
                                    {index !== 0 &&
                                        current.list[0].components[item]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AirBar datas={current.list} />
        </div>
    );
};

export default Current;
