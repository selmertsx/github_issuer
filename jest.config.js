// https://facebook.github.io/jest/docs/en/configuration.html

module.exports = {
  verbose: true,
  rootDir: "./",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  modulePathIgnorePatterns: [
    "<rootDir>/build/"
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "json"
  ]
};
