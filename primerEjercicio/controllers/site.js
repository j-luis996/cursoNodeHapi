'use strict'

function register(req, h){
      if(req.state.user){
            return h.redirect('/')
      }
      return h.view('register',{
            title: 'registro',
            user: req.state.user
      })
}

function login(req, h){
      if(req.state.user){
            return h.redirect('/')
      }
      return h.view('login',{
            title: 'login',
            user: req.state.user
      })
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
}