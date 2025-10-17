import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApellidosModule } from './apellidos/apellidos.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ApellidosModule, UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
