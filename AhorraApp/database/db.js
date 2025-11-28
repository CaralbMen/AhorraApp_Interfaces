import { openDatabaseAsync } from 'expo-sqlite';

let db;

export async function iniciarBaseDeDatos() {
  if (!db) db = await openDatabaseAsync('ahorra.db');
  await db.execAsync(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    telefono TEXT,
    contrasena TEXT NOT NULL
  );`);
}

function asegurarBD() {
  if (!db) throw new Error('BD no inicializada');
}

export function ejecutar(sql, params = []) {
  asegurarBD();
  return db.runAsync(sql, params);
}

export function obtenerPrimero(sql, params = []) {
  asegurarBD();
  return db.getFirstAsync(sql, params);
}

export function obtenerTodos(sql, params = []) {
  asegurarBD();
  return db.getAllAsync(sql, params);
}