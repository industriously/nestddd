import type nestia from '@nestia/sdk';

const NESTIA_CONFIG: nestia.INestiaConfig = {
  input: 'src/**/*.controller.ts',
  output: 'src/sdk',
  json: true,
  primitive: false,
  swagger: {
    output: 'swagger.json',
    security: {
      bearer: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

export default NESTIA_CONFIG;
