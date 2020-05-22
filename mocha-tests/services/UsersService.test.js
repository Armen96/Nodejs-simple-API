const expect = require('chai').expect;
const {
    generateHashPassword,
    compareHashPassword,
    generateJWToken,
    getUserInfoByToken
} = require('../../src/app/services/UsersService');


describe('JWT Hash Password', function() {
    const password = 'secret';
    const passwordHash = generateHashPassword(password);
    const candidate = {
        _id: '5asd2a11df',
        email: 'test@test.com',
        password: password
    }

    describe('#generateHashPassword()', function() {
        it('should return 60 as a hash result', function() {
            const response  = passwordHash.toString().length;
            expect(response).to.equal(60);
        });
    });

    describe('#compareHashPassword()', function() {
        it('should return true in case of the same password', function() {
            const response  = compareHashPassword(password, passwordHash);
            expect(response).to.equal(true);
        });
    });

    describe('#generateJWToken()', function() {
        it('should return jwt token', function() {
            const response  = generateJWToken(candidate).toString().length;
            expect(response).to.be.above(10);
        });
    });

    describe('#getUserInfoByToken()', function() {
        it('should return false', function() {
            const response  = getUserInfoByToken(false);
            expect(response).to.equal(false);
        });
    });
});
