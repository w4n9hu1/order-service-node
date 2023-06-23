require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Order = require('./models/order')

const app = express()
app.use(cors())
app.use(express.json())


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

app.get('/api/orders', (request, response) => {
    Order.find({}).then(orders => {
        response.json(orders)
    })
})

app.get('/api/orders/:id', (request, response, next) => {
    Order.findById(request.params.id).then(order => {
        if (order) {
            response.json(order);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error))
})

app.post('/api/orders', (request, response) => {
    const newOrder = new Order({
        ...request.body,
        status: "Pending",
        receivedItemsCount: 0,
        createdDate: new Date()
    })

    newOrder.save().then(order => {
        response.json(order)
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

