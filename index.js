var bitcore = require('bitcore-lib');
var EthereumBip44 = require('ethereum-bip44-update');
var bip39 = require('bip39');

var seed = bip39.mnemonicToSeedSync('analyst end eye apple burden trust snack question feature monkey dinner loan').toString('hex')
var key = new bitcore.HDPrivateKey.fromSeed(seed);

for(var a=0;a<2;a++){
    for(var n=0;n<=2;n++){
        for(var i=0;i<=2;i++){
        var derivedPubKey = key.derive(`m/7696500'/${a}'/${n}'/${i}`).hdPublicKey;
        var wallet = EthereumBip44.fromPublicSeed(derivedPubKey.toString());
        console.log(`m/7696500'/${a}'/${n}'/${i}`)
        console.log(wallet.getAddress(0));
        }        
    }
}

