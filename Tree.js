export default class Tree {
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
            if(current.value > value) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }

        if(beforeCurrent.value > value) {
            beforeCurrent.left = node;
        }
        else {
            beforeCurrent.right = node;
        }
    }

    delete(value) {
        if(!value || !this.find(value)) return;
        let values = this.inorder();
        let node = this.find(value);

        if(value === this.root.value) {
            // node is the ROOT
            let root = this.root;
            let current = this.root;
            let nodeToReplace = this.find(values[values.indexOf(value) + 1]);
            let beforeNodeToReplace;

            if(root.right.right && !root.right.left) {
                nodeToReplace = root.right;
                nodeToReplace.left = root.left;
                this.root = nodeToReplace;;
            }
            else {
                while(current.value !== nodeToReplace.value) {
                    beforeNodeToReplace = current;
                    if(current.value > value) {
                        current = current.left;
                    }
                    else {
                        current = current.right;
                    }
                }

                if(beforeNodeToReplace.left === nodeToReplace) {
                    beforeNodeToReplace.left = null;
                }
                else {
                    beforeNodeToReplace.right = null;
                }

                nodeToReplace.left = root.left;
                nodeToReplace.right = root.right;
                this.root = nodeToReplace;
            }
        }
        else if(node.left && node.right) {
            // node is pointing to TWO NODES
            let current = this.root;
            let beforeCurrent;

            while(current.value !== value) {
                beforeCurrent = current;
                if(current.value > value) {
                    current = current.left;
                }
                else {
                    current = current.right;
                }
            }

            let newCurrent = this.root;
            let nodeToReplace = this.find(values[values.indexOf(value) + 1]);
            let beforeNodeToReplace;

            while(newCurrent.value !== nodeToReplace.value) {
                beforeNodeToReplace = newCurrent;

                if(newCurrent.value > nodeToReplace.value) {
                    newCurrent = newCurrent.left;
                }
                else {
                    newCurrent = newCurrent.right;
                }
            }

            if(beforeNodeToReplace.left.value === nodeToReplace.value) {
                beforeNodeToReplace.left = null;
            }
            else {
                beforeNodeToReplace.right = null;
            }

            if(beforeCurrent.left.value === value) {
                beforeCurrent.left = nodeToReplace;
            }
            else {
                beforeCurrent.right = nodeToReplace;
            }

            nodeToReplace.left = current.left;
            nodeToReplace.right = nodeToReplace.right;
        }
        else if(node.left || node.right) {
            // node is pointing to AT LEAST ONE node
            let current = this.root;
            let beforeCurrent;

            while(current.value !== value) {
                beforeCurrent = current;
                if(current.value > value) {
                    current = current.left;
                }
                else {
                    current = current.right;
                }
            }

            if(beforeCurrent.left.value === value) {
                if(current.left) {
                    beforeCurrent.left = current.left;
                }
                else {
                    beforeCurrent.left = current.right;
                }
            }
            else if(beforeCurrent.right.value === value) {
                if(current.right) {
                    beforeCurrent.right = current.right;
                }
                else {
                    beforeCurrent.right = current.left;
                }
            }
        }
        else if(!node.left && !node.right) {
            // node is a LEAF NODE
            let current = this.root;
            let beforeCurrent;

            while(current.value !== value) {
                beforeCurrent = current;
                if(current.value > value) {
                    current = current.left;
                }
                else {
                    current = current.right;
                }
            }

            if(beforeCurrent.left.value === value) {
                beforeCurrent.left = null;
            }
            else {
                beforeCurrent.right = null;
            }
        }
    }

    find(value, node = this.root) {
        if(!node) return null;

        // RECURSIVE SOLUTION
        if(node.value > value) return this.find(value, node.left);
        if(node.value < value) return this.find(value, node.right);
        
        // ITERATIVE SOLUTION
        // while(node) {
        //     if(node.value === value) return node;

        //     node = node.value > value ? node.left : node.right;
        // }

        return node;
    }

    // BREADTH FIRST - QUEUE
    levelOrder() {
        if(!this.root) return null;

        let traversedValues = [];
        let queue = [];
        queue.push(this.root);

        while(queue.length) {
            let node = queue[0];

            traversedValues.push(node.value);
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
        this.preorder(traversedValues, node.left);
        this.preorder(traversedValues, node.right);

        // STACK SOLUTION
        // let stack = [];
        // stack.push(this.root);

        // while(stack.length) {
        //     let node = stack[stack.length - 1];

        //     traversedValues.push(node.value);
        //     stack.pop();
        //     if(node.right) stack.push(node.right);
        //     if(node.left) stack.push(node.left);
        // }

        return traversedValues;
    }

    // <left><root><right>
    inorder(traversedValues = [], node = this.root) {
        if(!node) return;

        // RECURSIVE SOLUTION
        this.inorder(traversedValues, node.left);
        traversedValues.push(node.value);
        this.inorder(traversedValues, node.right);

        // STACK SOLUTION
        // let stack = [];

        // while(node || stack.length) {
        //     while(node) {
        //         stack.push(node);
        //         node = node.left;
        //     }

        //     node = stack.pop();
        //     traversedValues.push(node.value);
        //     node = node.right;
        // }

        return traversedValues;
    }

    // <left><right><root>
    postorder(traversedValues = [], node = this.root) {
        if(!node) return;

        this.postorder(traversedValues, node.left);
        this.postorder(traversedValues, node.right);
        traversedValues.push(node.value);

        return traversedValues;
    }

    height(node) {
        if(!node) return 0;

        let left = this.height(node.left);
        let right = this.height(node.right);

        return Math.max(left, right) + 1;
    }

    depth(node, current = this.root, count = 0) {
        if(!current) return;

        // RECURSIVE SOLUTION
        if(current.value === node.value) return count;

        if(current.value > node.value) {
            return this.depth(node, current.left, count + 1);
        }
        else {
            return this.depth(node, current.right, count + 1);
        }

        // ITERATIVE SOLUTION
        // while(current) {
        //     if(current.value === node.value) {
        //         return count;
        //     }
        //     else if(current.value > node.value) {
        //         current = current.left;
        //     }
        //     else {
        //         current = current.right;
        //     }
            
        //     count++;
        // }
    }

    isBalanced(node = this.root) {
        if(!node) return true;

        let heightDifference = Math.abs(this.height(node.left) - this.height(node.right));

        return (
            heightDifference <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        );
    }

    rebalance() {
        if(this.isBalanced()) return;

        let values = this.inorder();
        this.root = this.buildTree(values);
    }
}

const tree = new Tree([30, 50, 70]);

tree.insert(20);
tree.insert(40);
tree.insert(80);
tree.insert(32);
tree.insert(75);
tree.insert(85);
tree.insert(36);
tree.insert(31);

console.log('Level Order', tree.levelOrder());
console.log('Preorder', tree.preorder());