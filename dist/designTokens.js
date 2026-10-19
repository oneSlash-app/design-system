"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// design tokens definitions
var base = {
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
                alertBg: '#F2C4C4',
                contrast: '#FFFFFF',
            },
            warning: {
                main: '#EF6C00',
                dark: '#A84600', // 4.8:1 on background.default, 5.9:1 on white
                light: '#FFA732',
                alertBg: '#F5D5B0',
                contrast: '#FFFFFF',
            },
            info: {
                main: '#0087D4',
                dark: '#006BAB',
                light: '#2CC1FF',
                alertBg: '#B8D9F0',
                contrast: '#FFFFFF',
            },
            success: {
                main: '#328736',
                dark: '#2A6B2D',
                light: '#67C16B',
                alertBg: '#C4E2C5',
                contrast: '#FFFFFF',
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
                scrim: '#000000',
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
                alertBg: '#5C1A1A',
                contrast: '#FFFFFF',
            },
            warning: {
                main: '#FF8C0A',
                dark: '#CC5302',
                light: '#FFA732',
                alertBg: '#5C2E0A',
                contrast: '#FFFFFF',
            },
            info: {
                main: '#00AFFF',
                dark: '#006BAB',
                light: '#2CC1FF',
                alertBg: '#0A3A5C',
                contrast: '#FFFFFF',
            },
            success: {
                main: '#42A547',
                dark: '#2A6B2D',
                light: '#67C16B',
                alertBg: '#1A4A1D',
                contrast: '#FFFFFF',
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
                scrim: '#000000',
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
            weight: '400',
            size: '96px',
            lineHeight: '115px',
            letterSpacing: '-1.5px',
        },
        h2: {
            weight: '400',
            size: '60px',
            lineHeight: '72px',
            letterSpacing: '-0.5px',
        },
        h3: {
            weight: '400',
            size: '48px',
            lineHeight: '58px',
            letterSpacing: '0px',
        },
        h4: {
            weight: '400',
            size: '34px',
            lineHeight: '41px',
            letterSpacing: '0.3px',
        },
        h5: {
            weight: '400',
            size: '24px',
            lineHeight: '29px',
            letterSpacing: '0px',
        },
        h6: {
            weight: '400',
            size: '20px',
            lineHeight: '30px',
            letterSpacing: '0.2px',
        },
        subtitle1: {
            weight: '400',
            size: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
        },
        subtitle2: {
            weight: '400',
            size: '14px',
            lineHeight: '21px',
            letterSpacing: '0.1px',
        },
        body1: {
            weight: '400',
            size: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
        },
        body2: {
            weight: '400',
            size: '14px',
            lineHeight: '21px',
            letterSpacing: '0.2px',
        },
        caption: {
            weight: '400',
            size: '12px',
            lineHeight: '18px',
            letterSpacing: '0.5px',
        },
        alignments: {
            left: 'left',
            center: 'center',
            right: 'right',
            justify: 'justify',
        },
    },
    radius: {
        inline: '2px',
        control: '8px',
        container: '12px',
        full: '9999px',
    },
    shadow: {
        overlay: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    zIndex: {
        overlay: '50',
        tooltip: '1000',
    },
    motion: {
        duration: {
            fast: '150ms',
            slide: '200ms',
            pop: '220ms',
        },
        easing: {
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            emphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
            spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
    },
};
// Adds the semantic keys that are derived from a set's own groups, so the
// rule lives once and applies to every set (default and themes, light and dark).
/**
 * @param {typeof base.colors.light} set
 * @param {'light' | 'dark'} mode
 */
function withSemanticKeys(set, mode) {
    var isLight = mode === 'light';
    /** @param {typeof set.error} g @param {boolean} isError */
    var status = function (g, isError) { return (__assign(__assign({}, g), { fill: isLight ? g.dark : g.main, onFill: isLight ? '#FFFFFF' : '#000000', text: isLight ? g.dark : isError ? g.light : g.main, textHover: isLight ? g.dark : g.light })); };
    return __assign(__assign({}, set), { primary: __assign(__assign({}, set.primary), { contrast: isLight ? '#ffffff' : '#000000' }), background: __assign(__assign({}, set.background), { elevated: isLight ? set.background.default : set.background.accent100, overlay: isLight ? set.background.accent300 : set.background.accent100 }), error: status(set.error, true), warning: status(set.warning, false), info: status(set.info, false), success: status(set.success, false) });
}
// Forest: the default set with these values replaced (group by group).
/**
 * @template T
 * @param {T} set
 * @param {{ [K in keyof T]?: Partial<T[K]> }} changes
 * @returns {T}
 */
function override(set, changes) {
    var out = __assign({}, set);
    for (var _i = 0, /** @type {(keyof T)[]} */ _a = (Object.keys(changes)); _i < _a.length; _i++) {
        var group = _a[_i];
        out[group] = __assign(__assign({}, set[group]), changes[group]);
    }
    return out;
}
var baseColors = base.colors;
var forestLight = override(baseColors.light, {
    text: { primary: '#1C2213', secondary: '#515E3C', disabled: '#8A9670' },
    accent: { main: '#1C2213', dark: '#2A331E', light: '#3A472B', contrast: '#E7ECDA' },
    secondary: { main: '#6E7A5A', dark: '#5D6849', light: '#828D6B' },
    background: { default: '#D9E5C7', accent100: '#E2ECD4', accent200: '#EBF1E0', accent300: '#F4F7EC' },
});
var forestDark = override(baseColors.dark, {
    text: { primary: '#D9E5C7', secondary: '#9DAA85', disabled: '#6D7956' },
    accent: { main: '#E7ECDA', dark: '#D6DEC3', light: '#F2F5EA', contrast: '#1C2213' },
    secondary: { main: '#6E7A5A', dark: '#5D6849', light: '#828D6B' },
    background: { default: '#1C2213', accent100: '#27301B', accent200: '#364228', accent300: '#424F34' },
});
module.exports = __assign(__assign({}, base), { colors: {
        light: withSemanticKeys(baseColors.light, 'light'),
        dark: withSemanticKeys(baseColors.dark, 'dark'),
    }, themes: {
        forest: {
            light: withSemanticKeys(forestLight, 'light'),
            dark: withSemanticKeys(forestDark, 'dark'),
        },
    } });
