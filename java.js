document.getElementById('accessForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener los valores del formulario
    const name = document.getElementById('name').value;
    const cardNumber = document.getElementById('cardNumber').value;

    // Mostrar un mensaje de bienvenida
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = `Bienvenido, ${name}! Su número de tarjeta es ${cardNumber}.`;
    messageDiv.classList.remove('hidden');

    // Limpiar el formulario
    this.reset();
});