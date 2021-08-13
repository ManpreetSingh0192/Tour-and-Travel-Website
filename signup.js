let db;

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const dob = document.querySelector("#dob");

const form = document.querySelector("#adduser");
const submit = document.querySelector("#submit");
var status = "offline"

// when the window is opened the following scripts are running
window.onload = () => {
  // create and open an indexed db with name [notes] and version 1
  let request = window.indexedDB.open("users", 1);

  request.onerror = function () {
    console.log("Database failed to open");
  };

  // here is the place when db is successfully created we dispaly out data
  request.onsuccess = function () {
    console.log("Database opened successfully");

    db = request.result;
  };

    
//creating tables
  request.onupgradeneeded = function (e) {
    let db = e.target.result;
    // object store is like table in db
    let objectStore = db.createObjectStore("user", {
      keyPath: "email"
    });

    // create index in object store [like columns]
    objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("password", "password", { unique: false });
      objectStore.createIndex("dob", "dob", { unique: false });
      objectStore.createIndex("gender", "gender", { unique: false });
      objectStore.createIndex("status", "status", { unique: false });
//      objectStore.createIndex("note", "note", { unique: false });

    console.log("Database setup complete");
  };

  // addData is called when the form is submitted
  form.onsubmit = addData;
  //loginform.onsubmit = getUser;
      
      
  // add data into db
  function addData(e) {
    // prevent browser to refresh
    e.preventDefault();
      
      //gender
      
      var gender = "none";
      
      if (document.getElementById('r1').checked) {
           gender = document.getElementById('r1').value;
        }
        else{
             gender = document.getElementById("r2").value;
        }

    let newItem = {email:email.value, name: name.value,password:password.value,dob:dob.value, gender:gender, status:status };

    // create a transaction to write to db
    let transaction = db.transaction(["user"], "readwrite");
    let objectStore = transaction.objectStore("user");
    let request = objectStore.add(newItem);

    request.onsuccess = () => {
      name.value = "";
        email.value = "";
        password.value = "";
        dob.value = "";
    };

    transaction.oncomplete = () => {
        alert("Transaction completed on the database")
        window.open("index.html");
        window.close();
//      console.log("Transaction completed on the database");
//      displayData();
    };

    transaction.onerror = () => {
        alert("Transaction not completed, error!!!")
//      console.log("Transaction not completed, error!!!");
    };
  }
  
//function getUser(e) {
//
//
// console.log("About to login "+loginemail.value);
//
// var transaction = db.transaction(["user"],"readonly"); //readonly
// var objectStore = transaction.objectStore("user");
// var request = objectStore.get(loginemail.value);
//
// request.onerror = function(e) {
//  alert("Unable to retrieve data from database!");
//  return;
// };
// request.onsuccess = function(e) {
////  alert(password " " + request.result.password);
//     alert(request.result.password);
//  if(loginpassword.value != request.result.password) {
//   alert("Could not log you in");
//   return;
//  } 
//  alert("You are logged in");
//
// };
//      
//  }
    
//    login.click(function(e){
//       console.log("About to login "+loginemail.value);
//
//         var transaction = db.transaction(["user"]); //readonly
//         var objectStore = transaction.objectStore("user");
//         var request = objectStore.get(loginemail.value);
//
//         request.onerror = function(e) {
//          alert("Unable to retrieve data from database!");
//          return;
//         };
//         request.onsuccess = function(e) {
//        //  alert(password " " + request.result.password);
//             alert(request.result.password);
//          if(loginpassword.value != request.result.password) {
//           alert("Could not log you in");
//           return;
//          } 
//          alert("You are logged in");
//
//         };  
//    });
};