/*
* @Date: 2020-01-27 10:25:33
* @Author: your name
 * @LastEditTime: 2021-03-05 17:48:59
 * @LastEditors: Please set LastEditors
 * @Description: 
 * 集合定义：无序性，唯一性；
 * 元素操作：元素是否在集合内；集合元素的增删改查
 * 集合间的运算：交集，并集，补集；
 * @FilePath: /data-structure/6-set.js
 */

class Set {
    constructor() {
        this.dataSource = [];
    }
    /**
     * @description: element is in the Set or not
     * @param {element} 
     * @return: true/false
     */
    contains(element) {
        if (!element) return false;
        if (this.dataSource.includes(element)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * @description: get the numbers of Set's element
     * @param {} 
     * @return: numbers 
     */
    size() {
        return this.dataSource.length;
    }
    /**
     * @description: add an element into Set
     * @param {element} 
     * @return: true/false
     */
    add(element) {
        if (!element) return false;
        if (this.contains(element)) {
            return false;
        } else {
            this.dataSource.push(element);
            return true;
        }
    }
    /**
     * @description: remove an element from Set
     * @param {element} 
     * @return: true/false
     */
    remove(element) {
        if (!element) return false;
        const index = this.dataSource.findIndex(item => item === element);
        if (index === -1) {
            return false;
        } else {
            this.dataSource.splice(index, 1);
            return true;
        }
    }
    /**
     * @description: show all element from set
     * @param {null} 
     * @return: all element
     */
    show() {
        return this.dataSource;
    }
    /**
     * @description: intersect with set
     * @param {Set} 
     * @return: the intersected set/false
     */
    intersect(set) {
        if (!set instanceof Set) return false;
        const intersectedSet = new Set();
        this.dataSource.forEach(item => {
            if (set.contains(item)) intersectedSet.add(item);
        })
        return intersectedSet;
    }
    /**
     * @description:  union with set
     * @param {Set} 
     * @return: the unioned set /false
     */
    union(set) {
        if (!set instanceof Set) return false;
        const unionedSet = new Set();
        this.dataSource.forEach(item => unionedSet.add(item));
        set.dataSource.forEach(item => unionedSet.add(item));
        return unionedSet;
    }
    /**
     * @description: get the exclude set of this set
     * @param {set} 
     * @return: the exclude set/false
     */
    complement(set) {
        if (!set instanceof Set) return false;
        if (set.size > this.size) return false;
        for (let i = 0; i < set.dataSource.length; i++) {
            if (!this.contains(set.dataSource[i])) return false;
        }
        const complementedSet = new Set();
        this.dataSource.forEach(item => {
            if (!set.contains(item)) {
                complementedSet.add(item);
            }
        })
        return complementedSet;
    }
}

const set = new Set();
set.add('fofo');
set.add('lofayo');
set.add('luofangyong');
const set1 = new Set();
set1.add('lofayo')
set1.add('fofo')
// set1.add('luofy')
console.log(set.intersect(set1));
console.log(set.union(set1));
console.log(set.complement(set1));
console.log(set, set.show());

