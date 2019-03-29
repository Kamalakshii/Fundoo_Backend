var chai = require('chai');
chai.use(require('chai-json-schema'));
let expect = chai.expect;
let assert = chai.assert;
let should = chai.should();
var server = require("./server");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

let registration = {
    firstname: "stufy",
    lastname: "hahaha",
    email: "stufy@gmail.com",
    password: "12345678"
};
let login = {
    email: "stufy@gmail.com",
    password: "12345678"
};
let forgot = {
    email: "stufy@gmail.com"
};
// let reset = {
//    password: "22345678",
//    "headers":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOiI1YzgzOGMxMDRlOGFhNjRjMmRmZTNhNmEifSwiaWF0IjoxNTUyMTI1MDEyLCJleHAiOjE1NTIyMTE0MTJ9.SuLUvgyGuiQwaA8TPi9fzosmvEqkr-xoIeNpM-n7uh0"
// };
let validation = {
    title: "validation for registration",
    type: 'object',
    required: ['firstname', 'lastname', 'email', 'password'],
    properties: {
        firstname: {
            type: 'string',
            minimum: 3,
        },
        lastname: {
            type: 'string',
            minimum: 3,
        },
        email: {
            type: 'string',
            pattern: '/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/'
        },
        password: {
            type: 'string',
            minimum: 8
        }
    },
    title: "validation for login",
    type: "object",
    required: ["email", "password"],
    properties: {
        email: {
            type: 'string',
            pattern: '/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/'
        },
        password: {
            type: 'string',
            minimum: 8
        }
    },
    title: "validation for forgot",
    type: "object",
    required: ["email"],
    properties: {
        email: {
            type: 'string',
            pattern: '/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/'
        }
    },
    // title: "validation for reset",
    // type: "object",
    // required: ["password","headers"],
    // properties: {
    //     password: {
    //         type: 'string',
    //         minimum: 8
    //     },
    //     headers:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOiI1YzgzOGMxMDRlOGFhNjRjMmRmZTNhNmEifSwiaWF0IjoxNTUyMTI1MDEyLCJleHAiOjE1NTIyMTE0MTJ9.SuLUvgyGuiQwaA8TPi9fzosmvEqkr-xoIeNpM-n7uh0"
    //     }

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
                                    /**
                                     * @description:test script for forgot password
                                     */
                                    describe('Forgot Password page', function () {
                                        it('status ', function (done) {
                                            chai.request('http://localhost:4000').post('/forgotpassword').send(forgot).end((err, res) => {
                                                if (err) {
                                                    console.log("expect ==>", err);
                                                } else {
                                                    console.log("expect ==>", res.body);
                                                    res.should.have.status(200);
                                                    //bdd style
                                                    expect(forgot).to.be.jsonSchema(validation);
                                                    forgot.should.be.jsonSchema(validation);
                                                    //tdd style
                                                    assert.jsonSchema(forgot, validation);
                                                    /**
                                                     * @description:test script for reset password
                                                     */
                                                    // describe('Reset Password page', function () {
                                                    //     it('status ', function (done) {
                                                    //         chai.request('http://localhost:4000').post('/resetPassword/:token').send(reset).end((err, res) => {
                                                    //             if (err) {
                                                    //                 console.log("expect ==>", err);
                                                    //             } else {
                                                    //                 console.log("expect ==>", res.body);
                                                    //                 res.should.have.status(200);
                                                    //                 //bdd style
                                                    //                 expect(reset).to.be.jsonSchema(validation);
                                                    //                 reset.should.be.jsonSchema(validation);
                                                    //                 //tdd style
                                                    //                 assert.jsonSchema(forgot, validation);
                                                    //             }
                                                    //             done()
                                                    //         })
                                                    //     })
                                                    // })
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


