module.exports = {
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
        importsWhitelist: ['constants.js', 'colors.js'],
        logTimings: true,
        disableExtractoin: process.env.NODE_ENV === 'development',
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: ['TAMAGUI_TARGET'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
};
