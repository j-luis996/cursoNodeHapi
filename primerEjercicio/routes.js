'use strict'

const joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')
const question = require('./controllers/question')

module.exports = [
      {
            method: 'GET',
            path: '/',
            handler: site.home
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