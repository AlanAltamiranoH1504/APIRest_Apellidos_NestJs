# NestJS Concepts Repository

Este repositorio tiene como objetivo **documentar, explorar y practicar los conceptos fundamentales de NestJS**, incluyendo controladores, servicios, módulos, pipes, middleware, interceptores, guards y otras herramientas esenciales del framework.

---

## 📝 Contenido

* **Introducción a NestJS**
* **Controladores (`Controllers`)**
* **Servicios (`Providers/Services`)**
* **Módulos (`Modules`)**
* **DTOs y Validaciones**
* **Pipes**
* **Middleware**
* **Guards**
* **Interceptors**
* **Excepciones**

---

## ⚡ Introducción a NestJS

NestJS es un **framework progresivo de Node.js** para construir aplicaciones del lado del servidor, basado en **TypeScript**.
Se centra en la arquitectura **modular** y se inspira en conceptos de **Angular**, ofreciendo:

* Inyección de dependencias.
* Modularidad clara.
* Decoradores que definen rutas y comportamientos.
* Integración con librerías externas (TypeORM, Mongoose, Passport, etc.)

---

## 🏗️ Arquitectura básica

* **Modules (`@Module`)**: Agrupan controladores y proveedores relacionados.
* **Controllers (`@Controller`)**: Manejan las rutas y peticiones HTTP.
* **Providers / Services (`@Injectable`)**: Lógica de negocio y servicios reutilizables.
* **DTOs (`Data Transfer Objects`)**: Definen la estructura de datos para peticiones y respuestas.
* **Middleware**: Funciones ejecutadas antes de los controladores (logging, autenticación, etc.)
* **Pipes**: Validan y transforman datos entrantes.
* **Guards**: Controlan la autorización y acceso a rutas.
* **Interceptors**: Manipulan respuestas, manejo de errores o logging.

---

## ⚙️ Ejemplos básicos

### Controlador

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  sayHello() {
    return { message: 'Hola desde NestJS' };
  }
}
```

### Servicio

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getMessage(): string {
    return 'Hola desde el servicio!';
  }
}
```

### DTO y validación

```ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
```

### Pipe personalizado

```ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Valor no es un número');
    }
    return val;
  }
}
```

---

## 🔧 Comandos útiles

```bash
# Instalar dependencias
npm install

# Ejecutar la app en desarrollo
npm run start:dev

# Compilar TypeScript
npm run build

# Ejecutar pruebas
npm run test
```