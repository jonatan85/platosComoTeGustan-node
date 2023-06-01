const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema(
    {
        favoritePizza: {type: mongoose.Types.ObjectId, ref: "Pizzas"},
        email: {type: mongoose.Types.ObjectId, ref:"User", require: true, unique: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "El email no tiene un formato valido."]},
        name: {type: String, require: true},
        lastname: {type: String, lowecase: true},
        address: { type: String, require: true },
        phoneNumber: {type: String, require: true},
        country: {type: [String], lowercase:true},
        postaCode: { type: Number, require: true },
        city: { type: String, require: true },
    },
    {
        timestamps: true,
    },
);

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;