const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let customerSchema = new Schema({
    customerId: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true}
});
module.exports = mongoose.model('Customer', customerSchema);