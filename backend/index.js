const express = require('express');
const app = express()
// mongo connection
const connectToMongo = require('./db');
connectToMongo();

const port = 5000;
app.use(express.json());

// Available routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`iNoteBook App listening at http://localhost:${port}`)
})