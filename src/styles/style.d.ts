import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        palette: {
            eliceViolet: string,
            lightViolet: string,
            eliceBlue: string,
            carrotOrange: string,
            lightBlue: string,
            borderGray: string,
            gray: string,
            black: string,
            kakaoYellow: string,
        },
        status: {
            verifyGreen: string,
            warningRed: string,
        },
        devices: {
            desktop: string,
            mobile: string,
        },
    }
}
