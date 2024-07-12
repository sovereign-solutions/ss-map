export type ThemeColors = Record<string, string>;
export type ThemeMode = 'light' | 'dark' | 'other' | 'light2' | 'dark2' | 'other2';

export type Theme = {
    statusBar?: 'light' | 'dark'; // status bar
    Background: string, // Background color
    BackgroundVariants: string; // Background color
    Surface: string, // Surface color
    Primary: string, // Primary color
    OnSurface: string, // On Surface color
    OnPrimary: string, // On Primary color
    PrimaryVariants: string, // Primary Variants color
    OnSurfaceVariants: string, // On Surface Variants color
    SurfaceVariants: string, // Surface Variants color
    PrimaryLight: string, // Primary Light color
    PrimaryVariantsLight: string, // Primary Variants Light color
    PrimaryVariantSecond: string, // Primary Variant Second
    PrimaryVariantsThird: string, // Primary Variant Third
    TextGray: string, // Primary Variant Third
} & ThemeColors;

export const colors: ThemeColors = {
    backgroundDark: '#101011', // Background color
    surfaceDark: '#262A2E', // Surface color
    primaryDark: '#262A2E', // Primary color
    onSurfaceDark: '#FFFFFF', // On Surface color
    onPrimaryDark: '#FFFFFF', // On Primary color
    primaryVariantsDark: '#FFFFFF', // Primary Variants color
    onSurfaceVariantsDark: '#F7F8F9', // On Surface OnSurfaceVariants color
    surfaceVariantsDark: '#2E3337', // Surface Variants color
    primaryVariantSecondDark: '#66696D', // Primary Variant Second
    surfaceVariantsSecondDark: '#66696D', // Primary Variant Second

    backgroundLight: '#F5F5F8', // Background color
    BackgroundVariant: '#D6D6D6',
    surfaceLight: '#FFFFFF', // Surface color
    primaryLight: '#4A6EBB', // Primary color
    onSurfaceLight: '#000000', // On Surface color
    onPrimaryLight: '#FFFFFF', // On Primary color
    primaryVariantsLight: '#168FE7', // Primary Variants color
    onSurfaceVariantsLight: '#939393', // On Surface Variants color
    surfaceVariantsLight: '#F7F8F9', // Surface Variants color
    surfaceVariantsSecondLight: '#F7F8F9', // Primary Variant Second
    primaryVariantSecondLight: '#E1EBFF', // Primary Variant Second
    primaryVariantsThird: '#84C8FD', // Primary Variant Third
    primaryVariantsFour: '#5C8AEA', // Primary Variant Four
    textGrayLight: 'rgba(36, 59, 81, 0.5)',


    backgroundDark2: '#101011', // Background color
    surfaceDark2: '#262A2E', // Surface color
    primaryDark2: '#262A2E', // Primary color
    onSurfaceDark2: '#FFFFFF', // On Surface color
    onPrimaryDark2: '#FFFFFF', // On Primary color
    primaryVariantsDark2: '#FFFFFF', // Primary Variants color
    onSurfaceVariantsDark2: '#F7F8F9', // On Surface Variants color
    surfaceVariantsDark2: '#2E3337', // Surface Variants color
    primaryVariantSecondDark2: '#66696D', // Primary Variant Second
    backgroundColorDark2_1: '#2E3337',

    backgroundLight2: '#F5F5F8', // Background color
    surfaceLight2: '#FFFFFF', // Surface color
    primaryLight2: '#0066B2', // Primary color
    onSurfaceLight2: '#000000', // On Surface color
    onPrimaryLight2: '#FFFFFF', // On Primary color
    primaryVariantsLight2: '#168FE7', // Primary Variants color
    onSurfaceVariantsLight2: '#939393', // On Surface Variants color
    surfaceVariantsLight2: '#F2F2F2', // Surface Variants color
    surfaceVariantsSecondLight2: '#F4FBFE', // Surface Variants color
    primaryVariantSecondLight2: '#e9edf54d', // Primary Variant Second
    primaryVariantsThird2: '#E1EBFF', // Primary Variant Third
    primaryVariantsFour2: '#5C8AEA', // Primary Variant Four
    surfaceVariantsThirdLight2: '#F4F4F4', // Primary Variant Four
    backgroundColorLight2_1: '#D6D6D6',
    titleColor2_1: '#243B51',
    primaryLighter: '#C6E7FF',
};
export const defaultTheme: Theme = {
    statusBar: 'light', // status bar
    Background: colors.backgroundLight, // Background color
    BackgroundVariants: colors.backgroundLight, // Background color
    BackfroundVariants2: colors.BackgroundVariant,
    Surface: colors.surfaceLight, // Surface color
    Primary: colors.primaryLight, // Primary color
    OnSurface: colors.onSurfaceLight, // On Surface color
    OnPrimary: colors.onPrimaryLight, // On Primary color
    PrimaryVariants: colors.primaryVariantsLight, // Primary Variants color
    OnSurfaceVariants: colors.onSurfaceVariantsLight, // On Surface Variants color
    SurfaceVariants: colors.surfaceVariantsLight, // Surface Variants color
    PrimaryLight: colors.primaryLight, // Primary Light color
    PrimaryVariantsLight: colors.primaryVariantsLight, // Primary Variants Light color
    PrimaryVariantSecond: colors.primaryVariantSecondLight, // Primary Variant Second
    PrimaryVariantsThird: colors.primaryVariantsThird, // Primary Variant Third
    PrimaryVariantsFour: colors.primaryVariantsFour, // Primary Variant Third
    surfaceVariantsSecond: colors.surfaceVariantsSecondLight, // Surface second Variants color
    TextGray: colors.textGrayLight,
    TextGray2: colors.titleColor2_1,
    primaryLighter: colors.primaryLighter,
};

