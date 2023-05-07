const setTempByTime = (hourStr) => {
    const hour = +hourStr;
    switch (hour) {
        case hour >= 5 && hour < 12:
            return "mor";
        case hour >= 12 && hour < 17:
            return "day";
        case hour >= 17 && hour < 21:
            return "eve";
        case hour >= 21 || hour <= 4:
            return "night";
        default:
            return "day";
    }
};
export default setTempByTime;
