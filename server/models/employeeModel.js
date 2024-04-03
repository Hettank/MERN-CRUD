import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String
    },

    createdAt: Date,

    updatedAt: Date
})

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee