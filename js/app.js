//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener(){
	//Agregar curso al carrito
	listaCursos.addEventListener('click',agregarCurso);

	//Elimina curso del carrito
	carrito.addEventListener('click',eliminaCurso);

	//Vaciar carrito HTML
	vaciarCarrito.addEventListener('click',() => {
		articulosCarrito = [];
		limpiarHTML();
	});
}

//funciones
function agregarCurso(e) {
	e.preventDefault();
	const cursoSeleccionado = e.target.parentElement.parentElement;
	if(e.target.classList.contains('agregar-carrito')){
		leerDatosCurso(cursoSeleccionado);
	}
}

function eliminaCurso(e){
	if(e.target.classList.contains('borrar-curso')){
		const cursoId = e.target.getAttribute('data-id');
		articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
		carritoHTML();
	}
}
function leerDatosCurso(curso){
	const infoCurso = {
		imagen: curso.querySelector('img').src,
		titulo: curso.querySelector('h4').textContent,
		costo: curso.querySelector('.precio span').textContent,
		id: curso.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}
	//Revisa si un elemento ya existe
	const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
	if(existe){
		const cursos = articulosCarrito.map( curso => {
			if(curso.id === infoCurso.id){
				curso.cantidad++;
				return curso;
			}else{
				return curso;
			}
		});
	}else{
		//agregar elementos al carrito
		articulosCarrito = [...articulosCarrito, infoCurso];		
	}


	carritoHTML();
}

function carritoHTML(){
	//limpiar HTML
	limpiarHTML();
	//Recorre el carrito
	articulosCarrito.forEach(curso => {
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${curso.imagen}" width="100" />
			</td>
			<td>
				${curso.titulo}
			</td>
			<td>
				${curso.costo}
			</td>
			<td>
				${curso.cantidad}
			</td>
			<td>
				<a href="#" class="borrar-curso" data-id="${curso.id}" > X </a>
			</td>
		`;
		//Agrega el carrito al HTML
		contenedorCarrito.appendChild(row);
	});
}

function limpiarHTML(){
	//forma lenta
	//contenedorCarrito.innerHTML = '';
	while(contenedorCarrito.firstChild){
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}