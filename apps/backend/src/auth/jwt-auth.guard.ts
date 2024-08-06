import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class JwtAdminOnlyAuthGuard extends AuthGuard("jwt") {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
  handleRequest(err, user, info) {
    console.log("JwtAdminOnlyAuthGuard",user)
    if (err || !user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied');
    }
    return user;
  }
}
