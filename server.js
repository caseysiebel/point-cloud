
const lBL = require('line-by-line')
let data = ''
let dataComplete
(function () {
    let lr = new lBL('xyz.json')
    lr.on('line', (chunk) => {
        data += chunk
    })

    lr.on('end', () => {
        //console.log(JSON.stringify(data))
        dataComplete = true 
    })

    lr.on('error', (err) => console.error(err))
})()

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/data', (req, res) => {
    console.log('in datat route')
    function respond (){
        if (dataComplete) {
            console.log(typeof data, 'data')
            res.json(data)
        }
        else respond()
    }
    respond()
})

app.use(express.static(__dirname + '/public'))

app.listen(3000, () => console.log('listening on 3000'))



