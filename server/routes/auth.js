import express from "express";
import argon2 from "argon2";
import fs from "fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";
import Position from "../models/Position.js";
import verifyToken from "../middleware/auth.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" });

function base64_encode(avatar) {
    const data = fs.readFileSync(avatar.path);
    const base64Image = Buffer.from(data).toString("base64");
    return base64Image;
}
router.post("/update/current-position", verifyToken, async (req, res) => {
    const { lat, lon, country, city } = req.body;
    if (!lat || !lon) {
        return res.status(400).json({
            success: false,
            message: "lat, lon is required",
        });
    }
    try {
        const newPosition = new Position({
            lat,
            lon,
            country,
            city,
            user: req.userId,
        });
        await newPosition.save();
        return res.json({
            success: true,
            message: "success",
            position: newPosition,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
// update profile and send Email
//@router PUT api/auth/update
router.post(
    "/update",
    verifyToken,
    upload.single("avatar"),
    async (req, res) => {
        const { username, password } = req.body;
        const avatar = req.file;

        try {
            const user = await User.findById(req.userId);
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: "User not found" });

            if (username) user.username = username;
            if (avatar) user.avatar = base64_encode(avatar);
            if (password) user.password = await argon2.hash(password);
            await user.save();
            res.json({
                success: true,
                message: "User changed successfully",
                user,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
);

//@router GET api/auth
//@desc Check if user is logged in
//@access public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        const position = (await Position.findOne({ user: req.userId })) || null;
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        const infoUser = {
            ...user._doc,
            position,
        };
        res.json({
            success: true,
            user: infoUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//@route POST api/auth/register
//@dec Register user
//@access Public
router.post("/register", async (req, res) => {
    const { password, email } = req.body;
    let username = req.body.username;
    if (!password)
        return res
            .status(400)
            .json({ success: false, message: "Missing password" });
    if (!email) {
        return res
            .status(400)
            .json({ success: false, message: "Email is required" });
    }
    if (!username) {
        username = email.split("@")[0];
    }
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res
                .status(400)
                .json({ success: false, message: "Username already taken" });
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "User created succesfully",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

router.get("/verify-password", verifyToken, async (req, res) => {
    const { password } = req.query;
    if (!password)
        return res
            .status(400)
            .json({ success: false, message: "Missing email or password" });
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorect password",
            });
        }

        res.json({
            success: true,
            message: "Verified password",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

//@route POST api/auth/login
//@dec Login user
//@access Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ success: false, message: "Missing email or password" });
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorect email or password",
            });
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorect email or password",
            });
        }
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({
            success: true,
            message: "Logged in succesfully",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

export default router;
