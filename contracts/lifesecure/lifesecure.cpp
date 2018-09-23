#include <eosiolib/eosio.hpp>

class lifesecure : public eosio::contract {
    public: 
       lifesecure( account_name own ):
           contract( own ),
           _authpersons( own , own ),
           _cstate( own , own ),
           _lencrypos( own , own )
        {        
        }
        
       /* actions only for owner */

        [[eosio::action]]
        void addauth( account_name authaccount , const std::string& encryptedsymkey){
            require_auth( _self );

            _authpersons.emplace( get_self() ,[&]( auto& auth ) {
                auth.authaccount = authaccount;
                auth.encryptedsymkey = encryptedsymkey;
            });
        }

        [[eosio::action]]
        void updatestate( uint64_t state , uint32_t lastupdate)
        {
            require_auth( _self );
            
            if( _cstate.begin() != _cstate.end() )
            {
                _cstate.erase( _cstate.begin() );
            }

            _cstate.emplace( _self  , [&] ( auto& s ) {
                s.state = state;
                s.lastupdate = lastupdate;
            });
        }
        
        [[eosio::action]]
        void updatepos(uint64_t nb , const std::string& newpos )
        {
            require_auth( _self );

            if( _lencrypos.begin() != _lencrypos.end() )
            {
                 _lencrypos.erase( _lencrypos.begin() );
            }
            
            _lencrypos.emplace( _self  , [&] ( auto& np ) {
                np.encryptedpos = newpos;
                np.nb = nb;       
            });
        }

        /* actions for authorized accounts */       

    private:
        /* structure that represents a person authorized to access the account */
        struct [[eosio::table]] authperson {
            account_name  authaccount; // authorized person                                     
            std::string  encryptedsymkey; // encrypted symKey with authorized pubkey ( for the hackathon a asym key pair will be used but ultimatly it will be a sym key )
            
            uint64_t primary_key() const { return authaccount; }
        };

        typedef eosio::multi_index<N(authpersons), authperson > authpersonst;
        
        /* structure that represents the state of the person (safe,unsafe...) */
        struct [[eosio::table]] state{
            uint64_t state;
            uint32_t lastupdate;

            uint64_t primary_key() const { return state; }
        };
        
        typedef eosio::multi_index<N(cstate) , state > cstatet;
        
        /* struct for the last hash of the pos (for now data stored on 
         * the blockchain because no time to set up off chain storage) */

        struct [[eosio::table]] encryptedpos {
            uint64_t nb;
            std::string encryptedpos;

            uint32_t primary_key() const { return nb; }
        };

        typedef eosio::multi_index<N(lencryptpos) , encryptedpos > lencryptpost;

        authpersonst _authpersons;
        cstatet _cstate;
        lencryptpost _lencrypos;
};

EOSIO_ABI( lifesecure , (addauth) (updatestate) (updatepos))

