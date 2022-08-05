const NodeRSA = require("node-rsa");

(() => {
    // rsa encrypt
    const key = new NodeRSA({b:512});
    const text = 'Hello RSA!';
    const encrypted = key.encrypt(text, 'base64');
    console.log('encrypted: ', encrypted);
    const decrypted = key.decrypt(encrypted, 'utf8');
    console.log('decrypted: ', decrypted);
    console.log('keys: ', key.generateKeyPair())

})()