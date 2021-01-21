'use strict'

const Hapi = require('@hapi/hapi')
const config = require('./config')

const server = Hapi.server({
      port: config.port,
      host: config.host,
})

const init = async () => {
      server.route({
            method: 'GET',
            path: '/',
            handler: (req, h) => {
                  return h.response('Hola mundo...').code(200)
            }
      })

      server.route({
            method: 'GET',
            path: '/redirect',
            handler: (req, h) => {
                  return h.redirect('http://platzi.com')
            }
      })

      try{
            await server.start()
      }catch(err){
            console.error(err)
            process.exit(1)
      }
      console.log(`Servidor lanzado en: ${server.info.uri}`)
}
init()