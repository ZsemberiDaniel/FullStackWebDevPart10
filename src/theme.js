import { Platform } from "react-native";

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#fafafa',
        textLight: '#757575',
        primary: '#24292e',
        background: '#e1e4e8',
        badge: '#0366d6',
        error: '#d73a4a'
    },
    fontSizes: {
        body: 14,
        appBarSize: 16,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        })
    },
    fontWeights: {
        normal: '400',
        bold: '700',
        light: '100'
    },
};

export default theme;