import React, { createContext, useState, useEffect, useCallback } from 'react';
import { iniciarSesion, registrarUsuario, actualizarUsuario } from '../controllers/usuarioController';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	// Iniciar sesión y establecer usuario en contexto
	const login = useCallback(async (correo, contrasena) => {
		const u = await iniciarSesion(correo, contrasena);
		if (u) setUser(u);
		return u;
	}, []);

	// Registrar usuario y opcionalmente iniciar sesión
	const register = useCallback(async (data) => {
		await registrarUsuario(data);
		// Después de registrar, iniciar sesión
		const u = await iniciarSesion(data.correo, data.contrasena);
		if (u) setUser(u);
		return u;
	}, []);

	const logout = useCallback(() => {
		setUser(null);
	}, []);

	const updateProfile = useCallback(async (updates) => {
		if (!user?.id_usuario) throw new Error('No authenticated user');
		const updated = await actualizarUsuario(user.id_usuario, updates);
		setUser(updated);
		return updated;
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, login, logout, register, updateProfile }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = React.useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}