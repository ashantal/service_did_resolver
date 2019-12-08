exports.getResolver = () => {
    async function resolve(
      did,
      parsed,
      didResolver
    )
    {
      var address='0xba25783176a82174b81e5716f80c7d2dde7eedc0'//'0xf3beac30c498d9e26865f34fcaa57dbb935b0d74'
      var did='did:ethr:'+address
      var pub= did + '#owner'

      const didDoc ={
        '@context': 'https://w3id.org/did/v1',
        id: did,
        publicKey: [{
             id: pub,
             type: 'Secp256k1VerificationKey2018',
             owner: did,
             ethereumAddress: address}],
        authentication: [{
             type: 'Secp256k1SignatureAuthentication2018',
             publicKey: pub}]
      }
      return didDoc
    }

    return { 
        resolve 
    }
  }