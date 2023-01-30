const express = require('express') ; 
const cors = require('cros') ; 
const app = express() ; 

const port = process.env.PORT || 5000  ; 

app.get('/', (req, res)=> {
    res.send({
        message : 'This server Group aisa connect'
    })
})

app.listen(port , ()=> {
    console.log(`This server Group aisa is connected port is ${port}`)
})