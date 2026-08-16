var assert = require('assert');
var templateRoots = require('../lib/blockTemplateRoots.js');

var rpcHash = '000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f';
var reversedHash = '1f1e1d1c1b1a191817161514131211100f0e0d0c0b0a09080706050403020100';

var legacyRootCalculated = false;
var merkleRoot = templateRoots.resolveMerkleRoot(
    {
        defaultroots: {
            merkleroot: rpcHash
        }
    },
    function () {
        legacyRootCalculated = true;
        return 'legacy';
    }
);

assert.strictEqual(merkleRoot, reversedHash);
assert.strictEqual(legacyRootCalculated, false);

assert.strictEqual(
    templateRoots.resolveMerkleRoot({}, function () {
        return 'legacy';
    }),
    'legacy'
);

assert.strictEqual(
    templateRoots.resolveBlockCommitmentsHash({
        defaultroots: {
            blockcommitmentshash: rpcHash
        },
        finalsaplingroothash: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    }),
    reversedHash
);

assert.strictEqual(
    templateRoots.resolveBlockCommitmentsHash({
        finalsaplingroothash: rpcHash
    }),
    reversedHash
);

assert.strictEqual(
    templateRoots.resolveBlockCommitmentsHash({}),
    '0000000000000000000000000000000000000000000000000000000000000000'
);

assert.throws(function () {
    templateRoots.resolveMerkleRoot(
        {
            defaultroots: {
                merkleroot: 'not-a-hash'
            }
        },
        function () {
            return 'legacy';
        }
    );
}, /defaultroots\.merkleroot must be a 32-byte hexadecimal string/);

console.log('block template root tests passed');
