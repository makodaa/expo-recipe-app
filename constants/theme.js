import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    surface: "#FEFCFD",
    background: "#FEFCFD",
    onbackground: "#1B1C1D",
    onsurface: "#1B1C1D",
    error: "#B00020",
    primary: "#FEDB71",
    onprimary: "#45474A",
    transparent: "transparent",
    surfacevariant: "#E1E2E6",
    onsurfacevariant: "#45474A",
    transparentblack: "rgba(0,0,0,0.6)",
    white: "#FFFFFF",
    black: "#000000",
}

export const DARK = {
    surface: "#121212",
    background: "#121212",
    onbackground: "#E4E2E3",
    onsurface: "#E4E2E3",
}

export const SIZES = {
    base: 8,
    font: 14,
    radius: 8,
    padding: 24,
    margin: 20,

    h1: 28,
    h2: 20,
    h3: 14,
    body: 14,
}

export const FONTS = {
    h1: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Montserrat-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    body: { fontFamily: "Montserrat-Regular", fontSize: SIZES.body, lineHeight: 30 },
}

const appTheme = { COLORS, DARK, SIZES, FONTS };

export default appTheme;