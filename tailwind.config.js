/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,ts}"],
    theme: {
        fontFamily: {
            futura: ["Futura"],
        },
        colors: {
            primary: "#67747f",
            secondary: "#212325",
            black: "#161718",
            white: "#FFFFFF",
        },
        extend: {
            width: {
                250: "250px",
                350: "350px",
                500: "500px",
            },
            boxShadow: {
                glow: "0 25px 50px -12px rgb(255 255 255 / 0.25)",
            },
        },
    },
    plugins: [],
};
