// Symbol.isConcatSpreadable
const arr1 = [1, 2, 3]
const arr2 = [2, 3]
const arrLike = { 0: 2, length: 1 };
const set1 = new Set().add(5)
const otherObject = { name: 2333 }
console.log(arr1[Symbol.isConcatSpreadable]) // undefined
console.log('arrlike', arr1.concat(arrLike)) // [1,2,3, { 0: 2, length: 1 }]
console.log(arr1.concat(arr2)) // [1,2,3,2,3]
console.log(arr1.concat(set1))
console.log(arr1.concat(otherObject))
arr1[Symbol.isConcatSpreadable] = true
otherObject[Symbol.isConcatSpreadable] = true
arrLike[Symbol.isConcatSpreadable] = true
console.log(arr1[Symbol.isConcatSpreadable]) // true
console.log('arrlike', arr1.concat(arrLike)) //  [1,2,3,  { 0: 2, length: 1 }]
console.log(arr1.concat(arr2)) // [1,2,3,2,3]
console.log(arr1.concat(set1))
console.log(arr1.concat(otherObject))

arr1[Symbol.isConcatSpreadable] = false
console.log(arr1[Symbol.isConcatSpreadable]) // false
    // Symbol.isConcatSpreadable 设置为false后，不会把原数组打平
console.log(arr1.concat(arrLike)) // [[1,2,3],  { 0: 2, length: 1 }]
console.log(arr1.concat(arr2)) // [[1,2,3],2,3]
console.log(arr1.concat(set1))
console.log(arr1.concat(otherObject))

/*总结：
* 1. 对象的Symbol.isConcatSpreadable属性默认为undefined
* 2. 使用contact方法时，数组默认会展开并返回一个新数组。如果Symbol.isConcatSpreadable值为false，则不展开。为true则展开
* 3. 类数组对象在被array.contact(arrayLike),默认不会被展开，但是如果设置类数组对象的Symbol.isConcatSpreadable值为true，则会被展开
* 4. 非类数组对象在被array.contact(obj)时，默认会整个obj被追加到array的尾部，但是设置Symbol.isConcatSpreadable值为true时，该对象会被忽略

应用场景：
可将值设置为true，用于拼接类数组，返回一个新数组。且不必判断类数组是否正确，因为非类数组对象会被直接忽略。
*/