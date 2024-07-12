import Colors from '../components/theme/colors';

export type ISize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';


export enum sizeInput {
    xs = 25,
    sm = 30,
    md = 38,
    lg = 45,
    xl = 60,
    xxl = 70,
}

export enum ColorScheme {
    Background = Colors.Background,
    Surface = Colors.Surface,
    Primary = Colors.Primary,
    OnSurface = Colors.OnSurface,
    OnPrimary = Colors.OnPrimary,
    PrimaryVariants = Colors.PrimaryVariants,
    OnSurfaceVariants = Colors.OnSurfaceVariants,
    SurfaceVariants = Colors.SurfaceVariants,
    PrimaryLight = Colors.PrimaryLight,
    PrimaryVariantsLight = Colors.PrimaryVariantsLight,
    PrimaryVariantSecond = Colors.PrimaryVariantSecond,
}
