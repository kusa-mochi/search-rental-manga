import { createTheme } from "@mui/material/styles";

// https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=33691E&secondary.color=AED581
const theme = createTheme({
    palette: {
        primary: {
            light: '#629749',
            main: '#33691e',
            dark: '#003d00',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#e1ffb1',
            main: '#aed581',
            dark: '#7da453',
            contrastText: '#000000',
        }
    },
});

export default theme;