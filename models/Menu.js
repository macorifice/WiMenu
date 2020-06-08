const mongoose = require('mongoose');
const {Schema} = mongoose;

const menuSchema = new Schema({
    name: String,
    description: String,
    from: Date,
    to: Date,
    pdf: Schema.Types.Mixed
})

mongoose.model('menus', menuSchema);