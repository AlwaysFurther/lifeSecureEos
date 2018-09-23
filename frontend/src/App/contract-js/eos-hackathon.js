import Eos from 'eosjs';

let activeAccount = 0;

const accounts = [
  {"name":"corentin", "privateKey":"5JjjUZpxYrxPiDeHrn524gn9hgrezWYSQGgqysUEvJ7Pxj8xiP6", "publicKey":"EOS7Qc2aTw29TDfi5Ju99XFMK6qsJr79mxGSFcRZLaspqmMMc6j7e"},
  {"name":"thomas", "privateKey":"5K4EHF1oesTCoCM72S9uiWQ5hWS43P6u9i4QmatuRWu9CNuzXH1", "publicKey":"EOS71JMzzcS4rAgQRXPqYnNAfojdPaLjxheC4Z3MXv5DniaamaUVv"},
  {"name":"alexandre", "privateKey":"5JAgxqvKMc7ySENAR2BuM6WJbUDbenMvwPLr4pKSb9Qyq2xBaNZ", "publicKey":"EOS8Q1N8kqELmz4PGSe9zwbQEavK1eS21eWiFHSdWNd3XfwFLgZGM"},
  {"name":"noby", "privateKey":"5Htp13WUvZUo17cL682cXwUQKryWNMWRfuMxcpCU73zZhEKcu82", "publicKey":"EOS6v9FqEgeCQp4M5Y156iG4hribAtvtEQ7JyP2Vj6ZhPSXwWScVx"},
  {"name":"pascal", "privateKey":"5JbsbkPQmD1bPeLHoiEgA7LRQ1DS5VYtjV7B8zVBz5JcHQYgKea", "publicKey":"EOS73bSjBbDAn7XunKDvYqg4bjwuuBd5hUnqkNSKpoNQKCgrwXQjo"}
];

// key used to encrypt the data
const dataEncryption = [
	{"privateKey":"5KFsj2DbJUMQoXGkYPrD5mDWyPTAkKmvPdTD2UuHgS4cMS7iCy4", "publicKey":"EOS6vNqgV4vao3AvEQPyhxnyGp2fV3fhUkc27pYowoqiz7VWqsYgp"},
	{"privateKey":"5KEQezTkKznzbXbmGe88bvx6nPsCpVUzQg8NU5F2CLXzMKqHB53", "publicKey":"EOS71idy1enkHKVJ25fb6kVjRQ37HyfTPHupkh1A43FK5CqCd9mvL"},
	{"privateKey":"5JDA8b2ukykLJFJVmmVPFZLK7Neg5s5Xaf24XdLzCNUbd4zUkvo", "publicKey":"EOS7L22UEUJvT16cwzogNUnP7kSQLfzyfqiiPD7hRerBAj578VrTJ"},
	{"privateKey":"5JdtqbzqwBpd3Gc4H5ADo4kdHJGnYgv2kR4jEoj4MmGQfJPmNb8", "publicKey":"EOS8VxGRcDnVG2Miyr5FQe2JyUBq9U3zJkb1in47GsYKTu8meWXDu"},
	{"privateKey":"5JXg8aRbmuMgCEmvfW32Xa9Yqxfx3TWW79oyp9gdbS6FLsiJtBG", "publicKey":"EOS74Tsmmbv2VvQr35feJMvwVaAaYofXwCArA7Rrh1zmP5jvDbksf"}
];

const nameToIndex = [
	{"corentin" : 0 },
	{"thomas" : 1 },
	{"alexandre" : 2 },
	{"noby" : 3 },
	{"pascal" : 4 }
];

function newConfig( keyProvider )
{
	const config = {
		chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f", // 32 byte (64 char) hex string
		keyProvider: [keyProvider], // WIF string or array of keys..
		httpEndpoint: 'http://127.0.0.1:8888',
		expireInSeconds: 60,
		broadcast: true,
		verbose: false, // API activity
		sign: true
	};
	
	return config;
}

