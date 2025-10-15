import { Module } from '@nestjs/common';
import { ApellidosService } from './apellidos.service';
import { ApellidosController } from './apellidos.controller';

@Module({
  controllers: [ApellidosController],
  providers: [ApellidosService],
})
export class ApellidosModule {}
