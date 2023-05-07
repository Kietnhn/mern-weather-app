const setIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
};

const set2xIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export { set2xIconUrl };
export default setIconUrl;
