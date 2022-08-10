const httpCaller = require('supertest');
const connectAPI = httpCaller('http://localhost:8080/');

function getData(idInput) {
    return connectAPI.get(`v1/users/${idInput}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json');
};

function postData(dataDummyPost) {
    return connectAPI.post(`v1/users`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(dataDummyPost);
};

function deleteData() {
    return connectAPI.delete(`v1/users/removeAll`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
};

function putData(dummyPutData) {
    return connectAPI.put(`v1/users`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send(dummyPutData);
};

module.exports = {
    getData, postData, deleteData, putData
};