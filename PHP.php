<?php
if (isset($_GET['uid'])) {
    $uid = $_GET['uid'];
    // Guardar el UID en un archivo
    file_put_contents('registros.txt', $uid . PHP_EOL, FILE_APPEND);
    echo "UID registrado: " . $uid;
} else {
    echo "No se recibió UID.";
}
?>