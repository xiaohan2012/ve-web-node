 
var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var PDBSchema = new Schema({
    id: ObjectId,
    name: String,
    src: String,
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('PDB', PDBSchema);
