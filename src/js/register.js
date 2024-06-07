'use strict'

import { uploadImage } from "./firebase.js"
import { postUser, postAddress } from './functions.js'

// Register Account
const registerSection = document.getElementById('register-account')
const registerForm = document.getElementById('form-account')
const nameInput = document.getElementById('name')
const phoneInput = document.getElementById('phone')
const cpfInput = document.getElementById('cpf')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const staySignedInput = document.getElementById('stay-signed')
const registerButton = document.getElementById('register-button')

// Register Address
const addressSection = document.getElementById('register-address')
const addressForm = document.getElementById('form-address')
const cepInput = document.getElementById('cep')
const placeInput = document.getElementById('place')
const houseNumberInput = document.getElementById('house-number')
const neighborhoodInput = document.getElementById('neighborhood')
const cityInput = document.getElementById('city')
const addressButton = document.getElementById('address-button')
const returnAddress = document.getElementById('return-address')

// Register Profile Picture
const profilePictureSection = document.getElementById('register-profile-picture')
const profilePictureForm = document.getElementById('form-profile-picture')
const profilePicture = document.getElementById('profile-picture')
const profilePictureLabel = document.getElementById('profile-picture-label')
const profilePictureStandardImage = document.getElementById('profile-picture-standard-image')
const profilePictureButton = document.getElementById('profile-picture-button')
const skipProfilePicture = document.getElementById('skip-profile-picture')
const returnProfilePicture = document.getElementById('return-profile-picture')

// ALERT MESSAGES

const cepErrorMessage = () => {
    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-blue-3"> Informe um CEP válido <p>',
        icon: 'warning',
        iconColor: '#E8B455',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
    })  
}

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

const loadingMessage = () => {
    Swal.fire({
        position: 'center',
        title: '<p class="text-2xl text-white"> Cadastrando... <p>',
        imageUrl: "../images/loading.gif",
        imageWidth: '20%',
        background: "#E8B455",
        imageAlt: "Carregamento",
        showConfirmButton: false,
        padding: '0 0 28px 0',
        width: '25rem',
        heightAuto: false
    })
}

// INPUT Validations

const userInfoValidation = () => {
    let status = true
    if (
        nameInput.value == '' ||
        phoneInput.value == '' ||
        phoneInput.value.length != 15 ||
        cpfInput.value == '' ||
        cpfInput.value.length != 14 ||
        emailInput.value == '' ||
        !emailInput.value.includes('@') ||
        !emailInput.value.includes('.com') ||
        passwordInput.value == '' 
    ) {
        inputValidationErrorMessage()
        status = false
    }
    return status
}

const addressInfoValidation = async() => {
    let status = true
    if (
        cepInput.value == '' ||
        cepInput.value.length != 9 ||
        placeInput.value == '' ||
        houseNumberInput.value == '' ||
        neighborhoodInput.value == '' ||
        cityInput.value == '' ||
        await getInfoCEP(cepInput.value).erro
    ) {
        inputValidationErrorMessage()
        status = false
    }
    return status
}

// SECTION ANIMATION

const removeRegisterSection = () => {
    addressSection.classList.add('-z-10')
    registerSection.classList.add('opacity-0')
    registerSection.classList.remove('opacity-100')    
}

const showRegisterSection = () => {
    registerSection.classList.remove('-z-10')
    registerSection.classList.remove('opacity-0')        
    registerSection.classList.add('opacity-100')
}

const showAddressSection = () => {
    addressSection.classList.remove('-z-10')
    addressSection.classList.remove('opacity-0')
    addressSection.classList.add('opacity-100')
}

const removeAddressSection = () => {
    addressSection.classList.add('-z-10')
    addressSection.classList.add('opacity-0')
    addressSection.classList.remove('opacity-100')        
}

const showProfilePicureSection = () => {
    profilePictureSection.classList.remove('-z-10')
    profilePictureSection.classList.remove('opacity-0')
    profilePictureSection.classList.add('opacity-100')
}

const removeProfilePictureSection = () => {
    profilePictureSection.classList.add('-z-10')
    profilePictureSection.classList.add('opacity-0')
    profilePictureSection.classList.remove('opacity-100') 
}

registerButton.addEventListener('click', () => {
    if(userInfoValidation()){
        removeRegisterSection()
        showAddressSection()
    }
})

