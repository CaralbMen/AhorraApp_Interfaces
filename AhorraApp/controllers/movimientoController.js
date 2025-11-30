import Movimiento from "../models/movimiento";
import { obtenerTodos, ejecutar, obtenerPrimero } from '../database/db';

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
    // console.log('obtenerMovimientosPorUsuario se sacaron esta filas:', filas?.length || 0);
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
    // console.log('movimientos obtenidos y maoeados:', movimientos.length);
    return movimientos;
  } catch (error) {
    // console.error('error en obtenerMovimientosPorUsuario:', error);
    return [];
  }
}


export async function agregarMovimiento({ descripcion, monto, fecha, tipo, categoria_id, usuario_id }) {
  try {
    // console.log('datos en agregar movimiento:', { descripcion, monto, fecha, tipo, categoria_id, usuario_id });
    
    if (!descripcion || !monto || !fecha || !tipo || !categoria_id || !usuario_id) {
      throw new Error(`Parámetro faltante. Recibido: descripcion=${descripcion}, monto=${monto}, fecha=${fecha}, tipo=${tipo}, categoria_id=${categoria_id}, usuario_id=${usuario_id}`);
    }
    
    const sql = `INSERT INTO movimientos (descripcion, monto, fecha, tipo, categoria_id, usuario_id) VALUES (?, ?, ?, ?, ?, ?)`;
    // console.log('agreganding MovimientoL:', sql);
    // console.log('agregarMovimiento...valores:', [descripcion, monto, fecha, tipo, categoria_id, usuario_id]);
    
    await ejecutar(sql, [descripcion, monto, fecha, tipo, categoria_id, usuario_id]);
    // console.log('agregarMovimiento etsitoso');
    return true;
  } catch (error) {
    // console.error('error en agregarMovimiento', error.message);
    return false;
  }
}

export async function obtenerSumaPorCategoria(id_usuario) {
  try {
    const sql = `
      SELECT c.id as categoria_id, c.nombre as categoria_nombre,
        IFNULL(SUM(CASE WHEN m.tipo = 'ingreso' THEN m.monto END), 0) as total_ingresos,
        IFNULL(SUM(CASE WHEN m.tipo = 'egreso' OR m.tipo = 'Retiro' THEN m.monto END), 0) as total_egresos
      FROM categorias c
      LEFT JOIN movimientos m ON m.categoria_id = c.id AND m.usuario_id = ?
      WHERE c.id_usuario = ?
      GROUP BY c.id, c.nombre
    `;
    const rows = await obtenerTodos(sql, [id_usuario, id_usuario]);
    return rows || [];
  } catch (error) {
    console.error('obtenerSumaPorCategoria - Error:', error);
    return [];
  }
}
export async function obtenerComparativaMensual(id_usuario, yearMonth) {
  try {
    const sql = `
      SELECT
        IFNULL(SUM(CASE WHEN m.tipo = 'ingreso' THEN m.monto END), 0) as total_ingresos,
        IFNULL(SUM(CASE WHEN m.tipo = 'egreso' OR m.tipo = 'Retiro' THEN m.monto END), 0) as total_egresos
      FROM movimientos m
      WHERE m.usuario_id = ? AND strftime('%Y-%m', m.fecha) = ?
    `;
    const row = await obtenerPrimero(sql, [id_usuario, yearMonth]);
    return row || { total_ingresos: 0, total_egresos: 0 };
  } catch (error) {
    // console.error('obtener comparativa mensual:', error);
    return { total_ingresos: 0, total_egresos: 0 };
  }
}
export async function editarMovimiento(id, { descripcion, monto, fecha, tipo, categoria_id }) {
  try {
    // console.log('datos de editar movimient:', { id, descripcion, monto, fecha, tipo, categoria_id });
    if (!descripcion || !monto || !fecha || !tipo || !categoria_id) {
      throw new Error('Parámetro faltante');
    }
    const sql = `UPDATE movimientos SET descripcion = ?, monto = ?, fecha = ?, tipo = ?, categoria_id = ? WHERE id = ?`;
    await ejecutar(sql, [descripcion, monto, fecha, tipo, categoria_id, id]);
    // console.log('editarMovimiento por fin quedó');
    return true;
  } catch (error) {
    // console.error('error en editar movimiento:', error);
    return false;
  }
}
export async function eliminarMovimiento(id) {
  try {
    const sql = `DELETE FROM movimientos WHERE id = ?`;
    await ejecutar(sql, [id]);
    return true;
  } catch (error) {
    return false;
  }
}