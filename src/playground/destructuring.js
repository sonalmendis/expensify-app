// const person = {
// 	name: 'sonal',
// 	age: 26,
// 	location: {
// 		city: 'colombo',
// 		temp: 28
// 	}
// };

// const { name: firstName = 'Anonymous', age } = person; // this is the same as below:
// // const name = person.name;
// // const age = person.age;
// // name: firstName is just renaming the object var in to a custom named var
// // name = 'anonymous' is just the default value for the var if no value is given

// console.log(`${firstName} is ${age} years old`);

// const { city, temp: temperature } = person.location; // temp:temperature is just renaming the object var in to a custom named var

// if (city && temperature) {
// 	console.log(`It is ${temperature} degrees in ${city}`);
// }

// const book = {
// 	title: 'Ego is the enemy',
// 	author: 'Ryan Holiday',
// 	publisher: {
// 		name: 'Penguin'
// 	}
// };

// const { name: publisherName = 'Self-published' } = book.publisher;

// console.log(publisherName);

/*
ARRAY DESTRUCTURING
*/

const address = ['721/52 Birds park residencies', 'Rajagiriya', 'Western Province', '10100'];

const [, city, state, zip] = address; // the vars are defined sequentially depending on their place in the array, so if you don't want to define a var you leave it empty like in the case of street here

console.log(`You are in ${city} of ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [, smallCoffee, mediumCoffee, largeCoffee] = item;

console.log(`A medium coffee costs ${mediumCoffee}`);

// To pass down an array's object properties as props:
//<ExpenseListItem {...expenses[0]}
