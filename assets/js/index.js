import {Main} from './main.js'

(function() {
    window.addEventListener("load", 
    () => { new Main().defineEventListeners()})
})()
