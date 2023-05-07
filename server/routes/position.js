import express from "express";
const router = express.Router();
import fetch from "node-fetch";

// /api/position/nearby
router.get("/nearby", async (req, res) => {
    const { lat, lon } = req.query;
    try {
        const response = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=${process.env.NEARBY_API_KEY}&query=${lat},${lon}&limit=20`
        ).then((res) => res.json());
        res.json({ success: true, message: "Success", data: response.data });
    } catch (error) {
        console.log(error);
    }
});

// /api/position/current
router.get("/current", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.bigdatacloud.net/data/reverse-geocode-client"
        ).then((res) => res.json());

        res.json({ success: true, message: "Success", data: response });
    } catch (error) {
        console.log(error);
    }
});

// /api/position/reverse
router.get("/reverse", async (req, res) => {
    const { lat, lon, limit } = req.query;
    if (!lat || !lon)
        return res.status(400).json({
            success: false,
            message: "lat, lon is required",
        });
    try {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${process.env.API_KEY}`
        ).then((res) => res.json());
        res.json({ success: true, message: "Success", data: response });
    } catch (error) {
        console.log(error);
    }
});

// /api/position
router.get("/", async (req, res) => {
    const { position, limit } = req.query;
    if (!position)
        return res.status(400).json({
            success: false,
            message: "position is required",
        });
    try {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${position}&limit=${limit}&appid=${process.env.API_KEY}`
        ).then((res) => res.json());
        res.json({ success: true, message: "Success", data: response });
    } catch (error) {
        console.log(error);
    }
});

export default router;
