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
        if(!value) return null;

        let current = this.root;

        while(current) {
            if(current.value === value) return current;

            current = current.value > value ? current.left : current.right;
        }

        return null;
    }

    // BREADTH FIRST - QUEUE
    levelOrder(func = this.pushTraversedValues) {
        if(!this.root) return null;

        let traversedValues = [];
        let queue = [];
        queue.push(this.root);

        while(queue.length) {
            let node = queue[0];

            func(traversedValues, node.value);
            if(node.left) queue.push(node.left);
            if(node.right) queue.push(node.right);
            
            queue.shift();
        }

        return traversedValues;
    }

    // DEPTH FIRST - STACK
    // <root><left><right>
    preorder(traversedValues = [], node = this.root) {
        if(!node) return;

        // RECURSIVE SOLUTION
        traversedValues.push(node.value);
        this.preorder(func, traversedValues, node.left);
        this.preorder(func, traversedValues, node.right);

        // STACK SOLUTION
        let stack = [];
        stack.push(this.root);

        while(stack.length) {
            let node = stack[stack.length - 1];

            traversedValues.push(node.value);
            stack.pop();
            if(node.right) stack.push(node.right);
            if(node.left) stack.push(node.left);
        }

        return traversedValues;
    }

    // <left><root><right>
    inorder(func) {}

    // <left><right><root>
    postorder(func) {}

    height(node) {}

    depth(node) {}

    isBalanced() {}

    rebalance() {}
}