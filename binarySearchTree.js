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

    insert(value) {
        let node = new Node(value);

        if(!this.root) this.root = node;
        if(this.find(value)) return 'Value already in tree';

        let current = this.root;
        let beforeCurrent;

        while(current) {
            beforeCurrent = current;
            current = current.value > value ? current.left : current.right;
        }

        if(beforeCurrent.value > value) {
            beforeCurrent.left = node;
        }
        else {
            beforeCurrent.right = node;
        }
    }

    delete(value) {}

    find(value) {
        return null;
    }

    levelOrder(func) {}

    preoder(func) {}

    inorder(func) {}

    postorder(func) {}

    height(node) {}

    depth(node) {}

    isBalanced() {}

    rebalance() {}
}