const monto = document.getElementById('monto');
const tiempo = document.getElementById('tiempo');
const interes = document.getElementById('interes');
const btnCalcular = document.getElementById('btnCalcular');
const alerta = document.getElementById('alert-error');
const llenarTabla = document.querySelector('#lista-tabla tbody')

btnCalcular.addEventListener('click', () => {
    if (monto.value === '' || tiempo.value === '' || interes.value === '') {
        alerta.hidden = false;
        setTimeout(() => {
            alerta.hidden = true;
        }, 2000);
    } else {
        calcularCronograma(monto.value, interes.value, tiempo.value);
    }
})

function calcularCronograma(monto, interes, tiempo) {

    while(llenarTabla.firstChild) {
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let mesActual = dayjs().add(1, 'month');
    let amortizacionConstante, pagoInteres, cuota;
    amortizacionConstante = monto / tiempo;
    for (let i = 1; i <= tiempo; i++) {
        pagoInteres = monto * (interes / 100);
        cuota = amortizacionConstante + pagoInteres;
        monto = monto - amortizacionConstante;

        let fecha = mesActual.format('DD-MM-YYYY');
        mesActual = mesActual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fecha}</td>
            <td>${amortizacionConstante.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row);
        
    }
}

var contador;
function calificar(item) {
    contador = item.id[0];
    let nombre = item.id.substring(1);
    for (let i = 0; i < 5; i++) {
        if (i < contador) {
            document.getElementById((i + 1) + nombre).style.color = "orange";
        }
        else {
            document.getElementById((i + 1) + nombre).style.color = "black";
        }
    }

}
let totalCalificaciones = 0;
let totalSumatoriaCalificaciones = 0;
localStorage.setItem('totalSumatoriaCalificaciones', totalSumatoriaCalificaciones);
localStorage.setItem('totalCalificaciones', totalCalificaciones);
function mensaje() {
    totalCalificaciones++;
    localStorage.setItem('totalCalificaciones', totalCalificaciones);
    const calificaciones = localStorage.getItem('totalCalificaciones');
    const sumatoriaCalificaciones = localStorage.getItem('totalSumatoriaCalificaciones');
    var aux = parseInt(sumatoriaCalificaciones) + parseInt(contador);
    let promedio = aux / parseInt(calificaciones);
    localStorage.setItem('totalSumatoriaCalificaciones', aux);

    const calificacion_repuesta = document.getElementById("calificacion-usuario");
    const promedio_calificacion = document.getElementById("promedio-calificacion");
    calificacion_repuesta.innerText = "Gracias por calificar usted nos dio " + contador + " estrellas";
    document.getElementById("alert-success").style.display = "block";
    promedio_calificacion.innerText = "Promedio de calificacion: " + promedio;
}



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b6ae8eed03mshc5c8ca7bd2d1ccbp1315bcjsn6f4f32428361',
		'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
	}
};

fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));