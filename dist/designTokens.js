"use strict";
// design tokens definitions
module.exports = {
    colors: {
        // light
        light: {
            text: {
                primary: '#000000',
                secondary: '#6D6D6D',
                disabled: '#9E9E9E',
                contrast: '#ffffff',
            },
            accent: {
                main: '#EEAE03',
                dark: '#CE8602',
                light: '#FFDD43',
                contrast: '#000000',
            },
            primary: {
                main: '#454545',
                dark: '#262626',
                light: '#888888',
            },
            secondary: {
                main: '#B0B0B0',
                dark: '#888888',
                light: '#D1D1D1',
            },
            error: {
                main: '#D32F2F',
                dark: '#B22323',
                light: '#F27777',
            },
            warning: {
                main: '#EF6C00',
                dark: '#CC5302',
                light: '#FFA732',
            },
            info: {
                main: '#0087D4',
                dark: '#006BAB',
                light: '#2CC1FF',
            },
            success: {
                main: '#328736',
                dark: '#2A6B2D',
                light: '#67C16B',
            },
            background: {
                default: '#e8e8e8',
                accent100: '#f1f1f1',
                accent200: '#f7f7f7',
                accent300: '#FFFFFF',
            },
            action: {
                active: '#888888',
                hover: '#F3F3F3',
                selected: '#E3E3E3',
                disabledBackground: '#D1D1D1',
                disabled: '#B0B0B0',
            },
            actionBackground: {
                enabled: '#FFFFFF',
                hovered: '#FFFFFF',
                selected: '#FFFFFF',
                disabled: '#EEEEEE',
            },
            actionOutlinedBorder: {
                enabled: '#888888',
                hovered: '#CDCDCD',
                selected: '#E8E8E8',
                disabled: '#B0B0B0',
            },
            misc: {
                divider: '#D1D1D1',
            },
        },
        // dark
        dark: {
            text: {
                primary: '#eeeeee',
                secondary: '#B0B0B0',
                disabled: '#6D6D6D',
                contrast: '#000000',
            },
            accent: {
                main: '#FFCD29',
                dark: '#CE8602',
                light: '#FFDD43',
                contrast: '#000000',
            },
            primary: {
                main: '#D5D5D5',
                dark: '#E9E9E9',
                light: '#9A9A9A',
            },
            secondary: {
                main: '#4F4F4F',
                dark: '#454545',
                light: '#6D6D6D',
            },
            error: {
                main: '#E74C4C',
                dark: '#B22323',
                light: '#F27777',
            },
            warning: {
                main: '#FF8C0A',
                dark: '#CC5302',
                light: '#FFA732',
            },
            info: {
                main: '#00AFFF',
                dark: '#006BAB',
                light: '#2CC1FF',
            },
            success: {
                main: '#42A547',
                dark: '#2A6B2D',
                light: '#67C16B',
            },
            background: {
                default: '#262626',
                accent100: '#333333',
                accent200: '#454545',
                accent300: '#4F4F4F',
            },
            action: {
                active: '#171717',
                hover: '#3D3D3D',
                selected: '#4E4E4E',
                disabledBackground: '#3C3C3C',
                disabled: '#383838',
            },
            actionBackground: {
                enabled: '#FFFFFF',
                hovered: '#FFFFFF',
                selected: '#FFFFFF',
                disabled: '#383838',
            },
            actionOutlinedBorder: {
                enabled: '#7B7B7B',
                hovered: '#2F2F2F',
                selected: '#404040',
                disabled: '#383838',
            },
            misc: {
                divider: '#404040',
            },
        },
    },
    spacing: {
        small: '4px',
        medium: '8px',
        large: '16px',
    },
    typography: {
        family: 'Inter, sans-serif',
        h1: {
            weight: '300',
            size: '96px',
            lineHeight: '120%',
            letterSpacing: '-1.5px',
        },
        h2: {
            weight: '300',
            size: '60px',
            lineHeight: '120%',
            letterSpacing: '-0.5px',
        },
        h3: {
            weight: '400',
            size: '48px',
            lineHeight: '120%',
            letterSpacing: '0px',
        },
        h4: {
            weight: '400',
            size: '34px',
            lineHeight: '120%',
            letterSpacing: '0.3px',
        },
        h5: {
            weight: '400',
            size: '24px',
            lineHeight: '120%',
            letterSpacing: '0px',
        },
        h6: {
            weight: '500',
            size: '20px',
            lineHeight: '150%',
            letterSpacing: '0.2px',
        },
        subtitle1: {
            weight: '500',
            size: '16px',
            lineHeight: '150%',
            letterSpacing: '0.2px',
        },
        subtitle2: {
            weight: '500',
            size: '14px',
            lineHeight: '150%',
            letterSpacing: '0.1px',
        },
        body1: {
            weight: '400',
            size: '16px',
            lineHeight: '150%',
            letterSpacing: '0.2px',
        },
        body2: {
            weight: '400',
            size: '14px',
            lineHeight: '150%',
            letterSpacing: '0.2px',
        },
        caption: {
            weight: '400',
            size: '12px',
            lineHeight: '150%',
            letterSpacing: '0.5px',
        },
        alignments: {
            left: 'left',
            center: 'center',
            right: 'right',
            justify: 'justify',
        },
    },
};
