'use strict'

const config = require('../config')
const firebase = require('firebase-admin')
const serviceAccount = require(config.llave)

firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: config.databaseURL,
})

const db = firebase.database()
const users = require('./users')
const Questions = require('./questions')

module.exports = {
      users: new users(db),
      questions: new Questions(db)
}