import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>'],
  coverageDirectory: '<rootDir>/coverage',
  testRegex: '.spec.ts$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      { diagnostics: false, tsconfig: '<rootDir>/tsconfig.json' },
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@PRISMA': '<rootDir>/db',
    '@PRISMA/service': '<rootDir>/src/infrastructure/DB/prisma.service.ts',
    '@LOGGER/service': '<rootDir>/src/infrastructure/logger/constant.ts',
    '@INTERFACE/(.*)$': '<rootDir>/src/interface/$1',
    '@COMMON/(.*)$': '<rootDir>/src/api/common/$1',
    '@ACCOUNT/(.*)$': '<rootDir>/src/api/account/$1',
    '@TOKEN/(.*)$': '<rootDir>/src/api/token/$1',
  },
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'main.ts',
    '.module.ts',
    '.config.ts',
    'constant',
    'constant.ts',
    'src/sdk',
    'src/infrastructure/DB',
    'src/infrastructure/config',
  ],
};

export default config;
