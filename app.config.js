const IS_DEV = process.env.APP_VARIANT === 'development'
export default {
  name: IS_DEV ? 'Smart Timetable (Dev)' : 'Smart Timetable',
  slug: 'SmartTimetable',
  version: '1.0.0',
  orientation: 'default',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: IS_DEV ? 'com.firstdev.dev.SmartTimetable' : 'com.firstdev.SmartTimetable',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  sdkVersion: '44.0.0',
  userInterfaceStyle: 'automatic',
  plugins: ['expo-community-flipper'],
  jsEngine: 'hermes',
}
