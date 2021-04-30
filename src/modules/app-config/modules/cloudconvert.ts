import { ConfigFactory, registerAs } from '@nestjs/config';
import * as env from 'env-var';

export type CloudConvertConfigType = {
  apiKey: string;
};

export const cloudconvert = registerAs<ConfigFactory<CloudConvertConfigType>>(
  'cloudconvert',
  () => ({
    apiKey: env.get('CLOUD_CONVERT_KEY').required().asString(),
  }),
);

export const CLOUD_CONVERT_CONFIG_KEY = cloudconvert.KEY;
