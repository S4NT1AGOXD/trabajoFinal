const {Router} = require('express')

const route = Router()
//se define despues de crear el controllador
//importar metodos del controlador
const{pagoGet, pagoPost, pagoPut, pagoDelete}=require('../controllers/pagos')
route.get('/', pagoGet)
route.post('/',pagoPost )
route.put('/',pagoPut )
route.delete('/',pagoDelete )

module.exports = route