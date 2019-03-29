/******************************************************************************************
 *  @Purpose        : To write the test scripts in Mocha for testing backend 
                      using the tool chai.
 *  @file           : test.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 10-03-2019
 *******************************************************************************************/
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
var server = require('../server')
var fs = require('fs');

function readFile() {
  /**
   * @description:read file from json
   */
  var data = fs.readFileSync('/home/administrator/fundoo/Server/test/test.json');
  var data1 = JSON.parse(data);
  return data1;
}
/**
 * @description:test script for registration 
 */
describe('validation for test cases', function () {
  describe('validation for registration', function () {
    var data1 = readFile();
    it('status ', function (done) {
      chai.request(server).post('/register').send(data1.registration).end((err, res) => {
        if (err) {
          console.log("expect ==>", err);
          err.should.have.status(500);
        } else {
          console.log("expect ==>", res.body);
          res.should.have.status(200);
          /**
           * @description:test script for login
           */
          describe('validation for login', function () {
            it('status ', function (done) {
              chai.request(server).post('/login').send(data1.login).end((err, res) => {
                if (err) {
                  console.log("expect ==>", err);
                } else {
                  console.log("expect ==>", res.body);
                  res.should.have.status(200);
                  /**
                   * @description:test script for forgot password
                   */
                  describe('validation for forgot password', function () {
                    it('status ', function (done) {
                      chai.request(server).post('/forgotpassword').send(data1.forgot).end((err, res) => {
                        if (err) {
                          console.log("expect ==>", err);
                        } else {
                          console.log("expect ==>", res.body);
                          res.should.have.status(200);
                          /**
                           * @description:test script for reset password
                           */
                          describe('validation for reset password', function () {
                            it('status ', function (done) {
                              chai.request(server).post('/resetPassword/:token').send(data1.reset).end((err, res) => {
                                if (err) {
                                  console.log("expect ==>", err);
                                } else {
                                  console.log("expect ==>", res.body);
                                  res.should.have.status(200);
                                }
                                done()
                              })
                            })
                          })
                        }
                        done()
                      })
                    })
                  })
                }
                done()
              })
            })
          })
        }
        done()
      })
    })
  })
})
