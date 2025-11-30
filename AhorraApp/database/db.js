import * as SQLite from 'expo-sqlite';
class DatabaseService{
    constructor(){
        this.db=null;
    }
    async initialize(){
        this.db= await SQLite.openDatabaseAsync('AhorraMas.db');
        await this.db.execAsync('PRAGMA foreign_keys= ON');
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS usuarios(
                id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                telefono TEXT,
                password TEXT NOT NULL
            );
        `);
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS categorias(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                descripcion TEXT NOT NULL,
                presupuesto REAL NOT NULL,
                periodo TEXT,
                id_usuario INTEGER NOT NULL,
                FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario)
            );
        `);
        await this.db.execAsync(`
            CREATE TABLE IF NOT EXISTS movimientos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descripcion TEXT NOT NULL,
                monto REAL NOT NULL,
                fecha TEXT NOT NULL,
                tipo TEXT NOT NULL,
                categoria_id INTEGER NOT NULL,
                usuario_id INTEGER NOT NULL,
                FOREIGN KEY(categoria_id) REFERENCES categorias(id),
                FOREIGN KEY(usuario_id) REFERENCES usuarios(id_usuario)
            );
        `);
    };
    async seed(){
        // El seeder está vacío ya que los usuarios se crean desde la app
        console.log('Base de datos inicializada. Los usuarios se crean desde la app.');
    }
   
}
export default DatabaseService;
// const db = SQLite.openDatabaseAsync('ahorraApp.db');
// import AsyncStorage from '@react-native-async-storage/async-storage';
// export const getDB=()=>db;
// const databaseService={
//     init:()=>{
//         db.transaction(tx=>{
//             //Para los usuarios
//             tx.executeSql(
//                 `CREATE TABLE IF NOT EXISTS usuarios(
//                     id INTEGER PRIMARY KEY AUTOINCREMENT,
//                     nombre TEXT NOT NULL,
//                     email TEXT UNIQUE NOT NULL,
//                     telefono TEXT,
//                     password TEXT NOT NULL
//                 );`
//             );
//             tx.executeSql(
//                 `CREATE TABLE IF NOT EXISTS categorias(
//                     id INTEGER PRIMARY KEY AUTOINCREMENT,
//                     nombre TEXT NOT NULL UNIQUE,
//                     descripcion TEXT NOT NULL,
//                     presupuesto REAL NOT NULL,
//                     periodo TEXT
//                 )`
//             );
//             // constructor(id, descripcion, monto, fecha, tipo, categoria){
//             tx.executeSql(
//                 `CREATE TABLE IF NOT EXISTS movimientos(
//                     id INTEGER PRIMARY KEY AUTOINCREMENT,
//                     descripcion TEXT NOT NULL,
//                     monto REAL NOT NULL,
//                     fecha TEXT NOT NULL,
//                     tipo TEXT NOT NULL,
//                     categoria_id INTEGER NOT NULL,
//                     FOREIGN KEY(categoria_id) REFERENCES categorias(id)
//                 );`
//             );
            
//         })
//     },
//     seed:async()=>{
//         const seeder= await AsyncStorage.getItem('seeder');
//         if(seeder){
//             console.log('La base de datos ya cuenta con datos');
//             return;
//         }

//         //Datos para tener en la BD y hacer pruebas
//         db.transaction(tx=>{
//             tx.executeSql(
//                 `INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?,?,?,?)`,
//                 ['Carlos Mendoza', 'Carlos@gmail.com', '1234567890', '@Caralbmen_0611']
//             );
//             tx.executeSql(
//                 `INSERT INTO categorias (nombre, descripcion, presupuesto, periodo)
//                 VALUES (?, ?, ?, ?)`,
//                 ['Alimentación', 'Gastos de comida y supermercado', 3000, 'Mensual']
//             );
//             tx.executeSql(
//                 `INSERT INTO categorias (nombre, descripcion, presupuesto, periodo)
//                 VALUES (?, ?, ?, ?)`,
//                 ['Transporte', 'Gasolina y transporte público', 1500, 'Mensual']
//             );
//             tx.executeSql(
//                 `INSERT INTO movimientos (descripcion, monto, fecha, tipo, categoria_id)
//                 VALUES (?, ?, ?, ?, ?)`,
//                 ['Compra en supermercado', 500, '2025-11-28', 'Retiro', 1]
//             );

//             tx.executeSql(
//                 `INSERT INTO movimientos (descripcion, monto, fecha, tipo, categoria_id)
//                 VALUES (?, ?, ?, ?, ?)`,
//                 ['Pago de gasolina', 800, '2025-11-27', 'Retiro', 2]
//             );
 
//         });
//         await AsyncStorage.setItem('seeder', 'true');
//         console.log('Seeder Ejecutado');
//     }
    
// };
export const databaseService = new DatabaseService();

/**
 * Asegura inicialización única.
 */
export async function initDatabaseOnce() {
  if (!databaseService.db) {
    await databaseService.initialize();
    await databaseService.seed();
  }
}

/**
 * Ejecutar sentencia (INSERT / UPDATE / DELETE / SELECT).
 */
export async function ejecutar(sql, params = []) {
  await initDatabaseOnce();
  return databaseService.db.runAsync(sql, params);
}

/**
 * Obtener primera fila.
 */
export async function obtenerPrimero(sql, params = []) {
  await initDatabaseOnce();
  return databaseService.db.getFirstAsync(sql, params);
}

/**
 * Obtener todas las filas.
 */
export async function obtenerTodos(sql, params = []) {
  await initDatabaseOnce();
  const rows = await databaseService.db.getAllAsync(sql, params);
  return rows || [];
}