const chai = require('chai');
const assert = chai.assert;
const sinon = require('sinon');
const sinonTestFactory = require('sinon-test');
const sinonTest = sinonTestFactory(sinon);
const fs = require('fs');
const path = require('path');
const { MyAnimeList, Anime } = require('../../data.js');
const popura = require('popura');

describe('MyAnimeList', function() {
    describe('#getAnime()', function() {
        const animeName = 'Code Geass';

        it('should return an Anime Model', sinonTest(function(done) {
            const payloadPath = path.join(__dirname, '../', 'stubs', 'myanimelist-getanime.json');
            const searchAnimePayload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

            new MyAnimeList(createPopuraStub(animeName, searchAnimePayload))
                .getAnime(animeName)
                .then(function(animeModel) {
                    assert.instanceOf(animeModel, Anime);
                    done();
                })
                .catch(done);
        }));

        it('should return null when nothing is found', sinonTest(function(done) {
            new MyAnimeList(createPopuraStub(animeName))
                .getAnime(animeName)
                .then(function(animeModel) {
                    assert.isNull(animeModel);
                    done();
                })
                .catch(done);
        }));
    });
});

function createPopuraStub(animeName = "ANIME_NAME", stubResponse = [null]) {
    const popuraClient = popura('USERNAME', 'PASSWORD');
    const searchAnimesStub = sinon
        .stub(popuraClient, 'searchAnimes')
        .withArgs(animeName)
        .onFirstCall()
        .resolves(stubResponse);

    return popuraClient;
}