import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
const router = express.Router();
import User from "../models/User.js";
import verifyToken from "../middleware/auth.js";

//@router GET api/auth
//@desc Check if user is logged in
//@access public
router.get("/", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "User not found" });
        res.json({ success: true, user });
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
    const { username, password, email } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: "Missing username or password" });
    if (!email) {
        return res
            .status(400)
            .json({ success: false, message: "Email is required" });
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
//@route POST api/auth/login
//@dec Login user
//@access Public
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: "Missing username or password" });
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorect username or password",
            });
        }
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({
                success: false,
                message: "Incorect username or password",
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
