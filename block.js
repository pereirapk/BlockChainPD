
const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(id,timestamp,data,previousHash=''){
        this.id = id;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }
    var newdata = JSON.stringify(data);
    calculateHash() {
        return SHA256(this.id + this.previousHash + this.timestamp  + newdata).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block (0,"18/10/18","Genesis Block","0");
    }
    getLatesBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock); 
    }
        
}
let myblock = new Blockchain();

myblock.addBlock(new Block(1,"18/10/2018",{amount: 4}));
myblock.addBlock(new Block(1, "18/10/2018", { amount: 10 }));
console.log(JSON.stringify(myblock,null,4));