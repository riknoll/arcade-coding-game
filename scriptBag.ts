// Add your code here

class ScriptBag {
    bag: Block[];
    maxBagSize = 3;
    held: Block;

    constructor(public current: Block[]) {
        this.bag = [];
    }

    public length() {
        return this.current.length + this.maxBagSize;
    }

    public currentStartIndex() {
        return this.maxBagSize;
    }
}