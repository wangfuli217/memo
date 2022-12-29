// function Customer(name,movie) {
//     this.name = name;
//     this.movie = movie;
// }

// let customerA = new Customer('fofo', 'Loving');
// console.log(customerA, customerA instanceof Customer);

class Person {
    constructor(name,sex) {
        this.name = name;   
        this.sex = sex;   
    }
}

class PersonList {
    constructor() {
        this.personList = [];
    }
    append(person) {
        if (person instanceof Person) {
            this.personList.push(person);
            return true;
        } else {
            // console.log('not validate person');
            return false;
        }
    }
    sameSex(sex) {
        let filterSex = this.personList.filter((person) => person.sex === sex);
        filterSex.forEach((item) => console.log(`name: ${item.name}, sex: ${item.sex}`));
    }
}

let personList = new PersonList();
personList.append(new Person('fofo', 'female'));
personList.append(new Person('lofayo', 'male'));
personList.append(new Person('luofangyong', 'male'));

personList.sameSex('male');