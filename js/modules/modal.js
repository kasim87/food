function openModel(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector)

    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'

    console.log(modalTimerId)
    if (modalTimerId) {
        clearInterval(modalTimerId)
    }
}

function closeMode(modalSelector) {
    const modal = document.querySelector(modalSelector) 
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector)
        ;

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModel(modalSelector, modalTimerId))
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeMode(modalSelector)
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeMode(modalSelector)
        }
    })

    function showModalByScroll() {
        if (window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1) {
            openModel(modalSelector, modalTimerId)
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)
}

export default modal
export {openModel}
export {closeMode}