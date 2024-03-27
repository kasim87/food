window.addEventListener('DOMContentLoaded', () => {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items')
        ;

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none'
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block'
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent()
    showTabContent()

    tabParent.addEventListener('click', (event) => {
        const target = event.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)                
                }
            })
        }
    })

    //Timer
    const deadline = '2024-03-21'

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds
        let t = Date.parse(endTime) - Date.parse(new Date())
        
        if (t <= 0) {
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24))
            hours = Math.floor((t /  (1000 * 60 * 60) % 24))
            minutes = Math.floor((t / 1000 / 60) % 60)
            seconds = Math.floor((t / 1000) % 60)
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(endTime) {
        const timer = document.querySelector('.timer'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000)
            ;
        
        updateClock()

        function updateClock() {
            const t = getTimeRemaining(endTime)

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock(deadline)

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal')
        ;

    function openModel() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModel)
    })

    function closeMode() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeMode()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeMode()
        }
    })

    const modalTimerId = setTimeout(openModel, 5000)

    function showModalByScroll() {
        if (window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1) {
            openModel()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

    // used cart

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src
            this.alt = alt
            this.title = title
            this.descr = descr
            this.price = price
            this.classes = classes
            this.parent = document.querySelector(parentSelector)
            this.transfer = 450
            this.changeToUAN()
        }

        changeToUAN() {
            this.price = this.price * this.transfer
        }

        render() {
            const element = document.createElement('div')

            if (this.classes.length === 0) {
                this.element = 'menu__item'
                element.classList.add(this.element)
            } else {
                this.classes.forEach(className => element.classList.add(className))
            }

            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> тнг/день</div>
                    </div>
                `
            this.parent.append(element)
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url)
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url} status: ${res.status}`)
        }

        return await res.json()
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
            })
        })

    //form

    const forms = document.querySelectorAll('form')

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так....'
    }

    forms.forEach(item => {
        bindPostData(item)
    })

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content - type': 'application/json'
            },
            body: data
        })

        return await res.json()
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('img')
            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form)

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data)
                showThanksModal(message.success)
                form.reset()
                statusMessage.remove()
            }).catch(() => {
                showThanksModal(message.failure)
            }).finally(() => {
                form.reset()
            })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        openModel()

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeMode()
        }, 4000)
    }

    //slider

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current')
          total = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = slidesWrapper.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width
        ;

    let slideIndex = 1
    let offset = 0

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%'
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.overflow = 'hidden'

    slides.forEach(slyde => {
        slyde.style.width = width
    })

    slider.style.position = 'relative'

    const indicators = document.createElement('ol'),
          dots = []
        ;

    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `
    slider.append(indicators)

    for (let i = 1; i <= slides.length; i++) {
        const dot = document.createElement('li')
        dot.setAttribute('data-slide-to', i)
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        if (i == 1) {
            dot.style.opacity = 1
        }

        indicators.append(dot)
        dots.push(dot)
    }

    function dotsOpacity(){
        dots.forEach(dot => dot.style.opacity = '.5')
        dots[slideIndex - 1].style.opacity = '1'
    }

    function currentNum() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex
        }
    }

    function transform() {
        slidesField.style.transform = `translateX(-${offset}px)`
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, '')
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }

        if (slideIndex == slides.length) {
            slideIndex = 1
        } else {
            slideIndex ++
        }

        transform()
        currentNum()
        dotsOpacity()
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width)
        }

        if (slideIndex == 1) {
            slideIndex = slides.length
        } else {
            slideIndex --
        }

        transform()
        currentNum()
        dotsOpacity()
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to')

            slideIndex = slideTo

            offset = deleteNotDigits(width) * (slideIndex - 1)

            transform()
            currentNum()
            dotsOpacity()
        })
    })
    
    //calc

    const result = document.querySelector('.calculating__result span')
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '________'
            return
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8  * height) - (5.7 * age)) * ratio)
        }
    }

    calcTotal()

    function getStaticInformation(parentSelestor, activClass) {
        let elements = document.querySelectorAll(`${parentSelestor} div`)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')
                } else {
                    sex = e.target.getAttribute('id')
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activClass)
                })
    
                e.target.classList.add(activClass)
    
                calcTotal()
            })
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active')
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active')

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height': 
                    height = +input.value
                    break
                case 'weight': 
                    weight = +input.value
                    break
                case 'age': 
                    age = +input.value
                    break
            }

            calcTotal()
        })
    }

    getDynamicInformation('#height')
    getDynamicInformation('#weight')
    getDynamicInformation('#age')
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