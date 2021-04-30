import { ConfigFactory, registerAs } from '@nestjs/config';
import * as env from 'env-var';

export type CommonConfigType = {
  port: number;
};

export const common = registerAs<ConfigFactory<CommonConfigType>>(
  'common',
  () => ({
    port: env.get('PORT').default('5000').asPortNumber(),
  }),
);

export const COMMON_CONFIG_KEY = common.KEY;
