import { BadRequestException, Injectable, ParseBoolPipe } from '@nestjs/common';

@Injectable()
export class StatusValidationPipe extends ParseBoolPipe {
  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('El status no es valido'),
    });
  }
}
