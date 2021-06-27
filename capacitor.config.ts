import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medflixofficial.app',
  appName: 'Medflix',
  webDir: 'build',
  plugins: {
    SplashScreen: {
      launchShowDuration: 5,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '953812443127-pf0ntdicmgjirklid8pe8c682cp29rrl.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
