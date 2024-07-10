import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AUTH GUARD');
    try {
      const request = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization.split(' ');
      const user = await this.prisma.user.findUnique({ where: { id: token } });
      if (!user) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
