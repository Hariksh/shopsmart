/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#166534', // Green
                secondary: '#22C55E', // Light Green
                accent: '#FACC15', // Yellow
                background: '#FEFCE8', // Cream
                'text-main': '#14532D', // Dark Green
            }
        },
    },
    plugins: [],
}
