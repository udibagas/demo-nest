import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUser() {
    return this.prisma.user.findMany();
  }

  async createUser(data) {
    const user = await this.prisma.user.create({ data });
    return user;
  }

  async getUserById(id) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
