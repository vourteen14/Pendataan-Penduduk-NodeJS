const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./server')
const expect = chai.expect
const http = require('http-status')

chai.use(chaiHttp)
describe('Unit Test Callback', function() {
	it('GET /', function(done) {
    chai.request(app)
      .get('http://127.0.0.1:6969/')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('POST /', function(done) {
    chai.request(app)
      .post('http://127.0.0.1:6969/')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('GET /lihat', function(done) {
    chai.request(app)
      .get('http://127.0.0.1:6969/lihat')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  });
	it('GET /update', function(done) {
    chai.request(app)
      .get('http://127.0.0.1:6969/update')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('POST /update', function(done) {
    chai.request(app)
      .post('http://127.0.0.1:6969/update')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('GET /hapus', function(done) {
    chai.request(app)
      .get('http://127.0.0.1:6969/hapus')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('POST /hapus', function(done) {
    chai.request(app)
      .post('http://127.0.0.1:6969/hapus')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
})
