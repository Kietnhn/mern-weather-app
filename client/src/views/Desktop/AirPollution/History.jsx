import React, { useContext } from "react";
import { AirContext } from "../../../contexts/AirContext";
import DateForm from "./DateForm";
import AirChart from "../../../components/Chart/AirChart";

const History = ({ timezone }) => {
    const {
        airState: { history },
    } = useContext(AirContext);

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">
                History Air Pollution
            </h1>
            <DateForm />
            <div>
                {history && (
                    <AirChart list={history.list} timezone={timezone} />
                )}
            </div>
        </div>
    );
};

export default History;
