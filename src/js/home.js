'use strict'

import { getBatchs, getBatchsByCategory, getBatchsByDate, getBatchsByPrice, getCategories } from "./functions.js"

const selectContainer = document.getElementById('select-container')
const selectedOption = document.getElementById('selected-item')
const selectInputButton = document.getElementById('select-icon')
const selectOptions = document.getElementById('select-options')
const searchBar = document.getElementById('search-bar') 
const categoriesFilterContainer = document.getElementById('categories-filter-container') 
const priceFilterContainer = document.getElementById('price-filter-container') 
const dateFilterContainer = document.getElementById('date-filter-container') 

const setSelect = () => {

    for (let options of selectOptions.children){
        options.addEventListener('click', (e) => {
            selectedOption.textContent = e.target.innerText
            filter.sort = e.target.id
            setItems()
        })
    } 

}

const getPriceFilter = () => {

    for (let input of priceFilterContainer.children){
        input.children[0].addEventListener('click', async(e) => {
            if(e.target.checked){
                if(e.target.id != 'price-standard'){
                    const filter = e.target.id.split('-')
                    const filteredItems = await getBatchsByPrice(filter[0], filter[1])
                    itemsARRAY = filteredItems.lote
                }else{
                    itemsARRAY = allItemsARRAY
                }
                setItems()
            }
        })
    }

}

const getDateFilter = () => {

    for (let input of dateFilterContainer.children){
        input.children[0].addEventListener('click', async(e) => {
            if(e.target.checked){
                const date = e.target.id
                filter.date = date
                setItems()
            }
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

const createCategoryCard = (category) => {

    const card = document.createElement('li')
    card.classList.add('w-fit', 'px-2', 'py-1', 'border-gray-3', 'border', 'rounded-xl', 'grid', 'grid-cols-[1fr_1rem]', 'gap-2', 'items-center', 'justify-center')
    card.textContent = category.nome

    const img = document.createElement('img')
    img.classList.add('w-full', 'h-full', 'cursor-pointer')
    img.src = '../images/svg/add.svg'
    img.alt = 'Adicionar'

    img.addEventListener('click', async(e) => {

        if(img.alt == 'Adicionar'){
            img.src = '../images/svg/correct.svg'
            img.alt = 'Selecionado'
            filter.category = category.nome
        }else{
            img.src = '../images/svg/add.svg'
            img.alt = 'Adicionar'
        }

        removeAllCategoriesFilter(card)

        const validation = categoryValidation()
        if(validation){
            itemsARRAY = allItemsARRAY
            filter.category = ''
        }
        
        setItems()

    })

    card.appendChild(img)

    return card

}

const removeAllCategoriesFilter = (category) => {

    for(let categories of categoriesFilterContainer.children){
        if(categories != category){
            categories.children[0].src = '../images/svg/add.svg'
            categories.children[0].alt = 'Adicionar'
        }
    }

}

const categoryValidation = () => {
    for(let button of categoriesFilterContainer.children){
        const buttonImg = button.children[0].alt
        if(buttonImg != 'Adicionar'){
            return false
        }
    }
    return true
}

const setCategories = async() => {

    const categories = await getCategories()
    categories.categorias.forEach((category) => {
        const card = createCategoryCard(category)
        categoriesFilterContainer.appendChild(card)
    })

}

let allItemsARRAY = []
let itemsARRAY = []
let filter = { search: '', sort: '', date: '', category: ''}


const createItem = (item) => {

    const card = document.createElement('div')
    card.classList.add('flex', 'flex-col', 'justify-between', 'min-h-auto', 'max-h-fit', 'max-[1600px]:w-[calc(((100vw-16vw-4rem)/4-1.5rem))]', 'max-lg:w-[calc(((100vw-16vw-4rem)/3-1rem))]', 'w-[calc(((100vw-16vw-4rem)/5-2rem))]', 'p-3', 'gap-3', 'border-2', 'border-gold-3', 'rounded-xl', 'hover:scale-[1.02]', 'duration-200', 'ease-linear', 'relative')

    const img = document.createElement('img')
    img.classList.add('w-full', 'max-[1600px]:h-[calc((((100vw-16vw-4rem)/4-1.5rem)-0.75rem))]', 'max-lg:h-[calc((((100vw-16vw-4rem)/3-1rem)-0.75rem))]', 'h-[calc((((100vw-16vw-4rem)/5-2rem)-0.75rem))]', 'object-cover', 'object-center', 'border-2', 'border-gold-3', 'rounded-xl')
    img.src = item.foto
    img.alt = item.produto

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
    value.appendChild(valueInfo)
    client.appendChild(clientName)
    date.appendChild(dateInfo)

    return card

}

const setItems = () => {

    const batchContainer = document.getElementById('batch-container')
    batchContainer.replaceChildren('')

    let filteredItems = itemsARRAY

    if(filter.search != ''){
        const filteredBatchsBySearch = filteredItems.filter((batch) => {
            return (
                batch.produto.toLowerCase().includes(filter.search)
            )
        })
        filteredItems = filteredBatchsBySearch
    }

    if(filter.date != '' && filter.date != 'date-standard'){
        const filteredBatchsByDate = filteredItems.filter((batch) => {
            return (
                batch.data_fim.split('-')[0].includes(filter.date)
            )
        })
        filteredItems = filteredBatchsByDate
    }

    if(filter.category != '' && filter.category != 'date-standard'){
        const filteredBatchsByCategory = filteredItems.filter((batch) => {
            return (
                batch.categoria.includes(filter.category)
            )
        })
        filteredItems = filteredBatchsByCategory
    }

    const sort = filter.sort

    switch (sort) {

        case 'order-lower':

            filteredItems.sort(function(a, b) {
                if (a.valor === b.valor) {
                  return a.produto.localeCompare(b.produto)
                } else {
                  return a.valor - b.valor
                }
            })
            filteredItems.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })
            break
    
        case 'order-higher':

            filteredItems.sort(function(a, b) {
                if (a.valor === b.valor) {
                  return b.produto.localeCompare(a.produto)
                } else {
                  return b.valor - a.valor
                }
            })
            filteredItems.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })
            break
    
        default:

            filteredItems.sort(function(a, b) {
                return b.id - a.id        
            })

            filteredItems.forEach((batch) => {
                const card = createItem(batch)
                batchContainer.appendChild(card)
            })

            break

    }

}

searchBar.addEventListener('keyup', async(e) => {

    const search = e.target.value.toLowerCase()
    filter.search = search
    setItems()

})

window.addEventListener('load', async() => {
    
    const batchs = await getBatchs()
    allItemsARRAY = batchs.lotes
    itemsARRAY = allItemsARRAY

    setItems()
    setSelect()
    setCategories()
    getPriceFilter()
    getDateFilter()

    document.getElementById('loader').classList.add('hidden')

})

