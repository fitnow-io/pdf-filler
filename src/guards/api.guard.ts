import { AuthGuard } from '@nestjs/passport';

export class ApiBearerGuard extends AuthGuard('bearer') {}
