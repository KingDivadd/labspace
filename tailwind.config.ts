/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        sm: ['12.7px', '1.5'], // Custom `text-sm`: 12px with 1.5 line-height
        md: ['14.5px', '1.5rem'], // Default `md`: 16px with 24px line-height
        lg: ['16.5px', '1.75rem'], // Default `lg`: 18px with 28px line-height
        xl: ['18px', '1.75rem'], // Default `xl`: 20px with 28px line-height
        '2xl': ['21.5px', '2rem'], // Default `2xl`: 24px with 32px line-height
        '3xl': ['25px', '2.25rem'], // Default `3xl`: 30px with 36px line-height
      },
      screens: {
        xs: "480px", // Custom `xs` breakpoint
        sm: "640px", // Default `sm` breakpoint
        md: "768px", // Default `md` breakpoint
        lg: "1024px", // Default `lg` breakpoint
        xl: "1280px", // Default `xl` breakpoint
        "2xl": "1536px", // Default `2xl` breakpoint
      }  
      ,
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
        "secondary-orange": "#f79761",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
      },
      backgroundImage: {
        'pattern': "url('/pattern.png')",
        'hero-bg': "url('/hero-bg.png')"
      }
    },
  },
  plugins: [],
};