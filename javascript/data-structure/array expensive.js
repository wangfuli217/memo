/*
 * @Author: 罗方勇
 * @Description: 为了测试插入和删除元素的高昂开销，以及引入链表的必要
 * @Date: 2021-11-30 17:01:31
 */

const result = [];
for(let i = 0; i < 10000; i++) {
  result.push(i);
}

const startTime = new Date().getTime();

result.unshift(0);

const endTime = new Date().getTime();

const costTime = endTime - startTime;
console.log('costTime: ', costTime, result);

// 结论：costTime === 0，是因为移动数组的元素只是消耗内存，而不耗时么？可是js是单线程啊