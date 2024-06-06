'use strict'

const passwordInput = document.getElementById('password')
const showPasswordButton = document.getElementById('show-password')
const staySignedInput = document.getElementById('stay-signed')

const passwordInputOutline = () => {
    passwordInput.parentElement.classList.contains('outline') ? passwordInput.parentElement.classList.remove('outline') : passwordInput.parentElement.classList.add('outline')
}

const showPassword = () => {
    passwordInput.type != 'password' ? passwordInput.type = 'password' : passwordInput.type = 'text'
    if(passwordInput.classList.contains('login')){
        passwordInput.type != 'password' ? showPasswordButton.children[0].src = './src/images/svg/eye-closed.svg' : showPasswordButton.children[0].src = './src/images/svg/eye.svg'
    } else {
        passwordInput.type != 'password' ? showPasswordButton.children[0].src = '../images/svg/eye-closed.svg' : showPasswordButton.children[0].src = '../images/svg/eye.svg'
    }
}

const checkInput = () => {
    const img = staySignedInput.nextElementSibling.children[0]
    staySignedInput.checked == true ? img.classList.remove('hidden') : img.classList.add('hidden')
    staySignedInput.checked == true ? staySignedInput.nextElementSibling.classList.remove('bg-gray-3') : staySignedInput.nextElementSibling.classList.add('bg-gray-3')
    staySignedInput.checked == true ? staySignedInput.nextElementSibling.classList.add('bg-brown-3') : staySignedInput.nextElementSibling.classList.remove('bg-brown-3')
}

passwordInput.addEventListener('focus', passwordInputOutline)
passwordInput.addEventListener('focusout', passwordInputOutline)
showPasswordButton.addEventListener('click', showPassword)
staySignedInput.addEventListener('click', checkInput)