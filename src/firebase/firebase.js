import * as firebase from 'firebase'; // import * is just all the named exports so firebase.[named export]

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default}; // exports firebase in a way that can be used in any file

/***
 * EXAMPLES OF SUBSCRIBERS
 */

// // child_removed - Tracks what records get removed and only fires when a child is removed.
// database.ref('expenses').on('child_removed', snapshot => {
// 	console.log(snapshot.key, snapshot.val()); // Outputs the ID of the record removed
// });

// // child_changed - Tracks when a child gets changed
// database.ref('expenses').on('child_changed', snapshot => {
// 	console.log(snapshot.key, snapshot.val()); // Outputs the ID of the record removed
// });

// // child_added - Tracks when a child gets changed
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val()); // Outputs the ID of the record removed
//  })

/****
 *
 * EXAMPLES OF USING CHILD SNAPSHOTS AND ITERATING OVER FIREBASE'S OBJECT
 * AND PUSHING IT AS AN ARRAY THAT CAN BE READ BY REDUX
 */
// database.ref('expenses').once('value').then((snapshot ) => {
//        const expenses = [];

//        // https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
//        snapshot.forEach((childSnapshot) => {
//         expenses.push({
//            id: childSnapshot.key, // this is the id that comes from the firebase object
//            ...childSnapshot.val()
//         })
//        })

//        console.log(expenses);
// });

// database.ref('expenses').on('value', (snapshot)=>{
//     const expenses = [];

//     // https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
//     snapshot.forEach((childSnapshot) => {
//      expenses.push({
//         id: childSnapshot.key, // this is the id that comes from the firebase object
//         ...childSnapshot.val()
//      })
//     })

//     console.log(expenses);
// },(error)=>{
//     console.log('Fetching error:',error)
// })

// database.ref('expenses').push({
// 	description: '1st expense',
// 	note: 'Rent',
// 	amount: '5000',
// 	createdAt: 12313123123
// });

/*
PUSHING NEW LIST DATA WITH NEW IDS
Using push is a way to push arrays as firebase doesn't handle arrays in a typical sense.
The push method makes a random id
*/
// database.ref('notes').push({
//     title:'new',
//     body: 'newwwwwww'
// });

// const notes = [
// 	{
// 		id: '12',
// 		note: 'first note'
// 	},
// 	{
// 		id: '761asdasd',
// 		note: 'second note'
// 	}
// ];

// database.ref('notes').set(notes);

// database.ref().on()

// DATABASE FETCHING WITH WATCH CAPABILITY

/*
.on means its watching for new changes
Storing the entire fetch watch function in a const allows 
you to turn off and unsubscribe from watching for new changes
*/

//prettier-ignore
// const onValueChage = database.ref().on('value', (snapshot) => {
//     const fetchedData = snapshot.val();
//     // console.log(fetchedData.name,'is a',fetchedData.job.title,'at',fetchedData.job.company);
//     console.log(`${fetchedData.name} is a ${fetchedData.job.title} at ${fetchedData.job.company}`);
// }, (e) =>{
//     console.log("Error fetching data",e);
// })

//prettier-ignore
// const onValueChage = database.ref().on('value',snapshot => {
// 		console.log(snapshot.val());
// 		// This doesn't use promises because its constantly watching for changes
// 		// Therefore the second and third callback methods are basically 'then' and 'catch'
// 	},e => {
// 		console.log('An error occured with data fetching.', e);
// 	}
// );

// // example of unsubscribing to the database on watch method
// setTimeout(() => {
// 	database.ref('age').set(28);
// }, 3500);

// setTimeout(() => {
// 	database.ref().off(onValueChage);
// }, 7000);

// setTimeout(() =>{
//     database.ref('age').set(30);
// }, 10500)

// prettier-ignore
// .once allows you to fetch data once
// database.ref('location/city').once('value').then(snapshot => {
// 		const val = snapshot.val(); //snapshot.val() returns whatever was fetched
// 		console.log(val);
// 	}).catch(e => {
// 		console.log('Error fetching data', e);
// 	});

// //prettier-ignore
// database.ref().set({
//       name: 'Sonal Mendis',
//       age: 26,
//       isSingle: false,
//       stressLevel: 5,
//       job:{
//           title:'Lead developer',
//           company: 'Google'
//       },
//       location:{
//           city:"Colombo",
//           country: "Sri Lanka"
//       }

//   }).then(() => {
//       console.log('data is saved!');
//   }).catch((e) => {
//     console.log('This failed',e);
//   })

// // UPDATE EXAMPLES:

// database.ref().update({
// 	stressLevel: 9,
// 	isSingle: null,
// 	'job/company': 'Amazon',
// 	'location/city': 'Seattle'
// });

// database.ref().update({
// 	name: 'Mike',
// 	age: 29,
// 	job: 'software developer',
// 	isSingle: null
// });

// UPDATE EXAMPLE WITH NESTED OBJECTS:
// database.ref().update({
// 	age: 29,
// 	// location: {
// 	// 	city: 'Barbados'
// 	// }
// 	// This ^ won't work use this instead:
// 	'location/city': 'Barbados'
// });

// Using set without a ref (reference) overrides the last set of objects no matter what it is
// database.ref().set('This is my data');
// database.ref().set({
//     age: 27
//     }
// );
// The age above will completely remove the original set and only have age as the object

// USING THE REMOVE METHOD:
// database.ref('isSingle').remove().then(() =>{
//     console.log("Field removed");
// }).catch((e) => {
//     console.log("Field not removed",e);
// })
