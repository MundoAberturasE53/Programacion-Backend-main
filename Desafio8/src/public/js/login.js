function submitForm() {
    // Recopila los datos del formulario en un objeto
    const formData = {
        email: document.getElementById('usuario').value.toUpperCase(),
        password: document.getElementById('password').value,
    }

    // Realiza una solicitud POST utilizando fetch y envía los datos en formato JSON
    fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.status === 'success') { // Verifica si el inicio de sesión fue exitoso
            window.location.href = '/api/products'; // Redirecciona solo si el inicio de sesión fue exitoso
        } else {
            // Aquí puedes manejar el caso en que el inicio de sesión no fue exitoso
            console.log("Inicio de sesión fallido")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o Contraseña incorrecta",
              });
        }
    })
    .catch(error => console.error('Error:', error))
}

document.addEventListener('DOMContentLoaded', () => {
    const registrate = document.getElementById('Registrate');

    if (registrate) {
        registrate.addEventListener('click', () => {
            window.location.href = '/signup';
        });
    }});