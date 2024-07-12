import { Appearance } from 'react-native';

import { colorsPalette, themeColors } from './colorsPalette';

class ColorsObject
{
    schemes = {
        light: {},
        dark: {},
    };
    currentScheme = 'default';

    constructor()
    {
        const colors = Object.assign(colorsPalette, themeColors);
        Object.assign(this, colors);
        Appearance.addChangeListener(() =>
        {
            if (this.currentScheme === 'default')
            {
                Object.assign(this, this.schemes[Appearance.getColorScheme() ?? 'light']);
            }
        });
        
        this.Background = undefined; // Background color
        this.Surface = undefined; // Surface color
        this.Primary = undefined; // Primary color
        this.OnSurface = undefined; // On Surface color
        this.OnPrimary = undefined; // On Primary color
        this.PrimaryVariants = undefined; // Primary Variants color
        this.OnSurfaceVariants = undefined; // On Surface Variants color
        this.SurfaceVariants = undefined; // Surface Variants color
        this.SurfaceVariantsSecond = undefined; // Surface Variants color
        this.PrimaryLight = undefined; // Primary Light color
        this.PrimaryVariantsLight = undefined; // Primary Variants Light color
        this.PrimaryVariantSecond = undefined; // Primary Variant Second
        this.PrimaryVariantsThird = undefined; // Primary Variant Third
        this.PrimaryVariantsFour = undefined; // Primary Variant Third
        this.primaryLighter = undefined; // Primary Variant Third
        this.Background1 = undefined; //
        this.textColor1 = undefined; //
    }

    loadColors(colors)
    {
        Object.keys(colors).map((key) =>
        {
            this[key] = colors[key];
        });
    }

}

const Colors = new ColorsObject();
Colors.loadColors(colorsPalette);

export default Colors;
