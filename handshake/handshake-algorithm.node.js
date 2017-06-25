const crypto = require('crypto');

function base64url(str) {
	return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/, '');
}


//// client information

var clientECDH = crypto.createECDH('secp256k1');
// client private key
clientECDH.setPrivateKey('e452e1d89dcd16e1ad31336c77f8eace1b1884c06c621aefb7670d47fe54d1f7', 'hex');
// binary value of public key, =0x047f1986ce046a640f80cdd1cea34bbf53085e12d261dec8ef6a11dfa1847337e21d2c693c6acf95d2b21393eb2971a593e924bfab55133bb448ee0a572f6caa77
var clientPublic = clientECDH.getPublicKey();
// client dsId, 'mylink-AEGnG3RJ-DXzdNo-OsfYh7FM4sAkKRGTcremwG51kzs'
var clientDsId = 'mlink-' + base64url(crypto.createHash('sha256').update(clientPublic).digest('base64'));
// a sample client connection token
var clientToken = 'sample_token_string';


//// broker information

var brokerECDH = crypto.createECDH('secp256k1');
// broker private key
brokerECDH.setPrivateKey('e4c386d0427062374f22545ea926fd94319220a6a71bfa9c126ed96045a8ca1e', 'hex');
// binary value of public key, =0x04ba22b4c66f6fac9db49b75117c7ed28113b95fc5eaf62a2cf4cf295020221ce6a57e15ffe1e2a2b66b874dd8a22654431e6b3277ae40cc96b832f76b4e7c4eda
var brokerPublic = brokerECDH.getPublicKey();
// broker dsId, 'broker-OJePjy-2COzh8bS07NTzve8F_UdfTnGI5Up4fpGzoYQ'
var brokerDsId = 'broker-' + base64url(crypto.createHash('sha256').update(brokerPublic).digest('base64'));



//// handshake message f0, client -> broker

// client generate 32 bytes salt
var clientSalt = new Buffer('c4ca4238a0b923820dcc509a6f75849bc81e728d9d4c2f636f067f89cc14862c', 'hex');

var f0 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([11,0]), // header length: 11
	new Buffer([0xf0]), // handshake message f0
	new Buffer([0,0,0,0]), // request Id, 0 for all handshake message

	new Buffer([2, 0]), // dsa version: 2.0
	new Buffer([clientDsId.length]), // length of client dsId, assume the length < 128
	new Buffer(clientDsId, 'utf8'), // dsId content
	clientPublic, // 65bytes
	new Buffer([0]), // no encryption
	clientSalt // 32 bytes
	]);
f0.writeUInt32LE(f0.length, 0); // total length

console.log('\n handshake message f0, client -> broker:');
console.log(f0.toString('hex'));
/* 
a10000000b00f0000000000200316d6c696e6b2d4145476e4733524a2d44587a644e6f2d4f7366596837464d3473416b4b5247546372656d774735316b7a73047f1986ce046a640f80cdd1cea34bbf53085e12d261dec8ef6a11dfa1847337e21d2c693c6acf95d2b21393eb2971a593e924bfab55133bb448ee0a572f6caa7700c4ca4238a0b923820dcc509a6f75849bc81e728d9d4c2f636f067f89cc14862c
*/



//// handshake message f1, broker -> client

// broker generate 32 bytes salt
var brokerSalt = new Buffer('eccbc87e4b5ce2fe28308fd9f2a7baf3a87ff679a2f3e71d9181a67b7542122c', 'hex');

var f1 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([11,0]), // header length: 11
	new Buffer([0xf1]), // handshake message f1
	new Buffer([0,0,0,0]), // request Id, 0 for all handshake message

	new Buffer([brokerDsId.length]), // length of client dsId, assume the length < 128
	new Buffer(brokerDsId, 'utf8'), // dsId content
	brokerPublic, // 65 bytes
	brokerSalt // 32 bytes
	]);
f1.writeUInt32LE(f1.length, 0); // total length

console.log('\n handshake message f1, broker -> client:');
console.log(f1.toString('hex'))
/*
9f0000000b00f1000000003262726f6b65722d4f4a65506a792d32434f7a6838625330374e547a766538465f556466546e4749355570346670477a6f595104ba22b4c66f6fac9db49b75117c7ed28113b95fc5eaf62a2cf4cf295020221ce6a57e15ffe1e2a2b66b874dd8a22654431e6b3277ae40cc96b832f76b4e7c4edaeccbc87e4b5ce2fe28308fd9f2a7baf3a87ff679a2f3e71d9181a67b7542122c
*/



//// handshake message f2, client -> broker

// client calculate the ShareSecret: =0x5ec3619a89120434b4a1cf0e7e20b3695803fdaf18ae2191f74443e1f1dd2065
var clientSharedSecret = clientECDH.computeSecret(brokerPublic);
// client calculate the auth with broker salt: =0xdb9b0d2150ff56a92d3d059a53e7bbc70fb5b4cc
var clientAuth = crypto.createHmac('sha256', clientSharedSecret).update(brokerSalt).digest();

var f2 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([11,0]), // header length: 11
	new Buffer([0xf2]), // handshake message f2
	new Buffer([0,0,0,0]), // request Id, 0 for all handshake message

	new Buffer([clientToken.length]), // length of client token, (when token length >127, this needs 2 bytes)
	new Buffer(clientToken, 'utf8'), // token content
	new Buffer([1]), // isRequester: true
	new Buffer([1]), // isResponder: true
	new Buffer([0]), // reconnect: false
	clientAuth
	]);
f2.writeUInt32LE(f2.length, 0); // total length

console.log('\n handshake message f2, client -> broker:');
console.log(f2.toString('hex'))
/*
420000000b00f2000000001373616d706c655f746f6b656e5f737472696e67010100cef800fc2ec5f364e92d384a0688ff78c5754a38d3f3dfd36f4f690218bc922a
*/



//// handshake message f3, broker -> client

// broker calculate the ShareSecret: =0x5ec3619a89120434b4a1cf0e7e20b3695803fdaf18ae2191f74443e1f1dd2065
var brokerSharedSecret = brokerECDH.computeSecret(clientPublic);
// client calculate the auth with broker salt: =0xdb9b0d2150ff56a92d3d059a53e7bbc70fb5b4cc
var brokerAuth = crypto.createHmac('sha256', brokerSharedSecret).update(clientSalt).digest();

var clientPath = '/downstream/mlink1';

var f3 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([11,0]), // header length: 11
	new Buffer([0xf3]), // handshake message f3
	new Buffer([0,0,0,0]), // request Id, 0 for all handshake message

	new Buffer([0]), // not reconnected
	new Buffer([clientPath.length]), // length of client path, (when path length >127, this needs 2 bytes)
	new Buffer(clientPath, 'utf8'), // path content
	brokerAuth
	]);
f3.writeUInt32LE(f3.length, 0); // total length

console.log('\n handshake message f3, broker -> client:');
console.log(f3.toString('hex'))
/*
3f0000000b00f30000000000122f646f776e73747265616d2f6d6c696e6b315831534d1e0271d8155ae4b29c452d1711a90476895d75947eb63e722da41d14
*/





