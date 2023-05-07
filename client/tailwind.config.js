/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    mode: "jit",
    theme: {
        colors: {
            text: "#706f74",
            primaryText: "#f0eff2",
            dark: "#101014",
            secondDark: "#1b1a1d",
            active: "#d7e7f6",
            black: "#000",
            transparent: "transparent",
        },
        extend: {
            spacing: {
                "1/8": "12.5%",
                "2/8": "25%",
            },
            animation: {
                bounceUp: "bounceUp .5s",
                slideShow: "slideShow .35s ease-in-out",
                loadText: "loadText 5s linear infinite",
                fadeLeft: "fadeLeft 1s cubic-bezier(0,0,0.2,1) ",
            },
            keyframes: {
                fadeLeft: {
                    "0%": {
                        display: "none",
                        opacity: 0,
                        transform: " translateX(50%)",
                    },
                    "100%": {
                        display: "block",
                        opacity: 1,
                        transform: " translateX(20px)",
                    },
                },
                loadText: {
                    "0%": {
                        transform: " translateX(0)",
                    },
                    "100%": {
                        transform: " translateX(-130%)",
                    },
                },
                bounceUp: {
                    "0%": {
                        transform: "scale(1) translateY(0)",
                        animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
                    },
                    "100%": {
                        transform: "scale(1.25) translateY(-8px)",
                        animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
                    },
                },
                slideShow: {
                    "0%": {
                        transform: "translateX(-100%)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translateX(0)",
                        opacity: 1,
                    },
                },
            },
        },
    },
    plugins: [],
};
