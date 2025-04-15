document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('reservationForm').addEventListener('submit', async function(event) {
        console.log("Iniciando validaciones de reserva");
        event.preventDefault();
        
        clearErrors();

        let Fecha_Reserva = document.getElementById('Fecha_Reserva').value;
        let Hora_Reserva = document.getElementById('Hora_Reserva').value;
        let Numero_personas = document.getElementById('Numero_personas').value;
        let Nombre_reserva = document.getElementById('Nombre_reserva').value;

        let isValid = true;

        if (!validateDate(Fecha_Reserva)) {
            showError('fechaError', 'Ingrese una fecha válida.');
            isValid = false;
        }

        if (!validateTime(Hora_Reserva)) {
            showError('horaError', 'Ingrese una hora válida en formato HH:MM.');
            isValid = false;
        }

        if (!validateNumberOfPeople(Numero_personas)) {
            showError('numeroPersonasError', 'Debe ser un número mayor que 0.');
            isValid = false;
        }

        if (!validateFullName(Nombre_reserva)) {
            showError('NombrereservaError', 'Debe ingresar un nombre válido sin caracteres especiales.');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('/reservar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "Fecha_Reserva": Fecha_Reserva,
                        "Hora_Reserva": Hora_Reserva,
                        "Numero_personas": Numero_personas,
                        "Nombre_reserva": Nombre_reserva
                    })
                });

                if (response.ok) {
                    alert('login completado.');
                    //document.getElementById('registrationForm').reset();
                    window.location.href = 'http://localhost:8080/views/wine.html';
                } else {
                    const result = await response.json();
                    alert(result.error);
                }
            } catch (error) {
                console.log('Error:', error);
                alert('Ocurrió un error al realizar la reserva.');
            }
        }
    });

    // Validaciones
    function validateDate(fecha) {
        return /^\d{4}-\d{2}-\d{2}$/.test(fecha);
    }

    function validateTime(hora) {
        return /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/.test(hora);
    }

    function validateNumberOfPeople(numero) {
        return /^[1-9][0-9]*$/.test(numero);
    }

    function validateFullName(nombre) {
        let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return regex.test(nombre.trim()) && nombre.trim().length > 0;
    }

    function clearErrors() {
        let errors = document.querySelectorAll('.error-message');
        errors.forEach(el => el.innerText = '');
    }

    function showError(id, message) {
        document.getElementById(id).innerText = message;
    }
});
