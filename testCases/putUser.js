const connectAPI = require('../connectAPI/connAPI');
const chai = require('chai');
const jsonSchema = chai.use(require('chai-json-schema'));
const expect = chai.expect;
const dataPutDummy = require('../testData/dummyPutData.js');
const dataDummy = require('../testData/dummyData.json');
const dataDummy2 = require('../testData/dummyData2.json');
const dataSchema = require('../schemas/dataSchema.json');
const putScenario = require('../scenarios/scene-put')

describe(putScenario.testCase.description, async() => {
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
    
    it(putScenario.testCase.positive.case1, async () => {
        let occupation = 'Researcher';
        let nationality = 'Estonian';
        const dataPut = dataPutDummy.dummyPutData(idData, occupation, nationality);
        let response = await connectAPI.putData(dataPut);

        expect(response.statusCode).to.equal(200);
        expect(response.body.occupation).to.equal(occupation);
        expect(response.body.nationality).to.equal(nationality);
        expect(response.body).has.jsonSchema(jsonSchema);

        //chai-things and chai-like
        expect(response.body.hobbies).contains.something.like('Charity')
    });

    it(putScenario.testCase.negative.case1, async () => {
        let idInput = "b27581ce-0a73-4890-8d47";
        let response = await connectAPI.getData(idInput);
        expect(response.statusCode).to.not.equal(200);
        expect(response.body.id).to.not.equal(idInput);
        expect(response.body.errorCode).equal('ER-01');
        expect(response.body.message).equal('user not found');
    });
});