import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApellidoDto } from './dto/create-apellido.dto';
import { UpdateApellidoDto } from './dto/update-apellido.dto';

@Injectable()
export class ApellidosService {
  private apellidos: string[];

  constructor() {
    this.apellidos = [];
  }

  create_apellido(createApellidoDto: CreateApellidoDto) {
    const exists_apellidos = this.apellidos.find((apellido) => {
      return apellido === createApellidoDto.apellidos;
    });

    if (exists_apellidos && exists_apellidos.length > 0) {
      throw new HttpException(
        'El apellido ya se encuentra registrado',
        HttpStatus.CONFLICT,
      );
    }

    this.apellidos.push(createApellidoDto.apellidos);
    return {
      apellidos: this.apellidos,
    };
  }

  types_apellidos() {
    if (this.apellidos.length === 0) {
      throw new HttpException(
        'No se encuentran apellidos registrados',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      apellidos: this.apellidos,
    };
  }

  find_apellido(apellido: string) {
    if (!apellido) {
      throw new HttpException(
        'El apellido a buscar por parametro es obligatorio',
        HttpStatus.CONFLICT,
      );
    }
    const apellido_to_found = this.apellidos.find((ape) => {
      return ape === apellido;
    });
    if (!apellido_to_found) {
      throw new HttpException('Apellido no encontrado', HttpStatus.NOT_FOUND);
    }
    return {
      apellido: apellido_to_found,
    };
  }

  update_apellido(updateApellidoDto: UpdateApellidoDto) {
    const apellido_to_update = this.find_apellido(
      updateApellidoDto.old_apellidos,
    );
    const index_old_apellido = this.apellidos.findIndex((ape) => {
      return ape === apellido_to_update.apellido;
    });
    this.apellidos = this.apellidos.map((ape, index) => {
      return index === index_old_apellido
        ? updateApellidoDto.new_apellidos
        : ape;
    });
    return {
      apellidos: this.apellidos,
      message: 'Apellido actualizado',
    };
  }

  delete_apellido(apellido: string) {
    const apellido_to_delete = this.find_apellido(apellido);
    const new_apellidos = this.apellidos.filter((ape) => {
      return ape !== apellido_to_delete.apellido;
    });
    this.apellidos = new_apellidos;
    return {
      message: 'Apellido eliminado',
      apellidos: this.apellidos,
    };
  }

  delete_apellidos() {
    this.apellidos = [];
    return {
      apelllidos: this.apellidos,
    };
  }
}
