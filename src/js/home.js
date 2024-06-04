'use strict'

const selectContainer = document.getElementById('select-container')
const selectInput = document.getElementById('filter-order-by')
const selectInputButton = document.getElementById('select-icon')

const setSelect = () => {

    const selectedItem = document.createElement('div')
    selectedItem.classList.add('')

}

const changeSelectArrowDirection = () => {
    selectInputButton.classList.contains('rotate-[60deg]') ? selectInputButton.classList.remove('rotate-[60deg]') : selectInputButton.classList.add('rotate-[60deg]')
}

selectContainer.addEventListener('click', changeSelectArrowDirection)