
/* dle elemento username toma el valor que se escriba en el input se puede acceder a todas las propiedades del objeto no  solo value
aqui se esta comunicando el cliente con el servidor   u se lo envia a rpaseadores, el nombre de la funcion debe iniciar en minusculas y los obje inicia en mayus si son objetos  */

function register() {
    
    var data = {
        user: document.getElementById("username").value,
        pass: document.getElementById("password").value,
        role: document.getElementById("role").value
    } ;
    console.log( data ) ;

    fetch( "http://localhost:3000/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    
    .catch( (err) => { alert( "ERROR:" + err ) } ) ;
}

/* Esta funcion es llamada desde el HTML */
function login() {
   
    var data = {
        user: document.getElementById("username").value,
        pass: document.getElementById("password").value
    } ;


    fetch( "http://localhost:3000/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

       if( rta.info.length > 0 ) {
        sessionStorage.setItem("role", rta.info[0].role_id.role)
        if( rta.info[0].role_id.role == "Dueno" ) {
        window.location.href = "dueno.html"}
        else if( rta.info[0].role_id.role == "Paseador" ) {
        window.location.href = "paseador.html"}
        else if( rta.info[0].role_id.role == "Admin" ) {
            console.log("entre")
            window.location.href = "mascota.html"
        }
        }else{
            alert("Usuario o Contraseña Incorrecta")
        }
        
     } )
    .catch( (err) => { console.log( "ERROR:" + err ) } ) ;
}
