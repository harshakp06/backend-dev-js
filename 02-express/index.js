import express from 'express'

const app = express()


const port = 3000

// app.get("/",(req,res) => {
//     res.send('Hello from Harsha - using Express library')
// })


// app.get("/ice-tea",(req,res) => {
//     res.send('What Ice Tea would you prefer? ')
// })

// app.get("/github",(req,res) => {
//     res.send('harshakp06')
// })

app.use(express.json())

let teaData = []
let nextId = 1

// add a new tea
app.post('/teas',(req,res) => {

    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all tea
app.get('/teas',(req,res) => {
    res.status(200).send(teaData)
})


// get a tea using the id
app.get('/teas/:id',(req,res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    console.log(teaData.find(t => t.id === parseInt(req.params.id)));
    

    if (!tea) {
        return res.status(404).send('Tea not found')
    }

    res.status(200).send(tea)
})

// update tea

app.put('/teas/:id',(req,res) => {

    
    const tea = teaData.find(t => t.id === parseInt(req.params.id))

    if (!tea) {
        return res.status(404).send('Tea not found')
    }

    const {name, price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

// delete tea

app.delete('/teas/:id', (req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    console.log(teaData.findIndex(t => t.id === parseInt(req.params.id)));
    

    if(index === -1) {
        return res.status(404).send('tea not found')
    }

    teaData.splice(index, 1)
    return res.status(204).send('deleted')

})

app.listen(port, () => {
    console.log(`Server is running at port: ${port} ...`);
    
})


