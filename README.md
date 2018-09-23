# EOS setup

We run one nodeos and one koesd docker container

We created five key pairs and created one account for each of them

Each account deploys our EOS smart contract

For convenience for the Hackathon we hardecoded the following informations in our front end code but we
wouldn't normally do this.

```
const accounts = [
  {"name":"corentin", "privateKey":"5JjjUZpxYrxPiDeHrn524gn9hgrezWYSQGgqysUEvJ7Pxj8xiP6", "publicKey":"EOS7Qc2aTw29TDfi5Ju99XFMK6qsJr79mxGSFcRZLaspqmMMc6j7e"},
  {"name":"thomas", "privateKey":"5K4EHF1oesTCoCM72S9uiWQ5hWS43P6u9i4QmatuRWu9CNuzXH1", "publicKey":"EOS71JMzzcS4rAgQRXPqYnNAfojdPaLjxheC4Z3MXv5DniaamaUVv"},
  {"name":"alexandre", "privateKey":"5JAgxqvKMc7ySENAR2BuM6WJbUDbenMvwPLr4pKSb9Qyq2xBaNZ", "publicKey":"EOS8Q1N8kqELmz4PGSe9zwbQEavK1eS21eWiFHSdWNd3XfwFLgZGM"},
  {"name":"noby", "privateKey":"5Htp13WUvZUo17cL682cXwUQKryWNMWRfuMxcpCU73zZhEKcu82", "publicKey":"EOS6v9FqEgeCQp4M5Y156iG4hribAtvtEQ7JyP2Vj6ZhPSXwWScVx"},
  {"name":"pascal", "privateKey":"5JbsbkPQmD1bPeLHoiEgA7LRQ1DS5VYtjV7B8zVBz5JcHQYgKea", "publicKey":"EOS73bSjBbDAn7XunKDvYqg4bjwuuBd5hUnqkNSKpoNQKCgrwXQjo"}
];

```

In order to run our demo you need to have a wallet named default with all the private keys above.
You also need to create these five accounts and deploy our contract to them. 

# front end

a set of js functions making use of the eosjs API is merged with the React code in order to make the UI talk to the contract

Data encryption is made with the help of the ecc modules of eosjs


