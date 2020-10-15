const obj = {
  name: 'obj1',
  getName(){
    return this.name
  },
  testName: function(){
    this.name +='test'
    return this.name
  }
}

console.log(obj.getName(), obj.testName())

const obj2 = {
  name: 'obj2'
}

obj2.getName = obj.getName
obj2.testName = obj.testName

console.log(obj2.getName(), obj2.testName())

const obj3 = Object.assign({}, obj)
console.log(obj3);