function app() {

    const HEADERS = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })


    /* document.querySelector("#buttonAdd")
     .addEventListener('click', enviarDatos());*/

    /*document.querySelector("#btnAjaxItem")
    .addEventListener('click', getDatos)

    document.querySelector("#btnAjaxAdd")
    .addEventListener('click', postDatos) // Añadir

    document.querySelector("#btnAjaxModif")
    .addEventListener('click', putDatos) //Modif

    document.querySelector("#btnAjaxBorrar")
    .addEventListener('click', deleteDatos)*/

    //Muestra el listado de tareas inicial.
    getDatos()

    //Event Listener del botón de Añadir nueva tarea.
    let boton = document.getElementById("add")
    boton.addEventListener('click', postDatos)





    function getDatos() {
        let url = 'http://localhost:3000/tareas'
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    return new Promise((resolve, reject) => {
                        resolve('Error de conexion ' + response.status)
                    })
                }
            })
            .then(data => {
                mostrarDatos(data)
            })
    }


    function mostrarDatos(data) {
        let lista = document.getElementById('lista')
        lista.innerHTML = ""
        let listado = ""

        if (data.length>0) {
            document.getElementById('notice').classList.remove('error')
            document.getElementById('notice').classList.add('hidden')
            data.forEach(element => {
                listado += '<li>' + element.descripcion + '<button id="' + element.id + '" class="delete">Delete</button></li>'
            });
        } else {
            document.getElementById('notice').classList.remove('hidden')
            lista.innerHTML= "No tienes tareas pendientes"
        }

        lista.innerHTML = listado

        //Añado los event listeners..
        let botonesBorrar = document.getElementsByClassName('delete')
        for (let i = 0; i < botonesBorrar.length; i++) {
            botonesBorrar.item(i).addEventListener('click', deleteDatos)
        }


    }
    function postDatos(ev) {
        ev.preventDefault()
        if (validar()) {
        let tamaño = document.getElementsByClassName('delete').length
        let idLastItem=1;
        if (tamaño>=1) {
        idLastItem = Number(document.getElementsByClassName('delete').item(tamaño-1).id) +1
        }
 
        let desc = document.querySelector('#task-input').value
        let data = {
            id: idLastItem,
            descripcion: desc
        }
        let options = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(data)
        }
        let url = 'http://localhost:3000/tareas/'
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getDatos()
            })
        }
    }

    function validar() {
        if (document.querySelector('#task-input').checkValidity() == false) {
            console.log('me valida????')
            let notice = document.getElementById('notice')
            notice.innerHTML="Por favor, introduce una tarea."
            notice.classList.remove('hidden')
            notice.classList.add('error')
            notice.focus()
            return false
        }
        return true;
    }

    function deleteDatos(ev) {
        let itemId = Number(ev.target.id)
        let options = {
            method: 'DELETE',
            headers: HEADERS
        }

        if (ev.target) {
            url = 'http://localhost:3000/tareas/' + itemId
        } else {
            return
        }
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                getDatos()
            })
    }




}


window.addEventListener("load", app, false)