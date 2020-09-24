const SHA256 = require("crypto-js/sha256");
let Systemdate = new Date();
class CryptoBlock {
  constructor(index, timestamp, data, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }
  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}
class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4;
  }
  startGenesisBlock() {
    return new CryptoBlock(0, "01/01/2020", "Initial Block in the Chain", "0");
  }
  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    //here a new block is created tho with no data and it data will be store in current_transaction
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
    this.current_transaction = [];
  }
  addNewTransaction(data) {
    //we are adding the new transation to the block
    this.current_transaction.push(data);
  }
  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}
exports.addNewBlock =  function(req, res,next){
    let userdata = {
        ID_Number:"1111111111112222223333",
        Names:"Axel Kayonga",
        Gender:"Male",
        Civil_status:"Single",
        Date_of_birth:"15/02/YYYY",
        CRC:{
            status:"NO Trace",
            description:""
        },
        Address:{
            City:"Kigali",
            District:"Kicukiro",
            Phone_Number:"078XXXXXX"
            
        },
        Transaction:[{
            Transaction_type:"MT",
            Transaction_Info:{
                all:""
            }
        }]
    }

    let UserdataBlock = new CryptoBlockchain();
    console.log("Adding user data in the blockchain in progress ...");
    UserdataBlock.addNewBlock(
      new CryptoBlock(1, "01/06/2020",userdata)
    );
    console.log(JSON.stringify(UserdataBlock, null, 4));
};

exports.mine =  function(req, res,next){

  
    
};
exports.newTransaction =  function(req, res,next){

  
    
};
