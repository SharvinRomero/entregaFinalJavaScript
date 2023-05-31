window.addEventListener('load', function () {
	const tarjetaTDC = document.querySelector('#tarjetaTDC'),
		btnAbrirFormulario = document.querySelector('#formulario'),
		formulario = document.querySelector('#formulario-tarjetaTDC'),
		numeroTarjetaTDC = document.querySelector('#tarjetaTDC .numero'),
		nombreTarjetaTDC = document.querySelector('#tarjetaTDC .nombre'),
		logoMarca = document.querySelector('#logo-marca'),
		firma = document.querySelector('#tarjetaTDC .firma p'),
		mesExpiracion = document.querySelector('#tarjetaTDC .mes'),
		yearExpiracion = document.querySelector('#tarjetaTDC .year');
	ccv = document.querySelector('#tarjetaTDC .ccv');

	// * Volteamos la tarjetaTDC para mostrar el frente.
	const mostrarFrente = () => {
		if (tarjetaTDC.classList.contains('active')) {
			tarjetaTDC.classList.remove('active');
		}
	}

	// * Rotacion de la tarjetaTDC
	tarjetaTDC.addEventListener('click', () => {
		tarjetaTDC.classList.toggle('active');
	});

	// * formulario activo
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');


	// * Select del mes generado dinamicamente.
	for (let i = 1; i <= 12; i++) {
		let opcion = document.createElement('option');
		opcion.value = i;
		opcion.innerText = i;
		formulario.selectMes.appendChild(opcion);
	}

	// * Select del año generado dinamicamente.
	const yearActual = new Date().getFullYear();
	for (let i = yearActual; i <= yearActual + 8; i++) {
		let opcion = document.createElement('option');
		opcion.value = i;
		opcion.innerText = i;
		formulario.selectYear.appendChild(opcion);
	}

	// * Input numero de tarjetaTDC
	formulario.inputNumero.addEventListener('keyup', (e) => {
		let valorInput = e.target.value;

		formulario.inputNumero.value = valorInput
			// Eliminamos espacios en blanco
			.replace(/\s/g, '')
			// Eliminar las letras
			.replace(/\D/g, '')
			// Ponemos espacio cada cuatro numeros
			.replace(/([0-9]{4})/g, '$1 ')
			// Elimina el ultimo espaciado
			.trim();

		numeroTarjetaTDC.textContent = valorInput;

		if (valorInput == '') {
			numeroTarjetaTDC.textContent = '#### #### #### ####';

			logoMarca.innerHTML = '';
		}

		if (valorInput[0] == 4) {
			logoMarca.innerHTML = '';
			const imagen = document.createElement('img');
			imagen.src = 'img/logos/visa.png';
			logoMarca.appendChild(imagen);
		} else if (valorInput[0] == 5) {
			logoMarca.innerHTML = '';
			const imagen = document.createElement('img');
			imagen.src = 'img/logos/mastercard.png';
			logoMarca.appendChild(imagen);
		}

		// Volteamos la tarjetaTDC para que el usuario vea el frente.
		mostrarFrente();
	});

	// * Input nombre de tarjetaTDC
	formulario.inputNombre.addEventListener('keyup', (e) => {
		let valorInput = e.target.value;

		formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
		nombreTarjetaTDC.textContent = valorInput;
		firma.textContent = valorInput;

		if (valorInput == '') {
			nombreTarjetaTDC.textContent = 'Javier Leon';
		}

		mostrarFrente();
	});

	// * Select mes
	formulario.selectMes.addEventListener('change', (e) => {
		mesExpiracion.textContent = e.target.value;
		mostrarFrente();
	});

	// * Select Año
	formulario.selectYear.addEventListener('change', (e) => {
		yearExpiracion.textContent = e.target.value.slice(2);
		mostrarFrente();
	});

	// * CCV
	formulario.inputCCV.addEventListener('keyup', () => {
		if (!tarjetaTDC.classList.contains('active')) {
			tarjetaTDC.classList.toggle('active');
		}

		formulario.inputCCV.value = formulario.inputCCV.value
			// Eliminar los espacios
			.replace(/\s/g, '')
			// Eliminar las letras
			.replace(/\D/g, '');

		ccv.textContent = formulario.inputCCV.value;
	});

});

/*Función para pagar */
window.addEventListener('load', function () {
	const validarCompra = document.getElementById('formulario-tarjetaTDC');
	validarCompra.addEventListener('submit', function (e) {
		e.preventDefault();
		// muestra la alerta
		swal({
			title: "¿Confirma la compra?",
			text: "Está por confirmar la compra. Si está seguro(a), presione 'OK' para continuar.",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willConfirm) => {
				if (willConfirm) {
					// Realizar acciones para confirmar la compra aquí
					swal("¡Compra realizada con éxito!", {
						icon: "success",
					}).then(() => {
						// redirecciona al home
						window.location.href = "./home.html";
					});
				} else {
					swal("La compra ha sido cancelada.");
				}
			});
	});
});

