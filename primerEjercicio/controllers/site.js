'use strict'

function register(req, h){
      return h.view('register',{
            title: 'registro'
      })
}

function home(req, h){
      return h.view('index',{
            title: 'home'
      })
}

module.exports={
      register,
      home,
}