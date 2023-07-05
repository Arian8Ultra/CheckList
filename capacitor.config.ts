import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.checklist.app',
  appName: 'check-list',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
