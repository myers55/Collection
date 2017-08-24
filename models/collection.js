const mongoose = require('mongoose');


const coinsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: Number,
    location: [{
        state:String,
        country:String,
    }],
    description:Array
});

const Coin = mongoose.model('Coin', coinsSchema);

module.exports = Coin;
// var collection = new coin({
//     name: 'Flowing Hair. Wreath Reverse.',
//     printedValue: .1,
//     date: 1793,
//     types: {
//         set: 'penny',
//         subject: 'Lady Liberty',
//         series: 'rare'
//     },
//     country: ["United States of America"],
//     metalContent: "copper",
//     mint: false
// });




// async function save() {
//     var result = await collection.save();
//     return result
// }

