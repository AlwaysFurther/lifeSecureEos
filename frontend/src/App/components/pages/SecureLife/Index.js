import React, { Component } from 'react'
import {
  Container, Row, Col, Button, Modal, ModalBody, ModalFooter, Input, FormGroup
} from 'reactstrap'
import Logo from '../../../assets/logo.png';
import './SecureLife.css';
import Eos from 'eosjs'; // https://github.com/EOSIO/eosjs

// eoshackton js code

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

const nameToIndex = {
	"corentin" : 0 ,
	"thomas" : 1 ,
	"alexandre" : 2 ,
	"noby" : 3,
	"pascal" : 4 
};

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
			account: accounts[0].name,
			name: "addauth",
			authorization: [{
				actor: accounts[0].name,
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
			account: accounts[0].name,
			name: "updatestate",
			authorization: [{
				actor: accounts[0].name,
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
			account: accounts[0].name,
			name: "updatepos",
			authorization: [{
				actor: accounts[0].name,
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

// get all the accounts allowed to monitor the account_index
function getTableAuth( account_index )
{
	eos.getTableRows({
      "json": true,
      "code": accounts[0].name,   // contract who owns the table
      "scope": accounts[0].name,  // scope of the table
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

// get the cypher for account_name of the key used to encrypt the account_index position data
function getEncryptedKey( account_name , account_index)
{
	eos.getTableRows({
      "json": true,
      "code": accounts[0].name,   // contract who owns the table
      "scope": accounts[0].name,  // scope of the table
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

// get the state of the person at accoun_index
function getTableState( account_index )
{
	eos.getTableRows({
      "json": true,
      "code": accounts[account_index].name,   // contract who owns the table
      "scope": accounts[account_index].name,  // scope of the table
      "table": "cstate",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(( result ) => {
        
        var names = [];
        for( var i=0 ;  i < result.rows.length ; i++ )
        	names.push(result.rows[i].authaccount);
        
    	console.log( names );
    	
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
	var data = dataEncryption[ 0 ].privateKey + ";" + dataEncryption[ 0 ].publicKey;
	var cypher = encryptData( data , dataEncryption[0].privateKey , accounts[auth_person].publicKey );
	
	return JSON.stringify( cypher );
}

function decrypt_encrypted_encryption_key( encryptedData , monitored_person )
{
	JSON.parse( encryptedData );
	return decryptData( encryptedData , accounts[0].privateKey , dataEncryption[monitored_person].publicKey );
}

let eos;

//console.log( decrypt_encrypted_encryption_key( encrypt_encryption_key_for_auth( 1 ) , this.state.selectedUser ));

// Index component
class SecureLife extends Component {

  constructor(props) {
    super(props);
    this.state = {
      protectorValue: '',
      modal: false,
      userModal: false,
      selectedUser: 0,
      noteTable: [] // to store the table rows from smart contract
    };
  }

  toggleUserModal = () => {
    console.log('click', this.state.userModal)
    this.setState({
      userModal: !this.state.userModal,
    })
  };

  logIn = () => {
    this.setState({
      userModal: false
    })
  };

  onUserChange = (e) => {
    this.setState({
      selectedUser: e.target.value
    })
  };


  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  handleFormEvent = async (event) => {
      // stop default behaviour
      event.preventDefault();

      // collect form data
      let account = event.target.account.value;
      let privateKey = event.target.privateKey.value;
      let note = event.target.note.value;

      // prepare variables for the switch below to send transactions
      let actionName = "";
      let actionData = {};

      // define actionName and action according to event type
      switch (event.type) {
          case "submit":
              actionName = "update";
              actionData = {
                  _user: account,
                  _note: note,
              };
              break;
          default:
              return;
      }

      // eosjs function call: connect to the blockchain
      const eos = Eos({keyProvider: privateKey});
      const result = await eos.transaction({
          actions: [{
              account: "notechainacc",
              name: actionName,
              authorization: [{
                  actor: account,
                  permission: 'active',
              }],
              data: actionData,
          }],
      });

      console.log(result);
      this.getTable();
  }

  // gets table data from the blockchain
  // and saves it into the component state: "noteTable"
  getTable() {
    const eos = Eos();
    eos.getTableRows({
      "json": true,
      "code": "notechainacc",   // contract who owns the table
      "scope": "notechainacc",  // scope of the table
      "table": "notestruct",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => this.setState({ noteTable: result.rows }));
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    eos = Eos( newConfig( accounts[this.state.selectedUser].privateKey ) );
  }

  onProtectorValueChange = (e) => {
    this.setState({
      protectorValue: e.target.value,
      savedProtectorValue: ''
    })
  }

  addProtector = () => {
  		console.log(nameToIndex[this.state.protectorValue])
  		let encryptedSymKey = encrypt_encryption_key_for_auth( nameToIndex[this.state.protectorValue] );
		addAuth( this.state.protectorValue , encryptedSymKey );
		
	this.setState({
      savedProtectorValue: this.state.protectorValue
    })

  }
  
	  sendSafe = () => {
	  		updateState( 0 , new Date().getTime() );
	  }
	  
	  sendMonitor = () => {
	  		updateState( 1 , new Date().getTime() );
	  }
	  
	  sendRescue = () => {
	  		updateState( 2 , new Date().getTime() );
	  }

  render() {
    return (
      <Container className='SecureLife mb-5'>
        <img src={Logo} style={{ width: '4.5rem'}} alt="" />
        <p className="p-2 changeUser" style={{ cursor: 'arrow'}} onClick={this.toggleUserModal}>Change User</p>
        <Modal
          centered={true}
          isOpen={this.state.userModal}
          toggle={this.toggleUserModal}
          className={this.props.className}
        >
          <ModalBody>
            <h4>Select user</h4>
            <FormGroup>
              <Input
                type='select'
                value={this.state.selectedUser}
                onChange={this.onUserChange}
              >
                {
                  accounts.map((user, index) => <option key={index} value={index}>{index}: {user.name}</option>)
                }
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.logIn}>Confirm</Button>
            <Button color="secondary" onClick={this.toggleUserModal}>Cancel</Button>
          </ModalFooter>

        </Modal>
        <Modal
          centered={true}
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalBody>
            <h4>Protectors</h4>
            <p>{this.state.savedProtectorValue}</p>

          </ModalBody>
          <ModalBody>
            <p>Add a protector:</p>
            <FormGroup>
              <input className="form-control" value={this.state.protectorValue} onChange={this.onProtectorValueChange}/>
              <Button className="mt-2" color="primary" onClick={this.addProtector}>Add</Button>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col className='text-center' md={{ size: 8, offset: 2 }}>
            <div className='p-lg-5 py-5 px-md-0'>
              <img
                src={require(`../../../assets/${accounts[this.state.selectedUser].name}.jpg`)}
                className='col-xs-2 mb-3 rounded-circle personPhoto'
              />
              <h1>{accounts[this.state.selectedUser].name}</h1>
            </div>
            <div className="mb-3">
              <Button
                className='mb-4 w-75'
                color='secondary'
                onClick={this.toggleModal}
              >
                People To Contact
              </Button>
            </div>
            <div>
              <hr className="w-75 mb-4"/>
              <Button
                className='mb-4 w-75'
                color='success'
                onClick={this.sendSafe}
              >
                I Am Safe
              </Button>
            </div>
            <div>
              <Button
                className='mb-4 w-75'
                color='warning'
                onClick={this.sendMonitor}
              >
                Monitor Me
              </Button>
            </div>
            <div>
              <Button
                className='mb-3 w-75'
                color='danger'
                onClick={this.sendRescue}
              >
                Rescue Me!
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

}

export default SecureLife;
