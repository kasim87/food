'use strict';

const BOX = document.getElementById(''),
      btns = document.getElementsByTagName
      circles = document.getElementsByClassName(''),
      
      wrapper = document.querySelector('.wrapper'),
      hearts = wrapper.querySelectorAll('.heart');

BOX.style.backgroundColor = 'blue'
BOX.style.width = '100px'
btns[1].style.backgroundColor = '100%'
BOX.style.cssText = `background-color: red; width: ${a}px`
hearts.forEach(element => {
    element.style.backgroundColor = 'red'
});

const div = document.createElement('div')

div.classList.add('black')
document.body.append(div)
document.querySelector('.wrapper').append(div)
wrapper.prepend(div) //начало
wrapper.append(div) //послендний
wrapper[0].before(div) //начало
wrapper[0].after(div) //послендний

circles[0].remove()
hearts[0].replaceWith(circles[1]) //замена элемент

div.innerHTML = '<h1>hello world</h1>' иле 'hello world'
div.textContent = 'hello world'