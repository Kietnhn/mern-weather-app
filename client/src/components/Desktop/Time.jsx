import moment from "moment-timezone";

const Time = ({ weather, timezone, isUseWeekly = false }) => {
    return (
        <div className={`font-semibold text-base `}>
            <p>
                {moment
                    .unix(weather.dt)
                    .tz(timezone)
                    .format("dddd, DD MMMM YYYY")}
            </p>
            {/* <h2 className="text-2xl">
                {moment.unix(weather.dt).tz(timezone).format("hh:mm")}
                <span className="ml-2 ">
                    {moment.unix(weather.dt).tz(timezone).format("A")}
                </span>
            </h2> */}
        </div>
    );
};
export default Time;
