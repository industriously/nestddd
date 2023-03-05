import type { Config } from 'jest';

const config: Config = {
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
  testEnvironmentOptions: { NODE_ENV: 'test' },
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
  restoreMocks: true,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@toss/nestjs-aop': '<rootDir>/src/infrastructure/aop',
    '@PRISMA': '<rootDir>/db',
    '@UTIL$': '<rootDir>/src/util',
    '@INTERFACE/(.*)$': '<rootDir>/src/sdk/interface/$1',
    '@INFRA/(.*)$': '<rootDir>/src/infrastructure/$1',
    '@COMMON/(.*)$': '<rootDir>/src/api/common/$1',
    '@ACCOUNT/(.*)$': '<rootDir>/src/api/account/$1',
    '@TOKEN': '<rootDir>/src/api/token',
    '@USER/(.*)$': '<rootDir>/src/api/user/$1',
  },
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'main.ts',
    'application.ts',
    '.module.ts',
    '.config.ts',
    '.strategy.ts',
    'constant',
    'constant.ts',
    '__tests__',
    'src/sdk',
    'src/infrastructure/DB',
    'src/infrastructure/aop',
    'src/infrastructure/config',
  ],
  watchman: false,
};

export default config;