function addAuth( account_name , encryptedSymKey )
{
	eos.transaction({
		actions: [{
			account: accounts[activeAccount].name,
			name: "addauth",
			authorization: [{
				actor: accounts[activeAccount].name,
				permission: "active",
			}],
			data: {
				authaccount: account_name,
				encryptedsymkey: encryptedSymKey,
			},
		}],
	}, (error , result ) => {
        console.log("error: " + error);
        console.log("result: " + JSON.stringify( result ) + "\n\n") ;
		
		// do something in front end
		
    });
}

function updateState( state , lastupdate )
{
	eos.transaction({
		actions: [{
			account: accounts[activeAccount].name,
			name: "updatestate",
			authorization: [{
				actor: accounts[activeAccount].name,
				permission: "active",
			}],
			data: {
				state: state,
				lastupdate: lastupdate,
			},
		}],
	}, (error , result ) => {
        console.log("error: " + error);
        console.log("result: " + JSON.stringify( result ) + "\n\n") ;
		
		// do something in front end
		
    });
}

function updatePos( encrypted_newPos )
{
	eos.transaction({
		actions: [{
			account: accounts[activeAccount].name,
			name: "updatepos",
			authorization: [{
				actor: accounts[activeAccount].name,
				permission: "active",
			}],
			data: {
				nb: 0,
				newpos: encrypted_newPos,
			},
		}],
	}, (error , result ) => {
        console.log("error: " + error);
        console.log("result: " + JSON.stringify( result ) + "\n\n") ;
        
        // do something in front end

    });
}

// get all the accounts allowed to monitor the activeAccount
function getTableAuth()
{
	eos.getTableRows({
      "json": true,
      "code": accounts[activeAccount].name,   // contract who owns the table
      "scope": accounts[activeAccount].name,  // scope of the table
      "table": "authpersons",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(( result ) => {
        
        var names = [];
        for( var i=0 ;  i < result.rows.length ; i++ )
        	names.push(result.rows[i].authaccount);
        
    	console.log( names );
    	
    	// do something in front end

    });
}

// get the cypher for account_name of the key used to encrypt the activeAccount position data
function getEncryptedKey( account_name )
{
	eos.getTableRows({
      "json": true,
      "code": accounts[activeAccount].name,   // contract who owns the table
      "scope": accounts[activeAccount].name,  // scope of the table
      "table": "authpersons",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(( result ) => {
        
        var cypher;
        for( var i=0 ;  i < result.rows.length ; i++ )
        {
        	if( result.rows[i].authaccount == account_name )
        		cypher = result.rows[i].encryptedsymkey;
        }
       
    	console.log( cypher );
    	
    	// do something in front end

    });
}

function encryptData( data , myPrivate , someonesPublicKey)
{
	let {ecc} = Eos.modules;

	return ecc.Aes.encrypt(myPrivate, someonesPublicKey, data);
}

function decryptData( encryptedMessage , someonesPrivateKey , myPublic )
{
	let {ecc} = Eos.modules;
	return ecc.Aes.decrypt(someonesPrivateKey, myPublic, encryptedMessage.nonce, encryptedMessage.message, encryptedMessage.checksum).toString('utf8');
}

function encrypt_encryption_key_for_auth( auth_person )
{
	var data = dataEncryption[ activeAccount ].privateKey + ";" + dataEncryption[ activeAccount ].publicKey;
	var cypher = encryptData( data , dataEncryption[activeAccount].privateKey , accounts[auth_person].publicKey );
	
	return cypher;
}

function decrypt_encrypted_encryption_key( encryptedData , monitored_person )
{
	return decryptData( encryptedData , accounts[activeAccount].privateKey , dataEncryption[monitored_person].publicKey );
}

const eos = Eos( newConfig( accounts[activeAccount].privateKey ) );

//console.log( decrypt_encrypted_encryption_key( encrypt_encryption_key_for_auth( 1 ) , activeAccount ));



