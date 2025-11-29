export default class Usuario {
  // constructor({ id_usuario = null, nombre, email, telefono = '', password }) {
  //   this.id_usuario = id_usuario;
  //   this.nombre = nombre;
  //   this.email = email;
  //   this.telefono = telefono;
  //   this.password = password;
  // }
  constructor({email, id_usuario = null, nombre,password , telefono = ''}) {
    this.id_usuario = id_usuario;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
  }
}