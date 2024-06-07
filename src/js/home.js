'use strict'

import { getBatchs } from "./functions.js"

const selectContainer = document.getElementById('select-container')
const selectInput = document.getElementById('filter-order-by')
const selectInputButton = document.getElementById('select-icon')

let itemsARRAY = {}

const setSelect = () => {

    const selectedItem = document.createElement('div')
    selectedItem.classList.add('')

}

const changeSelectArrowDirection = () => {
    selectInputButton.classList.contains('rotate-[60deg]') ? selectInputButton.classList.remove('rotate-[60deg]') : selectInputButton.classList.add('rotate-[60deg]')
}

const createItem = (item) => {

    const card = document.createElement('div')
    card.classList.add('h-fit', 'flex', 'flex-col', 'p-3', 'gap-5', 'border-2', 'border-gold-3', 'rounded-xl', 'hover:scale-[1.02]', 'duration-200', 'ease-linear')

    const img = document.createElement('img')
    img.classList.add('w-full', 'h-[calc((((100vw-16vw-4rem)/4-1.5rem)-0.75rem)*3/4)]', 'object-cover', 'object-center', 'border-2', 'border-gold-3', 'rounded-xl')
    img.src = item.foto
    img.alt = item.produto

    const itemName = document.createElement('div')
    itemName.classList.add('h-[8vh]', 'flex', 'justify-center', 'items-center')

    const name = document.createElement('h2')
    name.classList.add('text-title-2', 'text-center', 'font-semibold', 'text-blue-2')
    name.textContent = item.produto

    const itemInfoContainer = document.createElement('div')
    itemInfoContainer.classList.add('flex', 'flex-col', 'justify-center', 'gap-3')

    const value = document.createElement('p')
    value.classList.add('text-right', 'text-sm')
    value.textContent = 'Preço mínimo:'

    const valueInfo = document.createElement('span')
    valueInfo.classList.add('text-blue-3', 'font-bold', 'text-base', 'pl-1')
    valueInfo.textContent = `R$${item.valor}`

    const client = document.createElement('p')
    client.classList.add('text-right', 'text-sm')
    client.textContent = 'Por: '

    const clientName = document.createElement('span')
    clientName.classList.add('text-blue-3', 'font-bold', 'text-base')
    clientName.textContent = item.cliente

    const date = document.createElement('p')
    date.classList.add('text-right', 'text-sm')
    date.textContent = 'Acaba em:'

    const dateInfo = document.createElement('span')
    dateInfo.classList.add('text-blue-3', 'font-bold', 'text-base', 'pl-1')

    const button = document.createElement('button')
    button.classList.add('bg-blue-2', 'rounded-lg', 'text-white', 'w-full', 'py-3', 'font-bold', 'text-base', 'uppercase')
    button.textContent = 'Participar'

    button.addEventListener('click', () => {
        localStorage.setItem('batchID', item.id)
        window.location = './item-info'
    })

    const DateTime = luxon.DateTime
    const dtItemEndDate = DateTime.fromISO(item.data_fim)
    const diff = dtItemEndDate.diffNow(['days'])

    if(diff.toString().includes('-')){

        dateInfo.textContent = dtItemEndDate.toLocaleString(DateTime.DATE_SHORT)

        button.disabled = true
        button.addEventListener('mouseover', () => {
            button.textContent = 'Finalizado'
        })
        button.addEventListener('mouseleave', () => {
            button.textContent = 'Participar'
        })
        
    } else {
        let days = `${diff.toString().replace('P', '').split('.')[0]} ` 
        days += `${diff.toString().replace('P', '').split('.')[0]}` == '1' ? 'dia' : 'dias' 
        dateInfo.textContent = days
    }

    card.replaceChildren(img, itemName, itemInfoContainer, button)
    itemInfoContainer.replaceChildren(value, client, date)
    itemName.appendChild(name)
    value.appendChild(valueInfo)
    client.appendChild(clientName)
    date.appendChild(dateInfo)

    return card

}

const setItems = () => {

    const batchContainer = document.getElementById('batch-container')
    batchContainer.replaceChildren('')

    itemsARRAY.forEach((batch) => {
        const card = createItem(batch)
        batchContainer.appendChild(card)
    })

}

selectContainer.addEventListener('click', changeSelectArrowDirection)


window.addEventListener('load', async() => {
    const batchs = await getBatchs()
    itemsARRAY = batchs.lotes
    setItems()
})
