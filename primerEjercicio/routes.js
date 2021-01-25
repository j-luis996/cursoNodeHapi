'use strict'

const joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')

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
            path: '/logout',
            handler: user.logout
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
                        payload:joi.object({
                              name: joi.string().required().min(3),
                              email: joi.string().email().required(),
                              password: joi.string().required().min(8),
                        })
                  }
            },
            handler: user.createUser
      },
      {
            path: '/validate-user',
            method: 'POST',
            options: {
                  validate: {
                        payload:joi.object({
                              email: joi.string().email().required(),
                              password: joi.string().required().min(8),
                        })
                  }
            },
            handler: user.validateUser
      },
      {
            method: 'GET',
            path: '/{param*}',
            handler: {
                  directory: {
                        path: '.',
                        index: ['index.html']
                  }
            }
      }
]