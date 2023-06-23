const ordersRouter = require('express').Router()
const Order = require('../models/order')

ordersRouter.get('/', (request, response) => {
    Order.find({}).then(orders => {
        response.json(orders)
    })
})

ordersRouter.get('/:id', (request, response, next) => {
    Order.findById(request.params.id).then(order => {
        if (order) {
            response.json(order)
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})

ordersRouter.post('/', (request, response, next) => {
    const newOrder = new Order({
        ...request.body,
        status: 'Pending',
        receivedItemsCount: 0,
        createdDate: new Date()
    })

    newOrder.save().then(order => {
        response.json(order)
    }).catch(error => next(error))
})

module.exports = ordersRouter