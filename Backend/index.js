const express = require('express');
const connectToMongo = require('./db.js');
const cors = require('cors');

const app = express();
const port = 5000;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});
