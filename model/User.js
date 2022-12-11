const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    batch:{
        type: String
    },
    paymentDate: {
        type: []
    }
},
    { collection: "Users" }
);

const model = mongoose.model("User", userSchema);

module.exports = model;