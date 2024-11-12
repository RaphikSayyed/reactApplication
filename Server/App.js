const express = require('express');
const connectDb = require('./Config/DBconfig');
var cors = require('cors')
const bodyParser = require('body-parser');

connectDb();
const app = express()
app.use(express.json({ limit: '10mb' }));
app.use(cors()) 
app.use(bodyParser.json())

app.use('/api',require('./Routes/studentRouters'))
app.use('/api',require('./Routes/marksRoutes'))

app.listen(3000,()=>{
    console.log('app is listening on port no. 3000 ');
})