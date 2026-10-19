var designTokens = require('./designTokens');
var config = {
    presets: [require('./dist/tailwind-preset.js')],
    darkMode: 'class',
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-misc-scrollbar-bg': designTokens.colors.dark.background.default,
                'dark-misc-scrollbar-thumb': designTokens.colors.dark.background.accent200,
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};
export default config;
