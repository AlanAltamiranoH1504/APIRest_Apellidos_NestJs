import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('/create_user')
  create_user(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  find_all_users() {
    return this.usuariosService.findAll();
  }

  @Get('/find_user/:id')
  find_user(@Param('id', IdValidationPipe) id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch('/update_user/:id')
  update_user(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete('/delete_user/:id')
  remove_user(@Param('id', IdValidationPipe) id: string) {
    return this.usuariosService.remove(+id);
  }
}
