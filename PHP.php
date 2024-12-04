<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['uid'])) {
    $uid = $_GET['uid'];

    // Aquí puedes guardar el UID en una base de datos o en un archivo
    // Por simplicidad, solo lo mostraremos
    echo "UID recibido: " . htmlspecialchars($uid);
} else {
    echo "No se recibieron datos.";
}
?>