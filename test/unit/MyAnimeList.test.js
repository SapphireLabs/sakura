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
        it('should return an Anime Model', sinonTest(function(done) {
            const animeName = "Code Geass";
            const popuraClient = popura('USERNAME', 'PASSWORD');
            const searchAnimesStub = sinon.stub(popuraClient, 'searchAnimes');
            const payloadPath = path.join(__dirname, '../', 'stubs', 'myanimelist-getanime.json');
            const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

            searchAnimesStub.withArgs(animeName).onFirstCall().resolves(payload);

            new MyAnimeList(popuraClient)
                .getAnime(animeName)
                .then(function(animeModel) {
                    assert.instanceOf(animeModel, Anime);
                    done();
                })
                .catch(done);
        }));

        it('should return null when nothing is found', sinonTest(function(done) {
            const animeName = "Code Geass";
            const popuraClient = popura('USERNAME', 'PASSWORD');
            const searchAnimesStub = sinon.stub(popuraClient, 'searchAnimes');

            searchAnimesStub.withArgs(animeName).onFirstCall().resolves([null]);

            new MyAnimeList(popuraClient)
                .getAnime(animeName)
                .then(function(animeModel) {
                    assert.isNull(animeModel);
                    done();
                })
                .catch(done);
        }));
    });
    
});