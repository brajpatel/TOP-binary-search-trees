const Tree = require('./Tree');

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  

// create an array of random values
let arr = [];

(function pushRandomValues() {
    for(let i = 0; i < 10; i++) {
        let value = Math.floor(Math.random() * 100);
        arr.push(value);
    }
})();

// create the tree
const tree = new Tree(arr);

// display a visualised version of the tree
prettyPrint(tree.root);

// check the tree is balanced
console.log(tree.isBalanced());

// Print out all elements
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());

// insert random values in to the tree
(function insertRandomValues() {
    for(let i = 0; i < 10; i++) {
        let value = Math.floor((Math.random() * 100) * 10);
        tree.insert(value);
    }
})();

// display a visualised version of the tree
prettyPrint(tree.root);

// check the tree has become unbalanced
console.log(tree.isBalanced());

// rebalance the tree
tree.rebalance();

// display a visualised version of the tree
prettyPrint(tree.root);

// check the tree has been rebalanced
console.log(tree.isBalanced());

// Print out all elements again
console.log(tree.levelOrder());
console.log(tree.preorder());
console.log(tree.inorder());
console.log(tree.postorder());