export class FormContact {
    constructor() {
        // Elementos del DOM del formulario.
        this.oFormContact = document.querySelector('#contacto')
        this.oInputName = document.querySelector('#nombre')
        this.oInputEmail = document.querySelector('#email')
        this.oSelectConocido = document.querySelector('#como-me-has-conocido')
        this.oInputPhone = document.querySelector('#telefono')
        this.oTextMessage = document.querySelector('#mensaje')
        this.oDimeComo= document.querySelector('#dime_como_me_has_conocido')
        this.olinkcerrar = document.querySelector('#cerrarCapa')
        this.oCajaError = document.querySelector('#capa_error')

        // Palabras y palabras restantes
        this.oPalRestantes = document.querySelector('#palabras_restantes')
        this.oContadorPal = document.querySelector('#contador_palabras')

        // Estructura dónde se almacenan los datos introducidos por el usuario
        this.oData = {
            name: '',
            email: '',
            conocido: '',
            phone: '',
            message: ''
        }

        //Reseteamos los valores del formulario
        this.resetearFormulario()

        this.oFormContact.addEventListener('submit', this.leerContacto.bind(this))
        this.oTextMessage.addEventListener('keyup', this.contarPalabras.bind(this))
        this.oSelectConocido.addEventListener(
            'change',
            this.comprobarValorOtros.bind(this)
        )

    }

    
    resetearFormulario() {
        this.oInputName.value=""
        this.oInputEmail.value=""
        this.oInputPhone.value=""
        this.oTextMessage.value=""
        this.oDimeComo.value=""

    }

    contarPalabras() {
        var palabras = this.oTextMessage.value.match(/\S+/g).length
        console.log(palabras)
        this.oContadorPal.innerHTML = palabras
        this.oPalRestantes.innerHTML = 150 - palabras
    }

    comprobarValorOtros() {
        this.oDimeComo.value=""
        if (this.oSelectConocido.value == 'Otros') {
             if (this.oDimeComo.classList.contains('inactive')) {
                 this.oDimeComo.classList.remove('inactive')
                this.oDimeComo.classList.add('toogle')
             }
        } else {
            if (this.oDimeComo.classList.contains('toogle')) {
                this.oDimeComo.classList.remove('toogle')
                this.oDimeComo.classList.add('inactive')
            }
        }
    }

   

    leerContacto(oEvent) {
        oEvent.preventDefault()
        let validacion = this.validar()
        console.log(validacion)
        if (validacion) {
            // Advertimos de éxito en el envío del formulario, simulando su envio.
            document.getElementById('texto_capa_error').innerText =
                'Formulario enviado con éxito'
            this.aniadecapa('capa_error', 'success')
            this.borracapa('capa_error', 'error')
            oEvent.preventDefault()
            this.guardarDatos()
        } else {
            this.borracapa('capa_error', 'success')
            this.aniadecapa('capa_error', 'error')
        }
    }

    guardarDatos() {
        this.oData = {
            name: this.oInputName,
            email: this.oInputEmail,
            conocido: this.oSelectConocido,
            phone: this.oInputPhone,
            message: this.oTextMessage
        }
        console.dir(this.oData)
    }

    // Función que añade la capa si no existe
    aniadecapa(capa, capa_aniadida) {
        if (!document.getElementById(capa).classList.contains(capa_aniadida)) {
            document.getElementById(capa).classList.add(capa_aniadida)
        }
    }

    // Función que borra la capa si existe
    borracapa(capa, capa_borrar) {
        if (document.getElementById(capa).classList.contains(capa_borrar)) {
            document.getElementById(capa).classList.remove(capa_borrar)
        }
    }

    validar() {
        if (this.oInputName.checkValidity() == false) {
            document.getElementById('capa_error').style.display = 'block'
            document.getElementById('texto_capa_error').innerText =
                'Escribe tu nombre'
            this.oInputName.focus()
            return false
        }

        // Validar email (Formato)
        if (this.oInputEmail.checkValidity() == false) {
            document.getElementById('capa_error').style.display = 'block'
            document.getElementById('texto_capa_error').innerText = 'Correo electrónico no válido'
            this.oInputEmail.focus()
            return false
        }

        if (this.oInputPhone.checkValidity() == false) {
            document.getElementById('capa_error').style.display = 'block'
            document.getElementById('texto_capa_error').innerText =
                'Número de teléfono no válido.'
            this.oInputPhone.focus()
            return false
        }

        //Si el select == Otros comprobar que rellena el campo dime_como_me_has_conocido

        if(this.oDimeComo.checkValidity() == false) {
            document.getElementById('capa_error').style.display = 'block'
            document.getElementById('texto_capa_error').innerText =
                'Introduce cómo me has conocido.'
            this.oDimeComo.focus()
            return false
        }

        // Mensaje de texto no mayor de 150 palabras
        let palabras_restantes = this.oPalRestantes.innerHTML
        if (parseInt(palabras_restantes) < 0) {
            document.getElementById('capa_error').style.display = 'block'
            document.getElementById('texto_capa_error').innerText =
                'Número de palabras excedido'
            return false
        }
        return true
    }
}