'use strict'

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

function home(req, h){
      return h.view('index',{
            title: 'home',
            user: req.state.user
      })
}

module.exports={
      register,
      home,
      login,
      notFound,
      fileNotFound,
}