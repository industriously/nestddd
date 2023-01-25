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
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@PRISMA': '<rootDir>/db',
    '@PRISMA/service': '<rootDir>/src/infrastructure/DB/prisma.service.ts',
    '@INTERFACE/(.*)$': '<rootDir>/src/interface/$1',
    '@COMMON/(.*)$': '<rootDir>/src/api/common/$1',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [],
};
