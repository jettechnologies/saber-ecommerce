import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thegearmates.app',
  appName: 'thegearmates',
  webDir: 'dist',
  "server": {
    "url": "http://192.168.43.46:5173/",
    // "url": "http://localhost:5173/",
    "cleartext": true
  },
};

export default config;