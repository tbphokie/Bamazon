var mysql = require("mysql");
var inquirer = require("inquirer");
var conTable = require("console.table");
var clear = require('clear');
var cv = require("./bamazonCustomer.js");

// create the connection information for the sql database
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rxoxoxtx",
    database: "bamazon_DB"
});
connection.connect(function(err) {
    if (err) throw err;

});

//Create CustomerView, ManagerView, and SupervisorView objects here
cv = new CustomerView(connection);

//create arrays to hold inquirer questions here to make code more readable later
var startQuestions = [
    {
      type: 'rawlist',
      name: 'type',
      message: '[1] - Customer, [2] - Manager, [3] - Supervisor, [4] - Exit?',
      choices: [
          "CUSTOMER",
          "MANAGER",
          "SUPERVISOR",
          "EXIT"
      ]
    }
];

var customerItem = [

];

var bExit = false;  //boolean to determine when to exit the application


//startBamazon displays top menu to enter as customer, manager, or supervisor until
//user selects prompt to exit
function startBamazon(){
    console.log("-------------------Welcome to Bamazon-------------------------");

    inquirer.prompt(startQuestions).then( function(answer) {
        if(answer.type === 'CUSTOMER'){
            customer();
        } else if ( answer.type ===  'MANAGER'){
            manager();
        } else if (answer.type === 'SUPERVISOR'){
            supervisor();
        } else if(answer.type === 'EXIT'){
            console.log("Goodbye");
            bExit = true;
        }

        //Recursively call startBamazon until user selects "Exit"
        if(!bExit){
            startBamazon();
        }
        else { 
            onExit();
        }

    });  

}

function customer(){
    var results = [];
    console.log("customer");
    cv.displayAll();
/*

    //cv.getConnection();
    var res = [];
   results = cv.displayAllProducts();

    console.log("got here");
    //create inquirer prompt listing each id
    inquirer
    .prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          console.log(choiceArray);
          return choiceArray;
        },
        message: "What item would you like to purchase?"
      },
      {
        name: "quant",
        type: "input",
        message: "How many items do you want to purchase?"
      }
    ])
    .then(function(answer) {
        //get chosen item's info
        var chosenItem;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_name === answer.choice) {
            chosenItem = res[i];
          }
        }

        //determine if there is enough stock to place this order
        if (chosenItem.stock_quantity > parseInt(answer.quant)) {
            cv.purchaseItem(chosenItem.item_id, answer.quant);
        } else {
            console.log(`Only ${chosenItem.stock_quantity} items in stock.  Please try again.`);
        }
    });
*/    
}

function manager(){
    console.log("chose manager");
}

function supervisor(){
    console.log("chose supervisor");
}

function onExit(){
    connection.end();
}



startBamazon();