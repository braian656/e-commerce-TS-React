const express = require('express')
const app = express()


app.get('/', (res, req)=>{
    req.send('hola')
})

app.listen(3000, ()=>{
    console.log('Servidor de mierda, espero aprender esto rapido, estoy podrido')
})