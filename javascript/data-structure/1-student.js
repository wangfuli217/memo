// 由构造函数生成的对象实例
/*function Student() {
    this.grades = [];
}

Student.prototype.add = function(grade){
    this.grades.push(grade);
}

Student.prototype.averageGrades = function() {
    return this.grades.reduce((sum,value) => sum + value) / this.grades.length;
}*/

// 用类的语法来实现
class Student{
    constructor() {
        this.grades = [];
    }
    add(grade) {
        this.grades.push(grade);
    }
    averageGrades() {
        return this.grades.reduce((sum,value) => sum + value) / this.grades.length;
    }
}

let studentA = new Student();

for(let i = 0; i < 10; i++) {
    studentA.add(Math.round(Math.random()*150));
}
console.log(studentA.grades, studentA.averageGrades());
// 重点是理解业务逻辑，以及面向对象的编程思想：
// 创建一个对象实例——》就得new一个——》想要new，就得先创建好对象类，封装好属性以及方法，后续的对象实例直接操作
