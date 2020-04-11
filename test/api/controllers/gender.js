var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('gender', function() {

    describe('GET /gender', function() {

      it('should return a default string', function(done) {

        request(server)
          .get('/gender')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200,done);
      });

      // it('should accept a name parameter', function(done) {

      //   request(server)
      //     .get('/artist/{idArtist}')
      //     .query({ name: 'Scott'})
      //     .set('Accept', 'application/json')
      //     .expect('Content-Type', /json/)
      //     .expect(200)
      //     .end(function(err, res) {
      //       should.not.exist(err);

      //       res.body.should.eql('Hello, Scott!');

      //       done();
      //     });
      // });

    });

  });

});
