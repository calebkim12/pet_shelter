const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Pet name is required"],
        minlength: [3, "Pet name must be longer than 3 characters"]
    },
    type: {
        type: String,
        required: [true, "Pet type is required"],
        minlength: [3, "Pet type must be longer than 3 characters"]
    },
    description: {
        type: String,
        required: [true, "Pet description is required"],
        minlength: [3, "Pet description must be longer than 3 characters"]
    },
    skillOne: {
        type: String
    },
    skillTwo: {
        type: String
    },
    skillThree: {
        type: String
    },
    likes: 0
}, {timestamps: true});

mongoose.model("Pet", PetSchema);