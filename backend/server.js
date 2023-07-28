const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Transaction = require('./models/Transaction.js')
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/test', (req, res) => {
    res.json('Backend OK')
})

app.post('/api/addtransaction', async (req, res) => {
    await mongoose.connect(process.env.DATABASE)
    const {datetime, refcode, description, money} = req.body
    const transaction = await Transaction.create({datetime, refcode, description, money})
    res.json(transaction)
})

const port = process.env.PORT
app.listen(port, ()=> console.log(`Start server in port ${port}`))

