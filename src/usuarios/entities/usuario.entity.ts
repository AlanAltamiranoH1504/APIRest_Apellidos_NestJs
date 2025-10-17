export class Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fecha_nacimiento: Date;

  constructor(
    id: number,
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    fecha_nacimiento: Date,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.email = email;
    this.password = password;
    this.fecha_nacimiento = new Date(fecha_nacimiento);
  }
}
