const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

let orders = [
    {
        "id": 1,
        "orderNumber": "RO001",
        "supplier": "Supplier A",
        "status": "Pending",
        "createdDate": "2023-06-20T10:15:00.000Z",
        "itemsCount": 10,
        "receivedItemsCount": 5
    },
    {
        "id": 2,
        "orderNumber": "RO002",
        "supplier": "Supplier B",
        "status": "Completed",
        "createdDate": "2023-06-18T14:30:00.000Z",
        "itemsCount": 8,
        "receivedItemsCount": 8
    },
    {
        "id": 3,
        "orderNumber": "RO003",
        "supplier": "Supplier C",
        "status": "In Progress",
        "createdDate": "2023-06-21T09:45:00.000Z",
        "itemsCount": 15,
        "receivedItemsCount": 2
    }
]

app.get('/api/orders', (request, response) => {
    response.json(orders)
})

app.get('/api/orders/:id', (request, response) => {
    const id = request.params.id;
    var order = orders.find(o => o.id == id);
    if (order) {
        response.json(order);
    } else {
        response.status(404).end();
    }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})