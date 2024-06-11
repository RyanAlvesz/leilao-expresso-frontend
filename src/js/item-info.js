'use strict'

const ButtonSellerProfile = document.getElementById('btn-seller-profile')

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

ButtonSellerProfile.addEventListener('click', () => {
    MessageFunctionality()
})
