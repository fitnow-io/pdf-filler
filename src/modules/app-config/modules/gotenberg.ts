import { ConfigFactory, registerAs } from '@nestjs/config';
import * as env from 'env-var';

export type GotenbergConfigType = {
  baseUrl: string;
};

export const gotenberg = registerAs<ConfigFactory<GotenbergConfigType>>(
  'gotenberg',
  () => ({
    baseUrl: env
      .get('GOTENBERG_BASE_URL')
      .default('http://gotenberg:3000')
      .asUrlString(),
  }),
);

export const GOTENBERG_CONFIG_KEY = gotenberg.KEY;
