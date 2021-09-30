const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const eta = require("eta")
const mongoose = require("mongoose")
const Penduduk = require("./model/penduduk")

const DB_HOST = process.env.DB_HOST

app.use(bodyParser.urlencoded({ extended: true }))

app.engine("eta", eta.renderFile)

app.set("view engine", "eta")

app.set("views", "views")

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

mongoose.connect(DB_HOST)

app.get('/', function(req, res) {
	res.render("tambah", {})
})

app.post('/', function(req, res) {
	if(req.body.nama == null && req.body.pekerjaan == null && req.body.kota == null){
		res.render("tambah", {})
	} else {
		Penduduk.create({
			nama: req.body.nama,
			pekerjaan: req.body.pekerjaan,
			kota: req.body.kota
		},function(err, penduduk) {
			if(err)
				res.status(400).send(err)
			res.render("tambah", {})
			console.log('Data ditambahkan ' + penduduk)
		})
	}
})

app.get('/lihat', function(req, res) {
	Penduduk.find(function(err, penduduks) {
		if(err)
			res.status(400).send(err)
		var resutls = JSON.parse(JSON.stringify(penduduks))
		res.render("lihat", { penduduks: resutls})
	})
})

app.get('/lihat/:dataID', function(req, res) {
	var dataID = req.params.dataID
	Penduduk.findById({ _id: dataID}, function(err, penduduk) {
		if(err)
			res.status(400).send(err)
		var resutls = JSON.parse(JSON.stringify(penduduk))
		res.render('detail', resutls)
	})
})

app.get('/update', function(req, res) {
	Penduduk.find(function(err, penduduks) {
		if(err)
			res.status(400).send(err)
		var resutls = JSON.parse(JSON.stringify(penduduks))
		res.render("update", { penduduks: resutls})
	})
})

app.get('/update/:dataID', function(req, res) {
	var dataID = req.params.dataID
	Penduduk.findById({ _id: dataID}, function(err, penduduk) {
		if(err)
			res.status(400).status(400)
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
			res.status(400).send(err)
		var resutls = JSON.parse(JSON.stringify(penduduk))
		res.render("edit", resutls)
		console.log('Data berhasil di update ' + resutls)
	})
})

app.get('/hapus', function(req, res) {
	Penduduk.find(function(err, penduduks) {
		if(err)
			res.status(400).send(err)
		var resutls = JSON.parse(JSON.stringify(penduduks))
		res.render("hapus", { penduduks: resutls})
	})
})

app.post('/hapus', function(req, res) {
	var dataID = req.body.id
	if(req.body.id == null){
		Penduduk.find(function(err, penduduks) {
			if(err)
				res.status(400).send(err)
			var resutls = JSON.parse(JSON.stringify(penduduks))
			res.render("hapus", { penduduks: resutls})
		})
	} else {
		Penduduk.deleteOne({_id: dataID}, function(err){
			if(err){
				res.status(400).send(err)
			} else {
				console.log('Data berhasil dihapus ' + dataID)
				Penduduk.find(function(err, penduduks) {
					if(err)
						res.status(400).send(err)
					var resutls = JSON.parse(JSON.stringify(penduduks))
					res.render("hapus", { penduduks: resutls})
				})
			}
		})
	}
})

const server = app.listen(6969, function() {
	console.log('Server listen pada port 6969')
})

module.exports = server;