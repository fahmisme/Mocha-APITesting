const connectAPI = require('../connectAPI/connAPI');
const chai = require('chai');
const jsonSchema = chai.use(require('chai-json-schema'));
const expect = chai.expect;
const dataDummy = require('../testData/dummyData.json');
const dataDummy2 = require('../testData/dummyData2.json');
const dataSchema = require('../schemas/dataSchema.json');
const getScenario = require('../scenarios/scene-get');

chai.use(require('chai-like'));
chai.use(require('chai-things'));

describe(getScenario.testCase.description, async() => {
    var idData = null;

    before(async() => {
        console.log('Preparing data..');
    });
    beforeEach(async() => {
        let dataDummy = require('../testData/dummyData.json')
        let response = await connectAPI.postData(dataDummy);
        console.log('Users 1 created');
        let dataDummy2 = require('../testData/dummyData2.json')
        response = await connectAPI.postData(dataDummy2);
        console.log('Users 2 created');
        idData = response.body.id;
    });
    afterEach(async() => {
        let response = await connectAPI.deleteData();
        expect(response.statusCode).to.equal(200);
    });
    after(async() => {
        console.log('Deleting all data..');
    });
    
    it(getScenario.testCase.positive.case1, async () => {
        let response = await connectAPI.getData(idData);
        expect(response.statusCode).to.equal(200);
        expect(response.body).has.jsonSchema(jsonSchema);

        //chai-things and chai-like
        expect(response.body.hobbies).contains.something.like('Read a mystery book')
    });

    it(getScenario.testCase.negative.case1, async () => {
        let idInput = "b27581ce-0a73-4890-8d47";
        let response = await connectAPI.getData(idInput);
        expect(response.statusCode).to.not.equal(200);
        expect(response.body.id).to.not.equal(idInput);
        expect(response.body.errorCode).equal('ER-01');
        expect(response.body.message).equal('user not found');
    });
});