const mongoose = require('mongoose');

const memSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{type : String, required : true},
    memImage : {type : String}
});

module.exports = mongoose.model('Memory', memSchema);