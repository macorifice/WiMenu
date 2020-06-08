const mongoose = require('mongoose');
const {Schema} = mongoose;

const menuSchema = new Schema({
    name: String,
    description: String,
})

mongoose.model('menus', menuSchema);