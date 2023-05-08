import hanoiImg from "../assets/img/hanoi.jpg";
import londonImg from "../assets/img/london.webp";
import parisImg from "../assets/img/paris.webp";
import tokyoImg from "../assets/img/tokyo.webp";
import newyorkImg from "../assets/img/newyork.jpg";
const data = [
    {
        lat: 51.5073219,
        lon: -0.1276474,
        weather: {
            name: "london",
            country: "GB",
            imgUrl: londonImg,
        },
    },
    {
        lat: 35.6828387,
        lon: 139.7594549,
        weather: {
            name: "tokyo",
            country: "JP",
            imgUrl: tokyoImg,
        },
    },
    {
        lat: 21.0294498,
        lon: 105.8544441,
        weather: {
            name: "hanoi",
            country: "VN",
            imgUrl: hanoiImg,
        },
    },
    {
        lat: 48.8588897,
        lon: 2.3200410217200766,
        weather: {
            name: "paris",
            country: "US",
            imgUrl: parisImg,
        },
    },
    {
        lat: 40.71277530,
        lon: -74.00597280,
        weather: {
            name: "New York",
            country: "FR",
            imgUrl: newyorkImg
        },
    },
];
export default data;
