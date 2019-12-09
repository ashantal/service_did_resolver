const express = require('express');
const bodyParser = require('body-parser')
const ngrok = require('ngrok');
const MyMethod = require('./my-did-resolver')
var hdkey = require('ethereumjs-wallet/hdkey')
var bip39 = require('bip39');
const secp256k1 = require('secp256k1')
const didJWT = require('did-jwt')
 
const myResolver = MyMethod.getResolver()
const resolver = myResolver;

const mnemonic = 'analyst end eye apple burden trust snack question feature monkey dinner loan'

var seed = bip39.mnemonicToSeedSync(mnemonic)
console.log(`seed 0x${seed.toString('hex')}`)
const hdk = hdkey.fromMasterSeed(seed)

const path = `m/7696500'/0'/0'/0'`;
const hdnode = hdk.derivePath(path);
const wallet = hdnode.getWallet(); 
const privKey = wallet.getPrivateKey();//hdnode.getWallet().getPublicKey(); 
const pubKey = secp256k1.publicKeyCreate(privKey)//.slice(1)
const address=wallet.getAddress().toString('hex')  
var didPrivateKey=privKey.toString('hex');
const signer = didJWT.SimpleSigner(didPrivateKey);
const did=`did:ethr:0x${address}`
const app = express();

var endpoint = '';
app.use(bodyParser.json({ type: '*/*' }))

app.get('/', (req, res) => {
    send({callbackUrl: endpoint + '/callback'},res);
})

app.post('/callback', (req, res) => {
  const jwt = req.body.access_token
  didJWT.verifyJWT(jwt, 
      {
          resolver: resolver, 
          audience: did
      }).then(
          jwt =>
      { 
          console.log(jwt);
          send(
              {name:'ash'},
              res);
      });  
})


function send(payload, res){
    didJWT.createJWT(
        payload,
        {
            alg: 'ES256K-R', 
            issuer: did, 
            signer
        }).then( 
            jwt =>
            { 
                res.send(jwt)
            }
        );    
}

const server = app.listen(8089, () => {
  ngrok.connect(8089).then(ngrokUrl => {
    endpoint = ngrokUrl
    console.log(`Requestor Service running, open at ${endpoint}`)
  })
})
