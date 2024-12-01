/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
    daisyui: {
      themes: [
        {
          darkTheme: {
            "primary": "#f2dd80",
            "primary-content": "#052f32",
            "secondary": "#f2dd80",
            "secondary-content": "#052f32",
            "accent": "#052f32",
            "accent-content": "#f2dd80",
            "neutral": "#052f32",
            "neutral-content": "#f2dd80",
            "base-100": "#052f32",
            "base-200": "#04272a",
            "base-300": "#032022",
            "base-content": "#f2dd80",
            "info": "#f2dd80",
            "info-content": "#052f32",
            "success": "#064e2e",
            "success-content": "#f2dd80",
            "warning": "#7c0921",
            "warning-content": "#f2dd80",
            "error": "#7c0921",
            "error-content": "#f2dd80",
          },
        },
        {
          lightTheme: {
            "primary": "#052f32",
            "primary-content": "#f2dd80",
            "secondary": "#052f32",
            "secondary-content": "#f2dd80",
            "accent": "#052f32",
            "accent-content": "#f2dd80",
            "neutral": "#f2dd80",
            "neutral-content": "#052f32",
            "base-100": "#f2dd80",
            "base-200": "#f2dd80",
            "base-300": "#f2dd80",
            "base-content": "#052f32",
            "info": "#052f32",
            "info-content": "#f2dd80",
            "success": "#064e2e",
            "success-content": "#f2dd80",
            "warning": "#7c0921",
            "warning-content": "#f2dd80",
            "error": "#7c0921",
            "error-content": "#f2dd80"
          },
        }
      ],
    },
}

