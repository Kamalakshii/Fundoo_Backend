var chai = require('chai');
chai.use(require('chai-json-schema'));
let expect = chai.expect;
let assert = chai.assert;
let should = chai.should();
var server = require("./server");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

let registration = {
    firstname: "happy",
    lastname:"singh",
    email: "happy@gmail.com",
    password: "12345678"
};
let login ={
    email:"happy@gmail.com",
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

    describe('registration should be successfull', () => {
        it('should return false instead of true', () => {
           
          chai.request('http://localhost:4000').post('/register').send(registration).end((err, res) => {
         //  console.log("mcfldkjso",server);
           
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
            }
        });
        });

        describe('login should be successfull', () => {
        it('should return false instead of true', () => {
           
            chai.request('http://localhost:4000').post('/login').send(login).end((err, res) => {
           //  console.log("mcfldkjso",server);
             
              if (err) {
                console.log("expect ==>", err);
                err.should.have.status(500);
              } else {
                console.log("expect ==>", res.body);
                res.should.have.status(200);
              //bdd style
              expect(login).to.be.jsonSchema(validation);
              login.should.be.jsonSchema(validation);
              //tdd style
              assert.jsonSchema(login, validation);
              }
          });
          });
        });
    });
});
});