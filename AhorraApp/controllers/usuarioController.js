import { ejecutar, obtenerPrimero } from '../database/db';
import Usuario from '../models/Usuario';

function validarEmail(email) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test((email || '').trim());
}
function validarPassword(pw) {
  return typeof pw === 'string' && pw.trim().length >= 6;
}

export async function existeCorreo(correo) {
  const fila = await obtenerPrimero(
    'SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1',
    [(correo || '').trim().toLowerCase()]
  );
  return !!fila;
}

export async function registrarUsuario({ nombre, correo, telefono, contrasena }) {
  if (!nombre || !correo || !contrasena) throw new Error('Complete los campos obligatorios');
  const correoNorm = correo.trim().toLowerCase();
  if (!validarEmail(correoNorm)) throw new Error('Correo inválido');
  if (!validarPassword(contrasena)) throw new Error('La contraseña debe tener mínimo 6 caracteres');
  if (await existeCorreo(correoNorm)) throw new Error('El correo ya está registrado');

  await ejecutar(
    'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?,?,?,?)',
    [nombre.trim(), correoNorm, (telefono || '').trim(), contrasena]
  );
  return true;
}

export async function iniciarSesion(correo, contrasena) {
  if (!correo || !contrasena) throw new Error('Complete los campos');
  const correoNorm = correo.trim().toLowerCase();
  if (!validarEmail(correoNorm)) throw new Error('Correo inválido');

  const fila = await obtenerPrimero(
    'SELECT * FROM usuarios WHERE email = ? AND password = ? LIMIT 1',
    [correoNorm, contrasena]
  );
  if (!fila) throw new Error('Credenciales inválidas');

  return new Usuario(fila);
}