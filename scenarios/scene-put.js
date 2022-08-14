const testCase = {
    description: 'Put User',
    positive: {
        case1: 'User can update occupation and nationality'
    },
    negative: {
        case1 : 'User can\'t update his age if input with 0 ',
        case2 : 'User can\'t update his hobby if input with empty data ',
        case3 : 'User can\'t update data if his id is null'
    }
}

module.exports = {
    testCase
}