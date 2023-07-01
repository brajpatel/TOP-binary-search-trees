class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.sortedArray = [...new Set(arr)].sort((a, b) => a - b);
        this.root = this.buildTree(this.sortedArray);
    }

    buildTree(arr) {
        return null;
    }
}