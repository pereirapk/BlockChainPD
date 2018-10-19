
const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(id,timestamp,data,previousHash=''){
        this.id = id;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    
    calculateHash() {
        return SHA256(this.id + this.previousHash + this.timestamp  + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(dificul){
        while(this.hash.substring(0,dificul) !== Array(dificul + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("miner block" + this.hash);
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.dificul = 2;
    }
    createGenesisBlock(){
        return new Block (0,"18/10/18","Genesis Block","0");
    }
    getLatesBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.dificul);
        this.chain.push(newBlock); 
    }
    isChainValid(){
        for(let i = 1; i < chain.length; i++){
            const atualBlock = chain[i];
            const antBlock = chain[i - 1];
            if(atualBlock !== atualBlock.calculateHash()){
                return false;
            }
            if(atualBlock !== antBlock.hash){
                return false
            }
        }
        return true;
    }
        
}
let myblock = new Blockchain();
console.log('Miner Block 1');
myblock.addBlock(new Block(1,"18/10/2018",{amount: 4}));
console.log('Miner Block 2');
myblock.addBlock(new Block(1, "18/10/2018", { amount: 10 }));
