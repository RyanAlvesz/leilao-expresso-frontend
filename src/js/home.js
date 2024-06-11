'use strict'

import { getBatchs } from "./functions.js"

const selectContainer = document.getElementById('select-container')
const selectedOption = document.getElementById('selected-item')
const selectInputButton = document.getElementById('select-icon')
const selectOptions = document.getElementById('select-options')
const searchBar = document.getElementById('search-bar')

const setSelect = () => {

    for (let options of selectOptions.children){
        options.addEventListener('click', (e) => {
            selectedOption.textContent = e.target.innerText
            localStorage.setItem('selectedOption', e.target.id)
            setItems(e.target.id)
        })
    } 

}

const changeSelectArrowDirection = () => {
    selectInputButton.classList.contains('rotate-[60deg]') ? selectInputButton.classList.remove('rotate-[60deg]') : selectInputButton.classList.add('rotate-[60deg]')
}

const toggleSelectOptions = () => {
    selectOptions.classList.contains('hidden') ? selectOptions.classList.remove('hidden') : selectOptions.classList.add('hidden')
}

selectContainer.addEventListener('click', () => {
    changeSelectArrowDirection()
    toggleSelectOptions()
})

let itemsARRAY = {}

const createItem = (item) => {

    const card = document.createElement('div')
    card.classList.add('flex', 'flex-col', 'justify-between', 'w-[calc(((100vw-16vw-4rem)/4-1.5rem))]', 'p-3', 'gap-5', 'border-2', 'border-gold-3', 'rounded-xl', 'hover:scale-[1.02]', 'duration-200', 'ease-linear', 'relative', 'z-30')

    const img = document.createElement('img')
    img.classList.add('w-full', 'h-[calc((((100vw-16vw-4rem)/4-1.5rem)-0.75rem))]', 'object-cover', 'object-center', 'border-2', 'border-gold-3', 'rounded-xl')
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
        window.location = './item-info.html'
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

    card.replaceChildren(img, name, itemInfoContainer, button)
    itemInfoContainer.replaceChildren(value, client, date)
    // itemName.appendChild(name)
    value.appendChild(valueInfo)
    client.appendChild(clientName)
    date.appendChild(dateInfo)

    return card

}

const setItems = (sort) => {

    const batchContainer = document.getElementById('batch-container')
    batchContainer.replaceChildren('')

    let sortARRAY = itemsARRAY

    switch (sort) {
        case 'order-lower':

            sortARRAY.sort(function(a, b) {
                if (a.valor === b.valor) {
                  return a.produto.localeCompare(b.produto)
                } else {
                  return a.valor - b.valor
                }
            })
            sortARRAY.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })
            break
    
        case 'order-higher':

            sortARRAY.sort(function(a, b) {
                if (a.valor === b.valor) {
                  return b.produto.localeCompare(a.produto)
                } else {
                  return b.valor - a.valor
                }
            })
            sortARRAY.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })
            break
    
        default:

            sortARRAY.sort(function(a, b) {
                return b.id - a.id        
            })

            sortARRAY.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })
            sortARRAY.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })

            break

    }

}

searchBar.addEventListener('keyup', async(e) => {

    const search = e.target.value.toLowerCase()
    if(search != ''){
        const filteredBatchs = itemsARRAY.filter((batch) => {
            return (
                batch.produto.toLowerCase().includes(search) ||
                batch.cliente.toLowerCase().includes(search) 
            )
        })
        itemsARRAY = filteredBatchs
        setItems(localStorage.getItem('selectedOption'))
    }else{
        const batchs = await getBatchs()
        itemsARRAY = batchs.lotes
        setItems(localStorage.getItem('selectedOption'))
    }

})

window.addEventListener('load', async() => {
    const batchs = await getBatchs()
    itemsARRAY = batchs.lotes
    setItems()
    setSelect()
})