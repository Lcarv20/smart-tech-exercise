import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: '#1E1E1E',
        },
        // secondary: {
        //     main: '#bf360c',
        // },
        // warning: {
        //     main: '#ffff00',
        // },
    },
    typography: {
        fontFamily: 'Josefin Sans',
    },
    shape: {
        borderRadius: 20,
    }
};

export const theme = createTheme(themeOptions);

