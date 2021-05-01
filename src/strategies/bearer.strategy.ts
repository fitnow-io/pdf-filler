import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import {
  AuthConfigType,
  AUTH_CONFIG_KEY,
} from 'src/modules/app-config/modules';
import { AppLogger } from 'src/modules/logger/app-logger.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject(AUTH_CONFIG_KEY) private readonly conf: AuthConfigType,
    private readonly logger: AppLogger,
  ) {
    super();
  }

  async validate(token: string) {
    if (token === this.conf.apiKey) {
      return true;
    }
  }
}
