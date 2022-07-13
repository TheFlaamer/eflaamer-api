import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    photo: {
        type: String,
    },
    document: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Masculino", "Feminino", "Não Binario"]
    },
    phone: {
        type: String
    },
    zipcode: {
        type: String
    },
    street: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    addressNumber: {
        type: Number
    },
    permissions: {
        type: String,
        enum: ["Membro", "Prime", "Vendedor", "Fornecedor", "Moderador", "Gerente", "Dono"]
    }
})

export default mongoose.model("User", schema)