import { FormContact } from './form-contact.js'

export class Main {

    constructor() {
        // elementos del DOM
        this.oBtnMenu = document.querySelector('#menuBtn')
        this.oMenuBottom = document.querySelector('#bottom-menu')

        this.aMenu = document.querySelectorAll("nav#top-menu a")
        this.aSections = document.querySelectorAll("section")
        this.oOffsets = []

        /**Links del menu-top y objectos sections */
        this.olinkPortada= document.querySelector('#lportada')
        this.oSeccionPortada = document.querySelector('#portada')
        this.olinkQuienSoy = document.querySelector('#lquiensoy')
        this.oSeccionQuienSoy = document.querySelector('#quiensoy')
        this.olinkestudios = document.querySelector('#lestudios')
        this.oSeccionestudios = document.querySelector('#estudios')
        this.olinkexperiencia = document.querySelector('#lexperiencia')
        this.oSeccionexperiencia = document.querySelector('#experiencia')
        this.olinksobremi = document.querySelector('#lsobremi')
        this.oSeccionsobremi = document.querySelector('#sobremi')
        this.olinkcontacto = document.querySelector('#lcontacto')
        this.oSeccioncontacto= document.querySelector('#contacto')

        /**Links del menu-button */

        this.olinkPortadaf=document.querySelector('#lportadaf')
        this.olinkQuienSoyf = document.querySelector('#lquiensoyf')
        this.olinkestudiosf = document.querySelector('#lestudiosf')
        this.olinkexperienciaf = document.querySelector('#lexperienciaf')
        this.olinksobremif = document.querySelector('#lsobremif')
        this.olinkcontactof = document.querySelector('#lcontactof')



        //Formulario de contacto

        this.oFormContact = new FormContact()

        //Prepara el array de offsets usado en el sticky menu
        this.prepararNavegacion()



    }

    defineEventListeners() {
        this.oBtnMenu.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkPortada.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkQuienSoy.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkestudios.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkexperiencia.addEventListener('click', this.smoothScroll.bind(this))
        this.olinksobremi.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkcontacto.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkPortadaf.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkQuienSoyf.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkestudiosf.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkexperienciaf.addEventListener('click', this.smoothScroll.bind(this))
        this.olinksobremif.addEventListener('click', this.smoothScroll.bind(this))
        this.olinkcontactof.addEventListener('click', this.smoothScroll.bind(this))

        window.addEventListener('scroll', this.changeMenuStyle.bind(this))
    }


    changeMenuStyle() {
        let pageOffset = window.pageYOffset
        let menuItem = 0
        if (pageOffset >= this.oOffsets['#portada'] && pageOffset < this.oOffsets['#quiensoy']) {
            menuItem = 0
        } else if (pageOffset >= this.oOffsets['#quiensoy'] && pageOffset < this.oOffsets['#estudios']) {
            menuItem = 1
        } else if (pageOffset >= this.oOffsets['#estudios'] && pageOffset < this.oOffsets['#experiencia']) {
            menuItem = 2
        } else if (pageOffset >= this.oOffsets['#experiencia'] && pageOffset < this.oOffsets['#sobremi']) {
            menuItem = 3
        } else if (pageOffset >= this.oOffsets['#sobremi'] && pageOffset < this.oOffsets['#contacto']) {
            menuItem = 4
        } else {
            menuItem = 5
        }

        this.aMenu.forEach(
            (item) => item.classList.remove('active')
        )

        this.aMenu[menuItem].classList.add('active')

    }

    prepararNavegacion() {
        this.aSections.forEach(
            (item) => {
                let cumulative = this.cumulativeOffset(item);
                this.oOffsets['#' + item.id] = cumulative;
            }
        )
        console.log(this.oOffsets)
    }

    cumulativeOffset(element) {
        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while (element);
        return top;
    }

    smoothScroll(oEvent) {
        let value = oEvent.target.id
        let elm;
        oEvent.preventDefault();

        if (value == 'menuBtn') elm=this.oMenuBottom
        if (value == 'lportada' || value == 'lportadaf') elm=this.oSeccionPortada
        if (value == 'lquiensoy' || value =='lquiensoyf') elm=this.oSeccionQuienSoy
        if (value == 'lestudios' || value == 'lestudiosf') elm=this.oSeccionestudios
        if (value == 'lexperiencia' || value == 'lexperienciaf') elm=this.oSeccionexperiencia
        if (value == 'lsobremi' || value == 'lsobremif') elm=this.oSeccionsobremi
        if (value == 'lcontacto' || value == 'lcontactof') elm=this.oSeccioncontacto

        //Determina la posición actual a partir de la cual realizar el scroll
        let startY = window.pageYOffset;
        let stopY = this.elmYPosition(elm);

        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        } else {
        for (let i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
    }
    }

    /**Calcula el offsetY del elemento pasado como parámetro */
    elmYPosition(element) {
        let y = element.offsetTop;
        let node = element;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    }



}