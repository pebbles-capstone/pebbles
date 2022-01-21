// Util function to convert px values into rem for better dev-design collaboration
const rem = (px) => `${px / 16}rem`;

module.exports = {
  purge: {
    content: [
      "./src/atoms/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: false,
  theme: {
    screens: {
      xxs: "375px",
      xs: "600px",
      sm: "768px",
      md: "900px",
      lg: "1024px",
      xl: "1200px",
      xxl: "1440px",
      xxxl: "2600px",
    },
    fontFamily: {
      "sans-serif": ["WorkSans", "sans-serif"],
    },
    fontSize: {
      sm: rem(14),
      base: rem(16),
      md: rem(18),
      lg: rem(24),
      xl: rem(32),
      xxl: rem(36),
      xxxl: rem(48),
    },
    colors: {
      transparent: "transparent",
      white: "#fff",
      black: "#000",
      grey: {
        DEFAULT: "#c4c4c4",
        light: "#f1f1f1",
        dark: "#DBDBDB",
        darker: "#706F6F",
      },
      blue: {
        DEFAULT: "#509ED9",
        light: "#E3F2FC",
        dark: "#265980",
      },
      red: {
        DEFAULT: "#E88565",
        light: "#FCE9E3",
        dark: "#803C26",
      },
      green: {
        DEFAULT: "#3DCACC",
        light: "#E3FCFC",
        dark: "#055A5B",
      },
    },
    extend: {
      width: {
        "fit-content": "fit-content",
      },
      height: {
        "fit-content": "fit-content",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
