import express from "express";
const router = express.Router();
import fetch from "node-fetch";

// api/air
// api/air/current
router.get("/", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "lattitude and longitude is required",
        });
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
        ).then((res) => res.json());

        if (response.cod) {
            return res.json({ success: fasle, message: response.message });
        }
        return res.json({ success: true, message: "Success", data: response });
    } catch (e) {
        console.log(e);
    }
});
// /api/air/forecast
router.get("/forecast", async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "lattitude and longitude is required",
        });
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
        ).then((res) => res.json());

        if (response.cod) {
            return res.json({ success: fasle, message: response.message });
        }
        return res.json({ success: true, message: "Success", data: response });
    } catch (e) {
        console.log(e);
    }
});
// /api/air/history
router.get("/history", async (req, res) => {
    const { lat, lon, start, end } = req.query;
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "lattitude and longitude is required",
        });
    if (!start || !end)
        return res.status(400).json({
            success: false,
            message: "startTime and endTime is required",
        });
    try {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${process.env.API_KEY}`
        ).then((res) => res.json());

        if (response.cod) {
            return res.json({ success: fasle, message: response.message });
        }
        return res.json({ success: true, message: "Success", data: response });
    } catch (e) {
        console.log(e);
    }
});
export default router;
