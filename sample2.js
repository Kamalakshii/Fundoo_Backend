var chai = require('chai');
chai.use(require('chai-json-schema'));
let expect = chai.expect;
let assert = chai.assert;
let should = chai.should();
var server = require("./server");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

let registration = {
    firstname: "mrb",
    lastname:"hahaha",
    email: "z@gmail.com",
    password: "12345678"
};
let login ={
    email:"z@gmail.com",
    password:"12345678"
}
let validation = {
    title:"validation for registration",
    type: 'object',
    required: ['firstname', 'lastname', 'email','password'],
    properties: {
        firstname:{
            type:'string',
            minimum:3,
        },
        lastname:{
            type:'string',
            minimum:3,
        },
        email:{
            type:'string',
            pattern:'/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/'
        },
        password:{
            type:'string',
            minimum:8
        }
    },
    title:"validation for login",
    type:"object",
    required:["email","password"],
    properties:{
        email:{
            type:'string',
            pattern:'/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/'
        },
        password:{
            type:'string',
            minimum:8
        }
    }
};
describe('schema validation for fundoo', () => {
  describe('schema validation of registration', () => {
    it('status ', function (done) {
      chai.request('http://localhost:4000').post('/register').send(registration).end((err, res) => {
        if (err) {
          console.log("expect ==>", err);
          err.should.have.status(500);
        } else {
          console.log("expect ==>", res.body);
          res.should.have.status(200);
          //bdd style
          expect(registration).to.be.jsonSchema(validation);
          registration.should.be.jsonSchema(validation);
          //tdd style
          assert.jsonSchema(registration, validation);
          /**
           * @description:test script for login
           */
          describe('Login', function () {
            it('status ', function (done) {
              chai.request('http://localhost:4000').post('/login').send(login).end((err, res) => {
                if (err) {
                  console.log("expect ==>", err);
                } else {
                  console.log("expect ==>", res.body);
                  res.should.have.status(200);
                  //bdd style
                  expect(login).to.be.jsonSchema(validation);
          login.should.be.jsonSchema(validation);
          //tdd style
          assert.jsonSchema(login, validation);
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

