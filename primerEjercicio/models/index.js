'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/primerproyecto-3f20c-firebase-adminsdk-7ow8n-ae932f9819.json')

firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: 'https://primerproyecto-3f20c-default-rtdb.firebaseio.com/'
})

const db = firebase.database()
const users = require('./users')

module.exports = {
      users: new users(db)
}