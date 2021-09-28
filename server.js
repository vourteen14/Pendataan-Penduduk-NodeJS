const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const eta = require("eta")
const mongoose = require("mongoose")
const Penduduk = require("./model/penduduk")

app.use(bodyParser.urlencoded({ extended: true }))

app.engine("eta", eta.renderFile)

app.set("view engine", "eta")

app.set("views", "views")

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

mongoose.connect('mongodb://127.0.0.1/Penduduk').then(() => console.log('Koneksi ke daatabase sukses')).catch(err => console.error('Koneksi Database Gagal', err))

app.listen(6969, function() {
	console.log('Server listen pada port 6969')
})

app.get('/', function(req, res) {
	res.render("tambah", {})
})

app.post('/', function(req, res) {
	Penduduk.create({
		nama: req.body.nama,
		pekerjaan: req.body.pekerjaan,
		kota: req.body.kota
	},function(err, penduduk) {
		res.render("tambah", {})
		console.log('Data ditambahkan ' + penduduk)
	})
})

app.get('/lihat', function(req, res) {
	Penduduk.find(function(err, penduduks) {
		if(err)
			res.send(err)
		var resutls = JSON.parse(JSON.stringify(penduduks))
		res.render("lihat", { penduduks: resutls})
	})
})

app.get('/lihat/:dataID', function(req, res) {
	var dataID = req.params.dataID
	Penduduk.findById({ _id: dataID}, function(err, penduduk) {
		if(err)
			res.send(err)
		var resutls = JSON.parse(JSON.stringify(penduduk))
		res.render('detail', resutls)
	})
})

app.get('/update', function(req, res) {
	Penduduk.find(function(err, penduduks) {
		if(err)
			res.send(err)
		var resutls = JSON.parse(JSON.stringify(penduduks))
		res.render("update", { penduduks: resutls})
	})
})

app.get('/update/:dataID', function(req, res) {
	var dataID = req.params.dataID
	Penduduk.findById({ _id: dataID}, function(err, penduduk) {
		if(err)
			res.send(err)
		var resutls = JSON.parse(JSON.stringify(penduduk))
		res.render('edit', resutls)
	})
})

app.post('/update/:dataID', function(req, res) {
	var dataID = req.params.dataID
	var dataUpdate = {
		nama : req.body.nama,
		pekerjaan : req.body.pekerjaan,
		kota : req.body.kota
	}
	Penduduk.findByIdAndUpdate({ _id: dataID}, dataUpdate, function(err, penduduk){
		if(err)
			res.send(err)
		var resutls = JSON.parse(JSON.stringify(penduduk))
		res.render("edit", resutls)
		console.log('Data berhasil di update ' + resutls)
	})
})

app.get('/hapus', function(req, res) {
	Penduduk.find(function(err, penduduks) {
		if(err)
			res.send(err)
		var resutls = JSON.parse(JSON.stringify(penduduks))
		res.render("hapus", { penduduks: resutls})
	})
})

app.post('/hapus', function(req, res) {
	var dataID = req.body.id
	Penduduk.remove({_id: dataID}, function(err){
		if(err){
			res.send(err)
		} else {
			console.log('Data berhasil dihapus ' + dataID)
			Penduduk.find(function(err, penduduks) {
				if(err)
					res.send(err)
				var resutls = JSON.parse(JSON.stringify(penduduks))
				res.render("hapus", { penduduks: resutls})
			})
		}
	})
})