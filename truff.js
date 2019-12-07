const HDWallet = require('ethereum-hdwallet')
var hdkey = require('ethereumjs-wallet/hdkey')
var bip39 = require('bip39');
const secp256k1 = require('secp256k1')
const { randomBytes } = require('crypto')
import 'package:randombytes/randombytes.dart';

const mnemonic = 'analyst end eye apple burden trust snack question feature monkey dinner loan'
const hdwallet = HDWallet.fromMnemonic(mnemonic)

var seed = bip39.mnemonicToSeedSync(mnemonic)
console.log(`seed 0x${seed.toString('hex')}`)
const hdk = hdkey.fromMasterSeed(seed)

const path = `m/7696500'/0'/0'/0`;
const hdnode = hdk.derivePath(path)
var privKey = hdnode.getWallet().getPrivateKey();//hdnode.getWallet().getPublicKey(); 
const pubKey = secp256k1.publicKeyCreate(privKey)//.slice(1)
var key = pubKey.toString('hex');
console.log(`${path} 0x${key}`)

const msg = randomBytes(32)
console.log(msg.toString('hex'))
const sigObj = secp256k1.sign(msg, privKey)
console.log(secp256k1.verify(msg, sigObj.signature, pubKey))


/*
var pubKey1 = hdwallet.derive(path).getPublicKey();
var key1 = pubKey1.toString('hex');
console.log(pubKey1.length);
console.log(`${path} 0x${key1}`)
*/

