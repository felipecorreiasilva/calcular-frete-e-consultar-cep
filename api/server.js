const express = require('express')
const cors = require('cors')
const app = express()
const {
    calcularPrecoPrazo,
    consultarCep,
    rastrearEncomendas,
} = require('correios-brasil')
const { calcFrete } = require('./lib/frete.js')

app.use(cors())
app.use(express.json())

app.post('/cep', async(req,res)=>{

    const {cep} = req.body
    const result = await consultarCep(cep)
    return res.json(result)

})

app.post('/frete', async(req,res)=>{

    const frete = await calcFrete(req.body)
    console.log(frete.data)
    // return res.json({ok: true, JSON.stringify(frete)})
    return res.json(frete.data)

})

app.listen(3001, ()=>{
    console.log('Server started on port 3001!')
})