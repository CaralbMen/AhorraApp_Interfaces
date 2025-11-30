import { ejecutar, obtenerTodos, obtenerPrimero } from '../database/db';

export const obtenerIdUsuarioDefault = async () => {
    try {
        const sql = `SELECT id_usuario FROM usuarios LIMIT 1`;
        const result = await obtenerPrimero(sql);
        return result ? result.id_usuario : null;
    } catch (error) {
        console.error("Error obteniendo usuario default:", error);
        return null;
    }
};

export const obtenerCategorias = async (idUsuario) => {
    try {
        const sql = `SELECT * FROM categorias WHERE id_usuario = ?`;
        const result = await obtenerTodos(sql, [idUsuario]);
        return result;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return [];
    }
};

export const obtenerCategoriaPorId = async (id) => {
    try {
        const sql = `SELECT * FROM categorias WHERE id = ?`;
        const result = await obtenerPrimero(sql, [id]);
        return result;
    } catch (error) {
        console.error("Error al obtener categoría:", error);
        return null;
    }
};

export const agregarCategoria = async (nombre, descripcion, presupuesto, periodo, idUsuario) => {
    try {
        const sql = `INSERT INTO categorias (nombre, descripcion, presupuesto, periodo, id_usuario) VALUES (?, ?, ?, ?, ?)`;
        await ejecutar(sql, [nombre, descripcion, presupuesto, periodo, idUsuario]);
        return true;
    } catch (error) {
        console.error("Error al agregar categoría:", error);
        return false;
    }
};

export const editarCategoria = async (id, nombre, descripcion, presupuesto, periodo) => {
    try {
        const sql = `UPDATE categorias SET nombre = ?, descripcion = ?, presupuesto = ?, periodo = ? WHERE id = ?`;
        await ejecutar(sql, [nombre, descripcion, presupuesto, periodo, id]);
        return true;
    } catch (error) {
        console.error("Error al editar categoría:", error);
        return false;
    }
};

export const eliminarCategoria = async (id) => {
    try {
        const sql = `DELETE FROM categorias WHERE id = ?`;
        await ejecutar(sql, [id]);
        return true;
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        return false;
    }
};

export const obtenerUltimosMovimientos = async (idUsuario) => {
    try {
        const sql = `
            SELECT m.id, m.descripcion, m.monto, m.fecha, m.tipo, c.nombre as categoria
            FROM movimientos m
            INNER JOIN categorias c ON m.categoria_id = c.id
            WHERE c.id_usuario = ?
            ORDER BY m.fecha DESC
            LIMIT 5
        `;
        const result = await obtenerTodos(sql, [idUsuario]);
        return result;
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        return [];
    }
};

export const obtenerBalanceTotal = async (idUsuario) => {
    try {
        const sqlIngreso = `
            SELECT SUM(m.monto) as total
            FROM movimientos m
            INNER JOIN categorias c ON m.categoria_id = c.id
            WHERE c.id_usuario = ? AND m.tipo = 'ingreso'
        `;
        const resIngreso = await obtenerPrimero(sqlIngreso, [idUsuario]);
        const totalIngreso = resIngreso?.total || 0;
        
        const sqlEgreso = `
            SELECT SUM(m.monto) as total
            FROM movimientos m
            INNER JOIN categorias c ON m.categoria_id = c.id
            WHERE c.id_usuario = ? AND (m.tipo = 'egreso' OR m.tipo = 'Retiro')
        `;
        const resEgreso = await obtenerPrimero(sqlEgreso, [idUsuario]);
        const totalEgreso = resEgreso?.total || 0;

        return totalIngreso - totalEgreso;
    } catch (error) {
        console.error("Error al calcular balance:", error);
        return 0;
    }
};