export const themeModes: Record<ThemeMode, Theme> = {
    light: defaultTheme,
    dark: {
        statusBar: 'light', // status bar
        Background: colors.backgroundDark, // Background color
        BackgroundVariants: colors.backgroundDark2, // Background color
        BackfroundVariants2: colors.backgroundDark,
        Surface: colors.surfaceDark, // Surface color
        Primary: colors.primaryDark, // Primary color
        OnSurface: colors.onSurfaceDark, // On Surface color
        OnPrimary: colors.onPrimaryDark, // On Primary color
        PrimaryVariants: colors.primaryVariantsDark, // Primary Variants color
        OnSurfaceVariants: colors.onSurfaceVariantsDark, // On Surface Variants color
        SurfaceVariants: colors.surfaceVariantsDark, // Surface Variants color
        PrimaryLight: colors.primaryLight, // Primary Light color
        PrimaryVariantsLight: colors.primaryVariantsLight, // Primary Variants Light color
        PrimaryVariantSecond: colors.primaryVariantSecondDark, // Primary Variant Second
        PrimaryVariantsThird: colors.primaryVariantsThird, // Primary Variant Third
        PrimaryVariantsFour: colors.surfaceVariantsDark, // Primary Variant Third
        surfaceVariantsSecond: colors.surfaceVariantsSecondDark, // Surface second Variants color
        TextGray: colors.onSurfaceVariantsDark,
        TextGray2: colors.backgroundColorDark2_1,
        primaryLighter: colors.primaryVariantSecondDark,
    },
    other: {
        statusBar: 'light', // status bar
        Background: colors.backgroundDark, // Background color
        BackgroundVariants: colors.backgroundDark, // Background color
        BackfroundVariants2: colors.backgroundDark,
        Surface: colors.surfaceDark, // Surface color
        Primary: colors.primaryDark, // Primary color
        OnSurface: colors.onSurfaceDark, // On Surface color
        OnPrimary: colors.onPrimaryDark, // On Primary color
        PrimaryVariants: colors.primaryVariantsDark, // Primary Variants color
        OnSurfaceVariants: colors.onSurfaceVariantsDark, // On Surface Variants color
        SurfaceVariants: colors.surfaceVariantsDark, // Surface Variants color
        PrimaryLight: colors.primaryLight, // Primary Light color
        PrimaryVariantsLight: colors.primaryVariantsLight, // Primary Variants Light color
        PrimaryVariantSecond: colors.primaryVariantSecondDark, // Primary Variant Second
        PrimaryVariantsThird: colors.primaryVariantsThird, // Primary Variant Third
        PrimaryVariantsFour: colors.surfaceVariantsDark, // Primary Variant Third
        surfaceVariantsSecond: colors.surfaceVariantsSecondDark, // Surface second Variants color
        TextGray: colors.onSurfaceVariantsDark,
        TextGray2: colors.backgroundColorDark2_1,
        primaryLighter: colors.primaryVariantSecondDark,
    },
    light2: {
        statusBar: 'light', // status bar
        Background: colors.backgroundLight2, // Background color
        BackgroundVariants: colors.backgroundLight, // Background color
        Surface: colors.surfaceLight2, // Surface color
        Primary: colors.primaryLight2, // Primary color
        OnSurface: colors.onSurfaceLight2, // On Surface color
        OnPrimary: colors.onPrimaryLight2, // On Primary color
        PrimaryVariants: colors.primaryVariantsLight2, // Primary Variants color
        OnSurfaceVariants: colors.onSurfaceVariantsLight2, // On Surface Variants color
        SurfaceVariants: colors.surfaceVariantsLight2, // Surface Variants color
        SurfaceVariantsSecond: colors.surfaceVariantsSecondLight2, // Surface Variants color
        PrimaryLight: colors.primaryLight2, // Primary Light color
        PrimaryVariantsLight: colors.primaryVariantsLight2, // Primary Variants Light color
        PrimaryVariantSecond: colors.primaryVariantSecondLight2, // Primary Variant Second
        PrimaryVariantsThird: colors.primaryVariantsThird2, // Primary Variant Third
        PrimaryVariantsFour: colors.primaryVariantsFour2, // Primary Variant Third
        SurfaceVariantsThird: colors.surfaceVariantsThirdLight2, // Primary Variant Four
        Background1: colors.backgroundColorLight2_1,
        TitleColor1: colors.titleColor2_1,
        textColor1: colors.onSurfaceVariantsLight2,
        primaryLighter: colors.primaryLighter,
        TextGray: colors.textGrayLight,
    },
    dark2: {
        statusBar: 'light', // status bar
        Background: colors.backgroundDark2, // Background color
        BackgroundVariants: '#101011', // Background color
        Surface: colors.surfaceDark2, // Surface color
        Primary: colors.primaryDark2, // Primary color
        OnSurface: colors.onSurfaceDark2, // On Surface color
        OnPrimary: colors.onPrimaryDark2, // On Primary color
        PrimaryVariants: colors.primaryVariantsDark2, // Primary Variants color
        OnSurfaceVariants: colors.onSurfaceVariantsDark2, // On Surface Variants color
        SurfaceVariants: colors.surfaceVariantsDark2, // Surface Variants color
        SurfaceVariantsSecond: colors.surfaceVariantsDark2, // Surface Variants color
        PrimaryLight: colors.primaryLight2, // Primary Light color
        PrimaryVariantsLight: colors.primaryVariantsLight2, // Primary Variants Light color
        PrimaryVariantSecond: colors.surfaceVariantsDark2, // Primary Variant Second
        PrimaryVariantsThird: colors.primaryVariantsThird2, // Primary Variant Third
        PrimaryVariantsFour: colors.onSurfaceVariantsDark2,
        SurfaceVariantsThird: colors.surfaceVariantsDark2,
        Background1: colors.backgroundColorDark2_1,
        TitleColor1: colors.onSurfaceVariantsDark2,
        textColor1: colors.backgroundColorDark2_1,
        primaryLighter: colors.primaryVariantSecondDark,
        TextGray: colors.onSurfaceVariantsDark,
    },
    other2: {
        statusBar: 'light', // status bar
        Background: colors.backgroundDark2, // Background color
        BackgroundVariants: colors.backgroundDark, // Background color
        Surface: colors.surfaceDark2, // Surface color
        Primary: colors.primaryDark2, // Primary color
        OnSurface: colors.onSurfaceDark2, // On Surface color
        OnPrimary: colors.onPrimaryDark2, // On Primary color
        PrimaryVariants: colors.primaryVariantsDark2, // Primary Variants color
        OnSurfaceVariants: colors.onSurfaceVariantsDark2, // On Surface Variants color
        SurfaceVariants: colors.surfaceVariantsDark2, // Surface Variants color
        PrimaryLight: colors.primaryLight2, // Primary Light color
        PrimaryVariantsLight: colors.primaryVariantsLight2, // Primary Variants Light color
        PrimaryVariantSecond: colors.primaryVariantSecondDark2, // Primary Variant Second
        PrimaryVariantsThird: colors.primaryVariantsThird2, // Primary Variant Third
        SurfaceVariantsThird: colors.surfaceVariantsDark2,
        Background1: colors.backgroundColorDark2_1,
        TitleColor1: colors.onSurfaceVariantsDark2,
        textColor1: colors.backgroundColorDark2_1,
        primaryLighter: colors.primaryLighter,
        TextGray: colors.onSurfaceVariantsDark,
    },
};

// import storage from '../storage/mmkv';

export const getTheme = (): Theme =>
{
    // const themeMode = storage.getString('THEME_MODE');
    const themeMode = 'light';
    // console.log('[MMKV] All keys:', storage.getAllKeys());
    // console.log('[MMKV] themeMode:', themeMode);

    return themeModes[themeMode || 'light'];
};
