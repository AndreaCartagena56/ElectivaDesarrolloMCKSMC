document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    //console.log("iniciando validaciones");
    event.preventDefault();
    
    clearErrors();

    let Nombre_de_Usuario = document.getElementById('Nombre_de_Usuario').value;
    let Contrasena = document.getElementById('Contrasena').value;
    
        try {
            const response = await fetch('/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Nombre_de_Usuario": Nombre_de_Usuario,
                    "Contrasena": Contrasena
                })
            });

            if (response.ok) {
                alert('login completado.');
                //document.getElementById('registrationForm').reset();
                window.location.href = 'http://localhost:8080/views/index.html';
            } else {
                const result = await response.json();
                alert(result.error);
            }
        } catch (error) {
            console.log('Error:', error);
            alert('Ocurrió un error al loggear el usuario.');
        }
});
function clearErrors() {
    let errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(el) {
        el.innerText = '';
    });
}
