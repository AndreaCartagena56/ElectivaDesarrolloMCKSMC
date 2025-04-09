document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        console.log("iniciando validaciones");
        event.preventDefault();
        
        clearErrors();

        let Documento = document.getElementById('Documento').value;
        let Tipo_doc = document.getElementById('Tipo_doc').value;
        let Nombre_Completo = document.getElementById('Nombre_Completo').value;  
        let Correo_Electronico = document.getElementById('Correo_Electronico').value;
        let Nombre_de_Usuario = document.getElementById('Nombre_de_Usuario').value;
        let Contrasena = document.getElementById('Contrasena').value;
        let Verificar_Contrasena = document.getElementById('Verificar_Contrasena').value;

        let isValid = true;

        if (!validateDocumentNumber(Documento)) {
            showError('documentNumberError', 'El número de documento debe ser estrictamente un número.');
            alert("El número de documento debe ser estrictamente un número");
            isValid = false;
        }
        if (!validateFullName(Nombre_Completo)) {
            showError('fullNameError', 'El nombre completo no debe contener caracteres especiales no permitidos.');
            alert("El nombre completo no debe contener caracteres especiales no permitidos");
            isValid = false;
        }
        if (!validateEmail(Correo_Electronico)) {
            showError('emailError', 'Ingrese un correo electrónico válido.');
            isValid = false;
        }

        if (!validateUsername(Nombre_de_Usuario)) {
            showError('usernameError', 'El nombre de usuario no debe contener caracteres especiales.');
            isValid = false;
        }

        if (!validatePassword(Contrasena)) {
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial permitido.');
            isValid = false;
        }

        if (Contrasena !== Verificar_Contrasena) {
            showError('confirmPasswordError', 'Las contraseñas no coinciden.');
            isValid = false;
        }

        if (!Tipo_doc) {
            showError('tipoDocError', 'Debe seleccionar un tipo de documento.');
            isValid = false;
        }    

        if (isValid) {
            try {
                const response = await fetch('/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Documento": Documento,
                        "Tipo_doc": Tipo_doc,
                        "Nombre_Completo": Nombre_Completo,
                        "Correo_Electronico": Correo_Electronico,
                        "Nombre_de_Usuario": Nombre_de_Usuario,
                        "Contrasena": Contrasena
                    })
                });

                if (response.ok) {
                    alert('Registro completado.');
                    document.getElementById('registrationForm').reset();
                } else {
                    const result = await response.json();
                    alert(result.error);
                }
            } catch (error) {
                console.log('Error:', error);
                alert('Ocurrió un error al registrar el usuario.');
            }
        }
    });

    document.getElementById('Contrasena').addEventListener('input', function() {
        let Contrasena = document.getElementById('Contrasena').value;
        let strengthBar = document.getElementById('passwordStrength');
        strengthBar.className = 'password-strength';

        if (Contrasena.length < 8) {
            strengthBar.classList.add('strength-weak');
            showError('passwordError', 'La contraseña debe tener al menos 8 caracteres.');
        } else if (Contrasena.length >= 8 && /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,:;])/.test(Contrasena)) {
            if (Contrasena.length >= 12) {
                strengthBar.classList.add('strength-strong');
                showError('passwordError', 'La contraseña es muy segura.');
            } else if (Contrasena.length >= 10) {
                strengthBar.classList.add('strength-good');
                showError('passwordError', 'La contraseña es segura.');
            } else {
                strengthBar.classList.add('strength-fair');
                showError('passwordError', 'La contraseña es débil.');
            }
        } else {
            strengthBar.classList.add('strength-weak');
            showError('passwordError', 'La contraseña es débil.');
        }
    });

    function validateFullName(Nombre_Completo) {
        let nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(?:\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)*$/;
        return nameRegex.test(Nombre_Completo);
    }

    function validateDocumentNumber(Documento) {
        let documentNumberRegex = /^[0-9]+$/;
        return documentNumberRegex.test(Documento);
    }

    function validateEmail(Correo_Electronico) {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(Correo_Electronico);
    }

    function clearErrors() {
        let errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(el) {
            el.innerText = '';
        });
    }

    function showError(elementId, message) {
        document.getElementById(elementId).innerText = message;
    }

    function validateUsername(Nombre_de_Usuario) {
        let usernameRegex = /^[a-zA-Z0-9_.-]+$/;
        return usernameRegex.test(Nombre_de_Usuario);
    }

    function validatePassword(Contrasena) {
        let passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(Contrasena);
    }
});
