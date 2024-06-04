'use strict'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js'

const firebaseConfig = {
    apiKey: "AIzaSyC6dR6st0qQjWAQGqycUkjYkxXQFQiYPQQ",
    authDomain: "leilao-expresso.firebaseapp.com",
    projectId: "leilao-expresso",
    storageBucket: "leilao-expresso.appspot.com",
    messagingSenderId: "59092604784",
    appId: "1:59092604784:web:6696b9053308c5fce861b5"
}

const app = initializeApp(firebaseConfig)
const storage = getStorage()

export const uploadImage = async (file, storagePath) => {
    let url
    const storageRef = ref(storage, `${storagePath}/${file.name}`)
    await uploadBytes(storageRef, file)
        .then(async (snapshot) => {
            await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                url = await downloadURL
            })
        })
    return url
}