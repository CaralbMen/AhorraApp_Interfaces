import React, { createContext, useState, useContext } from 'react';
import { iniciarSesion, registrarUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // Iniciar sesión y establecer usuario en contexto
    async function login(correo, password) {
        try {
            const usuario = await iniciarSesion(correo, password);
            setUser(usuario);
            return usuario;
        } catch (error) {
            throw error;
        }
    }

    // Registrar nuevo usuario
    async function register(data) {
        try {
            await registrarUsuario(data);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar perfil del usuario
    async function updateProfile({ nombre, correo, telefono, contrasena }) {
        try {
            if (!user) return false;
            const actualizado = await actualizarUsuario(user.id_usuario, { 
                nombre, 
                correo, 
                telefono, 
                contrasena 
            });
            setUser(actualizado);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Cerrar sesión
    function logout() {
        setUser(null);
    }

    // Eliminar cuenta
    async function deleteAccount() {
        try {
            if (!user) throw new Error('No hay usuario autenticado');
            await eliminarUsuario(user.id_usuario);
            setUser(null);
            return true;
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            register, 
            updateProfile, 
            logout, 
            deleteAccount 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}