import { ejecutar, obtenerPrimero } from '../database/db';
import Usuario from '../models/Usuario';

export async function registrarUsuario({ nombre, correo, telefono, contrasena }) {
  if (!nombre || !correo || !contrasena) throw new Error('Complete los campos obligatorios');
  const existe = await obtenerPrimero('SELECT id FROM usuarios WHERE correo = ? LIMIT 1', [correo.trim().toLowerCase()]);
  if (existe) throw new Error('El correo ya está registrado');

  await ejecutar(
    'INSERT INTO usuarios (nombre, correo, telefono, contrasena) VALUES (?,?,?,?)',
    [nombre.trim(), correo.trim().toLowerCase(), (telefono || '').trim(), contrasena]
  );
  return true;
}

export async function iniciarSesion(correo, contrasena) {
  if (!correo || !contrasena) throw new Error('Complete los campos');
  const fila = await obtenerPrimero(
    'SELECT * FROM usuarios WHERE email = ? AND password = ? LIMIT 1',
    [correo.trim().toLowerCase(), contrasena]
  );
  if (!fila) throw new Error('Credenciales inválidas');
  return new Usuario(fila);
}

export async function existeCorreo(correo) {
  const fila = await obtenerPrimero(
    'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
    [correo.trim().toLowerCase()]
  );
  return !!fila;
}