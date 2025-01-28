const role = sessionStorage.getItem("role") ;
console.log( role ) ;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("Nomrole").innerHTML = role ;
    if( role == "Dueno" ) {
        document.getElementById("Nomrole").innerHTML = "Dueño" ;
        document.getElementById("liPa").remove();
    }else if( role == "Paseador"  ) {
        document.getElementById("liD").remove();
        document.getElementById("liM").remove();
    
    }else if( role == "Admin" ) {
        console.log( "exito" )
    }else{
        alert( "usuario invalido" )
        window.location.href = "login.html";
    }

    } )


/* Esta funcion es llamada desde el HTML */
/* la funcion consultarPaseadores esta haciendo el llamado a otra funcion getPaseadores */
function consultarPaseos() {

    getPaseos() ;

    console.log( "FIN" ) ;
    
}

/* esta funcion hace el llamado por medio de la api(interfaz de programación de aplicaciones) fetch  url ,objeto
aqui hacemos el llamado a nuestro servicio o nuestro back,  tipo de contenido q se esta enviando al cuerpo de la solicitud
aqui se esta comunicando el cliente con el servidor   u se lo envia a rpaseadores */
function getPaseos() {

    fetch( "http://localhost:3000/pas/getAllPaseos", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (rta) => { 

        console.log( "=======>" + JSON.stringify(rta) ) ;
        
        verTabla( rta ) ;

     } )
    .catch( (err) => { document.getElementById("rtaPaseos").innerHTML }) ;
}


/* le solicitamos a back  mediante este servicio*/ 
function getPaseo() {

    var data = {
        fechapa: document.getElementById("fecha").value
    } ;

    fetch( "http://localhost:3000/pas/getPaseoXnombre", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 

        console.log( "------->" + JSON.stringify(mm) ) ;
        


        if( mm.rta == "ER" ) {
            document.getElementById("rtaPaseos").innerHTML = "ERROR:" + mm.info ;
        } else {
            if( mm.info.length > 0 ) {
                document.getElementById("fecha").value            = mm.info[0].FECHA ;
                document.getElementById("hora").value          = mm.info[0].HORA ;
                document.getElementById("tiempo").value            = mm.info[0].TIEMPO ;
                document.getElementById("identificador").value          = mm.info[0].IDENTIFICACION ;
                document.getElementById("idpaseador").value            = mm.info[0].IDPASEADOR ;
                document.getElementById("novedades").value          = mm.info[0].NOVEDADES ;
                
            } else {
                alert( "Paseo no existe" ) ;
            }
        }
     } )
    .catch( (err) => { 
        document.getElementById("rtaPaseos").innerHTML = "ERROR:" + err ;
    }) ;

}

function delPaseo() {

    var data = {
        fechapa: document.getElementById("fecha").value
    } ;

    var opc = confirm( "Esta seguro de eliminar el paseo: " + document.getElementById("fecha").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/pas/delPaseo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            if( mm.rta == "ER" ) {
               /* document.getElementById("rtaPaseos").innerHTML = mm.info ;*/
               alert( "ERROR:" + mm.info ) ;
            } else {
               /* document.getElementById("rtaPaseos").innerHTML = " eliminado del sistema: " + mm.info ;*/
                alert( "Paseo eliminado" ) ;
            }

        } )
        .catch( (err) => {
            document.getElementById("rtaPaseos").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}
/* la respuesta llena la tabla en este caso el formulario con la informacion cuando se busca un paseador */
function verTabla( rta ) {

    var mitab = document.getElementById("lstmas").querySelector("tbody") ;
       mitab.innerHTML = "" ;
        for( let i=0 ; i < rta.info.length ; i=i+1 ) {

            tr = document.createElement("tr") ;

            tdFec = document.createElement("td") ;
            tdFec.innerHTML = rta.info[i].FECHA ;
            tr.appendChild( tdFec ) ;

            tdHor = document.createElement("td") ;
            tdHor.innerHTML = rta.info[i].HORA ;
            tr.appendChild( tdHor ) ;

            tdTie = document.createElement("td") ;
            tdTie.innerHTML = rta.info[i].TIEMPO ;
            tr.appendChild( tdTie ) ;

            tdIde = document.createElement("td") ;
            tdIde.innerHTML = rta.info[i].IDENTIMAS.Nommas ;
            tr.appendChild( tdIde ) ;

            tdIdpa = document.createElement("td") ;
            tdIdpa.innerHTML = rta.info[i].IDPASEADOR.NOMBRE ;
            tr.appendChild( tdIdpa ) ;

            tdNov = document.createElement("td") ;
            tdNov.innerHTML = rta.info[i].NOVEDADES ;
            tr.appendChild( tdNov ) ;

            mitab.appendChild( tr ) ;
        }
}

function updPaseo() {

    var data = {
        fechapa:          document.getElementById("fecha").value,
        Horapa:            document.getElementById("hora").value,
        Tiempopa:          document.getElementById("tiempo").value,
        Identimas:   document.getElementById("identificador").value,
        Idpa:     document.getElementById("idpaseador").value,
        Novedadespa: document.getElementById("novedades").value,

    } ;

    var opc = confirm( "Esta seguro de modificar la info del paseo: " + document.getElementById("nombre").value ) ;

    if( opc == true ) {
        fetch( "http://localhost:3000/pas/updPaseo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( data )
        } )
        .then( (rta1) => { return( rta1.json() ) } )
        .then( (mm) => { 
            
            var msg = "" ;

            if( mm.rta == "ER" ) {
                msg = "ERROR: No fue posible actualizar la info Del paseo: " + mm.info ;
            } else {
                if( mm.info.modifiedCount > 0 ){
                    msg = "paseo actualizada con exito: " ;
                } else {
                    msg = "el paseo x actualizar no existe" ;
                }
            }

           /* document.getElementById("rtaPaseos").innerHTML = msg*/
            alert( msg ) ;

        } )
        .catch( (err) => {
            document.getElementById("rtaPaseos").innerHTML = "ERROR:" + err ;
         }) ;
    }
    
}

function addPaseo() {

    var data = {

        fechapa:          document.getElementById("fecha").value,
        Horapa:            document.getElementById("hora").value,
        Tiempopa:          document.getElementById("tiempo").value,
        Identimas:   document.getElementById("identificador").value,
        Idpa:     document.getElementById("idpaseador").value,
        Novedadespa: document.getElementById("novedades").value,
            
        } ;

    fetch( "http://localhost:3000/pas/addpaseo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify( data )
    } )
    .then( (rta1) => { return( rta1.json() ) } )
    .then( (mm) => { 
        
        var msg = "" ;

        if( mm.rta == "ER" ) {
            msg = "ERROR: No fue posible crear el nuevo paseo: " + mm.info ;
        } else {
            msg = "Paseo creada con exito: " ;
        }

        document.getElementById("rtaPaseos").innerHTML = msg
        alert( msg ) ;
        document.getElementById("fecha").value = "" ;
        document.getElementById("hora").value = "" ;
        document.getElementById("tiempo").value = "" ;
        document.getElementById("identificador").value = "" ;
        document.getElementById("idpaseador").value = "" ;
        document.getElementById("novedades").value = "" ; 

    } )
    .catch( (err) => {
        document.getElementById("rtaPaseos").innerHTML = "ERROR:" + err ;
    }) ;
    
}

function cerrarSesion() {
    alert("Sesión cerrada.");
    sessionStorage.clear() ;
    window.location.href = "login.html" ;
    // Aquí puedes añadir la lógica para cerrar sesión
}
