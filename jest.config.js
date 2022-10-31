const { jsWithTs: tsjPreset } = require('ts-jest/presets');

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest', 
  testEnvironment: 'node',
  testMatch: ["**/**/*.test.js"],
  transform: {
    ...tsjPreset.transform
  },
  verbose: true,
  forceExit: true,
  // clearMocks: true
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ]
};

module.exports = config;