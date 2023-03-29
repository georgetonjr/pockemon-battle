const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  bail: true,
  clearMocks: true,
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/*.test.ts?(x)', '**/*.spec.ts?(x)'],
  cacheDirectory: '<rootDir>/target/jest-cache',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  coveragePathIgnorePatterns: [
    'node_modules',
    '.mock.ts',
    'dist',
  ],
  coverageDirectory: '<rootDir>/target/test-results/',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './target/test-results/',
        outputName: 'tests-results-jest.xml',
      },
    ],
  ],
  transformIgnorePatterns: ['node_modules/'],
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
};
