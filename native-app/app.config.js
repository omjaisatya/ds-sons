export default {
  expo: {
    name: "DS Sons",
    slug: "DSSons",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#000",
      },
      package: "com.satya.ds",
    },
    web: {
      favicon: "./assets/icon.png",
    },
    extra: {
      eas: {
        projectId: "68a690c0-5507-4274-89e1-bdad23c1c3ef",
      },
      expoPublicApiKey: process.env.EXPO_PUBLIC_APIKEY,
      expoPublicAuthDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
      expoPublicProjectId: process.env.EXPO_PUBLIC_PROJECTID,
      expoPublicStorageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
      expoPublicMessagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
      expoPublicAppId: process.env.EXPO_PUBLIC_APPID,
      expoPublicMeasurementId: process.env.EXPO_PUBLIC_MEASUREMENTID,
    },
  },
};
