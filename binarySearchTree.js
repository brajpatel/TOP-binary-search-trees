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
        if(!arr.length) return null;

        let mid = Math.floor(arr.length / 2);
        let node = new Node(arr[mid]);
        node.left = this.buildTree(arr.slice(0, mid));
        node.right = this.buildTree(arr.slice(mid + 1));

        return node;
    }
}