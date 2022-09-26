// Mongoose model code copied from Web340 course GitHub
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Mongoose schema
let customerSchema = new Schema({
	customerId: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Customer", customerSchema);
