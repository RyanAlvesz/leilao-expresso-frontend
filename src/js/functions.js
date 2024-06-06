'use strict'

const apiUrl = 'https://leilao-expresso-backend.onrender.com/v1/leilao_expresso'

// #region LOTES

export const getLotes = async() => {

    try {
        const url = `${apiUrl}/lotes`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}