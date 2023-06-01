const mongoose = require('mongoose');

const platesSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true},
        description: {type: String},
        ingredients: [{type: mongoose.Types.ObjectId, ref:"Ingredients"}],
        price: { type: Number, required: true},
        account: {type: Number},
        picture: String,
        type: String,
    },
    {
        timestamps: true
    }
)

const Plates = mongoose.model('Plates', platesSchema);

module.exports = Plates