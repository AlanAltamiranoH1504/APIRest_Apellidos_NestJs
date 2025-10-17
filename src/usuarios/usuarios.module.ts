import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { ExistsUserMiddleware } from '../middlewares/exists_user.middleware';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExistsUserMiddleware).forRoutes(UsuariosController);
  }
}
