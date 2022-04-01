module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@utils': './src/utils',
            '@components': './src/components',
            '@constants': './constants',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@hooks': './src/hooks',
            '@store': './src/store',
            '@reducers': './src/reducers',
            '@models': './src/models',
            '@atoms': './src/atoms',
          },
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  }
}
