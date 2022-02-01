const { initializeApp, applicationDefault, cert } = require('firebase-admin/app')
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore')

const certificate = require('../certificate.json')

initializeApp({
    credential: cert(certificate)
})

const db = getFirestore()

// API Stuff

const express = require('express')

const app = express()

app.use(express.json()) //telling the API to accept JSON files

app.get('/', (request, response) => {
    const userCollection = db.collection('users')
    userCollection.get()
    .then(snapshot => {
        response.send(snapshot.docs)
    })
})

// app.get('/', (request, response) => {
//     response.send('Hello World!')
// })

app.post('/users', (request, response) => {
    const {name, age, email} = request.body
    const user = {name, age, email}
    const result = `My name is ${user.name}, I am ${user.age} years old and my email is ${user.email}.`
    response.send(result)
})

app.listen(3000, () => {
    console.log('Listening on port 3,000!!')
})