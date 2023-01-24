module.exports = {
  roots: ['<rootDir>'],
  coverageDirectory: '<rootDir>/coverage',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      { diagnostics: false, tsconfig: '<rootDir>/tsconfig.json' },
    ],
  },
  testMatch: ['**/*.(t|j)s'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@INTERFACE/(.*)$': '<rootDir>/src/interface/$1',
    '@PRISMA': '<rootDir>/db',
    '@COMMON/(.*)$': '<rootDir>/src/api/common/$1',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [],
};
