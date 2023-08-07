import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#ffa000',
        },
        secondary: {
            main: '#bf360c',
        },
        warning: {
            main: '#ffff00',
        },
    },
    typography: {
        fontFamily: 'Josefin Sans',
    },
    shape: {
        borderRadius: 20,
    }
};
export const theme = createTheme(themeOptions);
