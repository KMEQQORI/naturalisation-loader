const readXlsxFile = require('read-excel-file/node');

const firebaseApp = require("firebase/app");
const firestore = require("firebase/firestore");


const firebaseConfig = {
    apiKey: "AIzaSyDIxnA7FaOJHmuesa4wRvTtRTiEWGP0dL0",
    authDomain: "naturalisation-28430.firebaseapp.com",
    databaseURL: "https://naturalisation-28430-default-rtdb.firebaseio.com",
    projectId: "naturalisation-28430",
    storageBucket: "naturalisation-28430.appspot.com",
    messagingSenderId: "969533772621",
    appId: "1:969533772621:web:59e35fd45047722a7c5d04",
    measurementId: "G-1KTYXD273E"
};

const app = firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

var fs = require('fs');

    readXlsxFile('./questions.xlsx').then(async(rows) => {
        // `rows` is an array of rows
        // each row being an array of cells.
        console.log("file data: ",rows);
        for (const row of rows) {
            try {
                const docRef = await firestore.setDoc(firestore.doc(db, "questions", `${row[0]}`), {
                    id: row[0],
                    question: !!row[1] ?row[1].toUpperCase():null,
                    response: !!row[2] ?row[2].toLowerCase():null,
                    response2: !!row[3]?row[3].toLowerCase():null,
                    response3: !!row[4]?row[4].toLowerCase():null,
                    img: row[5]
                });

                console.log("Document written with ID: ", row[0]);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        });