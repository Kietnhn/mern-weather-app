import moment from "moment-timezone";

const getTodayHourlyWeatherData = (hourlyData, timezone, datetime = 0) => {
    const endOfDay = moment().tz(timezone).endOf("day").valueOf();
    const endTimeStamp = Math.floor(endOfDay / 1000) - datetime;
    const todaysData = hourlyData.filter((data) => data.dt < endTimeStamp);
    return todaysData;
};
export default getTodayHourlyWeatherData;
