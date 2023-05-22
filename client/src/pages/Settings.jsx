import React from "react";
import SwitchUnitTemp from "../components/Button/SwitchUnitTemp";
import SwitchTheme from "../components/Button/SwitchTheme";

const Settings = () => {
    return (
        <div className="pt-6">
            <div className="between mb-3">
                <h2>Unit of Temperature: </h2>

                <SwitchUnitTemp />
            </div>
            <div className="between mb-3">
                <h2>Theme: </h2>

                <SwitchTheme />
            </div>
        </div>
    );
};

export default Settings;
