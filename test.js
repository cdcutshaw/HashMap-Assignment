import HashMap from "./HashMap.js";

const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('tiger', 'golden')
test.set('moon', 'silver')


//test overwrite entries
test.set('apple', 'blue')
test.set('dog', 'green')
test.set('frog', 'purple')

test.remove('hat')


console.log(test.buckets)

console.log(test.get('apple'))
console.log(test.has('apple'))
console.log(test.length())
console.log(test.keys())
console.log(test.values())
console.log(test.entries())
console.log(test.clear())
console.log(test.buckets)

 
