const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Menu');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://admin_wimenu:3w4aSq7cg2j_xC5@ds151228.mlab.com:51228/heroku_4brl6sl6`);

app.use(bodyParser.json());

require('./routes/menuRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
  
  }

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});