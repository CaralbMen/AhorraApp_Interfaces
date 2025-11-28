export default class Usuario {
  constructor({ id = null, nombre, correo, telefono = '', contrasena }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.contrasena = contrasena;
  }
}