addressButton.addEventListener('click', async() => {
    if(await addressInfoValidation()){
        removeAddressSection()
        showProfilePicureSection()
    }
})

returnAddress.addEventListener('click', () => {
    removeAddressSection()
    showRegisterSection()
})

returnProfilePicture.addEventListener('click', () => {
    removeProfilePictureSection()
    showAddressSection()
})


const searchAddressByCEP = async() => {

    if(cepInput.value != '' && cepInput.value.length == 9){

        const cepInfo = await getInfoCEP(cepInput.value.replace('-', ''))

        if(cepInfo.erro){

            cepErrorMessage()

        }else{

            placeInput.value = cepInfo.logradouro
            placeInput.setAttribute('disabled', '')

            neighborhoodInput.value = cepInfo.bairro
            neighborhoodInput.setAttribute('disabled', '')

            cityInput.value = cepInfo.localidade
            cityInput.setAttribute('disabled', '')

        }

    }else{
        cepErrorMessage()
    }

}

// Via CEP API
const getInfoCEP = async(cep) => {

    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const cepInfo = await response.json()
    
    return cepInfo

}

cepInput.addEventListener('keyup', (e) => {
    if(e.key == 'Enter'){
        searchAddressByCEP()
    }
})

// Máscaras de INPUT
const phoneMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,'($1) $2')
    value = value.replace(/(\d)(\d{4})$/,'$1-$2')
    return value
}

phoneInput.addEventListener('keypress', () => {
    phoneInput.value = phoneMask(phoneInput.value)
})

const cpfMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{3})(\d)/,'$1.$2')
    value = value.replace(/(\d{3})(\d)/,'$1.$2')
    value = value.replace(/(\d)(\d{2})$/,'$1-$2')
    return value
}

cpfInput.addEventListener('keypress', () => {
    cpfInput.value = cpfMask(cpfInput.value)
})

const cepMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d)(\d{3})$/,'$1-$2')
    return value
}

cepInput.addEventListener('keypress', () => {
    cepInput.value = cepMask(cepInput.value)
})

// GIF de carregamento de imagme
const loadingGif = () => {
    profilePictureStandardImage.src = '../images/loading.gif'
    profilePictureStandardImage.classList.add('hidden', 'w-1/2', 'h-1/2')
    profilePictureStandardImage.classList.remove('hidden', 'w-full', 'h-full')
}

const getProfilePictureImage = async() => {

    loadingGif()
    profilePictureButton.disabled = true
    const url = await uploadImage(profilePicture.files[0], 'profile-icon')
    localStorage.setItem('profile-icon-url', url)
    changePictureImagePreview(url)
    profilePictureButton.disabled = false
    
}

const changePictureImagePreview = (img) => {
    profilePictureLabel.style.backgroundImage = `url('${img}')`
    profilePictureStandardImage.classList.add('hidden')
}

profilePicture.addEventListener('change', getProfilePictureImage)

// POST USER

// JSON com as informações do usuário que será preenchido
let userInfo = {}

const postAddressFun = async() => {

    const address = {
        cep: cepInput.value,
        logradouro: placeInput.value,
        numero_casa: houseNumberInput.value,
        bairro: neighborhoodInput.value,
        cidade: cityInput.value
    }

    const addressID = await postAddress(address) 
    return addressID.ederecos.id

}

const postUserFun = async(addressID) => {

    let user = {
        nome: nameInput.value,
        email: emailInput.value,
        telefone: phoneInput.value,
        senha: passwordInput.value,
        cpf: cpfInput.value,
        endereco_id: addressID.value
    }

    if (localStorage.getItem('profile-icon-url')) {
        user.foto_perfil = localStorage.getItem('profile-icon-url')
    } else {
        user.foto_perfil = 'https://firebasestorage.googleapis.com/v0/b/leilao-expresso.appspot.com/o/profile-icon%2Ficon.png?alt=media&token=2fbadc66-0b13-4eed-8360-7f87ea1076b7'
    }

    await postAddress(user)

}

const postInfos = async() => {

    loadingMessage()    
    const addressID = await postAddressFun()
    await postUserFun(addressID)
    localStorage.clear()
    if(staySignedInput){
        localStorage.setItem('staySigned', 'true')
    }
    window.location = './home.html'

}

profilePictureButton.addEventListener('click', postInfos)
skipProfilePicture.addEventListener('click', postInfos)