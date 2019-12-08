
  const DIDResolver = require('did-resolver')
  const MyMethod = require('./my-did-resolver')
  
  const HDWallet = require('ethereum-hdwallet')
  var hdkey = require('ethereumjs-wallet/hdkey')
  var bip39 = require('bip39');
  const secp256k1 = require('secp256k1')
  const didJWT = require('did-jwt')
   
  const myResolver = MyMethod.getResolver()
  const resolver = myResolver;
  
  
  const mnemonic = 'analyst end eye apple burden trust snack question feature monkey dinner loan'
  const hdwallet = HDWallet.fromMnemonic(mnemonic)
  
  var seed = bip39.mnemonicToSeedSync(mnemonic)
  console.log(`seed 0x${seed.toString('hex')}`)
  const hdk = hdkey.fromMasterSeed(seed)
  
  const path = `m/7696500'/0'/0'/0'`;
  const hdnode = hdk.derivePath(path);
  const wallet = hdnode.getWallet(); 
  var privKey = wallet.getPrivateKey();//hdnode.getWallet().getPublicKey(); 
  const pubKey = secp256k1.publicKeyCreate(privKey)//.slice(1)
  var key = pubKey.toString('hex');
  var address=wallet.getAddress().toString('hex')
  
  
  //const msg = randomBytes(32)
  //console.log(msg.toString('hex'))
  //const sigObj = secp256k1.sign(msg, privKey)
  //console.log(secp256k1.verify(msg, sigObj.signature, pubKey))
  
  //var did = 'did:ethr:0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
  //var didPrivateKey = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f'
   
  //var did = 'did:ethr:0xba25783176a82174b81e5716f80c7d2dde7eedc0'
  //var didPrivateKey = 'fa4fe1efd3b90272f76e663040c94b18887902ac233c6869d4fef7d134ec40df'

  var did=`did:ethr:0x${address}`
  var didPrivateKey=privKey.toString('hex');

  console.log(`did ${did}`)
  console.log(`pubKey 0x${key}`)
  console.log(`priv 0x${didPrivateKey}`)
  
  const signer = didJWT.SimpleSigner(didPrivateKey);
  let jwt = '';
  didJWT.createJWT({
      aud: did, 
      exp: 1957463421, 
      name: 'uPort Developer'
      },{
          alg: 'ES256K-R', 
          issuer: did, 
          signer
      }).then( 
          response =>
          { 
             //jwt = response;
             jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NkstUiJ9.eyJpc3MiOiJkaWQ6ZXRocjoweDE5OTI1NGJmMmE3YjVkMGM3MDVjZGIxNjQ4ZjQxNjVlNjQzNjQ2OTYiLCJhdWQiOiJkaWQ6ZXRocjoweDE5OTI1NGJmMmE3YjVkMGM3MDVjZGIxNjQ4ZjQxNjVlNjQzNjQ2OTYiLCJleHAiOjE1NzU4MzA2NDAsInR5cGUiOiJzaGFyZVJlc3AiLCJvd24iOnsibmFtZSI6IkFzaCJ9LCJyZXEiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5rc3RVaUo5LmV5SnBZWFFpT2pFMU56VTRNamswT1RNc0ltVjRjQ0k2TVRVM05UZ3pNREE1TXl3aWNtVnhkV1Z6ZEdWa0lqcGJJbTVoYldVaVhTd2lkbVZ5YVdacFpXUWlPbHNpVlhCdmNuUnNZVzVrYVdFZ1EybDBlU0JKUkNKZExDSmpZV3hzWW1GamF5STZJbWgwZEhCek9pOHZNakZsTm1Fek1qa3VibWR5YjJzdWFXOHZZMkZzYkdKaFkyc2lMQ0owZVhCbElqb2ljMmhoY21WU1pYRWlMQ0pwYzNNaU9pSmthV1E2WlhSb2Nqb3dlR0pqTTJGbE5UbGlZemMyWmpnNU5EZ3lNall5TW1Oa1pXWTNZVEl3TVRoa1ltVXpOVE00TkRBaWZRLmtyRlRNb0NmR0Y4UHB5WUlTYUFuYmxwdnNDOG9udldYQjM2NmQ3cUdRX01MWXpaTDdOYVVfX3FwR3JMOFpkYldMRzBwMEszMHI2QXFXQkpTZ3NUdkNBQSJ9.cQ5jd9gPlB3WzDCM0-J68HDBkU7W0DVmW0CKZeLPbiF22IddpdJFB31tGur0mMNDxcQGlwdtQqUHKP2CCvR9fQE"
             let decoded = didJWT.decodeJWT(jwt)
              let verifiedRespone = {};
              // pass the JWT from step 1 & 2
              didJWT.verifyJWT(jwt, 
                  {
                      resolver: resolver, 
                      audience: did
                  }).then((response) =>
                  { 
                      verifiedRespone = response 
                      console.log(verifiedRespone);
                  });
          }
      );
  
  
  
  
  /*
  var pubKey1 = hdwallet.derive(path).getPublicKey();
  var key1 = pubKey1.toString('hex');
  console.log(pubKey1.length);
  console.log(`${path} 0x${key1}`)
  */
  
  