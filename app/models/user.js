var findOrCreate = require('mongoose-findorcreate');
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
    id : { type: String, unique: true },
    userName    : { type: String, },
    fullName: { type: String, },
    createAt : { type: Date, default: Date.now }
});

/* load plugin */
userSchema.plugin( findOrCreate );

module.exports = mongoose.model('user', userSchema);