'use strict'

const apiUrl = 'https://leilao-expresso-backend.onrender.com/v1/leilao_expresso'

// #region LOTES

export const getBatchs = async() => {

    try {
        const url = `${apiUrl}/lotes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region USERS

export const postUser = async() => {

    try {
        const url = `${apiUrl}/usuario`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}