module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "transform-decorators-legacy",
    [
      "module-resolver",
      {
        alias: {
          src: "./src",
          "@assets": "./assets",
        },
      },
    ],
  ],
};
