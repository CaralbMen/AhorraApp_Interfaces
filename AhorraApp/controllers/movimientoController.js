import Movimiento from "../models/movimiento";
import { obtenerTodos, ejecutar } from '../database/db';

// Obtener movimientos por usuario
export async function obtenerMovimientosPorUsuario(id_usuario) {
  try {
    console.log('obtenerMovimientosPorUsuario - id_usuario:', id_usuario);
    
    const filas = await obtenerTodos(
      `SELECT m.*, c.nombre as categoria_nombre 
       FROM movimientos m
       LEFT JOIN categorias c ON m.categoria_id = c.id
       WHERE m.usuario_id=? 
       ORDER BY m.fecha DESC`,
      [id_usuario]
    );

    console.log('obtenerMovimientosPorUsuario - filas obtenidas:', filas?.length || 0);
    
    const movimientos = filas.map(
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
    
    console.log('obtenerMovimientosPorUsuario - movimientos mapeados:', movimientos.length);
    return movimientos;
  } catch (error) {
    console.error('obtenerMovimientosPorUsuario - Error:', error);
    return [];
  }
}

// Agregar nuevo movimiento
export async function agregarMovimiento({ descripcion, monto, fecha, tipo, categoria_id, usuario_id }) {
  try {
    console.log('agregarMovimiento - parámetros:', { descripcion, monto, fecha, tipo, categoria_id, usuario_id });
    
    if (!descripcion || !monto || !fecha || !tipo || !categoria_id || !usuario_id) {
      throw new Error(`Parámetro faltante. Recibido: descripcion=${descripcion}, monto=${monto}, fecha=${fecha}, tipo=${tipo}, categoria_id=${categoria_id}, usuario_id=${usuario_id}`);
    }
    
    const sql = `INSERT INTO movimientos (descripcion, monto, fecha, tipo, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`;
    console.log('agregarMovimiento - SQL:', sql);
    console.log('agregarMovimiento - valores:', [descripcion, monto, fecha, tipo, categoria_id, usuario_id]);
    
    await ejecutar(sql, [descripcion, monto, fecha, tipo, categoria_id, usuario_id]);
    
    console.log('agregarMovimiento - éxito');
    return true;
  } catch (error) {
    console.error('agregarMovimiento - Error completo:', error);
    console.error('agregarMovimiento - Mensaje:', error.message);
    return false;
  }
}