import Movimiento from "../models/movimiento";
import { obtenerTodos } from '../database/db';
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
    const filas = await obtenerTodos(
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

// Agregar nuevo movimiento
export async function agregarMovimiento({ descripcion, monto, fecha, tipo, categoria_id, usuario_id }) {
  try {
    const sql = `INSERT INTO movimientos (descripcion, monto, fecha, tipo, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`;
    // Intentar usar las utilidades exportadas por la DB (ejecutar/obtenerTodos)
    try {
      const dbModule = await import('../database/db');
      if (typeof dbModule.ejecutar === 'function') {
        await dbModule.ejecutar(sql, [descripcion, monto, fecha, tipo, categoria_id, usuario_id]);
      } else if (dbModule.databaseService && dbModule.databaseService.db && typeof dbModule.databaseService.db.runAsync === 'function') {
        await dbModule.databaseService.db.runAsync(sql, [descripcion, monto, fecha, tipo, categoria_id, usuario_id]);
      }
    } catch (inner) {
      console.error('No se pudo usar la API de DB al insertar movimiento:', inner);
      throw inner;
    }
    return true;
  } catch (error) {
    console.error('Error al agregar movimiento:', error);
    return false;
  }
}