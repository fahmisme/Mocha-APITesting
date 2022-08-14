const connectAPI = require('../connectAPI/connAPI');
const chai = require('chai');
const jsonSchema = chai.use(require('chai-json-schema'));
const expect = chai.expect;
const dataPutDummy = require('../testData/dummyPutData.js');
const putScenario = require('../scenarios/scene-put')

describe(putScenario.testCase.description, async() => {
    var idData = null;

    before(async() => {
        console.log('Preparing data..');
        let dataDummy = require('../testData/dummyData.json')
        let response = await connectAPI.postData(dataDummy);
        console.log('Users 1 created');
        idData = response.body.id;
    });
    // beforeEach(async() => {
    // });
    // afterEach(async() => {
    // });
    after(async() => {
        let response = await connectAPI.deleteData();
        expect(response.statusCode).to.equal(200);
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
        expect(response.body.hobbies).contains.something.like('Read a newspaper at the 5 am')
    });

    it(putScenario.testCase.negative.case1, async () => {
        let age = 0;
        const dataPut = dataPutDummy.dummyPutData(idData, undefined, undefined, age);
        let response = await connectAPI.putData(dataPut);
        expect(response.statusCode).to.not.equal(200);
        expect(response.body.errorCode).to.equal('ER-03');
        expect(response.body.message).to.equal('you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender');
    });

    it(putScenario.testCase.negative.case2, async () => {
        let hobbies = [];
        const dataPut = dataPutDummy.dummyPutData(idData, undefined, undefined, undefined, hobbies);
        let response = await connectAPI.putData(dataPut);
        expect(response.statusCode).to.not.equal(200);
        expect(response.body.errorCode).to.equal('ER-03');
        expect(response.body.message).to.equal('you must specify data for firstname, lastName, age, occupation, nationality, hobbies (at least 1), and gender');
    });

    it(putScenario.testCase.negative.case3, async () => {
        let idInput = "";
        const dataPut = dataPutDummy.dummyPutData(idInput);
        let response = await connectAPI.putData(dataPut);
        expect(response.statusCode).to.not.equal(200);
        expect(response.body.errorCode).equal('ER-01');
        expect(response.body.message).equal('user not found');
    });
});