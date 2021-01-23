'use strict'

const bcrypt = require('bcrypt')

class Users {
      constructor(db){
           this.db= db
           this.ref = this.db.ref('/')
           this.collection = this.ref.child('users')
      }
      async create(data) {
            // console.log(data)
            // Destructuro el objeto con el payload enviado. Ya que Hapi lo decora con un prototipo null que no es compatible con Firebase
            const user = {
              ...data
            }
            // console.log(user)
            user.password = await this.constructor.encrypt(user.password)
            const newUser = this.collection.push(user)
            return newUser.key
      }
      static async encrypt(password){
            const saltRound = 10
            const hashedPassword = await bcrypt.hash(password,saltRound)
            return hashedPassword
      }
}
module.exports = Users