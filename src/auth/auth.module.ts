// nest
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

// config
import { config } from 'src/config';

// module
import { UsersModule } from 'src/user/user.module';

// controller
import { AuthController } from './auth.controller';

// service
import { AuthService } from './auth.service';

// schema
import { User } from 'src/user/user.schema';

// guard
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.SECRET,
      signOptions: { expiresIn: config.EXPIRES_IN },
    }),
    UsersModule,
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
