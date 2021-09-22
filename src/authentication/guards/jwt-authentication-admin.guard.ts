import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthenticationAdminGuard extends AuthGuard(
  'jwt-admin',
) {}
