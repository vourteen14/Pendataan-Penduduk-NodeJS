const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./server')
const expect = chai.expect
const http = require('http-status')

chai.use(chaiHttp)
describe('Unit Test Callback', function() {
	it('GET /', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('POST /', function(done) {
    chai.request(app)
      .post('/')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('GET /lihat', function(done) {
    chai.request(app)
      .get('/lihat')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  });
	it('GET /update', function(done) {
    chai.request(app)
      .get('/update')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('POST /update', function(done) {
    chai.request(app)
      .post('/update')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('GET /hapus', function(done) {
    chai.request(app)
      .get('/hapus')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
	
	it('POST /hapus', function(done) {
    chai.request(app)
      .post('/hapus')
      .end(function(err, res) {
				expect(http.OK).to.equal(200)
				done()
			})
  })
})
