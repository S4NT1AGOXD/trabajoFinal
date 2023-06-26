//Migracion 
const {Schema, model}=require('mongoose')

const UsuarioSchema= Schema({
    //se define tipos de datos
    insumo:{
        unique:[true, 'El insumo:{VALUE} ya existe'],
        type: String,
        required: [true,'El campo direccion es requerido']

    },
    categoria:{
        type: String,
        required:[true, 'la categoria es requerido'],
        enum: ['Gasto de venta', 'Gasto de administración']
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
})
//este es el nombre del objeto Usuario
module.exports = model('Usuario', UsuarioSchema)//Exportar el modelo

