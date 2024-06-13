'use strict'

import { getUserById, postValidationUser } from "./functions.js"

const staySigned = localStorage.getItem('staySigned')

const loginForm = document.getElementById('login-form')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const staySignedInput = document.getElementById('stay-signed')
const loginButton = document.getElementById('login-button')

const inputValidationErrorMessage = () => {
    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-blue-3"> Preencha todas as informações corretamente<p>',
        icon: 'warning',
        iconColor: '#E8B455',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })  
}

const inputUserNotFoundMessage = () => {
    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-blue-3"> Email ou senha incorretos <p>',
        icon: 'warning',
        iconColor: '#E8B455',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })  
}

const loadingMessage = () => {
    Swal.fire({
        position: 'center',
        title: '<p class="text-2xl text-white"> Verificando Login... <p>',
        imageUrl: "./src/images/loading.gif",
        imageWidth: '20%',
        background: "#E8B455",
        imageAlt: "Carregamento",
        showConfirmButton: false,
        padding: '0 0 28px 0',
        width: '25rem',
        heightAuto: false
    })
}

const login = async() => {

    loadingMessage()

    const email = emailInput.value
    const password = passwordInput.value

    if (email == ''  || !email.includes('@') || !email.includes('.com') || password == ''){

        inputValidationErrorMessage()  

    } else {

        const loginInfo = {
            email: email,
            senha: password
        }

        let userValidation = await postValidationUser(loginInfo)

        if(userValidation.status){

            const user = await getUserById(userValidation.usuario[0].id)

            localStorage.setItem('userId', user.usuario[0].id)
            localStorage.setItem('userProfileIcon', user.usuario[0].foto_perfil)
            localStorage.setItem('userName', user.usuario[0].nome)

            if(staySignedInput.checked){
                localStorage.setItem('staySigned', 'true')
            }

            window.location.href = './src/pages/home.html'

        }

        inputUserNotFoundMessage()


    }

}

emailInput.addEventListener('keypress', (e) => { if(e.key == 'Enter') {login()} })
passwordInput.addEventListener('keypress', (e) => { if(e.key == 'Enter') {login()} })
loginButton.addEventListener('click', login)

window.addEventListener('load', () => {
    if(staySigned == 'true'){
        window.location.href = './src/pages/home.html'
    }
})
