const firebaseUrl = 'https://tarjetasrfid-95723-default-rtdb.firebaseio.com/tarjetas.json'; // Cambia esto a tu URL de Firebase
const attendanceData = {
    "Lunes": 0,
    "Martes": 0,
    "Miércoles": 0,
    "Jueves": 0,
    "Viernes": 0,
    "Sábado": 0,
    "Domingo": 0
};

const days = Object.keys(attendanceData);
const attendances = Object.values(attendanceData);
const ctx = document.getElementById('attendanceChart').getContext('2d');
const attendanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: days,
        datasets: [{
            label: 'Asistencias',
            data: attendances,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function fetchData() {
    fetch(firebaseUrl)
        .then(response => response.json())
        .then(data => {
            const receivedDataDiv = document.getElementById('receivedData');
            receivedDataDiv.innerHTML = ''; // Limpiar datos anteriores
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const entry = data[key];
                    const date = new Date(entry.timestamp * 1000);
                    const day = date.toLocaleString('es-ES', { weekday: 'long' });
                    receivedDataDiv.innerHTML += `<p>UID: ${entry.uid}, Timestamp: ${date.toLocaleString()}</p>`;
                    
                    // Actualizar asistencias
                    if (attendanceData[day] === undefined) {
                        attendanceData[day] = 1; // Si no existe, inicializa en 1
                    } else {
                        attendanceData[day] += 1; // Incrementa el contador
                    }
                }
            }
            updateChart();
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function updateChart() {
    attendanceChart.data.datasets[0].data = Object.values(attendanceData);
    attendanceChart.update();
    const stats = calculateStatistics(attendanceChart.data.datasets[0].data);
    document.getElementById('mode').innerText = stats.mode;
    document.getElementById('average').innerText = stats.average;
    document.getElementById('median').innerText = stats.median;
}

function calculateStatistics(data) {
    const mode = calculateMode(data);
    const average = calculateAverage(data);
    const median = calculateMedian(data);
    return { mode, average, median };
}

function calculateMode(data) {
    const frequency = {};
    let maxFreq = 0;
    let mode = null;

    data.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];                
            mode = num;
        }
    });
    return mode;
}

function calculateAverage(data) {
    const sum = data.reduce((acc, num) => acc + num, 0);
    return (sum / data.length).toFixed(2); // Redondear a 2 decimales
}

function calculateMedian(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2); // Promedio de los dos del medio
    } else {
        return sorted[mid].toFixed(2); // Elemento del medio
    }
}

// Llama a fetchData cada 5 segundos
setInterval(fetchData, 5000);
fetchData(); // Llama a fetchData al cargar la página

// Manejo del formulario de acceso
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

    // Mostrar los datos registrados
    const registeredDataDiv = document.getElementById('registeredData');
    registeredDataDiv.innerHTML += `<p>Nombre: ${name}, Número de Tarjeta: ${cardNumber}</p>`;
});
   