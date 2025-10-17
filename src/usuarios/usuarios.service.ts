import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private usuarios: Usuario[];

  constructor() {
    this.usuarios = [];
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    const data_in_use = this.usuarios.filter((usuario) => {
      return (
        usuario.id === createUsuarioDto.id ||
        usuario.email === createUsuarioDto.email
      );
    });

    if (data_in_use.length > 0) {
      throw new HttpException(
        'Ya xiste un usuario registrado con esos datos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user_to_save = new Usuario(
      createUsuarioDto.id,
      createUsuarioDto.nombre,
      createUsuarioDto.apellidos,
      createUsuarioDto.email,
      createUsuarioDto.password,
      createUsuarioDto.fecha_nacimiento,
    );
    this.usuarios.push(user_to_save);
    return {
      status: true,
      message: 'Usuario agregado correctamente',
      usuarios: this.usuarios,
    };
  }

  findAll() {
    const usuarios = this.usuarios;

    if (usuarios.length === 0) {
      throw new HttpException(
        'No existen usuarios registrados',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      usuarios: this.usuarios,
    };
  }

  findOne(id: number) {
    const usert_to_show = this.usuarios.filter((user) => {
      return user.id === id;
    });
    if (usert_to_show.length === 0) {
      throw new HttpException('Usuario no registrado', HttpStatus.NOT_FOUND);
    }
    return {
      status: true,
      user: usert_to_show[0],
    };
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const user_to_update_index = this.usuarios.findIndex((user) => {
      return user.id === id;
    });
    if (user_to_update_index < 0) {
      throw new HttpException('Usuario no encontrado.', HttpStatus.NOT_FOUND);
    }
    this.usuarios[user_to_update_index] = {
      ...this.usuarios[user_to_update_index],
      ...updateUsuarioDto,
      id,
    };
    return {
      status: true,
      message: 'Usuario actualizado correctamente',
      user: this.usuarios,
    };
  }

  remove(id: number) {
    this.usuarios = this.usuarios.filter((user) => {
      return user.id !== id;
    });
    return {
      status: true,
      message: 'Usuario eliminado correctamente',
      usuarios: this.usuarios,
    };
  }
}
