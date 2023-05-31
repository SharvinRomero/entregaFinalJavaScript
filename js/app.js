window.addEventListener('load', function () {

	//Mostrar Clave
	const muestraClave = document.getElementById('verClave');
	const ocultarClave = document.getElementById('password');

	muestraClave.addEventListener('click', function () {
		if (ocultarClave.type === 'password') {
			ocultarClave.type = 'text';
			muestraClave.innerHTML = '<i class="bi bi-eye-slash"></i>';
		} else {
			ocultarClave.type = 'password';
			muestraClave.innerHTML = '<i class="bi bi-eye"></i>';
		}
	});

	/*Evaluador de condición para email */
	const form = document.querySelector('form');
	const email = document.getElementById('email');

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		if (!email.checkValidity()) {
			email.classList.add('is-invalid');
		} else {
			email.classList.remove('is-invalid');
		}
	});
});

/*Función para logeo */
function logForm() {
	let user = document.getElementById("email").value;
	let pass = document.getElementById("password").value;
	if (user == "javier@cohesion.com" && pass == "0123456789") {
		window.location = "home.html";
	}
	else {
		swal("Datos incorrectos", "pruebe con: \n\n javier@cohesion.com \n\n 0123456789", "warning");
	}
}

/*Algoritmo carrito de compras*/
window.addEventListener('load', function () {
	/*Variable constantes globales para el contenedor del carrito*/
	const btnCart = document.querySelector('.container-cart-icon');
	const containerCartProducts = document.querySelector('.container-cart-products');

	btnCart.addEventListener('click', () => {
		containerCartProducts.classList.toggle('d-none');
	});

	/*Variable constantes globales para los producto dentro del carrito*/
	const cartInfo = document.querySelector('.cart-product');
	const rowProduct = document.querySelector('.row-product');

	/* Lista de todos los contenedores de productos*/
	const productsList = document.querySelector('.container-items');

	/* Variable de arreglos de Productos */
	let allProducts = [];

	const valorTotal = document.querySelector('.total-pagar');

	const countProducts = document.querySelector('#contador-productos');

	const cartEmpty = document.querySelector('.cart-empty');
	const cartTotal = document.querySelector('.cart-total');

	productsList.addEventListener('click', e => {
		if (e.target.classList.contains('btn-add-cart')) {
			const product = e.target.parentElement;

			const infoProduct = {
				quantity: 1,
				title: product.querySelector('h5').textContent,
				price: product.querySelector('p').textContent,
			};

			const exits = allProducts.some(
				product => product.title === infoProduct.title
			);

			if (exits) {
				const products = allProducts.map(product => {
					if (product.title === infoProduct.title) {
						product.quantity++;
						return product;
					} else {
						return product;
					}
				});
				allProducts = [...products];
			} else {
				allProducts = [...allProducts, infoProduct];
			}

			showHTML();
		}
	});

	rowProduct.addEventListener('click', e => {
		if (e.target.classList.contains('icon-close')) {
			const product = e.target.parentElement;
			const title = product.querySelector('p').textContent;

			allProducts = allProducts.filter(
				product => product.title !== title
			);

			console.log(allProducts);

			showHTML();
		}
	});

	/* Funcion para mostrar  HTML */
	const showHTML = () => {
		if (!allProducts.length) {
			cartEmpty.classList.remove('d-none');
			rowProduct.classList.add('d-none');
			cartTotal.classList.add('d-none');
		} else {
			cartEmpty.classList.add('d-none');
			rowProduct.classList.remove('d-none');
			cartTotal.classList.remove('d-none');
		}

		/* Restaurar HTML */
		rowProduct.innerHTML = '';

		let total = 0;
		let totalOfProducts = 0;

		allProducts.forEach(product => {
			const containerProduct = document.createElement('div');
			containerProduct.classList.add('cart-product');

			containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="fs-6">${product.quantity}</span>
				<span><img></span>
                <p class="fs-6 my-2">${product.title}</p>
                <span class="fs-6">${product.price}</span>
            </div>
            <i class="bi bi-trash3 icon-close text-danger"></i>
        `;

			rowProduct.append(containerProduct);

			total =
				total + parseInt(product.quantity * product.price.slice(1));
			totalOfProducts = totalOfProducts + product.quantity;
		});

		valorTotal.innerText = `$${total}`;
		countProducts.innerText = totalOfProducts;

		const botonClick = document.getElementById('finishBuy');
		botonClick.addEventListener('click', function () {
			// Guardar la información del carrito en el almacenamiento local del navegador
			localStorage.setItem('carrito', JSON.stringify(allProducts));
			setTimeout(function () {
				window.location.href = 'finishBuy.html';
			}, 3000);
		});

	};

});

/*Algoritmo de espera*/
window.addEventListener('load', function () {
	document.getElementById('delayButton').addEventListener('click', function () {
		let button = this;
		let spinner = document.getElementById('spinner');

		button.disabled = true;
		spinner.style.display = 'block';

		let delayTime = 3000;

		// Promesa de retraso
		let delayPromise = new Promise(function (resolver) {
			setTimeout(function () {
				resolver();
			}, delayTime);
		});

		//funcion para carga
		delayPromise.then(function () {
			spinner.style.display = 'none';
			button.disabled = false;
			window.location.href = './finishBuy.html';
		});
	});
});

/*Algoritmo para elementos en la memoria*/
window.addEventListener('load', function () {
	// Obtener la información del carrito del almacenamiento local del navegador
	const carrito = JSON.parse(localStorage.getItem('carrito'));

	// Mostrar la información del carrito en el HTML
	const contenedorProductos = document.querySelector('.container-productos');
	let total = 0;

	carrito.forEach(producto => {
		const contenedorProducto = document.createElement('div');
		contenedorProducto.classList.add('producto');

		contenedorProducto.innerHTML = `
<img src="${producto.imagen}" alt="${producto.title}" class="imagen-producto d-none">
<div class="informacion-producto">
  <h2 class="fs-5">${producto.title}</h2>
  <p class="fs-6">Precio: ${producto.price}</p>
</div>
`;

		contenedorProductos.appendChild(contenedorProducto);

		total += parseInt(producto.price.slice(1)) * producto.quantity;
	});

	const contenedorTotal = document.querySelector('.total');
	contenedorTotal.innerHTML = `
<h3>Total: $${total}</h3>
`
	/*Calculo de coutas*/
	const contenidoTotal = document.getElementById('totales')
	contenidoTotal.innerHTML = `<p>${total}</p>`
		;

	const totalElement = document.querySelector('#totales')
	const valorTotal = parseFloat(totalElement.textContent);
	const numCuotas = 3;


	const valorCuota = valorTotal / numCuotas;

	const tasaInteres = 0.05; // interés del 5%
	const valorInteres = valorTotal * tasaInteres;
	const valorCuotaConInteres = (valorTotal + valorInteres) / numCuotas;

	// Mostrar el valor de cada cuota en la página web
	const selectCuotas = document.getElementById('dues');
	const cuotas = [1, 2, 3]; // Opciones de cuotas disponibles en el select
	for (let i = 0; i < cuotas.length; i++) {
		const cuota = cuotas[i];
		const option = document.createElement('option');
		option.value = cuota;
		option.text = `${cuota} cuotas`;
		if (cuota === 1) {
			option.text += ` $${valorTotal.toFixed(2)}`;
		} else {
			option.text += ` de $${(valorCuota + valorCuotaConInteres).toFixed(2)} cobro final $${((valorCuotaConInteres + valorCuota) * cuota).toFixed(2)}`;
		}
		selectCuotas.appendChild(option);
	}

});


//Funcion para primer producto
window.addEventListener('load', function () {
	const productoDestacado = document.querySelector("#primerProducto");

	fetch("./js/productos.json")
		.then((resp) => resp.json())
		.then((data) => {

			const productoDato = ["sillaNexus"];

			const contentItems = data.filter(item => productoDato.includes(item.id));

			contentItems.forEach((item) => {
				const content = document.createElement("div");
				content.innerHTML = `
				<div class="col" id="${item.id}">
				<div class="card rounded-0 border-0">
					<img src="${item.imagen}" class="card-img-top rounded-3 mirror cover-big" alt="${item.descripcion}">
					<div class="z-1 position-absolute top-0 end-0 m-3">
						<button class="btn btn-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#primerModal">
						<i class="bi bi-arrows-angle-expand"></i>
						</button>
					</div>
					<div class="card-body info-product row">
						<h5 class="card-title">${item.nombre}</h5>
						<p class="card-text fs-6 m-0 price">$${item.precio}</p>
						<button class="btn btn-dark rounded-pill btn-add-cart fs-7 mt-3">
							<i class="bi bi-cart3 mx-1 btn-add-cart"></i>Añadir
						</button>
					</div>
				</div>
			</div>
			
			<!-- Modal -->
			<div class="modal fade" id="primerModal" tabindex="-1" aria-labelledby="primerModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="primerModalLabel">${item.nombre}</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
						<div id="galeria1" class="carousel slide carousel-fade">
						<div class="carousel-inner">
						  <div class="carousel-item active">
							<img src="${item.imagen}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
						  </div>
						  <div class="carousel-item">
							<img src="${item.imagen1}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
						  </div>
						  <div class="carousel-item">
							<img src="${item.imagen2}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
						  </div>
						</div>
						<button class="carousel-control-prev" type="button" data-bs-target="#galeria1" data-bs-slide="prev">
						  <span class="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
						</button>
						<button class="carousel-control-next" type="button" data-bs-target="#galeria1" data-bs-slide="next">
						  <span class="carousel-control-next-icon bg-black" aria-hidden="true"></span>
						</button>
					  </div>
						</div>
					</div>
				</div>
			</div>
	`;
				productoDestacado.append(content);
			});
		});

});

//Funcion para los productos destacados
window.addEventListener('load', function () {
	const productosDestacados = document.querySelector("#productosDestacados");

	fetch("./js/productos.json")
		.then((resp) => resp.json())
		.then((data) => {

			const contentItems = data.slice(1, 5);

			contentItems.forEach((item) => {
				const content = document.createElement("div");
				content.innerHTML = `
			<div class="col" id="${item.id}">
		<div class="card rounded-0 border-0">
			<img src="${item.imagen}" class="card-img-top rounded-3 cover-min" alt="${item.descripcion}">
			<div class="z-1 position-absolute top-0 end-0 m-3">
			<button class="btn btn-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#${item.tipo}">
			<i class="bi bi-arrows-angle-expand"></i>
			</button>
		</div>
			<div class="card-body info-product row">
				<h5 class="card-title">${item.nombre}</h5>
				<p class="card-text fs-6 m-0 price">$${item.precio}</p>
				<button class="btn btn-dark rounded-pill btn-add-cart fs-7 mt-2">
					<i class="bi bi-cart3 mx-1 btn-add-cart"></i>Añadir
				</button>
			</div>
		</div>
	</div>


	<!-- Modal -->
	<div class="modal fade" id="${item.tipo}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="modalLabel">${item.nombre}</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				<div id="${item.articulo}" class="carousel slide carousel-fade">
				<div class="carousel-inner">
				  <div class="carousel-item active">
					<img src="${item.imagen}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
				  </div>
				  <div class="carousel-item">
					<img src="${item.imagen1}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
				  </div>
				  <div class="carousel-item">
					<img src="${item.imagen2}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
				  </div>
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#${item.articulo}" data-bs-slide="prev">
				  <span class="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#${item.articulo}" data-bs-slide="next">
				  <span class="carousel-control-next-icon bg-black" aria-hidden="true"></span>
				</button>
			  </div>
				</div>
			</div>
		</div>
	</div>
	`;
				productosDestacados.append(content);
			});
		});

});

//Funcion para los productos restantes con JQUERY
$(window).on('load', function () {
	let elementosProductos2 = $("#productos");

	$.getJSON("./js/productos.json", function (data) {
		data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

		const productoDato = ["lamparaSkrap", "relojNeut", "sillonDaze", "sillaGretchen"];

		const contentItems = data.filter(item => productoDato.includes(item.id));

		contentItems.forEach(function (item) {
			const content = `
		  <div class="col" id="${item.id}">
			<div class="card rounded-0 border-0">
			  <img src="${item.imagen}" class="card-img-top rounded-3 cover-med" alt="${item.descripcion}">
			  <div class="z-1 position-absolute top-0 end-0 m-3">
				<button class="btn btn-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#${item.tipo}">
				  <i class="bi bi-arrows-angle-expand"></i>
				</button>
			  </div>
			  <div class="card-body info-product row">
				<h5 class="card-title">${item.nombre}</h5>
				<p class="card-text fs-6 m-0 price">$${item.precio}</p>
				<button class="btn btn-dark rounded-pill btn-add-cart fs-7 mt-2">
				  <i class="bi bi-cart3 mx-1 btn-add-cart"></i>Añadir
				</button>
			  </div>
			</div>
		  </div>
  
		  <!-- Modal -->
		  <div class="modal fade" id="${item.tipo}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
			<div class="modal-dialog">
			  <div class="modal-content">
				<div class="modal-header">
				  <h1 class="modal-title fs-5" id="modalLabel">${item.nombre}</h1>
				  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
				  <div id="${item.articulo}" class="carousel slide carousel-fade">
					<div class="carousel-inner">
					  <div class="carousel-item active">
						<img src="${item.imagen}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
					  </div>
					  <div class="carousel-item">
						<img src="${item.imagen1}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
					  </div>
					  <div class="carousel-item">
						<img src="${item.imagen2}" class="d-block w-100 rounded-3" alt="${item.descripcion}">
					  </div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#${item.articulo}" data-bs-slide="prev">
					  <span class="carousel-control-prev-icon bg-black" aria-hidden="true"></span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#${item.articulo}" data-bs-slide="next">
					  <span class="carousel-control-next-icon bg-black" aria-hidden="true"></span>
					</button>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		`;
			elementosProductos2.append(content);
		});
	});
});




