// 用链表去模拟堆栈
class Link {
    constructor() {
        this.data = null;
    }
    push(value) {
        if(!this.data) {
            this.data = {value, next: null};
        } else {
            let finalNode = this.data;
            while(finalNode.next) {
                finalNode = finalNode.next;
            }
            finalNode.next = {value, next: null};
        }
    }
    pop() {
        if(!this.data) {
            return null;
        }
        let finalNode = this.data;
        while(finalNode.next) {
            finalNode = finalNode.next;
        }
        if(finalNode === this.data) {
            this.data = null;
            return finalNode;
        }
        let lastSecondNode = this.data;
        while(lastSecondNode.next) {
            if(lastSecondNode.next === finalNode) {
                lastSecondNode.next = null;
                return finalNode;
            }
            lastSecondNode = lastSecondNode.next;
        }
    }
}

const link = new Link();
link.push('fofo');
// link.push('lofayo');
// link.push('luofangyong');

console.log(link);
console.log(link.pop());
console.log(link);
