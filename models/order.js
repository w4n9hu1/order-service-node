const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderNumber: String,
    supplier: String,
    status: String,
    itemsCount: Number,
    receivedItemsCount: Number,
    createdDate: Date,
})

orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Order', orderSchema)
