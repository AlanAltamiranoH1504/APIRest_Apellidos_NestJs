import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExistsUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    // Ejemplo básico de validación
    if (!token || token !== 'Bearer 12345') {
      throw new HttpException(
        'Acción no permitida por falta de autenticacion',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // Puedes guardar datos en el request (ejemplo: usuario)
    req['user'] = { id: 1, name: 'Usuario Demo' };

    next();
  }
}
