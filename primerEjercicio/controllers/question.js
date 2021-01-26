'use strict'

const questions = require('../models/index').questions

async function createQuestion(req,h){
      let result

      try {
            result = await questions.create(req.payload, req.state.user)
            console.log(`pregunta creada con ID: ${result}`)
      } catch (error) {
            console.error(`ocurrio un error: ${error}`)

            return h.view('ask',{
                  title: 'crear pregunta',
                  error: 'problemas al crear la pregunta'
            }).code(500).takeover()
      }
      return h.response(`pregunta creada con ID: ${result}`)
}

module.exports = {
      createQuestion,
}