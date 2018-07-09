export class Main {

    constructor() {
        // elementos del DOM
        this.oBtnMenu = document.querySelector('#menuBtn');
        this.oMenuBottom= document.querySelector('#bottom-menu');

        this.aMenu = document.querySelectorAll("nav#top-menu a")
        this.aSections = document.querySelectorAll("section")
        this.oOffsets = []

        this.prepararNavegacion()
    }

    defineEventListeners() {

        this.oBtnMenu.addEventListener('click', this.smoothScroll.bind(this));
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

    smoothScroll() {
        //Determina la posición actual a partir de la cual realizar el scroll
        let startY = window.pageYOffset;
        console.log(startY);
        let stopY = this.elmYPosition(this.oMenuBottom);
        console.log(stopY);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
         var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }


    elmYPosition(element) {
        var y = element.offsetTop;
        var node = element;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
}