'use strict'

const iconImg = document.getElementById('user-icon')
const userName = document.getElementById('user-name')

const setInfo = () => {

    const userIcon = localStorage.getItem('userProfileIcon')

    if(userIcon != 'null' && userIcon != 'undefined'){
        iconImg.src = userIcon
    } else {
        iconImg.src = 'https://firebasestorage.googleapis.com/v0/b/leilao-expresso.appspot.com/o/profile-icon%2Ficon.png?alt=media&token=2fbadc66-0b13-4eed-8360-7f87ea1076b7'
    }

    iconImg.alt = localStorage.getItem('userName')
    userName.textContent = localStorage.getItem('userName')
    
}

window.addEventListener('load', setInfo)