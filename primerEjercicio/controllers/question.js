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

async function answerQuestion(req, h){
      let result
      if(!req.state.user){
            //agregue esto para que en caso de que no se pueda crear la pregunta redirija al login
            return h.view('login',{
                  title: 'login',
                  error: 'Porfavor inicie secion o registrese para poder comentar'
            }).code(500).takeover()
      }
      try {
            result = await questions.answer(req.payload, req.state.user)
            console.log(`Respuesta creada ${result}`)
      } catch (error) {
            console.log(error)
      }
      return h.redirect(`/question/${req.payload.id}`)
}

module.exports = {
      createQuestion,
      answerQuestion,
}