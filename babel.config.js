module.exports = {
  presets: ['module:metro-react-native-babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@contracts': './src/contracts',
          '@modules': './src/modules',
          '@components': './src/components',
          '@persistence': './src/persistence',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@data': './src/data',
          '@src': './src',
        },
      },
    ],
    ['@babel/plugin-transform-private-methods', {loose: true}],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true,
      },
    ],
  ],
};
