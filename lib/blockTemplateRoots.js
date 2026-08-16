var ZERO_HASH = '0000000000000000000000000000000000000000000000000000000000000000';

function reverseRpcHash(hash, fieldName) {
    if (typeof hash !== 'string' || !/^[0-9a-fA-F]{64}$/.test(hash)) {
        throw new Error(fieldName + ' must be a 32-byte hexadecimal string');
    }

    var bytes = Buffer.from(hash, 'hex');
    var reversed = Buffer.alloc(bytes.length);

    for (var i = bytes.length - 1; i >= 0; i--) {
        reversed[bytes.length - i - 1] = bytes[i];
    }

    return reversed.toString('hex');
}

exports.resolveMerkleRoot = function (rpcData, calculateLegacyRoot) {
    if (rpcData.defaultroots && rpcData.defaultroots.merkleroot) {
        return reverseRpcHash(
            rpcData.defaultroots.merkleroot,
            'defaultroots.merkleroot'
        );
    }

    return calculateLegacyRoot();
};

exports.resolveBlockCommitmentsHash = function (rpcData) {
    if (rpcData.defaultroots && rpcData.defaultroots.blockcommitmentshash) {
        return reverseRpcHash(
            rpcData.defaultroots.blockcommitmentshash,
            'defaultroots.blockcommitmentshash'
        );
    }

    if (rpcData.finalsaplingroothash) {
        return reverseRpcHash(
            rpcData.finalsaplingroothash,
            'finalsaplingroothash'
        );
    }

    return ZERO_HASH;
};
