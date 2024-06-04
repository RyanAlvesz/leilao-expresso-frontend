'use strict'

import { uploadImage } from "./firebase.js"

// Register Account
const registerSection = document.getElementById('register-account')
const registerForm = document.getElementById('form-account')
const nameInput = document.getElementById('name')
const phoneInput = document.getElementById('phone')
const cpfInput = document.getElementById('cpf')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const showPasswordButton = document.getElementById('show-password')
const staySignedInput = document.getElementById('stay-signed-register')
const registerButton = document.getElementById('register-button')

// Register Address
const addressSection = document.getElementById('register-address')
const addressForm = document.getElementById('form-address')
const cepInput = document.getElementById('cep')
const placeInput = document.getElementById('place')
const houseNumberInput = document.getElementById('house-number')
const complementInput = document.getElementById('complement')
const neighborhoodInput = document.getElementById('neighborhood')
const cityInput = document.getElementById('city')
const addressButton = document.getElementById('address-button')
const skipAddress = document.getElementById('skip-address')

// Register Profile Picture
const profilePictureSection = document.getElementById('register-profile-picture')
const profilePictureForm = document.getElementById('form-profile-picture')
const profilePicture = document.getElementById('profile-picture')
const profilePictureLabel = document.getElementById('profile-picture-label')
const profilePictureStandardImage = document.getElementById('profile-picture-standard-image')
const profilePictureButton = document.getElementById('profile-picture-button')
const skipProfilePicture = document.getElementById('skip-profile-picture')


const passwordInputOutline = () => {
    passwordInput.parentElement.classList.contains('outline') ? passwordInput.parentElement.classList.remove('outline') : passwordInput.parentElement.classList.add('outline')
}

const showPassword = () => {
    passwordInput.type != 'password' ? passwordInput.type = 'password' : passwordInput.type = 'text'
    passwordInput.type != 'password' ? showPasswordButton.children[0].src = '../images/svg/eye-closed.svg' : showPasswordButton.children[0].src = '../images/svg/eye.svg'
}

const checkInput = () => {
    const img = staySignedInput.nextElementSibling.children[0]
    staySignedInput.checked == true ? img.classList.remove('hidden') : img.classList.add('hidden')
    staySignedInput.checked == true ? staySignedInput.nextElementSibling.classList.remove('bg-gray-3') : staySignedInput.nextElementSibling.classList.add('bg-gray-3')
    staySignedInput.checked == true ? staySignedInput.nextElementSibling.classList.add('bg-brown-3') : staySignedInput.nextElementSibling.classList.remove('bg-brown-3')
}

const removeRegisterSection = () => {
    registerSection.classList.add('hidden')
}

const showAddressSection = () => {
    addressSection.classList.remove('-z-10')
    addressSection.classList.remove('opacity-0')
    addressSection.classList.add('opacity-100')
}

const removeAddressSection = () => {
    addressSection.classList.add('hidden')
}

const showProfilePicureSection = () => {
    profilePictureSection.classList.remove('-z-10')
    profilePictureSection.classList.remove('opacity-0')
    profilePictureSection.classList.add('opacity-100')
}

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

const getInfoCEP = async(cep) => {

    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url)
    const cepInfo = await response.json()
    
    return cepInfo

}

const phoneMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,'($1) $2')
    value = value.replace(/(\d)(\d{4})$/,'$1-$2')
    return value
}

const cpfMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{3})(\d)/,'$1.$2')
    value = value.replace(/(\d{3})(\d)/,'$1.$2')
    value = value.replace(/(\d)(\d{2})$/,'$1-$2')
    return value
}

const cepMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d)(\d{3})$/,'$1-$2')
    return value
}

const loadingGif = () => {
    profilePictureStandardImage.src = '../images/loading.gif'
    profilePictureStandardImage.classList.add('hidden', 'w-1/2', 'h-1/2')
    profilePictureStandardImage.classList.remove('hidden', 'w-full', 'h-full')
}

const getProfilePictureImage = async() => {

    loadingGif()
    const url = await uploadImage(profilePicture.files[0], 'profile-icon')
    localStorage.setItem('profile-icon-url', url)
    changePictureImagePreview(url)

}

const changePictureImagePreview = (img) => {
    profilePictureLabel.style.backgroundImage = `url('${img}')`
    profilePictureStandardImage.classList.add('hidden')
}

passwordInput.addEventListener('focus', passwordInputOutline)
passwordInput.addEventListener('focusout', passwordInputOutline)
showPasswordButton.addEventListener('click', showPassword)
staySignedInput.addEventListener('click', checkInput)
profilePicture.addEventListener('change', getProfilePictureImage)

phoneInput.addEventListener('keyup', () => {
    phoneInput.value = phoneMask(phoneInput.value)
})

cpfInput.addEventListener('keyup', () => {
    cpfInput.value = cpfMask(cpfInput.value)
})

cepInput.addEventListener('keyup', () => {
    cepInput.value = cepMask(cepInput.value)
})

cepInput.addEventListener('keyup', (e) => {
    if(e.key == 'Enter'){
        searchAddressByCEP()
    }
})

registerButton.addEventListener('click', () => {
    removeRegisterSection()
    showAddressSection()
})

skipAddress.addEventListener('click', () => {
    removeAddressSection()
    showProfilePicureSection()
})
