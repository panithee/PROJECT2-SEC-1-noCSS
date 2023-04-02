/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'hero': "url('./src/assets/bg.png')",
                'hero-mobile': "url('./src/assets/bg-mobile.svg')",
            },
            colors: {
                'blueEdit': '#5CB3C6',
            }
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: false,
    },
}
