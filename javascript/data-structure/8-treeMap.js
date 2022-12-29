/*
 * @Author: fangyong luo
 * @Date: 2020-11-15 11:27:55
 * @Description: file content
 */

// 测试深层树的遍历，来看它到底是深度遍历，还是广度遍历
const tree = [
    {
        key:'1', 
        children: [
            {
                key: '1-1',
                children: []
            },
            {
                key: '1-2',
                children: []
            },
            {
                key: '1-3',
                children: []
            },
            {
                key: '1-4',
                children: []
            }
        ]
    },
    {
        key:'2', 
        children: [
            {
                key: '2-1',
                children: []
            },
            {
                key: '2-2',
                children: []
            },
            {
                key: '2-3',
                children: []
            },
            {
                key: '2-4',
                children: []
            }
        ]
    },
    {
        key:'3', 
        children: [
            {
                key: '3-1',
                children: []
            },
            {
                key: '3-2',
                children: []
            },
            {
                key: '3-3',
                children: []
            },
            {
                key: '3-4',
                children: []
            }
        ]
    },
    {
        key:'4', 
        children: [
            {
                key: '4-1',
                children: []
            },
            {
                key: '4-2',
                children: []
            },
            {
                key: '4-3',
                children: []
            },
            {
                key: '4-4',
                children: []
            }
        ]
    }
];

const loopTree = (tree) => {
    for(let item of tree) {
        const {key, children} = item;
        console.log(key);
        loopTree(children);
    }
}

// loopTree(tree);
// js即使是单线程，针对树的搜索也是深度优先的。其实它是每次要让代码从上到下依次执行完成才行

// 深度优先查找树节点
const findNodeByIdWithDeep = (tree, id) => {
    for(let item of tree) {
        const {key, children} = item;
        // 这里的log，可以确定循环遍历找到后是否断掉
        console.log(key);
        if(key === id) {
            return console.log(item);
        }
        // 其实你会想到，深层次循环遍历，若是找到，得要断掉循环
        return findNodeByIdWithDeep(children, id);
    }
}

// 广度优先查找树节点
const findNodeByIdWithWidth = (tree, id) => {
    const childrens = [];
    for(let item of tree) {
        const {key, children} = item;
        // 这里的log，可以确定循环遍历找到后是否断掉
        console.log(key);
        if(key === id) return console.log(item);
        childrens.push(...children);
    }
    if(childrens.length) {
        return findNodeByIdWithWidth(childrens, id);
    }
}

findNodeByIdWithDeep(tree, '2-2');
console.log('----------------------------')
// findNodeByIdWithWidth(tree, '2-2');
