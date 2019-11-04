const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		// resolve('This is my resolved data');
		// example of using a string ^

		resolve({
			name: 'Sonal',
			age: 26
		});

		// reject('Something went wrong');
	}, 1500);
});

console.log('before');

//If the promise resolves sucessfully then 'promise.then' will run, the 'data' comes from the resolve
//prettier-ignore
promise.then(data => {
		console.log(data); // will log 'This is my resolved data'
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				// resolve('This is my resolved data');
				// example of using a string ^
		
				resolve('this is my other promise');
		
				// reject('Something went wrong');
			}, 1500);
		});
	}).then((str) => {
		console.log("Second 'then' chain", str);
	}).catch(error => {
		console.log(error);
    }); // the catch handler handles errors

// // You can also use 'then' and 'catch' like this:
// promise.then(data => {
//     console.log(data); // will log 'This is my resolved data'
// }, error => {
//     console.log(error);
// }); // the catch handler handles errors
// // But its a little unclear

console.log('after');
