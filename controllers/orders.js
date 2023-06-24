const ordersRouter = require('express').Router()
const Order = require('../models/order')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}
ordersRouter.post('/', async (request, response, next) => {

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const newOrder = new Order({
        ...request.body,
        status: 'Pending',
        receivedItemsCount: 0,
        createdDate: new Date(),
        user: user._id
    })

    newOrder.save().then(order => {
        user.orders = user.orders.concat(order._id)
        user.save()
        response.json(order)
    }).catch(error => next(error))
})

module.exports = ordersRouter