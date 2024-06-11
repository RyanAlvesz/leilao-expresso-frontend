'use strict'

const apiUrl = 'https://leilao-expresso-backend.onrender.com/v1/leilao_expresso'

// #region ADM

export const getAdm = async() => {

    try {
        const url = `${apiUrl}/admins`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getAdmByName = async(name) => {

    try {
        const url = `${apiUrl}/admins/filtro?nome=${name}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getAdmById = async(id) => {

    try {
        const url = `${apiUrl}/admin/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postAdm = async(adm) => {

    try {
        const url = `${apiUrl}/admin`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: adm.nome,
                email: adm.email,
                telefone: adm.telefone,
                senha: adm.senha,
                cpf: adm.cpf
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDeleteAdm = async(id) => {

    try {
        const url = `${apiUrl}/admin/excluir/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActivateAdm = async(id) => {

    try {
        const url = `${apiUrl}/admin/ativar/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateAdm = async(adm, id) => {

    try {
        const url = `${apiUrl}/admin/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: adm.nome,
                email: adm.email,
                telefone: adm.telefone,
                senha: adm.senha,
                cpf: adm.cpf
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region CATEGORIES

export const getCategories = async() => {

    try {
        const url = `${apiUrl}/categorias`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getCategoriesByName = async(name) => {

    try {
        const url = `${apiUrl}/categoria/filtro?nome=${name}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getCategoryById = async(id) => {

    try {
        const url = `${apiUrl}/categoria/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postCategory = async(category) => {

    try {
        const url = `${apiUrl}/categoria`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: category.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDeleteCategory = async(id) => {

    try {
        const url = `${apiUrl}/categoria/excluir/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActivateCategory = async(id) => {

    try {
        const url = `${apiUrl}/categoria/ativar/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateCategory = async(adm, id) => {

    try {
        const url = `${apiUrl}/categoria/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: category.nome
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region PRODUCTS

export const getProducts = async() => {

    try {
        const url = `${apiUrl}/produtos`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProductsByName = async(name) => {

    try {
        const url = `${apiUrl}/produto/filtro:nome?nome=${name}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProductById = async(id) => {

    try {
        const url = `${apiUrl}/produto/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getProductsByCategory = async(category) => {

    try {
        const url = `${apiUrl}/produto/filtro:categoria?categoria=${category}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postProduct = async(product) => {

    try {
        const url = `${apiUrl}/produto`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: product.nome,
                descricao: product.descricao,
                valor_fixo: product.valor_fixo,
                foto_produto: product.foto_produto,
                categoria_id: product.categoria_id
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDeleteProduct = async(id) => {

    try {
        const url = `${apiUrl}/produto/excluir/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActivateProduct = async(id) => {

    try {
        const url = `${apiUrl}/produto/ativar/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateProduct = async(product, id) => {

    try {
        const url = `${apiUrl}/produto/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: product.nome,
                descricao: product.descricao,
                valor_fixo: product.valor_fixo,
                foto_produto: product.foto_produto,
                categoria_id: product.categoria_id
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

// #region BATCHS

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

export const getBatchsByPrice = async(price) => {

    try {
        const url = `${apiUrl}/lote/valor/filtro?valorFixo=${price}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getBatchsByCategory = async(category) => {

    try {
        const url = `${apiUrl}/lote/categoria/filtro?categoria=${category}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getBatchsByDate = async(date) => {

    try {
        const url = `${apiUrl}/lote/filtro/${date}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getBatchById = async(id) => {

    try {
        const url = `${apiUrl}/lote/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const postBatch = async(batch) => {

    try {
        const url = `${apiUrl}/lote`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data_fim: batch.data_fim,
                produto_id: batch.produto_id,
                usuario_id: batch.usuario_id
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDeleteBatch = async(id) => {

    try {
        const url = `${apiUrl}/lote/excluir/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActivateBatch = async(id) => {

    try {
        const url = `${apiUrl}/lote/ativar/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateBatch = async(batch, id) => {

    try {
        const url = `${apiUrl}/lote/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data_fim: batch.data_fim,
                produto_id: batch.produto_id,
                usuario_id: batch.usuario_id
            })
        }
        const response = await fetch(url, options)
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

export const getUserById = async(id) => {

    try {
        const url = `${apiUrl}/usuarios/${id}`
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

export const updateDeleteUser = async(id) => {

    try {
        const url = `${apiUrl}/usuarios/excluir/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActivateUser = async(id) => {

    try {
        const url = `${apiUrl}/usuarios/ativar/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateUser = async(user, id) => {

    try {
        const url = `${apiUrl}/usuarios/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
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

export const updateUserPassword = async(user, id) => {

    try {
        const url = `${apiUrl}/usuarios/senha/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                telefone: user.telefone,
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

// #region ADDRESS

export const getAdresses = async() => {

    try {
        const url = `${apiUrl}/enderecos`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const getAddressById = async(id) => {

    try {
        const url = `${apiUrl}/enderecos/${id}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

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
                cidade: address.cidade,
                complemento: address.complemento
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateDeleteAddress = async(id) => {

    try {
        const url = `${apiUrl}/enderecos/excluir/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateActivateAddress = async(id) => {

    try {
        const url = `${apiUrl}/enderecos/ativar/${id}`
        const options = {
            method: 'PUT'
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

export const updateAddress = async(address, id) => {

    try {
        const url = `${apiUrl}/usuarios/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cep: address.cep,
                logradouro: address.logradouro,
                numero_casa: address.numero_casa,
                bairro: address.bairro,
                cidade: address.cidade,
                complemento: address.complemento
            })
        }
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    } catch (error) {
        return false
    }

}

