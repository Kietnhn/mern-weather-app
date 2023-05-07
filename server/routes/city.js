import express from "express";
const router = express.Router();
import fetch from "node-fetch";
import City from "../models/City.js";
import verifyToken from "../middleware/auth.js";

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const deletedCity = await City.findByIdAndDelete({ _id: req.params.id});
        console.log(deletedCity);
        if (!deletedCity) {
            return res.status(401).json({
                success: false,
                message: "city not found or usernot authorise",
            });
        }
        return res.json({
            success: true,
            cities: deletedCity,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// /api/cites
router.post("/", verifyToken, async (req, res) => {
    const { API_KEY, lat, lon } = req.query;
    const city = await City.findOne({ lat, lon,user: req.userId });
    if (city) {
        return res.json({ success: false, message: "City is exist" });
    }
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "latitude and longtude is required",
        });
    try {
        const newCity = new City({
            lat,
            lon,
            user: req.userId,
        });

        await newCity.save();

        const newCityWeather = await getCityWeather({
            lat,
            lon,
            _id: req.userId,
            API_KEY,
        });

        res.json({ success: true, message: "Success", cities: newCityWeather });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
const getCityWeather = async ({ lat, lon, cnt = 1, _id }) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${process.env.API_KEY}&units=metric`
        ).then((res) => res.json());
        const result = {
            weather: {
                name: response.city.name,
                country: response.city.country,
                description: response?.list[0].weather[0].description,
                icon: response?.list[0].weather[0].icon,
                temp: response?.list[0].main.temp,
            },
            lat,
            lon,
            _id,
        };
        return result;
    } catch (error) {
        console.log(error);
    }
};
const getAllCityWeather = async ({ cities }) => {
    try {
        const result = [];
        await Promise.all(
            cities.map(({ lat, lon, _id }) =>
                getCityWeather({ lat, lon, _id }).then((res) =>
                    result.push(res)
                )
            )
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};
router.get("/", verifyToken, async (req, res) => {
    try {
        const cities = await City.find({ user: req.userId })
        // .populate("users", [
        //     "username",
        // ]);
        // console.log({cities});
        const citiesWeather = await getAllCityWeather({ cities });
        res.json({ success: true, cities: citiesWeather });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
export default router;
