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

export const getUsers = async() => {

    try {
        const url = `${apiUrl}/usuarios`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postUser = async(user) => {

    try {
        const url = `${apiUrl}/usuarios`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                senha: user.senha,
                cpf: user.cpf,
                endereco_id: user.endereco_id,
                foto_perfil: user.foto_perfil
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postValidationUser = async(user) => {

    try {
        const url = `${apiUrl}/validacao/usuario`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                senha: user.senha
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
        
    } catch (error) {
        return false
    }

}

// #region ADDRESS

export const postAddress = async(address) => {

    try {
        const url = `${apiUrl}/usuarios`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cep: address.cep,
                logradouro: address.logradouro,
                numero_casa: address.numero_casa,
                bairro: address.bairro,
                cidade: address.cidade
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}