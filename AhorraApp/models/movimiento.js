export default class Movimiento{
    constructor(id, descripcion, monto, fecha, tipo, categoria_id, categoria_nombre){
        this.id=id;
        this.descripcion=descripcion;
        this.monto=monto;
        this.fecha= fecha;
        this.tipo=tipo;
        this.categoria_id=categoria_id;
        this.categoria_nombre=categoria_nombre;
        // this.usuario_id=usuario_id;
    }
    static validarDescripcion(descripcion){
        if(descripcion.trim().length===0){
            throw new Error('Ingresar una descripción');
        }
        if(descripcion.length>50){
            throw new Error('La descripción es de máximo 50 caracteres.');
        }
    }
    static validarMonto(monto, disponible, tipo){
        if(monto<=0){
            throw new Error('Ingresa una cantidad válida. (Mayor a cero)');
        }
        if(tipo==='Retiro' && monto>disponible){
            throw new Error('Saldo insuficiente para hacer el retiro.');
        }
    }
}