/*
    Title: Assignment 8.2 - Pets-R-Us. appointment.js
    Author: Jamal Eddine Damir
    Date: september 31, 2022
    Description: JavaScript file containing MongoDatabase Customer schema
    Sources: 
            * Source code from class GitHub Repository
            * W3Schools.com
            * Instructor provided assignment specific instructions*/

// Mongoose model code copied from Web340 course GitHub
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Mongoose schema
let customerSchema = new Schema({
	customerId: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Customer", customerSchema);
