import * as SQLite from 'expo-sqlite';
const db= SQLite.openDatabase('ahorraApp.db');

const databaseService={
    init:()=>{
        db.transaction(tx=>{
            //Para los usuarios
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS usuarios(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    telefono TEXT,
                    password TEXT NOT NULL
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS categorias(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL UNIQUE,
                    descripcion TEXT NOT NULL,
                    presupuesto REAL NOT NULL,
                    periodo TEXT
                )`
            );
            // constructor(id, descripcion, monto, fecha, tipo, categoria){
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS movimientos(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    descripcion TEXT NOT NULL,
                    monto REAL NOT NULL,
                    fecha TEXT NOT NULL,
                    tipo TEXT NOT NULL,
                    categoria_id INTEGER NOT NULL,
                    FOREIGN KEY(categoria_id) REFERENCES categorias(id)
                );`
            );
            
        })
    }
}