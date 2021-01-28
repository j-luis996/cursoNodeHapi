'use strict'

const questions = require('../models/index').questions
const { writeFile } = require('fs')
const { promisify } = require('util')
const {join} = require('path')
const uuid = require('uuid');

const write = promisify(writeFile)

async function createQuestion(req,h){
      let result, fileName
      if(!req.state.user){
            //agregue esto para que en caso de que no se pueda crear la pregunta redirija al login
            return h.view('login',{
                  title: 'login',
                  error: 'Porfavor inicie secion o registrese para poder comentar'
            }).code(500).takeover()
      }
      try {
            if(Buffer.isBuffer(req.payload.image)){
                  fileName= `${uuid.v1()}.png`
                  await write(join(__dirname,'..','public','uploads',fileName),req.payload.image)
            }
            result = await questions.create(req.payload, req.state.user,fileName)
            console.log(`pregunta creada con ID: ${result}`)
      } catch (error) {
            console.error(`[ErrorControllerQuestion]ocurrio un error: ${error}`)
            
            return h.view('ask',{
                  title: 'crear pregunta',
                  error: 'problemas al crear la pregunta'
            }).code(500).takeover()
      }
      return h.redirect(`/`)
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

async function setAnswerRight(req, h) {
      let result
      // if(!req.state.user){
      //       //agregue esto para que en caso de que no se pueda crear la pregunta redirija al login
      //       return h.view('login',{
      //             title: 'login',
      //             error: 'Porfavor inicie secion o registrese para poder comentar'
      //       }).code(500).takeover()
      // }
      try {
            result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
      } catch (error) {
            console.error('[ErrorControllerQuestion]',error)
      }

      return h.redirect(`/question/${req.params.questionId}`)
}

module.exports = {
      createQuestion,
      answerQuestion,
      setAnswerRight,
}