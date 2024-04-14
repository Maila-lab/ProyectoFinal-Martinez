// variables
const carrito =document.getElementById("carrito"),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_productos'),
    btnVaciarCarrito = document.querySelector('#vaciar_carrito'),
    btnComprarProductos = document.querySelector('#comprar_productos');

const listaProductos =document.getElementById("productos");

// DECLARACION E INICIALIZACION DE VARIABLES USUARIOS
let articulosCarrito =[];

// ACCION SOBRE EL ICONO DEL CARRITO DE COMPRAS
registrarEventsListeners()
function registrarEventsListeners() {
    listaProductos.addEventListener('click', agregarProducto);
    // VACIAR EL CARRITO
    btnVaciarCarrito.addEventListener('click',e =>{
        articulosCarrito = [];
        limpiarHTML()
    })

    btnComprarProductos.addEventListener('click',e =>{
        alert("comprar");
    })
}

// ACCION DEL BOTON AGREGAR AL CARRITO
function agregarProducto(e) {
    if(e.target.classList.contains("agregar-carrito")){
        const productoSeleccionado = e.target.parentElement.parentElement
        leerInfo(productoSeleccionado)
    }
    //AGREGA AL LOCALSTORE
    localStorage.setItem('carritoTer',JSON.stringify(articulosCarrito));
}
//RECUPERA INFO DE NUESTRO HTML AL QUE LE DIMOS CLICK 
function leerInfo(producto) {
     //CREA UN OBJETO CON EL CONTENIDO DEL PRODUCTO
    const infoProducto={
        imagen: producto.querySelector('div img').src,
        titulo: producto.querySelector('div h3').innerText,
        precio: producto.querySelector('div p').innerText,
        id: producto.querySelector('div h4').innerText,
        cantidad: 1,
    }    

     //VERIFICA SI EL PRODUCTO YA ESTA EN EL CARRITO
    const existe = articulosCarrito.some(producto=>producto.id === infoProducto.id)
    console.log(articulosCarrito);
    if(existe){
         //ACTUALIZA LA CANTIDAD
        const productos = articulosCarrito.map(producto => {
            if(producto.id ===infoProducto.id){
                producto.cantidad++;
                return producto
            }else{
                return producto
            }
        });
        [...articulosCarrito,infoProducto]
    }else {
         //AGREGAMOS ELEMENTOS AL CARRITO DE COMPRAS
        articulosCarrito = [...articulosCarrito,infoProducto]
    }

     //CALCULA EL TOTAL POR FILA
    let precioFinal=0;
    const total =articulosCarrito.map(producto => {
        precioFinal = precioFinal +(producto.precio*producto.cantidad);
    })
    carritoHTML()
}

// MOSTRAR EL CARRITO EN EL HTML
function carritoHTML() {
    let total=0;
    limpiarHTML()
    // RECORRE EL CARRITO Y GENERA LA LISTA DEL CARRITO EN HTML
    articulosCarrito.forEach(producto=>{
        const fila=document.createElement('div');
        fila.innerHTML=`
        <img src="${producto.imagen}"></img>
        <p>${producto.titulo}</p>
        <p>${producto.precio}</p>
        <p>${producto.cantidad}</p>
        <p>${producto.cantidad*parseFloat(producto.precio)}mill. € </p>
        `;
        total=total+producto.cantidad*parseFloat(producto.precio);
        contenedorCarrito.appendChild(fila);
    })
    // GENERA EL TOTAL DEL CARRITO
    const filaFinal=document.createElement('div');
    filaFinal.innerHTML= `
        <i>${"Total del carrito: "+"$"+total}</i>
    `;
    contenedorCarrito.appendChild(filaFinal);
}

// ELIMINA LOS PRODUCTOS QUE ESTAN EN LA LISTA DEL CARRITO
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

// SE AGREGO
//  llama a la funcion 
document.addEventListener('DOMContentLoaded',()=>{
    fetchData()
})

// busca la informacion en el documento json
const fetchData = async ()=>{
    try {
                const res = await fetch('.../json/datos.json');
                const data = await res.json()   
                pintarCards(data)
            } catch (error) {
                 console.log(error);
            }
}

/*//INSTANCIO DE PROMESA
const pedirProductos = () => {
    productos.innerHTML = `<h2>Cargando....</h2>`;
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            try {
                const res = await fetch('../json/datos.json');
                const data = await res.json()   
                pintarCards(data)
            } catch () {
                 reject("error de datos");
            }
        },2500);
    })
};*/

// recorre todos los datos del json para poder pintar en cada tarjeta
const pintarCards =data =>{
    console.log(data);
    productos.innerHTML = ""; 
    data.forEach(produc => {
        pintarHTML(produc);
    })
}

function pintarHTML(producto) {
    // RECORRE EL CARRITO Y GENERA LA LISTA DEL CARRITO EN HTML
    const fila=document.createElement('div'),
    imagen =document.createElement('div'),
    infor =document.createElement('div');

        imagen.innerHTML=`
        <img src="${producto.img}"></img>
        `;
        infor.innerHTML=`
        <h4>${producto.id}</h4>
        <h3>${producto.titulo}</h3>
        <h5>${producto.descripcion}</h5>
        <p>${producto.precio+"mill. € "}</p>
        <button class="agregar-carrito"> Agregar al Carrito </button>
        `;
        fila.appendChild(imagen);
        fila.appendChild(infor);
        listaProductos.appendChild(fila)
}

