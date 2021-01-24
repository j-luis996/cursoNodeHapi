'use strict'

const users = require('../models/index').users

async function createUser(req, h) {
      let result
      try {
            result = await users.create(req.payload)
      } catch (error) {
            console.error(error)
            return h.response('problema al crear al usuario').code(500)
      }
      return h.response(`usuario creado ${result}`)
}

async function validateUser(req,h){
      let result
      try {
            result = await users.validateUser(req.payload)
      } catch (error) {
            console.error(error)
            return h.response('problema validando el usuario').code(500)
      }
      return result
}

module.exports = {
      createUser,
      validateUser,
}