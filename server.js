const express = require('express');
const fs = require('fs');
const path = require('path');
const { get } = require('http');
const { join } = require('path');
const { animals } = require('./data/animals.json');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

// parse the incoming string or array of data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start app on PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('API server now on port 3001');
});