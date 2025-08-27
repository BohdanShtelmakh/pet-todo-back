import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'src/types/request_user';
import { User as UserEntity } from 'src/user/entities/user.entity';

export const Auth = createParamDecorator(
  (ctx: ExecutionContext): UserEntity | undefined => {
    const request: Request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
