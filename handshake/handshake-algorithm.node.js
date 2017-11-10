const crypto = require('crypto');

function base64url(str) {
	return str.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/, '');
}

function makeUint16Buffer(len){
	var b = new Buffer(2);
	b.writeUInt16LE(len, 0);
	return b;
}

//// client information

var clientECDH = crypto.createECDH('prime256v1'); // this curve is also known as secp256r1 or NIST P-256
// client private key
clientECDH.setPrivateKey('55e1bcad391b655f97fe3ba2f8e3031c9b5828b16793b7da538c2787c3a4dc59', 'hex');
// binary value of public key, =0x0415caf59c92efecb9253ea43912b419941fdb59a23d5d1289027128bf3d6ee4cb86fbe251b675a8d9bd991a65caa1bb23f8a8e0dd4eb0974f6b1eaa3436cec0e9
var clientPublic = clientECDH.getPublicKey();
// client dsId, 'mylink-TTDXtL-U_NQ2sgFRU5w0HrZVib2D-O4CxXQrKk4hUsI'
var clientDsId = 'mylink-' + base64url(crypto.createHash('sha256').update(clientPublic).digest('base64'));
// a sample client connection token
var clientToken = 'sample_token_string';


//// broker information

var brokerECDH = crypto.createECDH('prime256v1');
// broker private key
brokerECDH.setPrivateKey('82848ef9d9204097a98a8c393e06aac9cb9a1ba3cdabf772f4ca7e6899b9f277', 'hex');
// binary value of public key, =0x04f9e64edcec5ea0a645bd034e46ff209dd9fb21d8aba74a5531dc6dcbea28d696c6c9386d924ebc2f48092a1d6c8b2ca907005cca7e8d2a58783b8a765d8eb29d
var brokerPublic = brokerECDH.getPublicKey();
// broker dsId, 'broker-g675gaSQogzMxjJFvL7HsCbyS8B0Ly2_Abhkw_-g4iI'
var brokerDsId = 'broker-' + base64url(crypto.createHash('sha256').update(brokerPublic).digest('base64'));



//// handshake message f0, client -> broker

// client generate 32 bytes salt
var clientSalt = new Buffer('c4ca4238a0b923820dcc509a6f75849bc81e728d9d4c2f636f067f89cc14862c', 'hex');

var f0 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([7,0]), // header length: 7
	new Buffer([0xf0]), // handshake message type f0
            // end of header
	new Buffer([2, 0]), // dsa version: 2.0
	makeUint16Buffer(clientDsId.length), // length of client dsId
	new Buffer(clientDsId, 'utf8'), // dsId content
	clientPublic, // 65bytes
	clientSalt // 32 bytes
	]);
f0.writeUInt32LE(f0.length, 0); // total length

console.log('\n handshake message f0, client -> broker:');
console.log(f0.toString('hex'));
/* 
9e0000000700f0020032006d796c696e6b2d54544458744c2d555f4e5132736746525535773048725a56696232442d4f3443785851724b6b34685573490415caf59c92efecb9253ea43912b419941fdb59a23d5d1289027128bf3d6ee4cb86fbe251b675a8d9bd991a65caa1bb23f8a8e0dd4eb0974f6b1eaa3436cec0e9c4ca4238a0b923820dcc509a6f75849bc81e728d9d4c2f636f067f89cc14862c
*/



//// handshake message f1, broker -> client

// broker generate 32 bytes salt
var brokerSalt = new Buffer('eccbc87e4b5ce2fe28308fd9f2a7baf3a87ff679a2f3e71d9181a67b7542122c', 'hex');

var f1 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([7,0]), // header length: 7
	new Buffer([0xf1]), // handshake message type f1
            // end of header
	makeUint16Buffer(brokerDsId.length), // length of client dsId
	new Buffer(brokerDsId, 'utf8'), // dsId content
	brokerPublic, // 65 bytes
	brokerSalt // 32 bytes
	]);
f1.writeUInt32LE(f1.length, 0); // total length

console.log('\n handshake message f1, broker -> client:');
console.log(f1.toString('hex'))
/*
9c0000000700f1320062726f6b65722d67363735676153516f677a4d786a4a46764c374873436279533842304c79325f4162686b775f2d6734694904f9e64edcec5ea0a645bd034e46ff209dd9fb21d8aba74a5531dc6dcbea28d696c6c9386d924ebc2f48092a1d6c8b2ca907005cca7e8d2a58783b8a765d8eb29deccbc87e4b5ce2fe28308fd9f2a7baf3a87ff679a2f3e71d9181a67b7542122c
*/



//// handshake message f2, client -> broker

// client calculate the ShareSecret: =0x5f67b2cb3a0906afdcf5175ed9316762a8e18ce26053e8c51b760c489343d0d1
var clientSharedSecret = clientECDH.computeSecret(brokerPublic);
// client calculate the auth with broker salt: =0xf58c10e212a82bf327a020679c424fc63e852633a53253119df74114fac8b2ba
var clientAuth = crypto.createHmac('sha256', clientSharedSecret).update(brokerSalt).digest();

var f2 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([7,0]), // header length: 7
	new Buffer([0xf2]), // handshake message type f2
            // end of header
	makeUint16Buffer(clientToken.length), // length of client token, assume the length < 256
	new Buffer(clientToken, 'utf8'), // token content
	new Buffer([1]), // isResponder: true
	new Buffer([0,0]), // blank session string
	new Buffer([0,0,0,0]), // last ack id
	new Buffer([0,0]), // blank server path string
	clientAuth
	]);
f2.writeUInt32LE(f2.length, 0); // total length

console.log('\n handshake message f2, client -> broker:');
console.log(f2.toString('hex'))
/*
450000000700f2130073616d706c655f746f6b656e5f737472696e67010000000000000000f58c10e212a82bf327a020679c424fc63e852633a53253119df74114fac8b2ba
*/



//// handshake message f3, broker -> client

// broker calculate the ShareSecret: =0x5f67b2cb3a0906afdcf5175ed9316762a8e18ce26053e8c51b760c489343d0d1
var brokerSharedSecret = brokerECDH.computeSecret(clientPublic);
// client calculate the auth with broker salt: =0xe709059f1ebb84cfb8c34d53fdba7fbf20b1fe3dff8c343050d2b5c7c62be85a
var brokerAuth = crypto.createHmac('sha256', brokerSharedSecret).update(clientSalt).digest();

var clientPath = '/downstream/mlink1';
var clientSessionId = 'sampe-session-001';


var f3 = Buffer.concat([
	new Buffer([0,0,0,0]), // place holder for total length
	new Buffer([7,0]), // header length: 7
	new Buffer([0xf3]), // handshake message type f3
            // end of header
    new Buffer([1]), // allowRequester: true
	makeUint16Buffer(clientSessionId.length), // length of client session string, assume the length < 256
	new Buffer(clientSessionId, 'utf8'), // session string content
	new Buffer([0,0,0,0]), // last ack id

	makeUint16Buffer(clientPath.length), // length of client path, assume the length < 256
	new Buffer(clientPath, 'utf8'), // path content
	brokerAuth
	]);
f3.writeUInt32LE(f3.length, 0); // total length

console.log('\n handshake message f3, broker -> client:');
console.log(f3.toString('hex'))
/*
530000000700f301110073616d70652d73657373696f6e2d3030310000000012002f646f776e73747265616d2f6d6c696e6b31e709059f1ebb84cfb8c34d53fdba7fbf20b1fe3dff8c343050d2b5c7c62be85a
*/





