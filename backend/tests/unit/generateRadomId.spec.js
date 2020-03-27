const generateRandonId = require('../../src/util/generateRandomId');
describe('Genarate random Id', () =>{
    it('Gerar um id único', () =>{
        const id = generateRandonId();
        expect(id).toHaveLength(8);
    }); 
});