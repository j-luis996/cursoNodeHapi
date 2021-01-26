'use strict'

const questions = require('../models/index').questions
const config = require('../config')

//esta funcion lo primero que pregunta es si existe la cookie de secion
function register(req, h){
      if(req.state.user){
            return h.redirect('/')
      }
      return h.view('register',{
            title: 'registro',
            user: req.state.user
      })
}

//esta funcion lo primero que pregunta es si existe la cookie de secion
function login(req, h){
      if(req.state.user){
            return h.redirect('/')
      }
      return h.view('login',{
            title: 'login',
            user: req.state.user
      })
}

async function viewQuestion(req, h) {
      let data
      try {
            data = await questions.getOne(req.params.id)
            if(!data){
                  return notFound(req, h)
            }
      } catch (error) {
            console.error(error)
      }
      return h.view('question',{
            title: 'Detalles de la pregunta',
            user: req.state.user,
            question: data,
            key: req.params.id,
      })
}

//el objetivo de la funciones notFound y fileNotFound es capturar rutas no permitidas o que no existen 
function notFound(req,h){
      return h.view('404',{},{layout: 'error-layout'}).code(404)
}

function fileNotFound(req,h){
      const response = req.response
      if(response.isBoom && response.output.statusCode === 404){
            return h.view('404',{},{layout: 'error-layout'}).code(404)
      }
      return h.continue
}

async function home(req, h){
      let data
      try {
            data = await questions.getLast(config.numPreguntas)
      } catch (error) {
            console.log(error)
      }
      return h.view('index',{
            title: 'home',
            user: req.state.user,
            questions: data,
      })
}

//esta funcion redireige a la pagina para crear una preguta, si no estas logueado te dirige a login
function ask(req,h){
      if(!req.state.user){
            return h.redirect('/login')
      }

      return h.view('ask', {
            title: 'Crear pregunta',
            user: req.state.user
      })
}

module.exports={
      register,
      home,
      login,
      notFound,
      fileNotFound,
      ask,
      viewQuestion,
}