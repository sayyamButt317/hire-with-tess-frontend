/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "tess-blue": "var(--tess-blue)",
                "custom-orange": "var(--custom-orange)",
                "custom-pink": "var(--custom-pink)",
                "custom-blue": "var(--custom-blue)",
                primary: "hsl(var(--primary))",
                foreground: "hsl(var(--foreground))",
                background: "hsl(var(--background))",
                border: "hsl(var(--border))",
            },
            borderRadius: {
                sm: "calc(var(--radius) - 4px)",
                md: "calc(var(--radius) - 2px)",
                lg: "var(--radius)",
                xl: "calc(var(--radius) + 4px)",
                input: "1rem", 
            },
            spacing: {
                "input-height": "4rem", 
            },
            fontFamily: {
                sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
