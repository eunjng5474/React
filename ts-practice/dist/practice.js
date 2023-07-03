"use strict";
class Circle {
    constructor(radius) {
        this.radius = radius;
    }
    // 너비를 가져오는 함수 구현
    getArea() {
        return this.radius * this.radius * Math.PI;
    }
}
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
const shapes = [new Circle(5), new Rectangle(10, 5)];
shapes.forEach(shape => {
    console.log(shape.getArea());
});
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
