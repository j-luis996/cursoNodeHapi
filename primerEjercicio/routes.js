'use strict'

const joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const config = require('./config')
const question = require('./controllers/question')
//la propiedad options genera cache del lado del browswer
module.exports = [
      {
            method: 'GET',
            path: '/',
            options: {
                  cache: {
                        expiresIn: config.cacheBrowser,
                        privacy: 'private'
                  }
            },
            handler: site.home,
      },
      {
            method: 'GET',
            path: '/login',
            handler: site.login
      },
      {
            method: 'GET',
            path: '/question/{id}',
            handler: site.viewQuestion
      },
      {
            method: 'GET',
            path: '/logout',
            handler: user.logout
      },
      {
            method: 'GET',
            path: '/ask',
            handler: site.ask
      },
      {
            method: 'GET',
            path: '/register',
            handler: site.register
      },
      {
            path: '/create-user',
            method: 'POST',
            options: {
                  validate: {
                        //estas lineas validan la informacion del nombre, email y la contraseña
                        payload: joi.object({
                              name: joi.string().required().min(3),
                              email: joi.string().email().required(),
                              password: joi.string().required().min(8),
                        }),
                        
                  }
            },
            handler: user.createUser
      },
      {
            path: '/validate-user',
            method: 'POST',
            options: {
                  validate: {
                        //estas lineas validan la informacion del email y la contraseña
                        payload:joi.object({
                              email: joi.string().email().required(),
                              password: joi.string().required().min(8),
                        }),
                        failAction: user.failValidation,
                  }
            },
            handler: user.validateUser
      },
      {
            path: '/create-question',
            method: 'POST',
            options: {
                  validate: {
                        //
                        payload:joi.object({
                              title: joi.string().required(),
                              description: joi.string().required(),
                        }),
                        failAction: user.failValidation,
                  }
            },
            handler: question.createQuestion
      },
      {
            method: 'GET',
            path: '/answer/{questionId}/{answerId}',
            handler: question.setAnswerRight
      },
      {
            path: '/answer-question',
            method: 'POST',
            options: {
                  validate: {
                        //
                        payload:joi.object({
                              answer: joi.string().required(),
                              id: joi.string().required(),
                        }),
                        failAction: user.failValidation,
                  }
            },
            handler: question.answerQuestion
      },
      {
            method: 'GET',
            path: '/assets/{param*}',
            handler: {
                  directory: {
                        path: '.',
                        index: ['index.html']
                  }
            }
      },
      {
            method: ['GET', 'POST'],
            path: '/{any*}',
            handler: site.notFound
      }
]