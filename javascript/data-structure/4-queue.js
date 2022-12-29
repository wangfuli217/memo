/*
 * @Author: fangyong luo
 * @Date: 2022-06-14 08:24:56
 * @Description: 队列原理
 * 1、先进先出，借助数组实现，当然很简单，可在性能方面并不是最优；
 * 2、你想着用链表去模拟队列，那也不是最优，出队可能快一点，但是入队需要从前到后遍历，亦不是最优；
 * 3、这里就会想到一个问题，并没有绝对最优的方式，只有针对不同场景不同的解决方式；
 */

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(element) {
    if(!element) return false;
    this.data.push(element);
  }
  dequeue() {
    if(this.data.length) {
      return this.data.shift();
    }
  }
  getQueue() {
    return this.data;
  }
}

const queue = new Queue();
queue.enqueue('fofo');
queue.enqueue('lofayo');
queue.enqueue('luofangyong');
console.log(queue.getQueue());

queue.dequeue();
console.log(queue.getQueue());