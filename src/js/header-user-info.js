'use strict'

const iconImg = document.getElementById('user-icon')
const userName = document.getElementById('user-name')

const setInfo = () => {
    iconImg.src = localStorage.getItem('userProfileIcon')
    iconImg.alt = localStorage.getItem('userName')
    userName.textContent = localStorage.getItem('userName')
}

window.addEventListener('load', setInfo)