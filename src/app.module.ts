import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApellidosModule } from './apellidos/apellidos.module';

@Module({
  imports: [ApellidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
