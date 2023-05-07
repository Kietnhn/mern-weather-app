const setBackgroundGradient = (id) => {
    switch (id) {
        case "01d":
            return "sunny-day";
        case "01n":
            return "sunny-night";
        case "02d":
        case "03d":
        case "04d":
            return "cloud-day";
        case "02n":
        case "03n":
        case "04n":
            return "cloud-night";
        case "09d":
        case "10d":
        case "11d":
            return "rain-day";
        case "09n":
        case "10n":
        case "11n":
            return "rain-night";
        case "13d":
            return "snow-day";
        case "13n":
            return "snow-night";
        case "15d":
            return "mist-day";
        case "15n":
            return "mist-night";
        default:
            return "";
    }
};
export default setBackgroundGradient;
