'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const path = require('path')
const vision = require('@hapi/vision')

const config = require('./config')
const routes = require('./routes')
const handlebars = require('handlebars')

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
            await server.register(vision)

            server.views({
                  engines: {
                        hbs: handlebars
                  },
                  relativeTo: __dirname,
                  path: 'views',
                  layout: true,
                  layoutPath: 'views'
            })
            server.route(routes)
            await server.start()
      }catch(err){
            console.error(err)
            process.exit(1)
      }
      console.log(`Servidor lanzado en: ${server.info.uri}`)
}


init()