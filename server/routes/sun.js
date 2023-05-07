import express from "express";
const routes = express.Router();

import fetch from "node-fetch";

// api/sun
routes.get("/", async (req, res) => {
    const { lat, lon, date, timezone } = req.query;
    if (!lat || !lon) {
        res.json({ success: false, message: "lat, lon is require" });
    }
    if (!date) {
        res.json({ success: false, message: "date is require" });
    }
    if (!timezone) {
        res.json({ success: false, message: "timezone is require" });
    }
    try {
        const response = await fetch(
            `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&timezone=${timezone}&date=${date}`
        ).then((res) => res.json());
        if (response.status === "OK") {
            res.json({
                success: true,
                message: "Successfully",
                data: response.results,
            });
        }
    } catch (error) {
        console.log(error);
    }
});

export default routes;
