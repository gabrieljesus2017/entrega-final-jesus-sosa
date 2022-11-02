"use strict";

var monto = document.getElementById('monto');
var tiempo = document.getElementById('tiempo');
var interes = document.getElementById('interes');
var btnCalcular = document.getElementById('btnCalcular');
var alerta = document.getElementById('alert-error');
var llenarTabla = document.querySelector('#lista-tabla tbody');
btnCalcular.addEventListener('click', function () {
  if (monto.value === '' || tiempo.value === '' || interes.value === '') {
    alerta.hidden = false;
    setTimeout(function () {
      alerta.hidden = true;
    }, 2000);
  } else {
    calcularCronograma(monto.value, interes.value, tiempo.value);
  }
});

function calcularCronograma(monto, interes, tiempo) {
  while (llenarTabla.firstChild) {
    llenarTabla.removeChild(llenarTabla.firstChild);
  }

  var mesActual = dayjs().add(1, 'month');
  var amortizacionConstante, pagoInteres, cuota;
  amortizacionConstante = monto / tiempo;

  for (var i = 1; i <= tiempo; i++) {
    pagoInteres = monto * (interes / 100);
    cuota = amortizacionConstante + pagoInteres;
    monto = monto - amortizacionConstante;
    var fecha = mesActual.format('DD-MM-YYYY');
    mesActual = mesActual.add(1, 'month');
    var row = document.createElement('tr');
    row.innerHTML = "\n            <td>".concat(fecha, "</td>\n            <td>").concat(amortizacionConstante.toFixed(2), "</td>\n            <td>").concat(pagoInteres.toFixed(2), "</td>\n            <td>").concat(cuota.toFixed(2), "</td>\n            <td>").concat(monto.toFixed(2), "</td>\n        ");
    llenarTabla.appendChild(row);
  }
}

var contador;

function calificar(item) {
  contador = item.id[0];
  var nombre = item.id.substring(1);

  for (var i = 0; i < 5; i++) {
    if (i < contador) {
      document.getElementById(i + 1 + nombre).style.color = "orange";
    } else {
      document.getElementById(i + 1 + nombre).style.color = "black";
    }
  }
}

var totalCalificaciones = 0;
var totalSumatoriaCalificaciones = 0;
localStorage.setItem('totalSumatoriaCalificaciones', totalSumatoriaCalificaciones);
localStorage.setItem('totalCalificaciones', totalCalificaciones);

function mensaje() {
  totalCalificaciones++;
  localStorage.setItem('totalCalificaciones', totalCalificaciones);
  var calificaciones = localStorage.getItem('totalCalificaciones');
  var sumatoriaCalificaciones = localStorage.getItem('totalSumatoriaCalificaciones');
  var aux = parseInt(sumatoriaCalificaciones) + parseInt(contador);
  var promedio = aux / parseInt(calificaciones);
  localStorage.setItem('totalSumatoriaCalificaciones', aux);
  var calificacion_repuesta = document.getElementById("calificacion-usuario");
  var promedio_calificacion = document.getElementById("promedio-calificacion");
  calificacion_repuesta.innerText = "Gracias por calificar usted nos dio " + contador + " estrellas";
  document.getElementById("alert-success").style.display = "block";
  promedio_calificacion.innerText = "Promedio de calificacion: " + promedio;
}
//# sourceMappingURL=main.dev.js.map
