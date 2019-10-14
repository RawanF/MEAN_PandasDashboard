const mongoose = require('mongoose');
const PandaSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    food: { type: String, required: true},
    gender: { type: String, required: true },
    age: { type: Number, min: 0, max: 150 ,required: true},
}, {timestamps: true });
mongoose.model('Panda', PandaSchema);
