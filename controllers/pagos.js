const {response}= require('express')


//Importacion de los modelos 
const Pago=require('../models/pago')


//insercion, modificacion de datos

//consultar
const pagoGet = async (req, res = response) => {
    const { proveedor } = req.query;
  
    // Construir el filtro de búsqueda
    const filtro = {};
  
    if (proveedor) {
      filtro.proveedor = proveedor;
    }
  
    try {
      // Consultar los pagos que coinciden con el filtro
      const pagos = await Pago.find(filtro);
  
      // Mapear los pagos y calcular el campo "restante"
      const pagosConRestante = pagos.map((pago) => {
        return {
          ...pago.toObject(),
          restante: pago.total - pago.abonado,
        };
      });
  
      res.json({
        pagos: pagosConRestante,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Ocurrió un error al obtener los pagos',
      });
    }
  };
  
  


const pagoPost = async(req,res = response) => {
    const body = req.body//Captura de atributos
    let mensaje=''
    console.log(body)

    try {
        const pago= new Pago(body)

        //guardar objeto
        await pago.save()
        mensaje='La inserción se realizó exitosamente'
        mensaje = 'La inserción se realizó exitosamente';
  
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.error(Object.values(error.errors).map(val => val.message));
          mensaje = Object.values(error.errors).map(val => val.message);
        } else {
          // Manejar otros errores aquí si es necesario
          mensaje = 'Hubo un error en el servidor';
          console.log(error)
        }
      }

    res.json({
        msg: mensaje
    })

}


const pagoPut= async(req, res= response)=>{
    //captura atributos o parametros
    const{proveedor, factura, total,abonado,restante,forma,estado,descripcion}=req.body
    let mensaje=''
    //realizar la modificacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
    try{
        const pago= await Pago.findOneAndUpdate({proveedor:proveedor,factura:factura,total:total,abonado:abonado,restante:restante,forma:forma}, {estado:estado,descripcion:descripcion})
        mensaje='La modificación se efectuó correctamente.'

    }
    catch(error){
        mensaje='Se presentaron problemas en la modificación'

    }

   

    res.json({
        msg: mensaje 
    })

}

const pagoDelete= async(req, res= response)=>{
    //captura atributos o parametros
    const{_id}=req.body
    let mensaje=''
    //realizar la moficiacion
   // el campo 1 es con el cual se va hacer la busqueda los demas son los campos que se va a modificar ejem nombre:nombre
    
   try{
    const pago= await Pago.deleteOne({_id:_id})
    mensaje='La eliminacion se efectuo correctamente.'

}
catch(error){
    mensaje='Se presentaron problemas en  la eliminacion.'

}

res.json({
    msg: mensaje 
})

}


module.exports={
    pagoGet,
    pagoPost,
    pagoPut,
    pagoDelete
}