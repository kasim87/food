function modal() {
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
}

module.exports = modal