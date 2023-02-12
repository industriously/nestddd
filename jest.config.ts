import type { Config } from 'jest';

const config: Config = {
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(spec|test).ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        compiler: 'ttypescript',
        diagnostics: false,
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@toss/nestjs-aop': '<rootDir>/src/infrastructure/aop',
    '@PRISMA': '<rootDir>/db',
    '@LOGGER/service': '<rootDir>/src/infrastructure/logger/constant.ts',
    '@INTERFACE/(.*)$': '<rootDir>/src/interface/$1',
    '@INFRA/(.*)$': '<rootDir>/src/infrastructure/$1',
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
    '.strategy.ts',
    'constant',
    'constant.ts',
    'src/sdk',
    'src/infrastructure/DB',
    'src/infrastructure/config',
  ],
  watchman: false,
};

export default config;
