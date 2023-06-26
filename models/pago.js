//Migracion 
const {Schema, model}=require('mongoose')

const PagoSchema= Schema({
    //se define tipos de datos
    proveedor:{
        unique:[true, 'El insumo:{VALUE} ya existe'],
        type: String,
        required: [true,'El campo direccion es requerido']

    },
    factura:{
        type: Number,
        required:[true, 'la factura es requerido']
    },
    total: {
        type: Number,
        required: [true,'El campo total es requerido']
    },
    abonado: {
        type: Number,
        required: [true,'El campo abonado es requerido']
    },
    restante: {
        type: Number,
        get: function () {
          return this.total - this.abonado;
        }
    },
    forma:{
        type: String,
        required:[true, 'la forma de pago es requerido'],
        enum: ['crédito', 'contado']
    },
    estado:{
        type: String,
        required:[true, 'el estado es requerido'],
        enum: ['activo', 'anulado']
    },
    descripcion:{
        type: String
    },
    
})
//este es el nombre del objeto Usuario
module.exports = model('Pago', PagoSchema)//Exportar el modelo 