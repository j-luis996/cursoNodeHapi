'use strict'

const questions = require('../models/index').questions

async function setAnswerRight(questionId, answerId, user){
      let result
      try {
            result = await questions.setAnswerRight(questionId, answerId, user)
      } catch (error) {
            console.error('[ErrorMetodos]',error)
            return false
      }
      return result
} 

//este metodo define el chache del lado del server
async function  getLast(amount) {
      let data
      try {
            data = await questions.getLast(amount)
      } catch (error) {
            console.error(error)
      }
      console.log('Actualice el cache')
      return data
}

module.exports = {
      setAnswerRight,
      getLast,
}