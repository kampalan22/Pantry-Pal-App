import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.pantrypal.app',
  appName: 'PantryPal',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
