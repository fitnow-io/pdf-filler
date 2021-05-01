import { Global, Module } from '@nestjs/common';
import { BearerStrategy } from 'src/strategies';

@Global()
@Module({
  providers: [BearerStrategy],
})
export class AuthModule {}
