import { ejecutar, obtenerPrimero } from '../database/db';
import Usuario from '../models/Usuario';

// Genera un token de 6 dígitos
function generarToken6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function validarEmail(email) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test((email || '').trim());
}
function validarPassword(pw) {
  return typeof pw === 'string' && pw.trim().length >= 6;
}

// Crea y guarda un token para el correo dado (no se envía por email)
export async function solicitarTokenRecuperacion(correo) {
  const c = (correo || '').trim().toLowerCase();
  if (!c) throw new Error('Ingrese el correo');
  if (!validarEmail(c)) throw new Error('Correo inválido');

  const existe = await obtenerPrimero(
    'SELECT id_usuario FROM usuarios WHERE email = ? LIMIT 1',
    [c]
  );
  if (!existe) throw new Error('Correo no registrado');

  const token = generarToken6();
  const expira = Date.now() + 15 * 60 * 1000; // 15 min

  // Invalida tokens previos sin usar y guarda el nuevo
  await ejecutar('UPDATE tokens_reset SET usado = 1 WHERE email = ? AND usado = 0', [c]);
  await ejecutar(
    'INSERT INTO tokens_reset (email, token, expira, usado) VALUES (?,?,?,0)',
    [c, token, expira]
  );

  // Devuelve el token para mostrarlo en la pantalla
  return token;
}

// Cambia la contraseña validando el token
export async function cambiarPasswordConToken(correo, token, nuevaPassword) {
  const c = (correo || '').trim().toLowerCase();
  const t = (token || '').trim();
  if (!c || !t || !nuevaPassword) throw new Error('Complete todos los campos');
  if (!validarEmail(c)) throw new Error('Correo inválido');
  if (!validarPassword(nuevaPassword)) throw new Error('La contraseña debe tener mínimo 6 caracteres');

  const fila = await obtenerPrimero(
    'SELECT * FROM tokens_reset WHERE email = ? AND token = ? AND usado = 0 ORDER BY id DESC LIMIT 1',
    [c, t]
  );
  if (!fila) throw new Error('Token inválido');
  if (Number(fila.expira) < Date.now()) throw new Error('El token ha expirado');

  await ejecutar('UPDATE usuarios SET password = ? WHERE email = ?', [nuevaPassword, c]);
  await ejecutar('UPDATE tokens_reset SET usado = 1 WHERE id = ?', [fila.id]);

  return true;
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

export async function actualizarUsuario(id_usuario, { nombre, correo, telefono, contrasena }) {
  if (!id_usuario) throw new Error('ID de usuario requerido');
  const correoNorm = (correo || '').trim().toLowerCase();
  if (correo && !validarEmail(correoNorm)) throw new Error('Correo inválido');
  if (contrasena && !validarPassword(contrasena)) throw new Error('La contraseña debe tener mínimo 6 caracteres');

  const sql = `UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, password = ? WHERE id_usuario = ?`;
  await ejecutar(sql, [nombre, correoNorm, telefono || '', contrasena || '', id_usuario]);
  const fila = await obtenerPrimero('SELECT * FROM usuarios WHERE id_usuario = ? LIMIT 1', [id_usuario]);
  return new Usuario(fila);
}