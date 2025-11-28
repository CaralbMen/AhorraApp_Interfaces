// Configura el modo: 'tolerante' | 'semiestricto' | 'estricto'
const MODO_VERIFICACION = 'semiestricto';

// Lista de dominios desechables
const dominiosDesechables = [
  'mailinator.com','trashmail.com','10minutemail.com','tempmail.com','guerrillamail.com',
  'yopmail.com','fakeinbox.com','getnada.com','inboxbear.com'
];

// Formato básico
export function validarFormatoCorreo(correo) {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(correo);
}

// Dominio/TLD básico
export function validarDominioBasico(correo) {
  const partes = correo.split('@');
  if (partes.length !== 2) return false;
  const dominio = partes[1].toLowerCase();
  if (!dominio.includes('.') || dominio.startsWith('-') || dominio.endsWith('-')) return false;
  const tld = dominio.split('.').pop();
  return tld.length >= 2;
}

// Verificación remota (relajada)
async function llamarAPI(correo) {
  const url = `https://api.eva.pingutil.com/email?email=${encodeURIComponent(correo)}`;
  const inicio = Date.now();
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      return { exito: false, razon: 'http', ms: Date.now() - inicio };
    }
    const data = await resp.json();
    const statusOk = data?.status === 'valid';
    const deliverable = data?.data?.deliverable === true;
    const mxCount = Array.isArray(data?.data?.mx_records) ? data.data.mx_records.length : 0;
    const disposable = data?.data?.disposable === true;

    return {
      exito: true,
      datos: { statusOk, deliverable, mxCount, disposable },
      ms: Date.now() - inicio
    };
  } catch (e) {
    return { exito: false, razon: 'network', ms: Date.now() - inicio };
  }
}

// Versión principal estricta con explicación
export async function validarCorreoRealEstricto(correo) {
  const c = (correo || '').trim().toLowerCase();

  if (!validarFormatoCorreo(c)) {
    return { ok: false, mensaje: 'Formato inválido.' };
  }
  if (!validarDominioBasico(c)) {
    return { ok: false, mensaje: 'Dominio/TLD inválido.' };
  }

  const dominio = c.split('@')[1];
  if (dominiosDesechables.includes(dominio)) {
    return { ok: false, mensaje: 'Dominio desechable no permitido.' };
  }

  const api = await llamarAPI(c);
  console.log('verificacion-correo', c, api);

  if (!api.exito) {
    // API falló
    if (MODO_VERIFICACION === 'tolerante') {
      return { ok: true, mensaje: 'API caída, se acepta por modo tolerante.' };
    }
    if (MODO_VERIFICACION === 'semiestricto') {
      // Aceptar si formato y dominio son correctos aunque la API falle
      return { ok: true, mensaje: 'API no disponible, se acepta semiestricto.' };
    }
    // estricto
    return { ok: false, mensaje: 'No se pudo verificar el correo (API caída).' };
  }

  // API respondió
  const { statusOk, deliverable, mxCount, disposable } = api.datos;

  if (disposable) {
    return { ok: false, mensaje: 'Correo desechable no permitido.' };
  }

  if (MODO_VERIFICACION === 'tolerante') {
    if (statusOk || deliverable || mxCount > 0) {
      return { ok: true, mensaje: 'Correo válido (tolerante).' };
    }
    return { ok: false, mensaje: 'Sin señales suficientes de validez.' };
  }

  if (MODO_VERIFICACION === 'semiestricto') {
    if (statusOk || deliverable || mxCount > 0) {
      return { ok: true, mensaje: 'Correo válido (semiestricto).' };
    }
    return { ok: false, mensaje: 'El correo no parece entregable.' };
  }

  // estricto: exige las tres condiciones fuertes
  const estrictoOk = statusOk && deliverable && mxCount > 0;
  if (!estrictoOk) {
    return { ok: false, mensaje: 'El correo no cumple criterios estrictos.' };
  }
  return { ok: true, mensaje: 'Correo válido (estricto).' };
}