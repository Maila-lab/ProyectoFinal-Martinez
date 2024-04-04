const inputUsername = document.getElementById('username'),
    inputPassword = document.getElementById('password'),
    checkbox = document.querySelector("#check"),
    btnEntrar = document.getElementById('button')
    contenedorForm = document.querySelector('.fa-error-solid');  

// SECTOR DE LOS USUARIOS
class Usuario{
    constructor(username,password){
        this.username=username;
        this.password=password;
        
    }
}

// SI VOLVES A INGRESAR Y SE GUARDO TUS DATOS, YA TE LOS REESCRIBE PARA SOLO APRETAR EL BOTON DE INICIAR
const recuperoUsuario= JSON.parse(localStorage.getItem('usuario'));//RECUPERA UN OBJETO
if(JSON.parse(localStorage.getItem('usuario')) != null){
    document.getElementById('username').value=recuperoUsuario.username;
    document.getElementById('password').value=recuperoUsuario.password;
}

// DECLARACION E INICIALIZACION DE VARIABLES USUARIOS
const arrUsuarios=[];
let esUsuario=undefined;

// GENERACION DE ARRAY E INICIALIZACION DE OBJETOS
arrUsuarios.push(new Usuario("invitado","invitado"));
arrUsuarios.push(new Usuario("emi22","patagones2"));

//GUARDA EN MEMORIA EL USUARIO 
function guardarEnLS(storage){
    const data = {
        username: inputUsername.value,
        password: inputPassword.value
    }
    storage=="local"&&localStorage.setItem("usuario",JSON.stringify(data));
    storage=="session"&&localStorage.setItem("usuario",JSON.stringify(data));

}

// ACCION DEL BOTON DE ENTRAR
btnEntrar.addEventListener('click', (e) => {
    e.preventDefault()
    const data = {
        username: inputUsername.value,
        password: inputPassword.value
    }
    if (data.username==""|| data.password=="") {
        alert("ERROR, todos los campos son obligatorio");   
        document.getElementById("username").focus;     
    }else{
        esUsuario = arrUsuarios.find((e)=>(e.username===data.username)&&(e.password===data.password));
        // VERIFICA SI ES CORRECTO EL USUARIO Y LO GUARDA EN LS, SI ES QUE TIENE CHECKBOX TILDADO
        if(esUsuario!= undefined){
            if (checkbox.checked) {
                guardarEnLS("local");
            }
            window.open("menu.html")
        }else{
            // MENSAJE DE ERROR
            const msjError= document.createElement('div');
            msjError.innerHTML= `
            <p>${"ERROR, EL USUARIO NO EXISTE"}</p>
            <p>${"VUELVA A INTENTARLO DE NUEVO"}</p>
            `;
            contenedorForm.appendChild(msjError);
            //alert("ERROR, EL USUARIO NO EXISTE");
            document.getElementById('username').value="";
            document.getElementById('password').value="";
        }    
    }
})

