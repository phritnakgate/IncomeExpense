const {model, Schema} = require("mongoose")

const TransactionSchema = new Schema({
    datetime: {type: Date, required:true},
    refcode: {type: String, required:true},
    description: {type: String, required:true},
    money: {type: Number, required:true}
})

const TransactionModel = model('Transaction', TransactionSchema)

module.exports = TransactionModel