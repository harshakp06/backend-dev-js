import express from 'express'
import 'dotenv/config'
import logger from "./logger.js";
import morgan from "morgan";
// require('dotenv').config()

const app = express()


const port = process.env.PORT || 3000

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

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// add a new tea
app.post('/teas',(req,res) => {

    logger.error("New Tea Added");
    const {name, price} = req.body
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get all tea
app.get('/teas',(req,res) => {
    logger.info("All Tea Fetched");
    res.status(200).send(teaData)
})


// get a tea using the id
app.get('/teas/:id',(req,res) => {

    logger.debug(`${parseInt(req.params.id)} fetched`);
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


