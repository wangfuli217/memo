/*
 * @Author: your name
 * @Date: 2020-01-21 06:40:00
 * @LastEditTime : 2020-01-21 07:26:22
 * @LastEditors  : Please set LastEditors
 * @Description: 双向链表还是很好使用，而且这些是基础类方法，得写的更优才好。
 */

// 因为是双向链表，所以每个节点都会有两个属性
class Node {
    constructor(element) {
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}


class DLinkList {
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
     * @description: add target to the end
     * @param {target} 
     * @return: 
     */
    add(target) {
        if (!target) return false;
        let endNode = this.end();
        let targetNode = new Node(target);
        endNode.next = targetNode;
        targetNode.prev = endNode;
    }
    /**
     * @description: find the target node
     * @param {target} 
     * @return: target node or false
     */
    find(target) {
        if (!target) return false;
        let curNode = this.head;
        while (curNode && curNode.element !== target) {
            curNode = curNode.next;
        }
        return curNode;
    }
    /**
     * @description: insert the element after the target
     * @param {insertPos, insertElement} 
     * @return: true/false
     */
    insert(target, element) {
        if (!target || !element) return false;
        let targetNode = this.find(target);
        if (!targetNode) return false;
        let elementNode = new Node(element);
        let targetNodeNext = targetNode.next;
        if (targetNodeNext) {
            elementNode.next = targetNodeNext;
            targetNodeNext.prev = elementNode;
        }
        targetNode.next = elementNode;
        elementNode.prev = targetNode;
        return true;
    }
    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    delete(target) {
        if (!target) return false;
        let targetNode = this.find(target);
        if(!targetNode) return false;
        targetNode.prev.next = targetNode.next;
        targetNode.next.prev = targetNode.prev;
        return targetNode;
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
    /**
     * @description: show all node in verse
     * @param {} 
     * @return: all node 
     */
    verseDisplay() {
        let endNode = this.end();
        let result = [];
        while (endNode) {
            result.push(endNode.element);
            endNode = endNode.prev;
        }
        return result;
    }
}

let dLinkList = new DLinkList();
dLinkList.add('fofo');
dLinkList.add('lofayo');
dLinkList.insert('fofo', 'luofangyong');
dLinkList.delete('fofo');
console.log(dLinkList, dLinkList.display(), dLinkList.verseDisplay());