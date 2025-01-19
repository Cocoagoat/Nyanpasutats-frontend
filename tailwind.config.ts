import type { Config } from "tailwindcss";

const plugin = require("tailwindcss/plugin");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fluid: {
      //   textSizes: {
      //     fullhd_2xl: {
      //       minSize: "16px",
      //       maxSize: "24px",
      //       minScreen: "1920px",
      //       maxScreen: "2560px",
      //     },
      //     fullhd_md: {
      //       min: "11px",
      //       max: "16px",
      //       minvw: "1920px",
      //       maxvw: "2560px",
      //     },
      //   },
      //   width: {
      //     fullhd_container: {
      //       min: "192px",
      //       max: "256px",
      //       minvw: "1920px",
      //       maxvw: "2560px",
      //     },
      //   },
      // },
      colors: {
        "sky-550": "#74ceff",
        "lime-550": "#74b811",
        "blue-990": "#08142c",
        "blue-970": "#0f1f3c",
        "green-990": "#041414",
      },
      backgroundImage: {
        // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // 'gradient-conic':
        //   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        fullhd: "1920px",
        ultrahd: "2560px",
      },
      fontSize: {
        clampsm: ["clamp(0.8rem, 2vw, 1rem)", "1rem"],
        clampmd: ["clamp(1.25rem, 1.5vw, 1.75rem)", "1.5rem"],
        clamplg: ["clamp(1.75rem, 2vw, 2.25rem)", "2rem"],
        clampxl: ["clamp(3.5rem, 4vw, 4.5rem)", "4rem"],
        "fluid-md-ultrahd": "clamp(16px, 0.95vw, 24px)",
        "fluid-md-4k": "clamp(24px, 0.95vw, 1000px)",
        "fluid-sm-ultrahd": "clamp(10px, 0.65vw, 16px)",
        "fluid-sm-4k": "clamp(16px, 0.65vw, 1000px)",
        "fluid-xs-ultrahd": "clamp(7px, 0.4vw, 10px)",
        "fluid-xs-4k": "clamp(10px, 0.4vw, 1000px)",
      },
      maxWidth: {
        "1/4": "25%",
        "2/5": "40%",
        "1/2": "50%",
        "3/4": "75%",
        "front-n-center": "max(500px, 45%)",
        "front-n-center-45": "max(600px, 45%)",
        "front-n-center-50": "max(600px, 50%)",
        "front-n-center-55": "max(600px, 55%)",
        "front-n-center-60": "max(600px, 60%)",
        "front-n-center-65": "max(600px, 65%)",
        "front-n-center-70": "max(600px, 70%)",
        "front-n-center-75": "max(600px, 75%)",
        "front-n-center-80": "max(600px, 80%)",
        "fluid-redirectbox": "clamp(192px, 12vw, 256px)",
      },
      maxHeight: {
        "front-n-center": "88%",
      },
      textShadow: {
        xs: "0 1px 1px var(--tw-shadow-color)",
        sm: "0 1px 2px var(--tw-shadow-color)",
        smd: "0 1px 3px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        md: "0 3px 6px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      backgroundColor: {
        "sky-550": "#74ceff",
        "blue-990": "#08142c",
        "green-990": "#041414",
        "green-MAL-outer": "rgba(81,148,148,0.2)",
        "green-MAL-inner": "#458888",
        "orange-MAL-outer": "rgba(231,95,0,0.2)",
        "orange-MAL-inner": "#e75f00",
      },
      borderColor: {
        "sky-550": "#74ceff",
        "blue-990": "#08142c",
      },
      gradientColorStops: {
        "sky-550": "#74ceff",
      },
      textColor: {
        "sky-550": "#74ceff",
      },
      inset: {
        "1/5": "20%",
      },
      width: {
        "image-carousel": "clamp(300px, 25vw, 550px)",
        "small-screen-card": "clamp(300px, 80vw, 900px)",
        "fluid-redirectbox": "clamp(192px, 12vw, 10000px)",
        "fluid-page": "clamp(1920px, 100vw, 10000px)",
      },
      height: {
        "fluid-redirectbox": "clamp(192px, 12vw, 10000px)",
      },
      minWidth: {
        "fluid-redirectbox": "clamp(192px, 12vw, 256px)",
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("tailwindcss-fluid"),
    plugin(function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "text-shadow": (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
export default config;
