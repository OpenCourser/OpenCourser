import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const RequiresAuthz = UseGuards(AuthGuard('jwt'));
