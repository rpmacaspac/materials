const express = require('express');
const app = express();


app.use(express.json());

const veggies = [
    { id: 1, "name": "batavia lettuce", "stock": 10 },
    { id: 2, "name": "cystal lettuce", "stock": 10 },
    { id: 3, "name": "oak leaf lettuce", "stock": 10 }
]

app.get('/api/test', (req, res) => {
    res.send(veggies);
})

app.get('/', (req, res) => {
    res.send('HOME!');
})

app.post('/api/test/', (req, res) => {
    const veggie = {
        "id": veggies.length + 1,
        "name": req.body.name,
        "stock": req.body.stock
    }

    veggies.push(veggie);
    res.send(veggie);
})

app.listen(8080);