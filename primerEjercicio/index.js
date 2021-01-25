'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const path = require('path')
const vision = require('@hapi/vision')
const site = require('./controllers/site')

const config = require('./config')
const routes = require('./routes')
const handlebars = require('handlebars')

//esto inicializa el servidor
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
            //despues de agregar un plugin a happi hay que registrarlo así:
            await server.register(inert)
            await server.register(vision)

            //esto sirve para crear una cookie para validar una secion
            server.state('user',{
                  ttl: 1000*60*60*24, //milisegundos, esta operacionda 1 dia
                  isSecure: process.env.NODE_ENV === 'prod',
                  encoding: 'base64json',
                  path: '/',
            })

            //esto define las ubucaiones de las vistas, en nuestro caso vistas y layout estan juntos
            server.views({
                  engines: {
                        hbs: handlebars
                  },
                  relativeTo: __dirname,
                  path: 'views',
                  layout: true,
                  layoutPath: 'views'
            })

            //esto es para caputrar errores 404
            server.ext('onPreResponse', site.fileNotFound)

            server.route(routes)
            await server.start()
      }catch(err){
            console.error(err)
            process.exit(1)
      }
      console.log(`Servidor lanzado en: ${server.info.uri}`)
}
//capura promesas no capturadas
process.on('unhandledRejection',error =>{
      console.error('UnhandledRejection',error)
})
//captura excepciones no capturadas
process.on('uncaughtException',error =>{
      console.error('UncaughtException',error)
})
init()