<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $cardNumber = $_POST['cardNumber'];

    // Aquí puedes guardar los datos en una base de datos o hacer lo que necesites
    echo "Datos recibidos: Nombre - $name, Número de Tarjeta - $cardNumber";
}
?>