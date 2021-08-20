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

    public grab(ind: number) {
        if (ind < this.maxBagSize) {
            this.held = this.bag[ind];
            this.bag[ind] = undefined;
        } else {
            ind -= this.maxBagSize;
            this.held = this.current[ind];
            this.current.splice(ind, 1);
        }
    }

    public release(ind: number) {
        const curr = this.held;
        if (!curr) return;
        if (ind < this.maxBagSize) {
            this.held = this.bag[ind];
            this.bag[ind] = curr;
        } else {
            ind -= this.maxBagSize;
            this.held = undefined;
            this.current.insertAt(ind, curr);
        }
    }
}