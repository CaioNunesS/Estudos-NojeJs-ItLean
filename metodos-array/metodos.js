
const data = [
    {name: "Matheus", age: 31, sallary:2000, driveLicense: true},
    {name: "João", age: 18, sallary:1500, driveLicense: false},
    {name: "Mariana", age: 22, sallary:4000, driveLicense: true},
    {name: "Pedro", age: 50, sallary:7200, driveLicense: true},
    {name: "Érica", age: 16, sallary:0, driveLicense: false},
]

// 1 - Reverse (The reverse() method reverses an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. In other words, elements order in the array will be turned towards the direction opposite to that previously stated.)

const reverseData = data.reverse(); // inverte a ordem dos dados
// console.log(reverseData);

// 2 - find (The find() method returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.) 

const hightSallary = 5000
const hightestSallary = data.find((user)=> user.sallary > hightSallary)
// console.log(hightestSallary);

// 3-findIndex (The findIndex() method returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.)

const lowerSallary = data.findIndex((user)=> user.sallary > 0 && user.sallary < 2000);
// console.log(lowerSallary);
data[lowerSallary].sallary += 200
// console.log(data);

// 4 - includes(The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.)

const numbers = [1, 2, 3, 4, 5]
const hasFour = numbers.includes(4)
// console.log(hasFour);

// 5 - map(The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.)

data.map((user)=> user.newsLetter = false)
// console.log(data);

// 6 - filter(The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.)

const drivers = data.filter((user) => user.driveLicense)
// console.log(drivers);

// 7 - reduce(The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.)

const sallariesSum = data.reduce((totalSallary, user) => (totalSallary += user.sallary), 0)
// console.log(sallariesSum);

// 8 - forEach(The forEach() method executes a provided function once for each array element.)

const showUserNames = (users)=>{users.forEach((user)=>{
    console.log(`Olá ${user.name}`);
})}
// showUserNames(data)

// 9 - some(The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.)

let someoneWithNewslleter = data.some((user) => user.newsLetter)
// console.log(someoneWithNewslleter); 

data[0].newsLetter = true

someoneWithNewslleter = data.some((user) => user.newsLetter)
// console.log(someoneWithNewslleter); 

// 10 - every(The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.)

const everyUserHasName = data.every((user) => user.name)
// console.log(everyUserHasName);

const everyUserHasGoodSallary = data.every((user) => {return user.sallary > 2000} )
// console.log(everyUserHasGoodSallary);
