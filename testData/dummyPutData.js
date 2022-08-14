const dummyPutData = function(idData, occupation='Farmer', nationality='Indonesian', age=63, hobbies=['Read a newspaper at the 5 am']) {
  return {
    "id": idData,
    "firstName": "Johannes",
    "lastName": "Steinburg",
    "age": age,
    "occupation": occupation,
    "nationality": nationality,
    "hobbies": hobbies,
    "gender": "MALE",
    "createdDate": "2022-08-09T13:13:38.184Z",
    "updatedDate": "2022-08-09T13:13:38.184Z"
  };
};

module.exports = {
  dummyPutData
};