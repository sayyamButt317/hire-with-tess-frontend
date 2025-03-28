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
                roboto:['var(--font-family-roboto)'],

                sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [
    ],
};

// sm (640px): Small devices like tablets.
// md (768px): Medium devices like small laptops.
// lg (1024px): Large devices like laptops and desktops.
// xl (1280px): Extra-large devices like high-resolution desktops.
// 2xl (1536px): Ultra-large devices or full-width monitors.