'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeChangeSignerTransaction = makeChangeSignerTransaction;

var _transaction_builder = require('../../base/transaction_builder');

var _set_options_builder = require('../../base/operations/set_options_builder');

var _xdr_generated = require('../../base/generated/xdr_generated');

var _xdr_generated2 = _interopRequireDefault(_xdr_generated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeChangeSignerTransaction({
  newPublicKey,
  soucreAccount,
  signers,
  signerToReplace,
  signingKeypair
}) {
  let operations = [];

  operations.push(addSignerOp(newPublicKey));
  if (signers) {
    let removeSignerOps = signerToReplace ? removeMasterAndCurrentSignerOps(signers, soucreAccount, signerToReplace) : removeAllSignersOps(signers, soucreAccount);
    operations.push(...removeSignerOps);
  } else {
    operations.push(removeMasterOp());
  }

  const tx = new _transaction_builder.TransactionBuilder(soucreAccount);
  tx.operations = operations;
  const txEnv = tx.build();
  txEnv.sign(signingKeypair);

  return txEnv.toEnvelope().toXDR().toString('base64');
}

function removeMasterAndCurrentSignerOps(signers, soucreAccount, publicKey) {
  return signers.filter(signer => {
    return signer.publicKey !== soucreAccount && signer.publicKey !== publicKey;
  }).map(signer => {
    return isMaster(signer, soucreAccount) ? removeMasterOp() : removeOneSignerOp(signer);
  });
}

function removeAllSignersOps(signers, soucreAccount) {
  return signers.map(signer => {
    return isMaster(signer, soucreAccount) ? removeMasterOp() : removeOneSignerOp(signer);
  });
}

function removeMasterOp() {
  return _set_options_builder.SetOptionsBuilder.setOptions({
    masterWeight: 0
  });
}

function isMaster(signer, masterAccountId) {
  return signer.publicKey === masterAccountId;
}

function removeOneSignerOp(signer) {
  return _set_options_builder.SetOptionsBuilder.setOptions({
    signer: {
      pubKey: signer.publicKey,
      weight: 0,
      identity: signer.signerIdentity,
      signerType: 1
    }
  });
}

function addSignerOp(newAccountId) {
  return _set_options_builder.SetOptionsBuilder.setOptions({
    signer: {
      pubKey: newAccountId,
      weight: 255,
      identity: 0,
      signerType: signerTypeAll()
    }
  });
}

function signerTypeAll() {
  return _xdr_generated2.default.SignerType.values().map(value => value.value).reduce((total, value) => value | total);
}