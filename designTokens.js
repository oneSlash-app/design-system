// design tokens definitions
const base = {
  colors: {
    // light
    light:{
      text:{
        primary: '#000000',
        secondary: '#686868', // 4.6:1 on background.default (#6D6D6D was 4.2)
        disabled: '#9E9E9E',
        contrast: '#ffffff',
      },
      accent:{
        main: '#EEAE03',
        dark: '#CE8602',
        light: '#FFDD43',
        contrast: '#000000',
      },
      primary:{
        main: '#454545',
        dark: '#262626',
        light: '#888888',
      },
      secondary:{
        main: '#B0B0B0',
        dark: '#888888',
        light: '#D1D1D1',
      },
      error:{
        main: '#D32F2F',
        dark: '#A82121', // 4.62:1 on alertBg (#B22323 was 4.27)
        light: '#F27777',
        alertBg: '#F2C4C4',
        contrast: '#FFFFFF',
      },
      warning:{
        main: '#EF6C00',
        dark: '#A84600', // 4.8:1 on background.default, 5.9:1 on white
        light: '#FFA732',
        alertBg: '#F5D5B0',
        contrast: '#FFFFFF',
      },
      info:{
        main: '#0087D4',
        dark: '#006BAB',
        light: '#2CC1FF',
        alertBg: '#B8D9F0',
        contrast: '#FFFFFF',
      },
      success:{
        main: '#328736',
        dark: '#2A6B2D',
        light: '#67C16B',
        alertBg: '#C4E2C5',
        contrast: '#FFFFFF',
      },
      background:{
        default: '#e8e8e8',
        accent100:'#f1f1f1',
        accent200:'#f7f7f7',
        accent300:'#FFFFFF',
      },
      action:{
        active: '#888888',
        hover: '#F3F3F3',
        selected: '#E3E3E3',
        disabledBackground: '#D1D1D1',
        disabled: '#B0B0B0',
      },
      actionBackground:{
        enabled: '#FFFFFF',
        hovered: '#FFFFFF',
        selected: '#FFFFFF',
        disabled: '#EEEEEE',
      },
      actionOutlinedBorder:{
        enabled: '#888888',
        hovered: '#CDCDCD',
        selected: '#E8E8E8',
        disabled: '#B0B0B0',
      },
      misc:{
        divider: '#D1D1D1',
        scrim: '#000000',
        tooltipBg: '#4F4F4F',
        tooltipText: '#EEEEEE',
      },
    },

    // dark
    dark:{
      text:{
        primary: '#eeeeee',
        secondary: '#B0B0B0',
        disabled: '#6D6D6D',
        contrast: '#000000',
      },
      accent:{
        main: '#FFCD29',
        dark: '#CE8602',
        light: '#FFDD43',
        contrast: '#000000',
      },
      primary:{
        main: '#D5D5D5',
        dark: '#E9E9E9',
        light: '#9A9A9A',
      },
      secondary:{
        main: '#4F4F4F',
        dark: '#454545',
        light: '#6D6D6D',
      },
      error:{
        main: '#E74C4C',
        dark: '#B22323',
        light: '#F27777',
        alertBg: '#5C1A1A',
        contrast: '#000000', // 5.5:1 on main (#FFFFFF was 3.79)
      },
      warning:{
        main: '#FF8C0A',
        dark: '#CC5302',
        light: '#FFA732',
        alertBg: '#5C2E0A',
        contrast: '#FFFFFF',
      },
      info:{
        main: '#00AFFF',
        dark: '#006BAB',
        light: '#2CC1FF',
        alertBg: '#0A3A5C',
        contrast: '#FFFFFF',
      },
      success:{
        main: '#42A547',
        dark: '#2A6B2D',
        light: '#67C16B',
        alertBg: '#1A4A1D',
        contrast: '#FFFFFF',
      },
      background:{
        default: '#262626',
        accent100:'#333333',
        accent200:'#454545',
        accent300:'#4F4F4F',
      },
      action:{
        active: '#171717',
        hover: '#3D3D3D',
        selected: '#4E4E4E',
        disabledBackground: '#3C3C3C',
        disabled: '#383838',
      },
      actionBackground:{
        enabled: '#FFFFFF',
        hovered: '#FFFFFF',
        selected: '#FFFFFF',
        disabled: '#383838',
      },
      actionOutlinedBorder:{
        enabled: '#7B7B7B',
        hovered: '#2F2F2F',
        selected: '#404040',
        disabled: '#383838',
      },
      misc:{
        divider: '#404040',
        scrim: '#000000',
        tooltipBg: '#FFFFFF',
        tooltipText: '#000000',
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
 * @template {typeof base.colors.light} S
 * @param {S} set
 * @param {'light' | 'dark'} mode
 */
function withSemanticKeys(set, mode) {
  const isLight = mode === 'light';
  /** @param {typeof set.error} g @param {boolean} isError */
  const status = (g, isError) => ({
    ...g,
    fill: isLight ? g.dark : g.main,
    onFill: isLight ? '#FFFFFF' : '#000000',
    text: isLight ? g.dark : isError ? g.light : g.main,
    textHover: isLight ? g.dark : g.light,
    tint: isLight ? g.light : g.dark,
  });
  return {
    ...set,
    primary: { ...set.primary, contrast: isLight ? '#ffffff' : '#000000' },
    // Secondary buttons use text.primary as their label; a theme whose secondary.main is mid-tone sets its own.
    secondary: { ...set.secondary, contrast: set.text.primary },
    background: {
      ...set.background,
      elevated: isLight ? set.background.default : set.background.accent100,
      overlay: isLight ? set.background.accent300 : set.background.accent100,
    },
    error: status(set.error, true),
    warning: status(set.warning, false),
    info: status(set.info, false),
    success: status(set.success, false),
  };
}

// Forest: the default set with these values replaced (group by group).
/**
 * @template T
 * @param {T} set
 * @param {{ [K in keyof T]?: Partial<T[K]> }} changes
 * @returns {T}
 */
function override(set, changes) {
  const out = { ...set };
  for (const group of /** @type {(keyof T)[]} */ (Object.keys(changes))) out[group] = { ...set[group], ...changes[group] };
  return out;
}

const baseColors = base.colors;

const forestLight = override(baseColors.light, {
  text: { primary: '#1C2213', secondary: '#515E3C', disabled: '#8A9670' },
  accent: { main: '#1C2213', dark: '#2A331E', light: '#3A472B', contrast: '#E7ECDA' },
  secondary: { main: '#6E7A5A', dark: '#5D6849', light: '#828D6B' },
  background: { default: '#D9E5C7', accent100: '#E2ECD4', accent200: '#EBF1E0', accent300: '#F4F7EC' },
});

const forestDark = override(baseColors.dark, {
  text: { primary: '#D9E5C7', secondary: '#9DAA85', disabled: '#6D7956' },
  accent: { main: '#E7ECDA', dark: '#D6DEC3', light: '#F2F5EA', contrast: '#1C2213' },
  secondary: { main: '#6E7A5A', dark: '#5D6849', light: '#828D6B' },
  background: { default: '#1C2213', accent100: '#27301B', accent200: '#364228', accent300: '#424F34' },
});

// Clay, Indigo and Wine follow default's shape (tinted secondary per mode, so secondary buttons keep the
// text.primary label) with the brand hue in text, accent, secondary and background.
const clayLight = override(baseColors.light, {
  text: { primary: '#2B1F12', secondary: '#6B5640', disabled: '#A8957C' },
  accent: { main: '#D9B26A', dark: '#B8904A', light: '#F2D57E', contrast: '#2B1F12' },
  secondary: { main: '#CDB49A', dark: '#B89A7C', light: '#E2D1BE' },
  background: { default: '#EDE0CC', accent100: '#F2E8D9', accent200: '#F7F0E6', accent300: '#FCF8F2' },
});

const clayDark = override(baseColors.dark, {
  text: { primary: '#F2E2CE', secondary: '#C2AD93', disabled: '#7A6A57' },
  accent: { main: '#F2D57E', dark: '#D9B26A', light: '#F7E4A8', contrast: '#2B1F12' },
  secondary: { main: '#5C4630', dark: '#4D3A27', light: '#75593D' },
  background: { default: '#2A2119', accent100: '#362A1F', accent200: '#45362A', accent300: '#514034' },
});

const indigoLight = override(baseColors.light, {
  text: { primary: '#111A2E', secondary: '#4A5670', disabled: '#8F99AD' },
  accent: { main: '#204F8C', dark: '#162D59', light: '#548DBF', contrast: '#FFFFFF' },
  secondary: { main: '#B4C6DC', dark: '#8EA6C4', light: '#CFDCEA' },
  background: { default: '#DDE6F0', accent100: '#E6EDF5', accent200: '#EEF3F9', accent300: '#F7F9FC' },
});

const indigoDark = override(baseColors.dark, {
  text: { primary: '#E3ECF5', secondary: '#A3B2C8', disabled: '#637089' },
  accent: { main: '#C2E0F2', dark: '#9FC6E3', light: '#DCEEF8', contrast: '#162D59' },
  secondary: { main: '#344566', dark: '#2B3A57', light: '#44587F' },
  background: { default: '#141C2E', accent100: '#1C263B', accent200: '#29354D', accent300: '#33405A' },
});

const wineLight = override(baseColors.light, {
  text: { primary: '#2A1622', secondary: '#6A4A5C', disabled: '#A68B99' },
  accent: { main: '#8C2668', dark: '#6E1D52', light: '#A66086', contrast: '#F2EDE4' },
  secondary: { main: '#D5BCC8', dark: '#BF93A8', light: '#E6D4DC' },
  background: { default: '#EEE4E4', accent100: '#F3EBEA', accent200: '#F7F2F0', accent300: '#FCF9F7' },
});

const wineDark = override(baseColors.dark, {
  text: { primary: '#F2EDE4', secondary: '#C2AAB6', disabled: '#7D6672' },
  accent: { main: '#E2B4CC', dark: '#BF93A8', light: '#F0D2E1', contrast: '#2C1A26' },
  secondary: { main: '#4E3346', dark: '#43293C', light: '#634257' },
  background: { default: '#2A1F28', accent100: '#352833', accent200: '#453541', accent300: '#51404D' },
});

/** @param {typeof base.colors.light} light @param {typeof base.colors.light} dark */
const themeSets = (light, dark) => withTooltips(withSemanticKeys(light, 'light'), withSemanticKeys(dark, 'dark'));

// The derived light info.text (#006BAB) is 4.33:1 on forest's background (4.37 on clay's); #0068A3 is the lightest step that reaches 4.5.
/**
 * @template {typeof base.colors.light} S
 * @param {S} set
 * @returns {S}
 */
const withForestInfoText = (set) => ({ ...set, info: { ...set.info, text: '#0068A3', textHover: '#0068A3' } });

// Forest's secondary.main (#6E7A5A) is mid-tone: its text.primary gives 3.5:1 and Scindo's cream 3.8:1, so the
// label is white (4.56:1) in both modes.
/**
 * @template {typeof base.colors.light} S
 * @param {S} set
 * @param {string} contrast
 * @returns {S}
 */
const withSecondaryContrast = (set, contrast) => ({ ...set, secondary: { ...set.secondary, contrast } });

// Tooltips are inverted surfaces: each mode takes the other mode's accent300 and text.primary of the same theme.
/**
 * @template {typeof base.colors.light} S
 * @param {S} light
 * @param {S} dark
 * @returns {{ light: S, dark: S }}
 */
const withTooltips = (light, dark) => ({
  light: { ...light, misc: { ...light.misc, tooltipBg: dark.background.accent300, tooltipText: dark.text.primary } },
  dark: { ...dark, misc: { ...dark.misc, tooltipBg: light.background.accent300, tooltipText: light.text.primary } },
});

const defaultSets = withTooltips(withSemanticKeys(baseColors.light, 'light'), withSemanticKeys(baseColors.dark, 'dark'));
const forestSets = withTooltips(
  withSecondaryContrast(withForestInfoText(withSemanticKeys(forestLight, 'light')), '#FFFFFF'),
  withSecondaryContrast(withSemanticKeys(forestDark, 'dark'), '#FFFFFF'),
);

module.exports = {
  ...base,
  colors: defaultSets,
  themes: {
    forest: forestSets,
    clay: withTooltips(withForestInfoText(withSemanticKeys(clayLight, 'light')), withSemanticKeys(clayDark, 'dark')),
    indigo: themeSets(indigoLight, indigoDark),
    wine: themeSets(wineLight, wineDark),
  },
};
