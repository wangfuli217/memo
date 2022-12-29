class Stack {
    constructor() {
        this.dataSource = [];
        this.top = 0;
    }
    push(element) {
        this.dataSource[this.top++] = element;
    }
    pop() {
        if (this.top > 0) return this.dataSource[--this.top];
        return 'empty stack';
    }
    peak() {
        if (this.top > 0) return this.dataSource[this.top - 1];
        return 'empty stack';
    }
}

let stack = new Stack();
stack.push('fofo');
stack.push('lofayo');
// stack.pop();
// stack.pop();
// stack.pop();

console.log(stack, stack.peak());