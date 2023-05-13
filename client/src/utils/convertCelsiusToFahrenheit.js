const convertCelsiusToFahrenheit = (value, isConvert) => {
    let result = value;
    if (isConvert) result = (value * 9) / 5 + 32;
    return Number(result).toFixed(2);
};

export default convertCelsiusToFahrenheit;
