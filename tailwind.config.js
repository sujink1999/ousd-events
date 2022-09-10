/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,tsx,ts}"],
    theme: {
        fontFamily: {
            futura: ["Futura"],
        },
        colors: {
            primary: "#6F5EED",
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
        },
    },
    plugins: [],
};
