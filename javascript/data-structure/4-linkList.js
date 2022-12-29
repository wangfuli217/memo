/*
 * @Author: your name
 * @Date: 2020-01-17 08:04:23
 * @LastEditTime : 2020-01-21 06:36:33
 * @Description: 
 * 1、链表相比于数组而存在，优势在于插入和移除元素时，在遍历时不如数组；
 * 2、单向列表在删除元素时显得别扭，因为还要找到它的前一个元素，所以后面才有双向链表，直接一个属性关联着；
 */
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkList {
    constructor() {
        this.head = new Node('head');
    }
    /**
     * @description: search the end node except null node, for adding node in the end 
     * @param {} 
     * @return: the end node
     */
    end() {
        let curNode = this.head;
        while (curNode.next !== null) {
            curNode = curNode.next;
        }
        return curNode;
    }
    /**
     * @description: add sigle node to the end, but it so slow, it should support many node once
     * @param {} 
     * @return: 
     */
    add(element) {
        let endNode = this.end();
        const elementNode = new Node(element);
        endNode.next = elementNode;
    }
    /**
     * @description: find the target node
     * @param {target} 
     * @return: target node or null
     */
    find(target) {
        if (!target) return;
        let curNode = this.head;
        while (curNode && curNode.element !== target) {
            curNode = curNode.next;
        }
        return curNode;
    }
    /**
     * @description: insert element after the target into linkList
     * @param {target, element} 
     * @return: true/false
     */
    insert(target, element) {
        if (!target || !element) return false;
        const targetNode = this.find(target);
        if (!targetNode) return false;
        const elementNode = new Node(element);
        const targetNextNode = targetNode.next;
        targetNode.next = elementNode;
        elementNode.next = targetNextNode;
        return true
    }
    /**
     * @description: delete the target node
     * @param {target} 
     * @return: the target node or false
     */
    delete(target) {
        if (!target) return false;
        const targetNode = this.find(target);
        if (!targetNode) return false;
        let targetPrevNode = null;
        let curNode = this.head;
        while (curNode && curNode.next && !targetPrevNode) {
            if (curNode.next.element !== target) {
                curNode = curNode.next;
            } else {
                targetPrevNode = curNode;
            }
        }
        if (!targetPrevNode) return false;
        const targetNextNode = targetNode.next;
        targetPrevNode.next = targetNextNode;
        return true;
    }
    /**
     * @description: show all node in the linkList
     * @param {} 
     * @return: all node 
     */
    display() {
        let curNode = this.head;
        let result = [];
        while (curNode) {
            result.push(curNode.element);
            curNode = curNode.next;
        }
        return result;
    }
}

const linkList = new LinkList();
// linkList.insert('head', 'fofo');
// linkList.insert('fofo', 'lofayo');
linkList.add('lofayo');
linkList.add('fofo');
linkList.insert('fofo', 'luofangyong');
linkList.delete('fofo');
linkList.delete('luofangyong1');
console.log(linkList, linkList.display())