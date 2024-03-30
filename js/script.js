import tabs from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import card from './modules/card';
import form from './modules/form';
import slider from './modules/slider';
import calc from './modules/calculator';
import openModel from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModel('.modal', modalTimerId), 300000)

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active')
    timer('2024-06-01')
    modal('[data-modal]', '.modal', modalTimerId)
    card()
    form('form', modalTimerId)
    slider({
        slide: '.offer__slide',
        container: '.offer__slider',
        prevArraw: '.offer__slider-prev',
        nextArraw: '.offer__slider-next',
        currentCounter: '#current',
        totalCurrent: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    })
    calc()
})





  
















    // let slideIndex = 1

    // showSlides(slideIndex)

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`
    // } else {
    //     total.textContent = slides.length
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length
    //     }

    //     slides.forEach(item => item.style.display = 'none')

    //     slides[slideIndex - 1].style.display = 'block'

        // if (slides.length < 10) {
        //     current.textContent = `0${slideIndex}`
        // } else {
        //     current.textContent = slideIndex
        // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1)
    // })

    // next.addEventListener('click', () => {
    //     plusSlides(1)
    // })