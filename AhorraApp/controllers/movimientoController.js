import Movimiento from "../models/movimiento";
import DatabaseService from '../database/db';
// export class MovimientoController{
//     async obtenerMovimientosPorUsuario(id_usuario){
//         const filas= await DatabaseService.obtenerTodos(
//             `SELECT m.*, c.nombre as categoria_nombre FROM movimientos m 
//              LEFT JOIN categorias c ON m.categoria_id = c.id 
//              WHERE m.usuario_id=? ORDER BY m.fecha DESC`,
//             [id_usuario]
//         );
//         return filas.map(fila=>new Movimiento(fila.id, fila.descripcion, fila.monto, fila.fecha, fila.tipo, fila.categoria_id, fila.categoria_nombre));
//     }
// }
export class MovimientoController {
  async obtenerMovimientosPorUsuario(id_usuario) {
    const filas = await DatabaseService.obtenerTodos(
      `SELECT m.*, c.nombre as categoria_nombre 
       FROM movimientos m
       LEFT JOIN categorias c ON m.categoria_id = c.id
       WHERE m.usuario_id=? 
       ORDER BY m.fecha DESC`,
      [id_usuario]
    );

    return filas.map(
      fila =>
        new Movimiento(
          fila.id,
          fila.descripcion,
          fila.monto,
          fila.fecha,
          fila.tipo,
          fila.categoria_id,
          fila.categoria_nombre,
          fila.usuario_id
        )
    );
  }
}