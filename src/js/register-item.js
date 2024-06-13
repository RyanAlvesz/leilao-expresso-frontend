'use strict'

// Declarando infos do input
const itemTitle = document.getElementById('item-title')
const itemDesc = document.getElementById('item-desc')
const itemSellerName = document.getElementById('item-seller-name')
const itemSellerTel = document.getElementById('item-seller-tel')
const itemSellerEmail = document.getElementById('item-seller-email')
const itemDoc = document.getElementById('item-doc')
const itemImage = document.getElementById('item-image')
const itemInicialValue = document.getElementById('item-initial-value')
const itemReserveValue = document.getElementById('item-reserve-value')
const itemHistoric = document.getElementById('item-historic')
const itemPaymentTerm = document.getElementById('item-payment-term')
const itemReturnTerm = document.getElementById('item-return-term')

// Declarando botão de ação do cadastro
const buttonItem = document.getElementById('button-register-item') 

// Funcao que armazena o Toast de sucesso
const SuccessMessage = () => {

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Cadastro concluido com sucesso",
        showConfirmButton: false,
        timer: 1500
    })
}

// Funcao que armazena o Toast de sucesso
const ErrorMessage = () => {

    Swal.fire({
        position: "center",
        icon: "error",
        title: "Não foi possivel concluir o cadastro",
        showConfirmButton: false,
        timer: 1500
    })

}

const itemInfoValidation = () => {
    let status = true
    if (itemTitle.value == '' ||
        itemDesc.value == '' ||
        itemSellerName.value == '' ||
        itemSellerTel.value.length != 15 ||
        itemSellerEmail.value == '' ||
        !itemSellerEmail.value.includes('@') ||
        !itemSellerEmail.value.includes('.com') ||
        itemDoc.value == '' ||
        itemImage.value == '' ||
        itemInicialValue.value == '' ||
        itemReserveValue.value == '' ||
        itemHistoric.value == '' ||
        itemPaymentTerm.value == '' ||
        itemReturnTerm.value == ''  ){
        ErrorMessage()
        status = false
    }else{
        buttonItem.addEventListener('click', SuccessMessage)
    }
    return status
}

// itemInfoValidation()

// Adiciona mascara no telefone
const phoneMask = (value) => {
    if (!value) return ''
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,'($1) $2')
    value = value.replace(/(\d)(\d{4})$/,'$1-$2')
    return value
}
itemSellerTel.addEventListener('keyup', () => {
    itemSellerTel.value = phoneMask(itemSellerTel.value)
})
