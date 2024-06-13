'use strict'

import { getBatchById } from "./functions.js" 

const batchId = localStorage.getItem('batchID')

const ButtonSellerProfile = document.getElementById('btn-seller-profile')
const ButtonParticipation = document.getElementById('btn-participation')

const itemInfoClose = document.getElementById('item-info-close')
const itemInfoValue = document.getElementById('item-info-value')
const itemInfoTitle = document.getElementById('item-info-title')
const itemInfoFoto = document.getElementById('item-info-foto')

const setItemInfo = (item) => {

    console.log(item);
    itemInfoClose.textContent = item.data_fim
    itemInfoValue.textContent = item.valor
    itemInfoTitle.textContent = item.produto
    itemInfoFoto.src = item.foto

}

const MessageFunctionality = () => {
    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-blue-3">Funcionalidade bloqueada<p>',
        icon: 'info',
        iconColor: '#E8B455',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
      });
}


const MessageParticipation = () => {
    Swal.fire({
        position: 'center',
        timer: 2000,
        title: '<p class="text-2xl text-blue-3">Você está participando.<p>',
        text: "Acesse seu email para mais informações",
        icon: 'success',
        iconColor: '#E8B455',
        showConfirmButton: false,
        width: '25rem',
        heightAuto: false
      });
}

ButtonSellerProfile.addEventListener('click', () => {
    MessageFunctionality()
})

ButtonParticipation.addEventListener('click', () => {
    MessageParticipation()
})

window.addEventListener('load', async() => {
    const batch = await getBatchById(batchId)
    setItemInfo(batch.lote[0])
    document.getElementById('loader').classList.add('hidden')
})