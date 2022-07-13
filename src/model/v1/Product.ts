import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount_stored: {
        type: Number,
        default: 0
    },
    photo: {
        type: String
    }
})

export default mongoose.model("Product", schema)