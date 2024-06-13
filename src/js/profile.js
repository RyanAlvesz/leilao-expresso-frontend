import { getUserById } from "./functions.js"

const profileName = document.getElementById('profile-name')
const profileCPF = document.getElementById('profile-cpf')
const profileTel = document.getElementById('profile-tel')
const profileEmail = document.getElementById('profile-email')
const userIcon = document.getElementById('user-icon')
const userName = document.getElementById('user-name')
const userEmail = document.getElementById('user-email')
const profilePassword = document.getElementById('profile-password')



const setProfileInfo = async(usuario) => {

    profileName.value = usuario.nome
    profileCPF.value = usuario.cpf
    profileTel.value = usuario.telefone
    profileEmail.value = usuario.email 
    userName.textContent = usuario.nome
    userEmail.textContent = usuario.email

    if(usuario.foto_perfil == 'null'){
        userIcon.src = 'https://firebasestorage.googleapis.com/v0/b/leilao-expresso.appspot.com/o/profile-icon%2Ficon.png?alt=media&token=2fbadc66-0b13-4eed-8360-7f87ea1076b7'
    }else{
        userIcon.src = usuario.foto_perfil
    }

}


// Máscaras de INPUT
const phoneMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,'($1) $2')
    value = value.replace(/(\d)(\d{4})$/,'$1-$2')
    return value
}

profileTel.addEventListener('keyup', () => {
    profileTel.value = phoneMask(profileTel.value)
})

const cpfMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{3})(\d)/,'$1.$2')
    value = value.replace(/(\d{3})(\d)/,'$1.$2')
    value = value.replace(/(\d)(\d{2})$/,'$1-$2')
    return value
}

profileCPF.addEventListener('keyup', () => {
    profileCPF.value = cpfMask(profileCPF.value)
})


// Tela de carregamento
window.addEventListener('load', async() => {

    const usuarioJSON = await getUserById(localStorage.getItem('userId'))
    setProfileInfo(usuarioJSON.usuario[0])
    document.getElementById('loader').classList.add('hidden')

})