'use strict'

const boom = require('@hapi/boom')
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
            if(!result){
                  h.response('Email y/o contraseña incorrecta').code(401)
            }
      } catch (error) {
            console.error(error)
            return h.response('problema validando el usuario').code(500)
      }
      return h.redirect('/').state('user',{
            name: result.name,
            email: result.email

      })
}

function logout(req,h){
      return h.redirect('/login').unstate('user')
}

function failValidation(req,h,err) {
      return boom.badRequest('fallo la validacion', req.payload)
}

module.exports = {
      createUser,
      validateUser,
      logout,
      failValidation,
}