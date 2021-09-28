var mongoose = require('mongoose');
var Schema = mongoose.Schema;
PendudukSchema = new Schema({
	nama: String,
	pekerjaan: String,
	kota: String
});
module.exports = mongoose.model('Penduduk', PendudukSchema);