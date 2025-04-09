const UserRepository = require('../repositories/userRepository');

class UserService {
    async registerUser(userData) {
        const { Documento, Nombre_de_Usuario } = userData;

        // Verificar si ya existe un usuario con la misma cédula
        const existingUserByDocument = await UserRepository.findByDocumentNumber(Documento);
        if (existingUserByDocument) {
            throw new Error('La cédula  ' +Documento + ' ya está registrada.');
        }

        // Verificar si ya existe un usuario con el mismo username
        const existingUserByUsername = await UserRepository.findByUsername(Nombre_de_Usuario);
        if (existingUserByUsername) {
            throw new Error('El nombre de usuario ya está en uso.');
        }

        // Si todo es válido, proceder a registrar el usuario
        return UserRepository.createUser(userData);
    }

    async loginUser(userData) {
        const { Contrasena, Nombre_de_Usuario } = userData;
        //console.log(password)
        //console.log(username)
        // Verificar si ya existe un usuario con el mismo username
        const existingUserByUsername = await UserRepository.findByUsername(Nombre_de_Usuario);
        console.log(existingUserByUsername)
        if (existingUserByUsername==null || existingUserByUsername.Contrasena!==Contrasena) {
            throw new Error('error en usuario o contraseña.');
        }

        return {
            message: 'Login exitoso',
            user: {
                Documento: existingUserByUsername.Documento,
                nombre: existingUserByUsername.Nombre_de_Usuario
                // puedes agregar más campos si necesitas
            }
        };
        
    }
}

module.exports = new UserService();
