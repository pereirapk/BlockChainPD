
const SHA256 = require('crypto-js/sha256');
class Transaction{
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block{
    constructor(timestamp,transactions,previousHash=''){
        this.timestamp = timestamp;
        this.transactions = transactions;
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
        this.pendingTransactions = [];
        this.miningReward = 100
    }
    createGenesisBlock(){
        return new Block ("18/10/18","Genesis Block","0");
    }
    getLatesBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatesBlock().hash;
        newBlock.mineBlock(this.dificul);
        this.chain.push(newBlock); 
    }
    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now().pendingTransactions);
        block.mineBlock(this.dificul);
        console.log("block sucess");
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null,miningRewardAddress,this.miningReward)
        ];
    }
    createTransaction(transaction){
        this.pendingTransactions.push(transaction);

    }
    getBalanceAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for( const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
        
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
myblock.createTransaction(new Transaction('Address1', 'Address2', 577));
myblock.createTransaction(new Transaction('Address2', 'Address1', 252));
console.log('\n Strarting Transaction');
myblock.minePendingTransactions('xaviers-address');

console.log(getBalanceAddress('xaviers-address'));

console.log('\n Strarting Transaction 2');
myblock.minePendingTransactions('xaviers-address');

console.log(getBalanceAddress('xaviers-address'));

