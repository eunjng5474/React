/* Generics */
function merge<A, B>(a: A, b: B): A & B {
  return {
    ...a,
    ...b
  }
}
const merged = merge({ foo: 1 }, { bar: 1 })

function wrap<T>(param: T) {
  return {
    param
  }
}
const wrapped = wrap(10);

// // interface에서 Generics 사용하기
// interface Items<T> {
//   list: T[];
// }
// const items: Items<String> = {
//   list: ['a', 'b', 'c']
// }

// type에서 Generics 사용하기
type Items<T> = {
  list: T[];
}
const items: Items<String> = {
  list: ['a', 'b', 'c']
}

// 클래스에서 Generics 사용하기
class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift()
  }
}

const queue = new Queue<number>();
queue.enqueue(0)
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())



/* 인터페이스 사용 */
// /* 일반 객체를 interface로 타입 설정하기 */
// interface Person {
//   name: string;
//   age?: number; // ? -> 설정 해도 되고 안해도 됨
// }
// interface Developer extends Person {
//   skills: string[]
// }

/* Type Alias 사용하기 */
type Person = {
  name: string;
  age?: number;
}

// &는 두 개 이상의 타입을 합쳐준다
type Developer = Person & {
  skills: string[]
}

const person: Person = {
  name: '김사람',
  age: 20
}

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react']
}

type People = Person[]  // Person[]을 People이라는 타입으로 사용 가능
const people: People = [person, expert]

type Color = 'red' | 'orange' | 'yellow';
const color: Color = 'red';
const colors: Color[] = ['red', 'orange'];



// /* 클래스에서 interface를 implements 하기 */
// // Shape라는 interface 선언
// interface Shape {
//   getArea(): number;
//   // Shape interface에는 getArea라는 함수가 꼭 있어야 하며 해당 함수의 반환값은 숫자
// }

// class Circle implements Shape {
//   // 'implements' 키워드를 사용하여 해당 클래스가 Shape interface의 조건을 충족하겠다는 것을 명시

//   // radius: number;   // 멤버 변수 radius 값 설정

//   constructor(public radius: number) {
//     this.radius = radius;
//   }

//   // 너비를 가져오는 함수 구현
//   getArea() {
//     return this.radius * this.radius * Math.PI;
//   }
// }

// class Rectangle implements Shape {
//   constructor(private width: number, private height: number) {
//     this.width = width;
//     this.height = height;
//   }
//   getArea() {
//     return this.width * this.height;
//   }
// }

// const circle = new Circle(5);
// const rectangle = new Rectangle(10, 5);

// console.log(circle.radius)
// // console.log(rectangle.width)  // private은 외부에서 조회 불가

// const shapes: Shape[] = [new Circle(5), new Rectangle(10, 5)]

// shapes.forEach(shape => {
//   console.log(shape.getArea())
// })



// /* 함수에서 타입 정의 */

// function sum(x: number, y: number): number {
//   return x + y;
// }
// sum(1, 2)

// function sumArray(numbers: number[]): number {
//   return numbers.reduce((acc, current) => acc + current, 0)
// }
// const total = sumArray([1, 2, 3, 4, 5])

// // 함수에서 아무것도 반환하지 않아야 한다면 반환 타입을 void로 설정
// function returnNothing() : void {
//   console.log('I am just saying hello world')
// }


// /* 기본 타입 */
// let count = 0;  // 숫자 
// count += 1;
// // count = '갑자기 문자열'   // 에러 발생

// const message: string = 'hello world'   // 문자열

// const done: boolean = true;   // 불리언 값 

// const numbers: number[] = [1, 2, 3]   // 숫자 배열 
// const messages: string[] = ['hello', 'world']   // 문자열 배열 

// // messages.push(1)    // 숫자 넣으려하면 안된다

// let mightBeUndefined: string | undefined = undefined;
// // string일 수도, undefined일 수도 있다.
// let nullableNumber: number | null = null
// // number일 수도, null일 수도 있다.

// let color: 'red' | 'orange' | 'yellow' = 'red';
// // red, orange, yellow 중 하나
// color = 'yellow'
// // color = 'green' // 에러 발생
