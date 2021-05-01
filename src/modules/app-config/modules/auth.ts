import { ConfigFactory, registerAs } from '@nestjs/config';
import * as env from 'env-var';

export type AuthConfigType = {
  apiKey: string;
};

export const auth = registerAs<ConfigFactory<AuthConfigType>>('auth', () => ({
  apiKey: env.get('API_KEY').required().asString(),
}));

export const AUTH_CONFIG_KEY = auth.KEY;
