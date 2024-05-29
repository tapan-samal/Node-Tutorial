//OOP: Object Oriented Programming
//To Structure the code by using class and objects
//Prototypes are the mechanism by which JavaScript objects inherit property and methods from one another.
//It is like single template object.
//Every object in JavaScript has in-built property, called prototype.

//Level1: Factory function: A function that create objects
function PersonMaker(name, age) {
  const person = {
    name: name,
    age: age,
    talk() {
      console.log(`My ame is ${this.name}`);
    },
  };
  return person;
}
let p1 = PersonMaker("Adam", 25);
let p2 = PersonMaker("Smith", 25);

//Lavel2: Constructor: doesn't return anything & start with capital letter
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.talk = function () {
  console.log(`My name is ${this.name}`);
};
//Create intances by new keyword
let p3 = new Person("Lilly", 24);
let p4 = new Person("Lem", 26);

console.log(p3.talk === p4.talk);

//Lavel3: Class: A template for creating objects
class Persona {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`My name is ${this.name}`);
  }
}

let p5 = new Persona("Cool", 28);
let p6 = new Persona("Hot", 32);

//Inheritance: Create new class by inheriting property and method
class Personn {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`My name is ${this.name}`);
  }
}

class Student extends Personn {
  constructor(name, age, marks) {
    super(name, age); //parent class constructor is being called.
    this.marks = marks;
  }
}
class Teacher extends Personn {
  constructor(name, age, subject) {
    super(name, age); //parent class constructor is being called.
    this.subject = subject;
  }
}
