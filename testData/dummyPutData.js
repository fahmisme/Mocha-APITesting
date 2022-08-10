const dummyPutData = function(idData, occupation, nationality) {
  return {
    "id": idData,
    "firstName": "Johannes",
    "lastName": "Steinburg",
    "age": 69,
    "occupation": occupation,
    "nationality": nationality,
    "hobbies": [
      "Charity"
    ],
    "gender": "MALE",
    "createdDate": "2022-08-09T13:13:38.184Z",
    "updatedDate": "2022-08-09T13:13:38.184Z"
  };
};

module.exports = {
  dummyPutData
};