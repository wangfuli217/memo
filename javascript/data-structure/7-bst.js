/*
 * @Author: your name
 * @Date: 2020-01-28 21:25:35
 * @LastEditTime : 2020-02-03 09:15:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-structure/7-bst.js
 */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
    show() {
        return this.data;
    }
}

/**
 * 理解：二叉树，是基于数据的某个属性插入到树中，后续的一切操作都是基于该属性；
 * 只是二叉树中的每个数据都可以是复杂的数据结构，所以它可以承载很多具体业务场景；
 * 而且
 */
class BST {
    constructor() {
        this.root = null;
    }
    /**
     * @description: 1、将当前数字一个个与树节点比较，以找到正确的添加位置；2、添加的位置肯定是在末尾处，只是需要找到正确位置
     * @param {data} 
     * @return: undefined
     */
    add(data) {
        if (!data && data !== 0) return;
        const treeNode = new Node(data);
        if (!this.root) {
            this.root = treeNode;
            return;
        }
        // 一个引用指向当前节点，以供遍历，直到找到叶子节点
        let currentNode = this.root;
        // 另一个引用指向父级节点，以供插入子节点
        let parentNode = this.root;
        while (currentNode) {
            parentNode = currentNode;
            if (data < currentNode.data) {
                currentNode = currentNode.left;
                if (!currentNode) parentNode.left = treeNode;
            } else {
                currentNode = currentNode.right;
                if (!currentNode) parentNode.right = treeNode;
            }
        }
    }
    /**
     * @description: find the minest node 
     * @param {null} 
     * @return: minest data or undefined
     */
    getMin() {
        let currentNode = this.root;
        if (!currentNode) return;
        while(currentNode.left){
            currentNode = currentNode.left;
        }
        return currentNode.data;
    }
    /**
     * @description: find the maxest node
     * @param {null} 
     * @return: maxest data or undefined
     */
    getMax() {
        let currentNode = this.root;
        if (!currentNode) return;
        while (currentNode.right) {
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }
    /**
     * @description: show the data in order
     * @param {null} 
     * @return: order show element
     */
    inOrderShow() {
        const getDataByNode = (node) => {
            if(!node) return [];
            let leftData = getDataByNode(node.left);
            let rightData = getDataByNode(node.right);
            return [...leftData, node.data,...rightData];
        }
        return getDataByNode(this.root);
    }
    /**
     * @description: find the target node
     * @param {data} 
     * @return: undefined/target node
     */
    find(data) {
        let currentNode = this.root;
        if(!data || !currentNode) return;
        while(currentNode) {
            if(data < currentNode.data) {
                currentNode = currentNode.left;
                continue;
            }
            if(data > currentNode.data) {
                currentNode = currentNode.right;
                continue;
            }
            if(data === currentNode.data) {
                break;
            }
        }
        return currentNode;
    }
    /**
     * @description: update the target 
     * @param {data,value} 
     * @return: true/false
     */
    delete(data, value) {
        if(!data || !value) return false;
        let targetNode = this.find(data);
        if(!targetNode) return false;
        targetNode.data = value;
        return true;
    }
}
const bst = new BST();
bst.add(12);
bst.add(1);
bst.add(33);
bst.add(44);
bst.add(8);
bst.add(0);
// console.log(bst, bst.getMin(), bst.getMax(), bst.inOrderShow());
console.log(bst);
console.log('------------------------------------------------------------------------------------');
// console.log(bst.find(8));
console.log(bst(33, ))