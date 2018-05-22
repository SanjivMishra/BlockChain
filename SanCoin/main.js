const SHA256 = require('crypto-js/sha256');

class Block {

constructor(index, timestamp, data, previousHash = ''){

this.index =index;
this.timestamp=timestamp;
this.data = data;
this.previousHash= previousHash;
this.hash = this.calculateHash();
}


calculateHash(){
 return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
 }

}

class BlockChain {
    constructor(){

        this.chain=[this.createGenesisBlock()];

    }

    createGenesisBlock(){

        return new Block(0,"01/01/2018","Genesis Block","0");
    }

    getLatestBlock(){

        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){

        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){

        for (let i=1;i <this.chain.length;i++){

            const currentBlock = this.chain[i];
            const prevousBlock = this.chain[i-1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if (currentBlock.previousHash !== prevousBlock.hash){
                return false;
            }

            return true;

        }
    }


}

let sancoin = new BlockChain();
sancoin.addBlock(new Block(1,"21/05/2018",{amount :4}));
sancoin.addBlock(new Block(2,"22/05/2018",{amount :10}));

console.log("Is Block Chain Valid ? " +sancoin.isChainValid());
console.log(JSON.stringify(sancoin,null,4))

sancoin.chain[1].data={amount :100};

console.log("Is Block Chain Valid ? " +sancoin.isChainValid());
console.log(JSON.stringify(sancoin,null,4))