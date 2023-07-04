import Node from './Node';
import Tree from './Tree';
// create an array of random values
let arr = [];

for(let i = 0; i < 10; i++) {
    let value = Math.floor(Math.random() * 100);
    arr.push(value);
}

// create the tree
const tree = new Tree(arr);

// check the tree is balanced
tree.isBalanced();

// Print out all elements
tree.levelOrder();
tree.preorder();
tree.inorder();
tree.postorder();

// insert random values in to the tree
for(let i = 0; i < 10; i++) {
    let value = Math.floor((Math.random() * 100) * 10);
    tree.insert(value);
}

// check the tree has become unbalanced
tree.isBalanced();

// rebalance the tree
tree.rebalance();

// check the tree has been rebalanced
tree.isBalanced();

// Print out all elements again
tree.levelOrder();
tree.preorder();
tree.inorder();
tree.postorder();