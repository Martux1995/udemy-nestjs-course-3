import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().rawHeaders;
  },
);
