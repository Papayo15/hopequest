module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@screens': './src/screens',
            '@game': './src/game',
            '@data': './src/data',
            '@i18n': './src/i18n',
            '@navigation': './src/navigation',
            '@store': './src/store',
            '@services': './src/services',
            '@types': './src/types',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@assets': './assets'
          }
        }
      ]
    ]
  };
};
