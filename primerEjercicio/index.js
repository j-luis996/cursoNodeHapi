'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const path = require('path')

const config = require('./config')

const server = Hapi.server({
      port: config.port,
      host: config.host,
      routes: {
            files: {
                  relativeTo: path.join(__dirname,'public')
            }
      }
})

const init = async () => {
      try{
            await server.register(inert)

            server.route({
                  method: 'GET',
                  path: '/home',
                  handler: (req, h) => {
                        return h.file('index.html')
                  }
            })
      
            server.route({
                  method: 'GET',
                  path: '/{param*}',
                  handler: {
                        directory: {
                              path: '.',
                              index: ['index.html']
                        }
                  }
            })

            await server.start()
      }catch(err){
            console.error(err)
            process.exit(1)
      }
      console.log(`Servidor lanzado en: ${server.info.uri}`)
}
init()