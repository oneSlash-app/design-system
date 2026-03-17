var designTokens = require('./designTokens');
var config = {
    darkMode: 'class',
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light: text colors
                'light-text-primary': designTokens.colors.light.text.primary,
                'light-text-secondary': designTokens.colors.light.text.secondary,
                'light-text-disabled': designTokens.colors.light.text.disabled,
                'light-text-contrast': designTokens.colors.light.text.contrast,
                // Dark: text colors
                'dark-text-primary': designTokens.colors.dark.text.primary,
                'dark-text-secondary': designTokens.colors.dark.text.secondary,
                'dark-text-disabled': designTokens.colors.dark.text.disabled,
                'dark-text-contrast': designTokens.colors.dark.text.contrast,
                // light: accent colors
                'light-accent-main': designTokens.colors.light.accent.main,
                'light-accent-dark': designTokens.colors.light.accent.dark,
                'light-accent-light': designTokens.colors.light.accent.light,
                'light-accent-contrast': designTokens.colors.light.accent.contrast,
                // dark: accent colors
                'dark-accent-main': designTokens.colors.dark.accent.main,
                'dark-accent-dark': designTokens.colors.dark.accent.dark,
                'dark-accent-light': designTokens.colors.dark.accent.light,
                'dark-accent-contrast': designTokens.colors.dark.accent.contrast,
                // Light: primary colors
                'light-primary-main': designTokens.colors.light.primary.main,
                'light-primary-dark': designTokens.colors.light.primary.dark,
                'light-primary-light': designTokens.colors.light.primary.light,
                'light-primary-contrast': designTokens.colors.light.primary.contrast,
                // Dark: primary colors
                'dark-primary-main': designTokens.colors.dark.primary.main,
                'dark-primary-dark': designTokens.colors.dark.primary.dark,
                'dark-primary-light': designTokens.colors.dark.primary.light,
                'dark-primary-contrast': designTokens.colors.dark.primary.contrast,
                // light: secondary colors
                'light-secondary-main': designTokens.colors.light.secondary.main,
                'light-secondary-dark': designTokens.colors.light.secondary.dark,
                'light-secondary-light': designTokens.colors.light.secondary.light,
                // dark: secondary colors
                'dark-secondary-main': designTokens.colors.dark.secondary.main,
                'dark-secondary-dark': designTokens.colors.dark.secondary.dark,
                'dark-secondary-light': designTokens.colors.dark.secondary.light,
                // light: error colors
                'light-error-main': designTokens.colors.light.error.main,
                'light-error-dark': designTokens.colors.light.error.dark,
                'light-error-light': designTokens.colors.light.error.light,
                'light-error-alertBg': designTokens.colors.light.error.alertBg,
                // dark: error colors
                'dark-error-main': designTokens.colors.dark.error.main,
                'dark-error-dark': designTokens.colors.dark.error.dark,
                'dark-error-light': designTokens.colors.dark.error.light,
                'dark-error-alertBg': designTokens.colors.dark.error.alertBg,
                // light: warning colors
                'light-warning-main': designTokens.colors.light.warning.main,
                'light-warning-dark': designTokens.colors.light.warning.dark,
                'light-warning-light': designTokens.colors.light.warning.light,
                'light-warning-alertBg': designTokens.colors.light.warning.alertBg,
                // dark: warning colors
                'dark-warning-main': designTokens.colors.dark.warning.main,
                'dark-warning-dark': designTokens.colors.dark.warning.dark,
                'dark-warning-light': designTokens.colors.dark.warning.light,
                'dark-warning-alertBg': designTokens.colors.dark.warning.alertBg,
                // light: info colors
                'light-info-main': designTokens.colors.light.info.main,
                'light-info-dark': designTokens.colors.light.info.dark,
                'light-info-light': designTokens.colors.light.info.light,
                'light-info-alertBg': designTokens.colors.light.info.alertBg,
                // dark: info colors
                'dark-info-main': designTokens.colors.dark.info.main,
                'dark-info-dark': designTokens.colors.dark.info.dark,
                'dark-info-light': designTokens.colors.dark.info.light,
                'dark-info-alertBg': designTokens.colors.dark.info.alertBg,
                // light: success colors
                'light-success-main': designTokens.colors.light.success.main,
                'light-success-dark': designTokens.colors.light.success.dark,
                'light-success-light': designTokens.colors.light.success.light,
                'light-success-alertBg': designTokens.colors.light.success.alertBg,
                // dark: success colors
                'dark-success-main': designTokens.colors.dark.success.main,
                'dark-success-dark': designTokens.colors.dark.success.dark,
                'dark-success-light': designTokens.colors.dark.success.light,
                'dark-success-alertBg': designTokens.colors.dark.success.alertBg,
                // Light: background colors
                'light-background-default': designTokens.colors.light.background.default,
                'light-background-accent100': designTokens.colors.light.background.accent100,
                'light-background-accent200': designTokens.colors.light.background.accent200,
                'light-background-accent300': designTokens.colors.light.background.accent300,
                // Dark: background colors
                'dark-background-default': designTokens.colors.dark.background.default,
                'dark-background-accent100': designTokens.colors.dark.background.accent100,
                'dark-background-accent200': designTokens.colors.dark.background.accent200,
                'dark-background-accent300': designTokens.colors.dark.background.accent300,
                // Light: action colors
                'light-action-active': designTokens.colors.light.action.active,
                'light-action-hover': designTokens.colors.light.action.hover,
                'light-action-selected': designTokens.colors.light.action.selected,
                'light-action-disabledBackground': designTokens.colors.light.action.disabledBackground,
                'light-action-disabled': designTokens.colors.light.action.disabled,
                // Dark: action colors
                'dark-action-active': designTokens.colors.dark.action.active,
                'dark-action-hover': designTokens.colors.dark.action.hover,
                'dark-action-selected': designTokens.colors.dark.action.selected,
                'dark-action-disabledBackground': designTokens.colors.dark.action.disabledBackground,
                'dark-action-disabled': designTokens.colors.dark.action.disabled,
                // light: action background
                'light-actionBackground-enabled': designTokens.colors.light.actionBackground.enabled,
                'light-actionBackground-hovered': designTokens.colors.light.actionBackground.hovered,
                'light-actionBackground-selected': designTokens.colors.light.actionBackground.selected,
                'light-actionBackground-disabled': designTokens.colors.light.actionBackground.disabled,
                // dark: action background
                'dark-actionBackground-enabled': designTokens.colors.dark.actionBackground.enabled,
                'dark-actionBackground-hovered': designTokens.colors.dark.actionBackground.hovered,
                'dark-actionBackground-selected': designTokens.colors.dark.actionBackground.selected,
                'dark-actionBackground-disabled': designTokens.colors.dark.actionBackground.disabled,
                // light: action outlinedBorder
                'light-actionOutlinedBorder-enabled': designTokens.colors.light.actionOutlinedBorder.enabled,
                'light-actionOutlinedBorder-hovered': designTokens.colors.light.actionOutlinedBorder.hovered,
                'light-actionOutlinedBorder-selected': designTokens.colors.light.actionOutlinedBorder.selected,
                'light-actionOutlinedBorder-disabled': designTokens.colors.light.actionOutlinedBorder.disabled,
                // dark: action outlinedBorder
                'dark-actionOutlinedBorder-enabled': designTokens.colors.dark.actionOutlinedBorder.enabled,
                'dark-actionOutlinedBorder-hovered': designTokens.colors.dark.actionOutlinedBorder.hovered,
                'dark-actionOutlinedBorder-selected': designTokens.colors.dark.actionOutlinedBorder.selected,
                'dark-actionOutlinedBorder-disabled': designTokens.colors.dark.actionOutlinedBorder.disabled,
                // misc light colors
                'light-misc-divider': designTokens.colors.light.misc.divider,
                // misc dark colors
                'dark-misc-divider': designTokens.colors.dark.misc.divider,
                'dark-misc-scrollbar-bg': designTokens.colors.dark.background.default,
                'dark-misc-scrollbar-thumb': designTokens.colors.dark.background.accent200,
            },
            spacing: {
                small: designTokens.spacing.small,
                medium: designTokens.spacing.medium,
                large: designTokens.spacing.large,
            },
            fontSize: {
                h1: designTokens.typography.h1.size,
                h2: designTokens.typography.h2.size,
                h3: designTokens.typography.h3.size,
                h4: designTokens.typography.h4.size,
                h5: designTokens.typography.h5.size,
                h6: designTokens.typography.h6.size,
                subtitle1: designTokens.typography.subtitle1.size,
                subtitle2: designTokens.typography.subtitle2.size,
                body1: designTokens.typography.body1.size,
                body2: designTokens.typography.body2.size,
                caption: designTokens.typography.caption.size,
            },
            fontFamily: {
                inter: designTokens.typography.family,
            },
            fontWeight: {
                h1: designTokens.typography.h1.weight,
                h2: designTokens.typography.h2.weight,
                h3: designTokens.typography.h3.weight,
                h4: designTokens.typography.h4.weight,
                h5: designTokens.typography.h5.weight,
                h6: designTokens.typography.h6.weight,
                subtitle1: designTokens.typography.subtitle1.weight,
                subtitle2: designTokens.typography.subtitle2.weight,
                body1: designTokens.typography.body1.weight,
                body2: designTokens.typography.body2.weight,
                caption: designTokens.typography.caption.weight,
            },
            letterSpacing: {
                h1: designTokens.typography.h1.letterSpacing,
                h2: designTokens.typography.h2.letterSpacing,
                h3: designTokens.typography.h3.letterSpacing,
                h4: designTokens.typography.h4.letterSpacing,
                h5: designTokens.typography.h5.letterSpacing,
                h6: designTokens.typography.h6.letterSpacing,
                subtitle1: designTokens.typography.subtitle1.letterSpacing,
                subtitle2: designTokens.typography.subtitle2.letterSpacing,
                body1: designTokens.typography.body1.letterSpacing,
                body2: designTokens.typography.body2.letterSpacing,
                caption: designTokens.typography.caption.letterSpacing,
            },
            lineHeight: {
                h1: designTokens.typography.h1.lineHeight,
                h2: designTokens.typography.h2.lineHeight,
                h3: designTokens.typography.h3.lineHeight,
                h4: designTokens.typography.h4.lineHeight,
                h5: designTokens.typography.h5.lineHeight,
                h6: designTokens.typography.h6.lineHeight,
                subtitle1: designTokens.typography.subtitle1.lineHeight,
                subtitle2: designTokens.typography.subtitle2.lineHeight,
                body1: designTokens.typography.body1.lineHeight,
                body2: designTokens.typography.body2.lineHeight,
                caption: designTokens.typography.caption.lineHeight,
            },
            textAlign: {
                left: designTokens.typography.alignments.left,
                center: designTokens.typography.alignments.center,
                right: designTokens.typography.alignments.right,
                justify: designTokens.typography.alignments.justify,
            },
        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('tailwind-scrollbar'),
    ],
};
export default config;
