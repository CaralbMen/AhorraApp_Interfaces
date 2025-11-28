export class Categoria{
    constructor(id, nombre, descripcion, presupuesto, periodo){
        this.id=id;
        this.nombre=nombre;
        this.descripcion=descripcion;
        this.presupuesto=presupuesto;
        this.periodo=periodo;
    }
    static validarNombre(nombre) {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error('Ingresa un nombre para la categoria.');
    }
    if (nombre.length > 30) {
      throw new Error('El nombre debe tener máximo 30 caracteres.');
    }
  }

  static validarDescripcion(descripcion) {
    if (!descripcion || descripcion.trim().length === 0) {
      throw new Error('La descripción es obligatoria.');
    }
    if (descripcion.length > 100) {
      throw new Error('La descripción debe tener máximo 100 caracteres.');
    }
  }

  static validarPresupuesto(presupuesto) {
    if (presupuesto <= 0) {
      throw new Error('Ingresa un presupuesto válido (Mayor a cero).');
    }
  }
}